### [microsoft-ai-school/2025.06.18](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.06.18)

# 2025년 6월 18일 학습 기록

이 디렉토리의 학습 자료는 **Azure OpenAI Service**를 활용하여 지능형 애플리케이션을 개발하는 첫걸음을 다룹니다. 기본적인 API 사용법부터 시작하여, LLM(거대 언어 모델)을 활용한 질의응답, 요약, 콘텐츠 생성 등 다양한 작업을 Python 코드로 수행하는 방법을 학습합니다.

## 📝 학습 내용 요약

- **Azure OpenAI Service 시작하기**:
  - Azure Portal에서 OpenAI Service 리소스를 생성하고, API 키와 엔드포인트를 확인하는 방법을 학습합니다.
  - `openai` 라이브러리를 설치하고, 인증 정보를 설정하여 서비스에 연결하는 초기 환경 설정 과정을 다룹니다.

- **기본적인 언어 모델 활용**:
  - **완성(Completion)**: `Completion` API를 사용하여 주어진 프롬프트(prompt)에 이어지는 텍스트를 생성하는 방법을 실습합니다. (e.g., GPT-3)
  - **채팅 완성(Chat Completion)**: `ChatCompletion` API를 사용하여 대화형 모델(e.g., GPT-3.5-Turbo, GPT-4)과 상호작용하는 방법을 학습합니다. 시스템, 사용자, 어시스턴트 역할을 구분하여 보다 정교한 대화를 제어하는 방법을 다룹니다.

- **RAG(검색 증강 생성) 개념 소개**:
  - `02-use-own-data.md` 문서는 LLM이 학습 데이터에 없는 최신 정보나 특정 도메인의 지식에 대해 답변할 수 있도록, 외부 데이터 소스(자체 데이터)를 검색하여 관련 정보를 프롬프트에 함께 제공하는 **검색 증강 생성(Retrieval-Augmented Generation, RAG)**의 기본 개념을 소개합니다. 이는 "Bring Your Own Data" 기능의 기반이 됩니다.

## 📁 디렉토리 구조 (요약)

```
2025.06.18/
├── Instructions/      # 실습 안내 Markdown 문서
│   ├── Labs/
│   │   ├── 01-app-develop.md
│   │   └── 02-use-own-data.md
│   └── Exercises/
└── Labfiles/          # 실습용 소스 코드 및 데이터
    ├── 01-app-develop/
    │   ├── Python/
    │   │   ├── application.py
    │   │   ├── system.txt
    │   │   └── grounding.txt
    │   └── openai.ipynb
    └── (02-use-own-data/는 다음 날짜에 이어서 진행될 수 있음)
```

## 💡 주요 학습 기술

- **핵심 서비스**: `Azure OpenAI Service`, `Azure Cognitive Search`
- **핵심 라이브러리**: `openai` (Python SDK)
- **핵심 개념**:
    - 대규모 언어 모델 (LLM)
    - 프롬프트 엔지니어링 (Prompt Engineering)
    - 시스템 역할(System Role) 및 사용자 역할(User Role)
    - **검색 증강 생성 (Retrieval-Augmented Generation, RAG)**
    - 그라운딩 (Grounding)

이 디렉토리의 자료들은 최신 생성 AI 기술을 활용하여 실제 비즈니스 문제를 해결하는 애플리케이션을 개발하는 데 필요한 핵심적인 지식과 기술을 제공합니다. 

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="mailto:j.1star.0726@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/></a>
<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a> 