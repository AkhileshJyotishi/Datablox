import logging
import requests
from typing import Dict, Any
from dotenv import load_dotenv
import json
from src.connections.base_connection import BaseConnection, Action, ActionParameter

logger = logging.getLogger("connections.custom_connection")

class CustomConnectionError(Exception):
    """Base exception for Custom connection errors"""
    pass

class CustomConfigurationError(CustomConnectionError):
    """Raised when there are configuration/credential issues"""
    pass

class CustomAPIError(CustomConnectionError):
    """Raised when Custom API requests fail"""
    pass

class CustomConnection(BaseConnection):
    def __init__(self, config: Dict[str, Any]):
        super().__init__(config)
        self.base_url = config.get("base_url", "").rstrip("/")  # Ensure no trailing slash

        if not self.base_url:
            raise CustomConfigurationError("Configuration must include a valid 'base_url' string.")

    @property
    def is_llm_provider(self) -> bool:
        return False  # Custom connection can be used for any API, not just LLMs

    def validate_config(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Validate custom API configuration"""
        if "base_url" not in config or not isinstance(config["base_url"], str):
            raise ValueError("Configuration must include a valid 'base_url' string.")

        return config

    def register_actions(self) -> None:
        """Register available Custom actions"""
        self.actions = {
            "fetch-data": Action(
                name="fetch-data",
                parameters=[
                    ActionParameter("endpoint", True, str, "API endpoint to fetch data from"),
                    ActionParameter("method", False, str, "HTTP method (GET, POST, etc.), default is GET"),
                    ActionParameter("params", False, str, "Query parameters for the request"),
                    ActionParameter("body", False, dict, "Request body for POST requests"),
                    ActionParameter("headers", False, dict, "Custom headers if needed"),
                ],
                description="Fetch data from a custom API"
            )
        }

    def _make_request(self, endpoint: str, method: str = "GET", params: dict = None, body: dict = None, headers: dict = None) -> Any:
        """Make an API request and return the response"""
        
        url = f"{self.base_url}{endpoint}"
        headers = headers or {}

        logger.info(f"📡 Sending {method} request to {url} with headers: {headers}")

        try:
            response = requests.request(method.upper(), url, params=params, json=body, headers=headers)
            response.raise_for_status()  # Raise an error for non-200 responses
            return response.json()
        except requests.exceptions.HTTPError as e:
            raise CustomAPIError(f"HTTP error: {e}")
        except requests.exceptions.ConnectionError as e:
            raise CustomAPIError(f"Connection error: {e}")
        except requests.exceptions.Timeout as e:
            raise CustomAPIError(f"Timeout error: {e}")
        except requests.exceptions.RequestException as e:
            raise CustomAPIError(f"API request failed: {e}")

    def fetch_data(self, endpoint: str, method: str = "GET", params: str = None, body: dict = None, headers: dict = None) -> Any:
        """Fetch data from a custom API"""
        print(self)
        print(endpoint)
        print(method)
        print(body)
        print(headers)
        if isinstance(params, str):
            try:
                params = json.loads(params)  # Convert JSON string to dict
            except json.JSONDecodeError:
                raise ValueError("Invalid JSON string in 'params'")
        print(params)
        return self._make_request(endpoint, method, params, body, headers)

    def configure(self) -> bool:
        """Configuration is not needed for Custom API, return True"""
        return True

    def is_configured(self, verbose=False) -> bool:
        """Always return True as this connection does not need authentication"""
        return True

    def perform_action(self, action_name: str, kwargs) -> Any:
        """Execute a Custom action with validation"""
        if action_name not in self.actions:
            raise KeyError(f"Unknown action: {action_name}")

        # Reload environment variables (if any are used)
        load_dotenv()

        if not self.is_configured(verbose=True):
            raise CustomConfigurationError("Custom API is not properly configured")

        action = self.actions[action_name]
        errors = action.validate_params(kwargs)
        if errors:
            raise ValueError(f"Invalid parameters: {', '.join(errors)}")

        method_name = action_name.replace('-', '_')
        method = getattr(self, method_name)
        return method(**kwargs)
