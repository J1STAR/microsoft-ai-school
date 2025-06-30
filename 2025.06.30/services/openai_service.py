# Standard Library
import os, sys
from typing import Any, Dict, List, Optional

# Third-party
from openai import AzureOpenAI
from dotenv import load_dotenv

load_dotenv()

# 스크립트의 현재 디렉토리를 기준으로 경로를 설정합니다.
# Jupyter Notebook과 같은 환경에서 '__file__'이 정의되지 않은 경우를 대비합니다.
try:
    # __file__은 현재 실행 중인 스크립트의 경로를 나타냅니다.
    current_dir = os.path.dirname(os.path.abspath(__file__))
except NameError:
    # 대화형 환경에서는 현재 작업 디렉토리를 사용합니다.
    current_dir = os.getcwd()

# sys.path에 추가할 디렉토리 목록입니다.
# 이렇게 목록으로 관리하면 나중에 다른 디렉토리를 추가하기 용이합니다.
directories_to_add = ["2025.06.27"]

for directory in directories_to_add:
    # 상위 디렉토리와 대상 디렉토리 이름을 조합하여 절대 경로를 만듭니다.
    path_to_add = os.path.abspath(os.path.join(current_dir, "..", directory))
    # 생성된 경로가 sys.path에 아직 없으면 추가합니다.
    # 이렇게 하면 중복 추가를 방지할 수 있습니다.
    if path_to_add not in sys.path:
        sys.path.append(path_to_add)

# Custom
from speech import synthesize_speech

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
            "content": "사용자가 정보를 찾는 데 도움이 되는 AI professional assistant입니다.",
        }

    def chat(
        self,
        prompt: str,
        history: List[List[str]],
        args: Optional[Dict[str, Any]] = None,
    ) -> tuple[str, list[list[str]]]:
        """
        Send a message to the OpenAI chat model and get a response.

        Args:
            message: The message from the user.
            history: The conversation history from Gradio.
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
        messages.extend(history)
        messages.append({"role": "user", "content": prompt})

        response_message = self._request_to_openai(messages, args)
        messages.append({"role": "assistant", "content": response_message.content})

        return "", messages, synthesize_speech(response_message.content, "ko-KR-YuJinNeural")

    def _request_to_openai(
        self,
        messages: List[Dict[str, Any]],
        args: Optional[Dict[str, Any]] = None,
    ) -> Any:
        response = self.chat_client.chat.completions.create(
            model=os.getenv("AZURE_OPENAI_DEPLOYMENT"),
            messages=messages,
            max_tokens=args.get("max_tokens", 16384),
            temperature=args.get("temperature", 0.7),
            top_p=args.get("top_p", 0.95),
            frequency_penalty=args.get("frequency_penalty", 0),
            presence_penalty=args.get("presence_penalty", 0),
            stop=args.get("stop", None),
            stream=args.get("stream", False),
            extra_body=args.get("extra_body", {}),
        )

        return response.choices[0].message