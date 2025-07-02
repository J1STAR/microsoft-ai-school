# -*- coding: utf-8 -*-
"""
이 스크립트는 Azure AI Face 서비스와 상호작용하기 위한 `FaceService` 클래스를 정의합니다.

이 클래스는 Azure의 얼굴 감지 및 분석 기능을 쉽게 사용할 수 있도록 캡슐화합니다.
개발자는 이 클래스를 사용하여 이미지 속 얼굴의 위치, 특징점, 각종 속성(나이, 감정 등)을
간단한 메서드 호출만으로 얻을 수 있습니다.
"""

# 표준 라이브러리
import os
from typing import Any, Dict, List, Optional

# 서드파티 라이브러리
import requests
from dotenv import load_dotenv

# .env 파일에서 환경 변수 로드
load_dotenv()


class FaceService:
    """
    Azure AI Face 서비스와의 통신을 담당하는 서비스 클래스입니다.
    """

    def __init__(self) -> None:
        """
        `FaceService` 클래스의 새 인스턴스를 초기화합니다.

        .env 파일에서 Face 서비스 연결에 필요한 엔드포인트 URL과 API 키를 읽어
        인스턴스 변수에 저장합니다.
        """
        self.endpoint = os.getenv("AZURE_FACE_ENDPOINT_URL")
        self.api_key = os.getenv("AZURE_FACE_API_KEY")

        if not self.endpoint or not self.api_key:
            raise ValueError(
                "AZURE_FACE_ENDPOINT_URL 및 AZURE_FACE_API_KEY 환경 변수를 설정해야 합니다."
            )

    def detect_faces(
        self,
        image_source: str,
        return_face_id: bool = False,
        return_face_landmarks: bool = True,
        return_face_attributes: Optional[List[str]] = None,
        recognition_model: str = "recognition_04",
        return_recognition_model: bool = False,
        detection_model: str = "detection_03",
        face_id_time_to_live: int = 86400,
    ) -> List[Dict[str, Any]]:
        """
        지정된 이미지(URL 또는 로컬 파일)에서 얼굴을 감지하고 분석합니다.

        Args:
            image_source (str): 분석할 이미지의 웹 URL 또는 로컬 파일 경로입니다.
            return_face_id (bool): 감지된 얼굴마다 고유 ID를 반환할지 여부입니다. 기본값은 False입니다.
            return_face_landmarks (bool): 눈, 코, 입 등의 랜드마크 좌표를 반환할지 여부입니다. 기본값은 True입니다.
            return_face_attributes (Optional[List[str]]): 추출할 얼굴 속성 목록입니다. 
                                                          예: ["age", "gender", "smile", "mask"]. 기본값은 None입니다.
            recognition_model (str): 얼굴 인식에 사용할 모델 버전입니다. 기본값은 'recognition_04'입니다.
            return_recognition_model (bool): 응답에 사용된 인식 모델 정보를 포함할지 여부입니다. 기본값은 False입니다.
            detection_model (str): 얼굴 감지에 사용할 모델 버전입니다. 기본값은 'detection_03'입니다.
            face_id_time_to_live (int): 반환된 얼굴 ID가 캐시에서 유지되는 시간(초)입니다. 기본값은 86400 (24시간)입니다.

        Returns:
            List[Dict[str, Any]]: 감지된 각 얼굴에 대한 분석 정보를 담은 딕셔너리의 리스트입니다.
                                  감지된 얼굴이 없으면 빈 리스트를 반환합니다.
        
        Raises:
            requests.exceptions.HTTPError: API 호출이 실패했을 때 발생하는 예외입니다.
        """
        # --- 1. 이미지 소스 유형 확인 ---
        is_url = image_source.startswith("http://") or image_source.startswith(
            "https://"
        )

        # --- 2. API 요청 정보 준비 ---
        detect_url = f"{self.endpoint}/face/v1.0/detect"

        headers = {
            "Ocp-Apim-Subscription-Key": self.api_key,
        }

        # API 동작을 제어하는 쿼리 파라미터를 구성합니다.
        params = {
            "returnFaceId": str(return_face_id).lower(),
            "returnFaceLandmarks": str(return_face_landmarks).lower(),
            "recognitionModel": recognition_model,
            "returnRecognitionModel": str(return_recognition_model).lower(),
            "detectionModel": detection_model,
            "faceIdTimeToLive": face_id_time_to_live,
        }
        # 분석할 얼굴 속성 목록이 주어진 경우, 콤마로 구분된 문자열로 변환하여 파라미터에 추가합니다.
        if return_face_attributes:
            params["returnFaceAttributes"] = ",".join(return_face_attributes)

        # --- 3. API 요청 실행 ---
        if is_url:
            # 이미지가 URL인 경우, JSON 형식으로 URL을 전달합니다.
            headers["Content-Type"] = "application/json"
            json_data = {"url": image_source}
            response = requests.post(
                detect_url, headers=headers, params=params, json=json_data
            )
        else:
            # 이미지가 로컬 파일인 경우, 파일 데이터를 이진 스트림으로 전달합니다.
            headers["Content-Type"] = "application/octet-stream"
            with open(image_source, "rb") as f:
                image_data = f.read()
            response = requests.post(
                detect_url, headers=headers, params=params, data=image_data
            )

        # --- 4. 결과 반환 ---
        # API 응답 상태를 확인하고, 실패 시 예외를 발생시킵니다.
        response.raise_for_status()
        # 성공 시, JSON 응답을 파이썬 리스트/딕셔너리 형태로 변환하여 반환합니다.
        return response.json()
