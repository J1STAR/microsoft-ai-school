# 🚀 Microsoft AI School - 학습 기록

이 저장소는 Microsoft AI School 과정에 참여하며 **Python 기초부터 시작해 데이터 분석, 머신러닝, 딥러닝, 그리고 최신 Azure AI 서비스를 활용한 AI 애플리케이션 개발까지**의 전 과정을 기록한 개인 학습 아카이브입니다. 각 날짜별 디렉터리는 하나의 독립된 학습 주제를 다루고 있으며, 상세한 설명과 코드를 포함하고 있습니다.

---

## 🚀 시작하기 전에: 필수 환경 설정

이 프로젝트의 일부, 특히 Azure AI 서비스를 사용하는 실습 코드를 실행하기 위해서는 API 키와 같은 민감한 정보를 담은 `.env` 파일이 필요합니다. 아래 안내에 따라 프로젝트를 실행할 환경을 먼저 설정해주세요.

`.env` 파일은 GitHub와 같은 공개된 장소에 올리면 안 되므로, 이 저장소의 `.gitignore` 파일에 이미 등록되어 있습니다.

### 1. `.env` 파일 생성

프로젝트 루트 디렉토리(이 `README.md` 파일이 있는 위치)에 `.env` 라는 이름으로 새 파일을 만들고, 필요한 서비스에 맞춰 아래 내용을 복사하여 붙여넣으세요. `여기에...` 부분은 실제 자신의 Azure 서비스에서 발급받은 값으로 반드시 대체해야 합니다.

```env
# 예시: 2025.06.25, 2025.06.26 실습에서 사용된 환경 변수

# Azure AI Document Intelligence
DOCUEMNT_INTELLIGENCE_ENDPOINT_URL="여기에_Document_Intelligence_엔드포인트_URL_입력"
DOCUEMNT_INTELLIGENCE_API_KEY="여기에_Document_Intelligence_API_키_입력"

# Azure AI Language Service
AZURE_LANGUAGE_ENDPOINT_URL="여기에_Language_서비스_엔드포인트_URL_입력"
AZURE_LANGUAGE_API_KEY="여기에_Language_서비스_API_키_입력"
```

### 2. Python 코드에서 사용법

Python 코드에서는 `python-dotenv` 라이브러리를 사용하여 `.env` 파일에 정의된 값들을 환경 변수로 불러옵니다.

먼저, 터미널에서 아래 명령어를 실행하여 라이브러리를 설치합니다.
```bash
pip install python-dotenv
```

그 다음, Python 코드의 시작 부분에서 `load_dotenv()`를 호출하면, `os.getenv()`를 통해 `.env` 파일에 정의된 값을 가져와 사용할 수 있습니다.

```python
# 예시: 2025.06.25/document_intelligence.py
import os
from dotenv import load_dotenv

# .env 파일에서 환경 변수를 로드합니다.
load_dotenv()

# os.getenv()를 사용하여 환경 변수 값을 가져옵니다.
DOCUEMNT_INTELLIGENCE_ENDPOINT_URL = os.getenv("DOCUEMNT_INTELLIGENCE_ENDPOINT_URL")
DOCUEMNT_INTELLIGENCE_API_KEY = os.getenv("DOCUEMNT_INTELLIGENCE_API_KEY")

# 이제 코드 내에서 변수들을 사용할 수 있습니다.
# ...
```

---

## 🗺️ 학습 로드맵

아래 표는 전체 학습 과정을 요약한 로드맵입니다. 각 날짜를 클릭하면 해당 학습 내용을 상세히 확인할 수 있습니다.

