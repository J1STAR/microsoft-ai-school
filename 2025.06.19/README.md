### 📂 GitHub에서 보기: [microsoft-ai-school/2025.06.19](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.06.19)

# 2025년 6월 19일 학습 기록: Azure OpenAI Service 기능 심화

이 디렉토리는 전날에 이어, **Azure OpenAI Service**가 제공하는 다양한 고급 기능들을 심도 있게 다루는 워크샵 실습 자료를 포함하고 있습니다. 기본적인 텍스트 생성을 넘어, 프롬프트 엔지니어링, 코드 및 이미지 생성, 그리고 자체 데이터 연동(RAG)까지 LLM의 활용 범위를 넓히는 것을 목표로 합니다.

## 📝 학습 내용 요약

- **프롬프트 엔지니어링 심화 (`03-prompt-engineering`)**:
    - 원하는 결과를 더 정확하고 일관되게 얻기 위해 프롬프트를 구조화하고, 역할 부여, 예제 제공(Few-shot Learning), 단계별 사고(Chain of Thought) 등의 고급 프롬프트 엔지니어링 기법을 학습합니다.
- **코드 생성 (`04-code-generation`)**:
    - 자연어 주석이나 요구사항을 바탕으로 특정 기능을 수행하는 Python 또는 C# 코드를 생성하는 실습을 진행합니다.
    - 기존 코드에 대한 설명을 생성하거나, 코드를 리팩토링하고, 버그를 찾는 등 개발 생산성을 높이는 다양한 활용 사례를 탐색합니다.
- **이미지 생성 (`05-image-generation`)**:
    - **DALL-E 모델**을 사용하여 "푸른 하늘을 나는 우주비행사 고양이"와 같은 텍스트 설명(프롬프트)으로부터 고품질의 이미지를 생성하는 원리와 방법을 학습합니다.
    - `dall-e.ipynb` 노트북을 통해 API를 호출하고, 생성된 이미지를 확인하는 과정을 실습합니다.
- **자체 데이터 활용 - RAG (`02-use-own-data`, `06-use-own-data`)**:
    - 전날에 이어 **검색 증강 생성(RAG)** 아키텍처를 반복적으로 실습합니다.
    - PDF 형식의 여행 브로슈어(`data/` 디렉토리)와 같은 비정형 데이터를 Azure Cognitive Search에 인덱싱하고, 이를 Azure OpenAI 모델과 연결합니다.
    - 이를 통해 "두바이 여행 상품에 대해 알려줘"와 같은 질문에 대해, 일반적인 정보가 아닌 업로드된 PDF 파일의 내용을 기반으로 정확한 답변을 생성하는 챗봇을 구축합니다.

## 📁 디렉토리 구조 (요약)

```
2025.06.19/
└── Labfiles/
    ├── 02-azure-openai-api/
    ├── 02-use-own-data/
    │   └── data/
    │       └── *.pdf
    ├── 03-prompt-engineering/
    ├── 04-code-generation/
    ├── 05-image-generation/
    │   ├── dall-e.ipynb
    │   └── dalle_generated_*.png
    └── 06-use-own-data/
```

## 💡 주요 학습 기술

- **핵심 서비스**: `Azure OpenAI Service (GPT models, DALL-E)`, `Azure Cognitive Search`
- **핵심 라이브러리**: `openai` (Python SDK)
- **핵심 개념**:
    - 프롬프트 엔지니어링 (Prompt Engineering)
    - 인메모리 컨텍스트 학습 (In-context Learning)
    - 코드 생성 (Code Generation)
    - 텍스트-투-이미지 생성 (Text-to-Image Generation)
    - 검색 증강 생성 (Retrieval-Augmented Generation, RAG)

이 디렉토리의 자료들은 Azure OpenAI Service의 다재다능한 기능들을 활용하여, 단순한 챗봇을 넘어 개발, 디자인, 정보 검색 등 다양한 영역에서 활용 가능한 AI 솔루션을 구축하는 방법을 보여줍니다. 

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="mailto:j.1star.0726@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/></a>
<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a> 