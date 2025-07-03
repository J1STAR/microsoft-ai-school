### 📂 GitHub에서 보기: [microsoft-ai-school/2025.06.25](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.06.25)

# 📅 2025년 6월 25일: Azure AI Document Intelligence를 활용한 문서 분석 🧠

이 디렉토리의 학습 목표는 **Azure AI Document Intelligence** 서비스를 사용하여 이미지나 PDF와 같은 다양한 문서에서 텍스트와 구조를 추출하는 방법을 배우는 것입니다. `document_intelligence.py` 스크립트와 `document_intelligence.http` 파일을 통해 서비스의 핵심 기능을 실습합니다.

## 🎯 주요 학습 목표

-   **Azure AI Document Intelligence 연동**: Python 스크립트(`requests`)를 사용하여 Document Intelligence REST API에 요청을 보내고 응답을 받는 방법을 학습합니다.
-   **비동기 API 처리**: 분석 요청 후 `operation-location` 헤더를 받아, 작업이 완료될 때까지 폴링(polling)하여 최종 결과를 가져오는 비동기 처리 방식을 구현합니다.
-   **다양한 사전 빌드 모델 활용**: 여러 종류의 사전 빌드 모델(Prebuilt Models)을 사용하여 목적에 맞는 정보를 추출하는 방법을 익힙니다.
-   **REST API 테스트**: `.http` 파일을 사용하여 Visual Studio Code의 REST Client 확장 기능 등으로 직접 API를 테스트하고 응답을 확인합니다.
-   **환경 변수를 사용한 보안**: `python-dotenv` 라이브러리를 사용하여 API 키와 엔드포인트 같은 민감한 정보를 소스 코드에서 분리하고 안전하게 관리합니다.

## 🛠️ 활용 기술 및 파일 구성

| 파일명                         | 설명                                                                                                                              |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `document_intelligence.py`     | Document Intelligence API와 상호작용하여 문서 분석을 요청하고 결과를 받아오는 Python 스크립트입니다.                               |
| `document_intelligence.http`   | 다양한 사전 빌드 모델을 대상으로 API 요청을 테스트하기 위한 HTTP 요청 모음 파일입니다. (VS Code REST Client 확장 기능 사용) |
| `README.md`                    | 이 파일. 학습 내용과 목표를 요약합니다.                                                                                            |

### 🤖 사용된 사전 빌드 모델 (Prebuilt Models)

-   **`prebuilt-read`**: 문서에서 텍스트를 추출 (OCR 기능)
-   **`prebuilt-layout`**: 텍스트와 함께 테이블, 선택 표시 등 문서의 레이아웃 정보 추출
-   **`prebuilt-document`**: 키-값 쌍, 엔터티 등 일반적인 문서의 구조 분석
-   **`prebuilt-creditCard`**: 신용카드에서 카드번호, 유효기간 등 정형화된 정보 추출

### 엿보기: Python 코드 일부 (`document_intelligence.py`)

```python
// ... (imports and setup) ...

def analyze_document(
    data: str | bytes,
    service: str,
    model: str,
    api_version: str,
    content_type: str = "application/json",
) -> str | None:
    """Analyze a document with Azure Document Intelligence."""
    # ... (API request logic) ...
    response = requests.post(
        f"{DOCUEMNT_INTELLIGENCE_ENDPOINT_URL}/{service}/documentModels/{model}:analyze",
        **post_kwargs,
    )
    return response.headers.get("operation-location")


def get_analyze_result(operation_location: str):
    """Get the result of the analysis."""
    # ... (Polling logic to get the final result) ...
    while response_json.get("status") == "running":
        time.sleep(1)
        response_json = request_result()
    return response_json

// ... (main execution block) ...
```

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact
<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items:center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>j.1star.0726@gmail.com</a>