| 날짜 | 주요 학습 내용 | 핵심 기술/라이브러리 |
| :--- | :--- | :--- |
| foundational-python | 
| [2025.04.09](./2025.04.09/) | HTML 기본 태그 및 Python 개발 환경 설정 | `HTML`, `Python` |
| [2025.04.10](./2025.04.10/) | Python 기초 문법: 자료형, 변수, 연산자 | `Python` |
| [2025.04.11](./2025.04.11/) | Python 제어문: 조건문(if), 반복문(for, while) | `Python` |
| [2025.04.14](./2025.04.14/) | Python 자료구조(튜플, 세트, 딕셔너리) 및 코드 모듈화 | `Python` |
| data-analysis | 
| [2025.04.16](./2025.04.16/) | **[Pandas]** `Pandas`를 활용한 데이터 분석 입문 (달 탐사 미션) | `Pandas`, `Matplotlib` |
| [2025.04.17](./2025.04.17/) | **[Pandas]** 여러 데이터 소스 병합 및 통합 분석 (유성우 미션) | `Pandas` |
| [2025.04.18](./2025.04.18/) | **[Pandas]** 대용량 분할 데이터 처리 및 시각화 (따릉이 미션) | `Pandas`, `Seaborn` |
| [2025.04.30](./2025.04.30/) | 데이터 과학 관련 다양한 학습 자료 모음 (데이터 전처리, Custom Vision 등) | `Pandas`, `Scikit-learn` |
| machine-learning | 
| [2025.05.08](./2025.05.08/) | **[CV]** `OpenCV`를 활용한 컴퓨터 비전 기초: 이미지 입출력, 도형 그리기 | `OpenCV`, `Numpy` |
| [2025.05.15](./2025.05.15/) | **[ML]** 머신러닝 **회귀**: 선형/다항 회귀, 규제(Ridge, Lasso), 파이프라인 | `Scikit-learn`, `Statsmodels` |
| [2025.05.16](./2025.05.16/) | **[ML]** 머신러닝 **분류**: 교차 검증, GridSearchCV, 랜덤 포레스트 | `Scikit-learn` |
| [2025.05.19](./2025.05.19/) | **[Crawling & ML]** `BeautifulSoup`을 이용한 정적 웹 크롤링 및 K-Means 군집화 | `BeautifulSoup`, `Scikit-learn` |
| [2025.05.20](./2025.05.20/) | **[Crawling & NLP]** `Selenium`을 이용한 동적 웹 크롤링 및 OpenAPI 활용, 기초 자연어 처리 | `Selenium`, `WordCloud` |
| deep-learning | 
| [2025.05.21](./2025.05.21/) | **[DL]** "밑바닥부터 시작하는 딥러닝" 실습: `NumPy`로 신경망, CNN 구현 | `Numpy`, `Matplotlib` |
| [2025.05.27](./2025.05.27/) | **[DL]** 이미지 분류 프로젝트: `TensorFlow`와 **전이 학습(Transfer Learning)** 활용 | `TensorFlow`, `Keras` |
| [2025.05.28](./2025.05.28/) | **[Deployment]** `Gradio`를 활용한 머신러닝 모델 데모 웹 앱 제작 | `Gradio` |
| azure-ai-services | 
| [2025.06.18](./2025.06.18/) | **[Azure AI]** `Azure OpenAI Service` 기반 지능형 앱 개발 입문, RAG 개념 소개 | `Azure OpenAI` |
| [2025.06.19](./2025.06.19/) | **[Azure AI]** Azure OpenAI 심화: 프롬프트 엔지니어링, DALL-E, RAG 시스템 구축 | `Azure OpenAI`, `DALL-E` |
| [2025.06.23](./2025.06.23/) | **[OpenAI API]** RAG 시스템 직접 구축, Function Calling, 음성 API(Whisper, TTS) 활용 | `OpenAI API`, `Whisper`, `TTS` |
| azure-ai-services-advanced | 
| [2025.06.24](./2025.06.24/) | **[Project]** `Gradio`와 `Azure OpenAI`를 결합한 다기능(채팅, 이미지, RAG) AI 앱 개발 | `Gradio`, `Azure OpenAI` |
| [2025.06.25](./2025.06.25/) | **[Project]** `Azure Document Intelligence` REST API를 활용한 OCR 및 문서 분석 | `Azure AI Services` |
| [2025.06.26](./2025.06.26/) | **[Project]** `Document Intelligence`와 `Gradio`를 결합한 OCR 앱 및 **AI 언어 서비스** 활용 | `Gradio`, `Azure AI Services` |
