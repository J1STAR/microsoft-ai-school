# Standard Library
import os
import json
from typing import Any, Dict, List, Optional
from io import BytesIO
from base64 import b64decode
import urllib.parse

# Third-party
from PIL import Image
from openai import AzureOpenAI
from dotenv import load_dotenv
from pprint import pprint

load_dotenv()

# Custom
from utils.duckduckgo import search


class OpenAIService:
    """A service class for interacting with the Azure OpenAI API."""

    def __init__(self) -> None:
        """Initialize the OpenAI service clients for chat and image generation."""
        # Azure OpenAI chat client
        self.chat_client = AzureOpenAI(
            api_key=os.getenv("AZURE_OPENAI_API_KEY"),
            api_version="2024-12-01-preview",
            azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT_URL"),
        )

        self.chat_system_prompt: Dict[str, Any] = {
            "role": "system",
            "content": "사용자가 정보를 찾는 데 도움이 되는 AI professional assistant. 검색어는 영문으로 번역 한 뒤 진행, 검색 결과는 한글로 정리",
        }

        # Azure OpenAI DALL-E client
        self.dalle_client = AzureOpenAI(
            api_key=os.getenv("AZURE_OPENAI_DALLE_API_KEY"),
            api_version="2024-04-01-preview",
            azure_endpoint=os.getenv("AZURE_OPENAI_DALLE_ENDPOINT_URL"),
        )
        self.image_deployment_id = os.getenv("AZURE_OPENAI_DALLE_DEPLOYMENT")

    def chat(
        self,
        prompt: str,
        history: List[List[str]],
        tools: Optional[List[Dict[str, Any]]] = None,
        args: Optional[Dict[str, Any]] = None,
    ) -> tuple[str, list[list[str]]]:
        """
        Send a message to the OpenAI chat model and get a response.

        Args:
            message: The message from the user.
            history: The conversation history from Gradio.
            tools: A list of tools the model can call.
            args: Additional arguments for the API call.

        Returns:
            A tuple containing an empty string (to clear the input box) and
            the updated conversation history for Gradio.
        """
        if not prompt:
            return "", history, None

        if args is None:
            args = {}

        messages: List[Dict[str, Any]] = [self.chat_system_prompt]
        citations = ""
        for h in history:
            if h[0]:
                messages.append({"role": "user", "content": h[0]})
            if h[1]:
                messages.append({"role": "assistant", "content": h[1]})
        messages.append({"role": "user", "content": prompt})

        pprint(messages)

        response_message = self._request_to_openai(messages, tools, args)

        if response_message.tool_calls:
            assistant_message = response_message.model_dump(exclude_unset=True)
            messages.append(assistant_message)

            for tool_call in response_message.tool_calls:
                tool_id = tool_call.id
                tool_name = tool_call.function.name
                tool_args = json.loads(tool_call.function.arguments)

                if tool_name == "search":
                    messages.append(
                        {
                            "tool_call_id": tool_id,
                            "role": "tool",
                            "content": json.dumps(
                                search(tool_args.get("query")), ensure_ascii=False
                            ),
                        }
                    )

                    pprint(f"=" * 30)
                    pprint(messages, compact=True)
                    pprint(f"=" * 30)

                    messages.append(
                        {
                            "role": "user",
                            "content": "주어진 결과를 정리한 뒤 이해하기 쉽고 가독성 좋게 출력해주세요.",
                        }
                    )
                    response_message = self._request_to_openai(messages, tools, args)

        if response_message.content:
            history.append([prompt, response_message.content])
            
        if response_message.context:
            pprint("@#" * 30)
            pprint(response_message.context)
            pprint("@#" * 30)
            if response_message.context.get("citations", None):
                citations = "\n\n".join(
                    [
                        f"참고 문서: {citation.get('title')}\n내용: {citation.get('content')}"
                        for citation in response_message.context.get("citations", [])
                    ]
                )

        return "", history, citations

    def generate_image(self, prompt: str) -> Optional[Image.Image]:
        """
        Generate an image using DALL-E.

        Args:
            prompt: The prompt to generate the image from.

        Returns:
            A PIL Image object, or None if generation fails.
        """
        if not prompt:
            return None

        response = self.dalle_client.images.generate(
            model=self.image_deployment_id,
            prompt=prompt,
            n=1,
            size="1024x1024",
            response_format="b64_json",
        )

        if response.data and response.data[0].b64_json:
            return Image.open(BytesIO(b64decode(response.data[0].b64_json)))

        return None

    def search(
        self,
        prompt: str,
    ) -> str:
        """
        Search the web for information.

        Args:
            prompt: The prompt to search the web for.

        Returns:
            A string containing the search results.
        """

        tools = [
            {
                "type": "function",
                "function": {
                    "name": "search",
                    "description": "Search the web for information",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "query": {
                                "type": "string",
                                "description": "The query to search the web for.",
                            }
                        },
                        "required": ["query"],
                    },
                },
            }
        ]

        _, search_results = self.chat(prompt, [], tools=tools)

        pprint(f"search_results: {search_results}")

        return search_results[0][1]

    def _request_to_openai(
        self,
        messages: List[Dict[str, Any]],
        tools: Optional[List[Dict[str, Any]]] = None,
        args: Optional[Dict[str, Any]] = None,
    ) -> Any:
        pprint(f"+" * 30)
        pprint(args.get("extra_body", {}))
        pprint(f"+" * 30)
        messages.append({"role": "user", "content": "이전 질문에 대하여 일본 여행지에 대한 추천 정보를 제공된 데이터 내에서 검색하여 가독성 좋게 출력해주세요."})

        response = self.chat_client.chat.completions.create(
            model=os.getenv("AZURE_OPENAI_DEPLOYMENT"),
            messages=messages,
            tools=tools,
            max_tokens=args.get("max_tokens", 16384),
            temperature=args.get("temperature", 0.7),
            top_p=args.get("top_p", 0.95),
            frequency_penalty=args.get("frequency_penalty", 0),
            presence_penalty=args.get("presence_penalty", 0),
            stop=args.get("stop", None),
            stream=args.get("stream", False),
            extra_body=args.get("extra_body", {}),
        )
        
        pprint(response, compact=True)

        return response.choices[0].message

    def japan_travel(
        self,
        prompt: str,
        history: List[List[str]],
    ) -> tuple[str, list[list[str]]]:
        """
        Search for Japan travel information using Azure AI Search.

        Args:
            prompt: The user's question about Japan travel.
            history: The conversation history.

        Returns:
            A tuple containing an empty string and the updated conversation history.
        """

        data_sources = [
            {
                "type": "azure_search",
                "parameters": {
                    "endpoint": os.getenv("AZURE_OPENAI_SEARCH_ENDPOINT_URL"),
                    "index_name": os.getenv("AZURE_OPENAI_SEARCH_INDEX"),
                    "semantic_configuration": os.getenv("AZURE_OPENAI_SEARCH_SEMANTIC"),
                    "query_type": "semantic",
                    "strictness": 3,
                    "top_n_documents": 20,
                    "authentication": {
                        "type": "api_key",
                        "key": os.getenv("AZURE_OPENAI_SEARCH_API_KEY"),
                    },
                },
            }
        ]

        return self.chat(
            prompt, history, args={"extra_body": {"data_sources": data_sources}}
        )
