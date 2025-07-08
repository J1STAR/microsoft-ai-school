# Standard Library
import os
import base64
import io
import sys
from typing import Any, Dict, List, Optional


# Third-party
import gradio as gr
from PIL import Image
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
    path_to_add = os.path.abspath(os.path.join(current_dir, "..", "..", directory))
    # 생성된 경로가 sys.path에 아직 없으면 추가합니다.
    # 이렇게 하면 중복 추가를 방지할 수 있습니다.
    if path_to_add not in sys.path:
        sys.path.append(path_to_add)

# Custom
from speech import synthesize_speech


class OpenAIService:
    """Azure OpenAI API와의 상호작용을 담당하는 서비스 클래스."""

    def __init__(self) -> None:
        """
        OpenAI 서비스를 초기화하고, 채팅 및 이미지 생성을 위한 클라이언트를 설정합니다.
        """
        # Azure OpenAI 채팅 모델과 통신하기 위한 클라이언트를 초기화합니다.
        self.chat_client = AzureOpenAI(
            api_key=os.getenv("AZURE_OPENAI_API_KEY"),
            api_version="2024-12-01-preview",  # 사용하는 API 버전을 명시합니다.
            azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT_URL"),
        )

        # 시스템 프롬프트: 모델의 역할과 행동 방식을 정의합니다.
        # 이 프롬프트를 통해 모델이 사용자의 질문과 이미지를 분석하고,
        # 한국어로 답변을 생성하도록 기본 지침을 설정합니다.
        self.chat_system_prompt: Dict[str, Any] = {
            "role": "system",
            "content": """
                You are an AI professional assistant that helps users find information.
                You are given a user's message and an image.
                You need to analyze the image and the user's message, and then provide a response.
                The response should be in Korean.
            """,
        }

    def chat(
        self,
        prompt: str,
        history: List[Dict[str, Any]] = [],
        args: Optional[Dict[str, Any]] = None,
    ) -> tuple[str, list[list[str]]]:
        """
        사용자의 메시지와 이미지를 OpenAI 채팅 모델에 전송하고 응답을 받습니다.

        이 메서드는 Gradio 인터페이스와 연동되도록 설계되었습니다.
        사용자 입력(프롬프트, 이미지)을 받아 API 요청 형식에 맞게 가공하고,
        모델의 응답을 다시 Gradio의 대화 기록(history) 형식과 음성 데이터로 변환하여 반환합니다.

        Args:
            prompt (str): 사용자가 입력한 텍스트 메시지.
            history (List[Dict[str, Any]], optional): Gradio의 채팅 기록. Defaults to [].
            args (Optional[Dict[str, Any]], optional): 이미지와 같은 추가 인수를 담는 딕셔너리. Defaults to None.

        Returns:
            tuple[str, list[list[str]]]: Gradio 채팅 기록(history)과
                                         생성된 음성 파일의 경로를 담은 튜플.
        """
        # 사용자가 입력한 프롬프트가 없으면 빈 값들을 반환하여 아무 동작도 하지 않습니다.
        if not prompt:
            return "", []

        if args is None:
            args = {}

        # API에 전송할 메시지 목록을 시스템 프롬프트로 시작합니다.
        messages: List[Dict[str, Any]] = [self.chat_system_prompt]

        # 사용자의 텍스트 프롬프트를 메시지 목록에 추가합니다.
        messages.append({"role": "user", "content": prompt})

        # 'args'에 이미지가 포함된 경우, 이미지를 Base64로 인코딩하여 메시지에 추가합니다.
        # 이는 멀티모달(text+image) 입력을 위해 필요합니다.
        if args.get("image") is not None:
            # Gradio에서 받은 NumPy 배열 형식의 이미지를 PIL Image 객체로 변환합니다.
            image = Image.fromarray(args.get("image"))
            # 이미지를 메모리 내의 바이트 스트림으로 변환합니다. (파일로 저장하지 않기 위함)
            with io.BytesIO() as byte_stream:
                image.save(byte_stream, format="PNG")
                image_bytes = byte_stream.getvalue()
            # 바이트 데이터를 Base64 문자열로 인코딩합니다.
            b64_image = base64.b64encode(image_bytes).decode("utf-8")

            # GPT-4o와 같은 멀티모달 모델이 인식할 수 있는 형식으로 이미지 메시지를 구성합니다.
            messages.append(
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/png;base64,{b64_image}",
                            },
                        },
                    ],
                }
            )

        # 구성된 메시지 목록을 사용하여 OpenAI API에 요청을 보냅니다.
        response_message = self._request_to_openai(messages, args)

        # Gradio 채팅 기록을 업데이트합니다.
        # 사용자의 질문(이미지 포함)과 어시스턴트의 답변을 기록에 추가합니다.
        history.append({"role": "user", "content": gr.Image(value=args.get("image"))})
        history.append({"role": "assistant", "content": response_message.content})

        # 업데이트된 채팅 기록과, 어시스턴트의 답변을 음성으로 변환한 파일 경로를 반환합니다.
        return history, synthesize_speech(response_message.content, "ko-KR-YuJinNeural")

    def _request_to_openai(
        self,
        messages: List[Dict[str, Any]],
        args: Optional[Dict[str, Any]] = None,
    ) -> Any:
        """
        OpenAI Chat Completions API에 실제 요청을 보내고 응답을 받는 내부 메서드.

        Args:
            messages (List[Dict[str, Any]]): API에 전달할 메시지 목록.
            args (Optional[Dict[str, Any]], optional): max_tokens, temperature 등
                                                     API 호출에 사용할 파라미터. Defaults to None.

        Returns:
            Any: API 응답에서 첫 번째 선택지(choice)의 메시지 객체.
        """
        # Azure OpenAI Chat Completions API를 호출합니다.
        response = self.chat_client.chat.completions.create(
            model=os.getenv("AZURE_OPENAI_DEPLOYMENT"),  # 배포된 모델 이름
            messages=messages,  # 대화 메시지 목록
            max_tokens=args.get("max_tokens", 16384),  # 최대 토큰 수
            temperature=args.get("temperature", 0.7),  # 창의성 조절 (0~2)
            top_p=args.get("top_p", 0.95),  # 상위 p 샘플링
            frequency_penalty=args.get("frequency_penalty", 0),  # 빈도 페널티
            presence_penalty=args.get("presence_penalty", 0),  # 존재 페널티
            stop=args.get("stop", None),  # 중단 시퀀스
            stream=args.get("stream", False),  # 스트리밍 응답 여부
            extra_body=args.get("extra_body", {}),  # 추가 파라미터
        )

        # API 응답에서 첫 번째 생성된 메시지를 반환합니다.
        return response.choices[0].message
