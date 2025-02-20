import logging
import json
import os
from typing import Dict, Any, List, Optional,AsyncGenerator
from dotenv import load_dotenv, set_key
import google.generativeai as genai
from src.connections.base_connection import BaseConnection, Action, ActionParameter
import asyncio
from io import BytesIO

logger = logging.getLogger("connections.gemini_connection")

class GeminiConnectionError(Exception):
    """Base exception for Gemini connection errors"""
    pass

class GeminiConfigurationError(GeminiConnectionError):
    """Raised when there are configuration/credential issues"""
    pass

class GeminiAPIError(GeminiConnectionError):
    """Raised when Gemini API requests fail"""
    pass

class GeminiConnection(BaseConnection):
    def __init__(self, config: Dict[str, Any]):
        super().__init__(config)
        self._client = None
        self._model = None  # Store model instance

    @property
    def is_llm_provider(self) -> bool:
        return True

    def validate_config(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Validate Gemini configuration from JSON"""
        required_fields = ["model"]
        missing_fields = [field for field in required_fields if field not in config]
        
        if missing_fields:
            raise ValueError(f"Missing required configuration fields: {', '.join(missing_fields)}")
            
        if not isinstance(config["model"], str):
            raise ValueError("model must be a string")
            
        return config

    def register_actions(self) -> None:
        """Register available Gemini actions"""
        self.actions = {
            "generate-text": Action(
                name="generate-text",
                parameters=[
                    ActionParameter("prompt", True, str, "The input prompt for text generation"),
                    ActionParameter("system_instruction", True, str, "System prompt to guide the model"),
                    ActionParameter("history", False, str, "Optional chat history to guide the conversation"),
                ],
                description="Generate text using Gemini models"
            )
        }

    def _get_client(self) -> None:
        """Initialize Gemini API client"""
        if not self._client:
            api_key = os.getenv("GEMINI_API_KEY")
            if not api_key:
                raise GeminiConfigurationError("Gemini API key not found in environment")

            genai.configure(api_key=api_key)
            self._client = genai

            # Configure and create model instance without unsupported fields.
            generation_config = {
                "temperature": 1,
                "top_p": 0.95,
                "top_k": 40,
                "max_output_tokens": 8192,
            }

            self._model = genai.GenerativeModel(
                model_name=self.config["model"],
                generation_config=generation_config
            )

    def configure(self) -> bool:
        """Sets up Gemini API authentication"""
        logger.info("\n🤖 GEMINI API SETUP")

        if self.is_configured():
            logger.info("\nGemini API is already configured.")
            response = input("Do you want to reconfigure? (y/n): ")
            if response.lower() != 'y':
                return True

        logger.info("\n📝 To get your Gemini API credentials:")
        logger.info("Go to https://ai.google.dev")
        
        api_key = input("\nEnter your Gemini API key: ")

        try:
            if not os.path.exists('.env'):
                with open('.env', 'w') as f:
                    f.write('')

            set_key('.env', 'GEMINI_API_KEY', api_key)
            
            # Validate the API key by listing models
            genai.configure(api_key=api_key)
            genai.list_models()

            logger.info("\n✅ Gemini API configuration successfully saved!")
            logger.info("Your API key has been stored in the .env file.")
            return True

        except Exception as e:
            logger.error(f"Configuration failed: {e}")
            return False

    def is_configured(self, verbose=False) -> bool:
        """Check if Gemini API key is configured and valid"""
        try:
            load_dotenv()
            api_key = os.getenv('GEMINI_API_KEY')
            if not api_key:
                return False
            
            genai.configure(api_key=api_key)
            genai.list_models()
            return True
        
        except Exception as e:
            if verbose:
                logger.debug(f"Configuration check failed: {e}")
            return False

    def generate_text(self, prompt: str, system_instruction: str, history: Optional[str] = None, **kwargs) -> str:
        """Generate text using Gemini models while preserving conversation history."""
        try:
            self._get_client()
            combined_prompt = f"{system_instruction}\n{prompt}" if system_instruction else prompt

            if hasattr(self, "_chat_session") and self._chat_session is not None:
                chat_session = self._chat_session
            else:
                if isinstance(history, str):
                    history = json.loads(history)

                updated_history = []

                for message in history:
                    updated_history.append(message)

                chat_session = self._model.start_chat(history=updated_history)
                self._chat_session = chat_session


            response = chat_session.send_message(combined_prompt)
            return response.text

        except Exception as e:
            raise GeminiAPIError(f"Text generation failed: {e}")
        
    def perform_action(self, action_name: str, kwargs) -> Any:
        """Execute a Gemini action with validation"""
        if action_name not in self.actions:
            raise KeyError(f"Unknown action: {action_name}")

        load_dotenv()
        
        if not self.is_configured(verbose=True):
            raise GeminiConfigurationError("Gemini is not properly configured")

        action = self.actions[action_name]
        errors = action.validate_params(kwargs)
        if errors:
            raise ValueError(f"Invalid parameters: {', '.join(errors)}")

        method_name = action_name.replace('-', '_')
        method = getattr(self, method_name)
        return method(**kwargs)
