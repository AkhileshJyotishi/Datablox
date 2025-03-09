import logging
import json
import os
import re
from typing import Dict, Any, List, Optional
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
    def _init_(self, config: Dict[str, Any]):
        super()._init_(config)
        self._client = None
        self._model = None  # Store model instance
        self._chat_session = None  # For maintaining a chat session

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
            ),
            "classify-tweets": Action(
                name="classify-tweets",
                parameters=[
                    ActionParameter("tweets_data", True, list, "List of raw tweet objects to classify"),
                    ActionParameter("classification_criteria", True, list, "List of criteria objects for classification"),
                ],
                description="Classify tweets into available datasets based on provided criteria"
            ),
            "process-tweets": Action(
                name="process-tweets",
                parameters=[
                    ActionParameter("classified_data", True, list, "Classified tweets data to process"),
                ],
                description="Process classified tweets into meaningful informational data using ML"
            ),
            "append-classified-data": Action(
                name="append-classified-data",
                parameters=[
                    ActionParameter("classified_data", True, list, "Classified tweets data to append"),
                    ActionParameter("dataset", True, list, "Existing dataset to which classified tweets will be appended"),
                ],
                description="Append classified tweets data into the related dataset"
            ),
            "realtime-update-dataset": Action(
                name="realtime-update-dataset",
                parameters=[
                    ActionParameter("new_tweets", True, list, "New incoming raw tweet objects to update in real time"),
                    ActionParameter("classification_criteria", True, list, "List of criteria objects for classification"),
                    ActionParameter("dataset", True, list, "Current realtime dataset to be updated"),
                ],
                description="Perform real-time classification and append new tweet data into the existing dataset"
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
            if self._chat_session is not None:
                chat_session = self._chat_session
            else:
                updated_history = []
                if history:
                    try:
                        updated_history = json.loads(history)
                    except Exception as e:
                        logger.warning("History provided is not valid JSON; ignoring it.")
                chat_session = self._model.start_chat(history=updated_history)
                self._chat_session = chat_session
            response = chat_session.send_message(combined_prompt)
            return response.text
        except Exception as e:
            raise GeminiAPIError(f"Text generation failed: {e}")

    def classify_tweets(self, tweets_data: List[dict], classification_criteria: List[dict], **kwargs) -> List[dict]:
        """
        Classify the provided tweets into datasets based on given classification criteria.
        """
        classified_tweets = []
        for tweet in tweets_data:
            hashtags = re.findall(r"#(\w+)", tweet.get("text", ""))
            mentions = re.findall(r"@(\w+)", tweet.get("text", ""))
            language = "en" if tweet.get("text", "").isascii() else "other"
            market_tag = ""
            topic_label = ""
            for criteria in classification_criteria:
                if "market_tag" in criteria and criteria["market_tag"].lower() in tweet.get("text", "").lower():
                    market_tag = criteria["market_tag"]
                    topic_label = criteria.get("topic_label", "")
                    break
            classified_tweet = {
                "id": tweet.get("id"),
                "edit_history_tweet_ids": tweet.get("edit_history_tweet_ids", []),
                "created_at": tweet.get("created_at"),
                "text": tweet.get("text"),
                "language": language,
                "author_id": tweet.get("author_id"),
                "author_name": tweet.get("author_name", ""),
                "author_username": tweet.get("author_username", ""),
                "verified": False,            
                "follower_count": 0,          
                "influencer_flag": False,     
                "hashtags": hashtags,
                "mentions": mentions,
                "attachments": tweet.get("attachments", {}),
                "retweet_count": 0,           
                "like_count": 0,              
                "reply_count": 0,             
                "quote_count": 0,             
                "market_tag": market_tag if market_tag else "Unknown",
                "sentiment_score": 0.0,       
                "topic_label": topic_label if topic_label else "general"
            }
            classified_tweets.append(classified_tweet)
        return classified_tweets

    def process_tweets(self, classified_data: List[dict], **kwargs) -> List[dict]:
        """
        Process classified tweets into more meaningful informational data using an ML model.
        
        This implementation leverages the Gemini generative model to produce a summary
        and extract key insights from each tweet.
        """
        processed_tweets = []
        for tweet in classified_data:
            text = tweet.get("text", "")
            prompt = (
                f"Please analyze the following tweet and provide a concise summary along with any key insights, "
                f"sentiments, or notable keywords:\n\n{text}"
            )
            try:
                summary = self.generate_text(
                    prompt=prompt,
                    system_instruction="You are a helpful assistant that extracts meaningful insights from tweets."
                )
            except Exception as e:
                logger.error(f"Error generating summary for tweet {tweet.get('id')}: {e}")
                summary = text if len(text) <= 50 else text[:50] + "..."
            processed_tweet = tweet.copy()
            processed_tweet["processed_info"] = summary
            processed_tweets.append(processed_tweet)
        return processed_tweets

    def append_classified_data(self, classified_data: List[dict], dataset: List[dict], **kwargs) -> List[dict]:
        """
        Append classified tweets data into the related dataset.
        """
        updated_dataset = dataset.copy()
        updated_dataset.extend(classified_data)
        return updated_dataset

    def realtime_update_dataset(self, new_tweets: List[dict], classification_criteria: List[dict], dataset: List[dict], **kwargs) -> List[dict]:
        """
        Real-time update pipeline:
          1. Classify incoming tweet data using provided criteria.
          2. Process the classified tweets to extract additional insights using the ML model.
          3. Append the processed tweets into the existing realtime dataset.
        
        Args:
            new_tweets: List of new raw tweet objects.
            classification_criteria: List of criteria objects for classification.
            dataset: Existing realtime dataset (list of tweet objects).
        
        Returns:
            The updated realtime dataset with new tweet data appended.
        """
        logger.info("Starting realtime update of dataset...")
        # Step 1: Classify the incoming tweets.
        classified = self.classify_tweets(new_tweets, classification_criteria)
        logger.debug(f"Classified {len(classified)} tweets.")
        # Step 2: Process the classified tweets using the ML model.
        processed = self.process_tweets(classified)
        logger.debug("Processed tweets to extract additional insights.")
        # Step 3: Append the processed tweets to the existing dataset.
        updated_dataset = self.append_classified_data(processed, dataset)
        logger.info("Realtime dataset updated successfully.")
        return updated_dataset

    def perform_action(self, action_name: str, kwargs) -> Any:
        """Execute a Gemini action with validation."""
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