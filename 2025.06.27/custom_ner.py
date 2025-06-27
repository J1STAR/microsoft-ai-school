# 필요한 라이브러리들을 가져옵니다.
import os  # 운영체제와 상호작용하기 위한 모듈
import requests  # HTTP 요청을 보내기 위한 모듈
import time  # 시간 관련 기능을 사용하기 위한 모듈
import json  # JSON 데이터를 다루기 위한 모듈

# .env 파일에서 환경 변수를 로드하기 위한 함수
from dotenv import load_dotenv
# 타입 힌트를 위한 모듈
from typing import Any, Dict, Optional


# .env 파일을 로드하여 환경 변수로 설정합니다.
load_dotenv()

# Azure Custom NER 서비스 접속을 위한 환경 변수들을 가져옵니다.
# 엔드포인트 URL
CUSTOM_NER_ENDPOINT_URL: Optional[str] = os.getenv("AZURE_CUSTOM_NER_ENDPOINT_URL")
# API 키
CUSTOM_NER_API_KEY: Optional[str] = os.getenv("AZURE_CUSTOM_NER_API_KEY")
# 프로젝트 이름
CUSTOM_NER_PROJECT_NAME: Optional[str] = os.getenv("AZURE_CUSTOM_NER_PROJECT_NAME")
# 배포 이름
CUSTOM_NER_DEPLOYMENT_NAME: Optional[str] = os.getenv("AZURE_CUSTOM_NER_DEPLOYMENT_NAME")
# 사용할 API 버전
CUSTOM_NER_API_VERSION: Optional[str] = os.getenv("AZURE_CUSTOM_NER_API_VERSION")


def submit_ner_job(document_text: str) -> Optional[str]:
    """
    Azure AI 언어 서비스에 Custom NER(사용자 지정 명명된 개체 인식) 작업을 제출합니다.

    Args:
        document_text: 분석할 문서의 텍스트입니다.

    Returns:
        작업 상태 및 결과를 확인할 수 있는 URL을 반환합니다. 실패 시 None을 반환합니다.
    """
    # 필수 환경 변수들이 모두 설정되었는지 확인합니다.
    if not all(
        [
            CUSTOM_NER_ENDPOINT_URL,
            CUSTOM_NER_API_KEY,
            CUSTOM_NER_PROJECT_NAME,
            CUSTOM_NER_DEPLOYMENT_NAME,
        ]
    ):
        print("오류: 필수 환경 변수가 설정되지 않았습니다.")
        return None

    # API에 전송할 요청 본문(payload)을 구성합니다.
    job_payload = {
        "displayName": "Extracting entities from loan agreements",  # 작업 표시 이름
        "analysisInput": {
            "documents": [
                {
                    "id": "1",  # 문서 고유 ID
                    "language": "en-us",  # 문서 언어
                    "text": document_text,  # 분석할 텍스트
                },
            ]
        },
        "tasks": [
            {
                "kind": "CustomEntityRecognition",  # 작업 종류
                "taskName": "Entity Recognition",  # 작업 이름
                "parameters": {
                    "projectName": CUSTOM_NER_PROJECT_NAME,  # NER 프로젝트 이름
                    "deploymentName": CUSTOM_NER_DEPLOYMENT_NAME,  # 배포 이름
                },
            }
        ],
    }

    # HTTP 요청 헤더를 설정합니다.
    headers = {
        "Content-Type": "application/json",  # 요청 본문의 타입
        "Ocp-Apim-Subscription-Key": CUSTOM_NER_API_KEY,  # API 구독 키
    }

    # API 요청 URL을 생성합니다.
    url = f"{CUSTOM_NER_ENDPOINT_URL}/language/analyze-text/jobs?api-version={CUSTOM_NER_API_VERSION}"

    # POST 요청을 보내 NER 작업을 제출합니다.
    response = requests.post(url, headers=headers, json=job_payload)

    # 응답 상태 코드가 202 (Accepted)이면, 작업 상태를 확인할 수 있는 URL을 반환합니다.
    if response.status_code == 202:
        return response.headers.get("operation-location")
    # 작업 제출에 실패하면 오류 메시지를 출력합니다.
    else:
        print(f"작업 제출 오류: {response.status_code} - {response.text}")
        return None


def get_ner_result(job_url: str) -> Optional[Dict[str, Any]]:
    """
    주기적으로 작업 URL을 폴링하여 Custom NER 작업의 결과를 가져옵니다.

    Args:
        job_url: 작업 상태를 폴링할 URL입니다.

    Returns:
        작업의 JSON 결과를 반환합니다. 실패 시 None을 반환합니다.
    """
    # API 키가 설정되었는지 확인합니다.
    if not CUSTOM_NER_API_KEY:
        print("오류: AZURE_CUSTOM_NER_API_KEY가 설정되지 않았습니다.")
        return None

    # HTTP 요청 헤더를 설정합니다.
    headers = {"Ocp-Apim-Subscription-Key": CUSTOM_NER_API_KEY}
    
    # 작업이 완료될 때까지 무한 루프를 돕니다.
    while True:
        # GET 요청으로 작업 상태를 조회합니다.
        response = requests.get(job_url, headers=headers)
        # 응답이 정상이면
        if response.status_code == 200:
            result = response.json()
            status = result.get("status")
            print(f"작업 상태: {status}")
            # 작업이 성공적으로 완료되면 결과를 반환합니다.
            if status == "succeeded":
                return result
            # 작업이 실패하거나 취소되면 루프를 중단하고 None을 반환합니다.
            else:
                print(f"작업이 실패했거나 취소되었습니다: {result}")
                return None
            # 작업이 아직 실행 중이면 2초 대기 후 다시 폴링합니다.
            time.sleep(2)
        # 상태 조회에 실패하면 오류 메시지를 출력합니다.
        else:
            print(f"결과 가져오기 오류: {response.status_code} - {response.text}")
            return None


# 이 스크립트가 직접 실행될 때만 아래 코드를 실행합니다.
if __name__ == "__main__":
    try:
        # 분석할 파일의 경로를 설정합니다.
        file_path = os.path.join(
            os.path.dirname(__file__), "data", "LoanAgreements", "Test 1.txt"
        )
        # 파일을 UTF-8 인코딩으로 엽니다.
        with open(file_path, "r", encoding="utf-8") as f:
            # 파일 내용을 읽어옵니다.
            document_content = f.read()

        # NER 작업을 제출하고 작업 URL을 받습니다.
        job_url = submit_ner_job(document_content)

        # 작업 URL을 성공적으로 받았다면,
        if job_url:
            print(f"작업이 제출되었습니다. 결과 폴링 주소: {job_url}")
            # 작업 결과를 가져옵니다.
            ner_results = get_ner_result(job_url)
            # 결과가 있으면 예쁘게 출력합니다.
            if ner_results:
                print("\n--- NER 결과 ---")
                print(json.dumps(ner_results, indent=2))
                print("--- 결과 끝 ---")

    # 파일을 찾을 수 없을 때 예외 처리를 합니다.
    except FileNotFoundError:
        print(f"오류: {file_path}에서 파일을 찾을 수 없습니다.")
    # 그 외 다른 예외가 발생했을 때 처리합니다.
    except Exception as e:
        print(f"예상치 못한 오류가 발생했습니다: {e}") 