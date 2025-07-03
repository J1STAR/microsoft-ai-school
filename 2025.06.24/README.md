### [microsoft-ai-school/2025.06.24](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.06.24)

# 2025년 6월 24일 학습 기록

이 디렉토리는 `Azure OpenAI Service`의 다양한 기능을 통합하고, `Gradio`를 사용하여 상호작용 가능한 웹 UI를 구축하는 복합적인 애플리케이션 개발 프로젝트를 담고 있습니다. 주요 기능은 다음과 같습니다.

- **범용 챗봇**: 기본적인 대화 기능.
- **이미지 생성**: DALL-E 모델을 활용한 이미지 생성.
- **웹 검색 연동 챗봇**: `Function Calling`을 통해 실시간 웹 검색(`DuckDuckGo`) 결과를 반영하는 RAG(검색 증강 생성) 기능.
- **자체 데이터 연동 챗봇**: `Azure AI Search`에 인덱싱된 특정 문서(일본 여행 브로슈어)를 기반으로 답변하는 RAG 기능.

## 📝 프로젝트 구조 및 학습 내용

- **`main.py`**:
  - `Gradio` 라이브러리를 사용하여 프로젝트의 프론트엔드를 구성합니다.
  - "채팅", "이미지 생성", "텍스트 검색", "일본 여행 정보"의 4가지 탭으로 UI를 분리하여 각 기능을 모듈화합니다.
  - 모든 사용자 요청은 `OpenAIService` 클래스의 해당 메소드로 전달됩니다.

- **`services/openai_service.py`**:
  - 애플리케이션의 백엔드 로직을 담당하는 핵심 서비스 클래스입니다.
  - **`chat()`**: 기본적인 채팅 응답을 처리합니다.
  - **`generate_image()`**: Azure의 DALL-E 엔드포인트를 호출하여 프롬프트에 맞는 이미지를 생성합니다.
  - **`search()`**: 사용자의 질문을 받아 `duckduckgo` 검색 함수를 호출하는 `tool`로 지정하여 `Function Calling`을 수행합니다. LLM이 웹 검색 결과를 바탕으로 답변을 생성하도록 유도합니다.
  - **`japan_travel()`**: Azure AI Search를 `data_sources`로 지정하여 API를 호출합니다. 이를 통해 사용자의 질문과 관련된 내용을 자체 데이터베이스에서 검색하고, 이 정보를 바탕으로 답변을 생성하는 RAG 파이프라인을 구현합니다.

- **`utils/`**:
  - `duckduckgo.py`: 웹 검색을 수행하는 래퍼(wrapper) 함수를 포함합니다.
  - `japan_travel_brochures_downloader.py`: RAG의 기반이 되는 일본 여행 관련 PDF 문서를 다운로드하는 스크립트를 포함합니다.

## 📁 파일 목록

```
2025.06.24/
├── main.py
├── services/
│   └── openai_service.py
└── utils/
    ├── duckduckgo.py
    └── japan_travel_brochures_downloader.py
```

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="mailto:j.1star.0726@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/></a>
<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a> 