import os
import google.generativeai as genai

genai.configure(api_key="AIzaSyBgjqCAHJqBdg_GmYTz-MmAmRCi82GEz1I")

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-2.0-flash",
  generation_config=generation_config,
)

print(model)

chat_session = model.start_chat(
  history=[
    {
      "role": "user",
      "parts": [
        "hello\n",
      ],
    },
    {
      "role": "model",
      "parts": [
        "Hello there! How can I help you today?\n",
      ],
    },
  ]
)

response = chat_session.send_message("Hii How are you?")

print(response.text)