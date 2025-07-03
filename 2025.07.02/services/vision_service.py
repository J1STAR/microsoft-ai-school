# -*- coding: utf-8 -*-
"""
이 스크립트는 Azure AI Vision 서비스와 상호작용하기 위한 `VisionService` 클래스를 정의합니다.

이 클래스는 Azure의 강력한 이미지 분석 기능을 쉽게 사용할 수 있도록 캡슐화합니다.
API 호출에 필요한 복잡한 설정(엔드포인트, API 키, 요청 헤더 등)을 내부적으로 처리하므로,
다른 개발자들은 이 클래스를 가져와 간단하게 이미지 분석 기능을 구현할 수 있습니다.
"""

# 표준 라이브러리
import os  # 운영체제와 상호작용하기 위한 모듈로, 여기서는 환경 변수를 읽기 위해 사용됩니다.
from typing import Any, Dict, List, Optional  # 타입 힌팅을 위한 모듈로, 코드의 가독성과 안정성을 높입니다.

# 서드파티 라이브러리
import requests  # HTTP 요청을 보내기 위한 라이브러리로, Azure API와 통신할 때 사용됩니다.
from dotenv import load_dotenv  # .env 파일에서 환경 변수를 로드하기 위한 라이브러리입니다.

# .env 파일에 저장된 환경 변수(예: API 키)를 현재 환경으로 로드합니다.
# 이렇게 하면 민감한 정보를 코드에 직접 작성하지 않고 안전하게 관리할 수 있습니다.
load_dotenv()


class VisionService:
    """
    Azure AI Vision 서비스와의 통신을 담당하는 서비스 클래스입니다.

    이 클래스의 인스턴스(객체)는 Vision 서비스를 사용하기 위한 모든 정보를 가지고 있습니다.
    """

    def __init__(self) -> None:
        """
        `VisionService` 클래스의 새 인스턴스를 초기화(생성)합니다.

        이 메서드는 `VisionService()` 코드가 실행될 때 호출되며,
        Azure 서비스에 연결하는 데 필요한 기본 설정들을 준비합니다.
        구체적으로, .env 파일에서 엔드포인트 URL과 API 키를 읽어와 인스턴스 변수에 저장합니다.
        """
        # os.getenv() 함수를 사용하여 환경 변수 값을 읽어옵니다.
        self.endpoint = os.getenv("AZURE_VISION_ENDPOINT_URL")  # Vision 서비스의 고유 주소
        self.api_key = os.getenv("AZURE_VISION_API_KEY")      # 서비스 접근을 위한 비밀 키

        # 필수 환경 변수가 설정되지 않았을 경우, 에러를 발생시켜 문제를 즉시 알립니다.
        # 이를 통해 설정 누락으로 인한 잠재적인 런타임 오류를 방지할 수 있습니다.
        if not self.endpoint or not self.api_key:
            raise ValueError(
                "AZURE_VISION_ENDPOINT_URL 및 AZURE_VISION_API_KEY 환경 변수를 설정해야 합니다."
            )

    def analyze_image(
        self,
        image_source: str,
        features: List[str],
        language: str = "en",
        gender_neutral_caption: bool = False,
        smart_crops_aspect_ratios: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        지정된 이미지(URL 또는 로컬 파일)를 분석합니다.

        이 메서드는 이 클래스의 핵심 기능으로, 실제 Azure Vision API를 호출하여
        이미지에서 태그, 캡션, 객체 등 다양한 정보를 추출합니다.

        Args:
            image_source (str): 분석할 이미지의 웹 URL 주소 또는 컴퓨터에 저장된 로컬 파일 경로입니다.
            features (List[str]): 추출할 시각적 특징들의 목록입니다. 
                                  예: ["tags", "read", "caption", "objects"]
            language (str, optional): 분석 결과의 언어를 지정합니다. 기본값은 'en'(영어)입니다.
            gender_neutral_caption (bool, optional): 생성되는 캡션을 성 중립적으로 만들지 여부입니다. 기본값은 False입니다.
            smart_crops_aspect_ratios (Optional[str], optional): 'smartCrops' 기능 사용 시, 
                                                                원하는 종횡비를 쉼표로 구분된 문자열로 지정합니다. 
                                                                예: "1.0,1.5". 기본값은 None입니다.

        Returns:
            Dict[str, Any]: 이미지 분석 결과를 담고 있는 딕셔너리(JSON 형태)입니다.
        
        Raises:
            requests.exceptions.HTTPError: API 호출이 실패했을 때(예: 404 Not Found, 401 Unauthorized) 발생하는 예외입니다.
        """
        # --- 1. 이미지 소스 유형 확인 ---
        # `image_source` 문자열이 'http://' 또는 'https://'로 시작하는지 확인하여 URL 여부를 판단합니다.
        is_url = image_source.startswith("http://") or image_source.startswith(
            "https://"
        )

        # --- 2. API 요청 정보 준비 ---
        # 실제 API가 호출될 전체 URL 주소를 구성합니다.
        analyze_url = f"{self.endpoint}/computervision/imageanalysis:analyze"
        
        # HTTP 요청 헤더: API가 요청을 이해하고 인증하는 데 필요한 추가 정보입니다.
        headers = {
            "Ocp-Apim-Subscription-Key": self.api_key,  # API 키를 헤더에 포함하여 인증합니다.
        }

        # URL 쿼리 파라미터: API의 동작을 제어하는 옵션들입니다.
        params = {
            "features": ",".join(features),  # ['tags', 'caption'] -> 'tags,caption'
            "language": language,
            "gender-neutral-caption": str(gender_neutral_caption).lower(), # True -> 'true'
            "api-version": "2024-02-01",  # 사용할 API의 버전을 명시합니다.
        }
        
        # 스마트 크롭 종횡비가 지정된 경우에만 파라미터에 추가합니다.
        if "smartCrops" in features and smart_crops_aspect_ratios:
            params["smartcrops-aspect-ratios"] = smart_crops_aspect_ratios

        # --- 3. API 요청 실행 ---
        if is_url:
            # 이미지가 URL인 경우:
            # Content-Type을 'application/json'으로 설정하고,
            # 요청 본문(body)에 JSON 형식으로 이미지 URL을 전달합니다.
            headers["Content-Type"] = "application/json"
            json_data = {"url": image_source}
            response = requests.post(
                analyze_url, headers=headers, params=params, json=json_data
            )
        else:
            # 이미지가 로컬 파일인 경우:
            # Content-Type을 'application/octet-stream'으로 설정하여 이진 파일 데이터임을 알립니다.
            headers["Content-Type"] = "application/octet-stream"
            # `with open(...)` 구문을 사용하여 파일을 안전하게 열고, 'rb' 모드로 파일 내용을 바이트(bytes)로 읽습니다.
            with open(image_source, "rb") as f:
                image_data = f.read()
            # 읽어온 이미지 데이터를 요청 본문으로 전달합니다.
            response = requests.post(
                analyze_url, headers=headers, params=params, data=image_data
            )

        # --- 4. 결과 반환 ---
        # `raise_for_status()`는 API 응답이 실패(예: 4xx, 5xx 에러)했을 경우 예외를 발생시킵니다.
        # 이를 통해 실패한 요청을 명확하게 처리할 수 있습니다.
        response.raise_for_status()
        
        # 요청이 성공하면, 응답 본문을 JSON(Python 딕셔너리) 형식으로 변환하여 반환합니다.
        return response.json()
