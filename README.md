# 🚀 Microsoft AI School - 학습 기록

이 저장소는 Microsoft AI School 과정에 참여하며 **Python 기초부터 시작해 데이터 분석, 머신러닝, 딥러닝, 그리고 최신 Azure AI 서비스를 활용한 AI 애플리케이션 개발까지**의 전 과정을 기록한 개인 학습 아카이브입니다. 각 날짜별 디렉터리는 하나의 독립된 학습 주제를 다루고 있으며, 상세한 설명과 코드를 포함하고 있습니다.

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact
<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items:center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>&nbsp;j.1star.0726@gmail.com</a>

---

## 🚀 시작하기 전에: 개발 환경 설정

이 프로젝트의 코드를 원활하게 실행하기 위해서는 아래 3단계에 따라 개발 환경을 설정하는 것이 좋습니다.

1.  **[런타임 관리]** `mise`를 사용하여 올바른 버전의 Python을 설치하고 활성화합니다.
2.  **[의존성 관리]** `uv`를 사용하여 프로젝트에 필요한 파이썬 패키지들을 설치합니다.
3.  **[환경 변수 설정]** `.env` 파일을 생성하여 Azure 서비스 API 키 등 민감한 정보를 설정합니다.

---

### 1. 📦 런타임 환경 관리 (mise)

이 프로젝트는 특정 버전의 Python(예: 3.12.9)에서 실행되도록 구성되어 있습니다. 여러 프로젝트를 진행하다 보면 각기 다른 버전의 Python, Node.js 등이 필요할 때가 많습니다. [mise](https://github.com/jdx/mise)는 이러한 다양한 툴들의 버전을 프로젝트별로 손쉽게 관리해주는 도구입니다.

프로젝트 루트 디렉터리의 `.mise.toml` 파일을 읽어, 해당 디렉터리에 들어왔을 때 자동으로 지정된 버전의 Python을 사용하도록 환경을 설정해줍니다. 이를 통해 "내 컴퓨터에서는 되는데, 다른 사람 컴퓨터에서는 안 돼요"와 같은 문제를 방지할 수 있습니다.

#### `mise` 설치

`mise`가 설치되어 있지 않다면, 아래 방법으로 설치합니다.

```bash
# macOS / Linux
curl https://mise.run | sh


# Windows
winget install jdx.mise
# 또는 scoop install mise 또는 choco install mise
```

`mise`가 셸에 올바르게 연동되면, 이 프로젝트 디렉터리로 이동(`cd`)하는 것만으로 `.mise.toml`에 명시된 Python 버전이 자동으로 활성화됩니다.

#### 대체 도구

`mise`와 유사한 기능을 하는 다른 도구들로는 `asdf`, `pyenv`, `nvm` (Node.js 전용) 등이 있습니다.

---

### 2. ⚡️ 의존성 관리 및 실행 환경 (uv)

`mise`를 통해 올바른 Python 버전이 활성화되었다면, 다음으로 [uv](https://github.com/astral-sh/uv)를 사용하여 파이썬 패키지 의존성을 관리합니다. `uv`는 기존의 `pip`과 `venv`를 대체하는 매우 빠른 통합 도구입니다. 모든 의존성은 `pyproject.toml` 파일에 정의되어 있습니다.

#### `uv` 설치

`uv`가 설치되어 있지 않다면, 아래 방법 중 하나로 설치합니다.

```bash
# macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# 또는 pip 사용
pip install uv
```

#### 프로젝트 환경 설정

프로젝트를 실행하기 위한 가상 환경을 만들고 의존성을 설치하는 과정은 다음과 같습니다.

```bash
# 1. 가상 환경 생성 (이름: .venv)
uv venv

# 2. 가상 환경 활성화
# macOS / Linux
source .venv/bin/activate
# Windows
.venv\Scripts\activate

# 3. pyproject.toml 기반으로 의존성 설치
uv pip install -e .
```

`uv pip install -e .` 명령은 `pyproject.toml`에 명시된 모든 의존성을 가상 환경에 설치합니다. 이후 `pyproject.toml`이 변경되면 `uv pip sync`를 실행하여 가상 환경을 최신 상태로 동기화할 수 있습니다.

---

### 3. 🔑 환경 변수 설정 (.env)

마지막으로, Azure AI 서비스를 사용하는 실습 코드를 실행하기 위해 API 키와 같은 민감한 정보를 담은 `.env` 파일을 설정합니다.

`.env` 파일은 GitHub와 같은 공개된 장소에 올리면 안 되므로, 이 저장소의 `.gitignore` 파일에 이미 등록되어 있습니다.

#### `.env` 파일 생성

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

#### Python 코드에서 사용법

Python 코드에서는 `python-dotenv` 라이브러리를 사용하여 `.env` 파일에 정의된 값들을 환경 변수로 불러옵니다. (`uv`로 의존성을 설치했다면 이 라이브러리는 이미 설치되어 있습니다.)

코드의 시작 부분에서 `load_dotenv()`를 호출하면, `os.getenv()`를 통해 `.env` 파일에 정의된 값을 가져와 사용할 수 있습니다.

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
| [2025.05.28](./2025.05.28/) | **[Azure Custom Vision & Gradio]** `Azure Custom Vision` 모델을 `Gradio`로 데모 UI 제작 | `Gradio`, `Azure AI Services` |
| Team Projects - First |
| 2025.05.30 ~ 2025.06.13 | **[Project] 세션 기반 상품 추천 시스템 (Mercari)**<br/>- **추천 모델**: `PyTorch`와 `GRU`를 사용한 딥러닝 모델 개발 ([GRU4Rec-Mercari](https://github.com/7-MSAI-7/GRU4Rec-Mercari))<br/>- **API 서버**: 학습된 모델을 `FastAPI`로 서빙하는 API 구축 ([mercari-recommender-backend](https://github.com/7-MSAI-7/mercari-recommender-backend)) | `PyTorch`, `GRU`, `Sentence-Transformers`, `FastAPI` |
| azure-ai-services | 
| [2025.06.18](./2025.06.18/) | **[Azure OpenAI]** `Azure OpenAI Service` 기반 지능형 앱 개발 입문, RAG 개념 소개 | `Azure OpenAI` |
| [2025.06.19](./2025.06.19/) | **[Azure OpenAI]** Azure OpenAI 심화: 프롬프트 엔지니어링, DALL-E, RAG 시스템 구축 | `Azure OpenAI`, `DALL-E` |
| [2025.06.23](./2025.06.23/) | **[Azure OpenAI]** RAG 시스템 직접 구축, Function Calling, 음성 API(Whisper, TTS) 활용 | `Azure OpenAI`, `Whisper`, `TTS` |
| azure-ai-services-advanced | 
| [2025.06.24](./2025.06.24/) | **[Gradio & RAG]** `Gradio`와 `Azure OpenAI`를 결합한 다기능(채팅, 이미지, RAG) AI 앱 개발 | `Gradio`, `Azure OpenAI` |
| [2025.06.25](./2025.06.25/) | **[Azure Document Intelligence]** `Azure Document Intelligence` REST API를 활용한 OCR 및 문서 분석 | `Azure AI Services` |
| [2025.06.26](./2025.06.26/) | **[Gradio & Document Intelligence]** `Document Intelligence`와 `Gradio`를 결합한 OCR 앱 및 **AI 언어 서비스** 활용 | `Gradio`, `Azure AI Services` |
| [2025.06.27](./2025.06.27/) | **[Azure AI Language & Custom NER]** `Azure Speech`(STT/TTS) 및 `Custom NER`을 활용한 대화형 AI 개발 | `Gradio`, `Azure AI Services` |
| [2025.06.30](./2025.06.30/) | **[Gradio & Azure AI Speech]** `Gradio`와 `Azure OpenAI`를 활용한 다중 모드 AI 챗봇 개발 | `Gradio`, `Azure OpenAI`, `STT/TTS` |
| [2025.07.02](./2025.07.02/) | **[Azure AI Vision & Face]** `Azure Vision & Face` API를 활용한 이미지 분석 앱 기반 구축 | `Gradio`, `Azure AI Services` |
| [2025.07.03](./2025.07.02/) | **[Azure AI Vision & Face]** 이미지 분석 앱 UX 고도화: 동적 UI 및 `Pillow` 결과 처리 | `Gradio`, `Pillow` |
| [2025.07.04](./2025.07.04/) | **[Azure Custom Vision SDK]** `Azure Custom Vision` SDK를 활용한 객체 탐지 모델 구축 자동화 | `Azure Custom Vision`, `Pillow` |
| [2025.07.07](./2025.07.07/) | **[OpenCV & YOLOv3]** `OpenCV`와 `YOLO`(v3)를 활용한 실시간 객체 탐지 웹 앱 | `Gradio`, `OpenCV`, `YOLO` |
| [2025.07.08](./2025.07.08/) | **[YOLOv8 & GPT-4o Vision]** `Gradio`, `YOLO`(v8), `Azure OpenAI`를 결합한 멀티모달 AI 앱 | `Gradio`, `Azure OpenAI`, `YOLO` |
| Web Frontend | 
| [2025.07.09](./2025.07.09/) | **[HTML, CSS]** HTML 기초 학습 및 시맨틱 마크업을 활용한 이력서 페이지 제작 | `HTML`, `CSS` |
| [2025.07.10](./2025.07.10/) | **[HTML, CSS]** HTML5 시맨틱 태그, 고급 표, 미디어 요소를 활용한 웹 페이지 레이아웃 설계 | `HTML`, `CSS` |
| [2025.07.11](./2025.07.11/) | **[JavaScript, TypeScript]** JavaScript(호이스팅, 프로토타입, 모듈) 및 TypeScript(기본 타입, 제네릭, 인터페이스) 핵심 개념 | `JavaScript`, `TypeScript` |
| [2025.07.14](./2025.07.14/) | **[JavaScript]** DOM 조작 및 이벤트, 비동기(콜백, Promise, async/await), 웹 API(Storage, WebSocket, SSE) | `JavaScript`, `DOM`, `Async`, `Storage`, `Network` |
| [2025.07.15](./2025.07.15/) | **[JavaScript]** ES6+ 고급 문법(구조 분해, Spread/Rest), 계층형 모듈 설계, 미니 프로젝트(Todo, 가위바위보) | `JavaScript`, `Design Pattern` |
| Team Project - Second |
| 2025.07.16 ~ 2025.07.29 | **[Project] AI 뉴스 트렌드 분석 및 챗봇 서비스 (News GPT)**<br/>- **프론트엔드**: `Remix`와 `TypeScript`를 활용한 뉴스 분석 대시보드 개발 ([news-gpt-frontend](https://github.com/J1STAR/news-gpt-frontend))<br/>- **백엔드**: 뉴스 수집, 키워드 추출, `GPT-4o` 기반 분석 및 챗봇 API 서버 구축 ([news_gpt_v2](https://github.com/nnfct/news_gpt_v2)) | `Remix`, `TypeScript`, `FastAPI`, `Azure OpenAI` |
| Web Application Development | 
| [2025.07.31 ~ 2025.08.07](./2025.07.31/) | **[React Native, Django]** `React Native`와 `Django`를 활용한 풀스택 뉴스 앱 개발 | `React Native`, `Django` |
| Team Project - Third |
| [2025.08.27](./2025.08.27/) | **[Django, DRF]** `ares-backend` 프로젝트 설계: 개발 환경 표준화, 보안 및 확장성 높은 아키텍처 구축 | `Django`, `DRF`, `mise`, `uv`, `dotenvx` |
| [2025.08.28](./2025.08.28/) | **[React Native, Expo]** `ares-frontend` 프로젝트 설계: 개발 환경 표준화, 아키텍처 구축 | `React Native`, `Expo`, `mise`, `yarn` |
| [2025.09.03](./2025.09.03/) | **[Django, React Native]** `ares` 인증 시스템 구축: JWT 기반 `Django` 백엔드 API와 `React Native` 프론트엔드 연동 및 상태 관리 리팩토링 | `Django`, `DRF`, `simple-jwt`, `React Native`, `Zustand` |
