### 📂 GitHub에서 보기: [microsoft-ai-school/2025.06.23](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.06.23)

# 2025년 6월 23일 학습 기록

이 디렉토리는 **OpenAI API**의 심화 기능과 이를 활용한 고급 애플리케이션 구축을 다룹니다. 특히, 외부 라이브러리(Azure Cognitive Search 등)에 의존하지 않고 직접 **RAG(검색 증강 생성)** 시스템의 핵심 구성요소를 구현하는 방법과, 텍스트를 넘어 **음성(Speech)** 데이터를 다루는 방법을 학습합니다.

## 📝 학습 내용 요약

- **`openai_references.ipynb`**:
  - **Function Calling**: LLM이 답변 생성 중에 미리 정의된 외부 함수(Python 함수)를 스스로 호출하도록 하여, 실시간 정보 조회나 외부 시스템과의 연동을 구현하는 방법을 학습합니다.
  - **Embeddings API**: 텍스트를 의미적으로 유사한 벡터로 변환하는 임베딩 모델(`text-embedding-ada-002` 등)의 사용법을 익힙니다. 텍스트 간의 의미적 유사도를 계산하는 데 사용되며, RAG 시스템의 핵심 요소입니다.

- **`openai_rag.ipynb`**:
  - **RAG 시스템 직접 구현**:
    1.  **문서 로드 및 분할**: PDF와 같은 문서를 불러와 처리하기 좋은 크기의 청크(chunk)로 분할합니다.
    2.  **벡터 DB 생성**: 분할된 각 청크를 임베딩 API를 사용해 벡터로 변환하고, 이를 FAISS와 같은 인메모리(in-memory) 벡터 데이터베이스에 저장합니다.
    3.  **검색 및 생성**: 사용자 질문이 들어오면, 질문을 벡터로 변환하여 벡터 DB에서 가장 유사한 문서 청크를 검색합니다. 검색된 내용을 프롬프트에 담아 LLM에 전달하여 최종 답변을 생성하는 전체 RAG 파이프라인을 직접 구현합니다.

- **`openai_tts_stt.ipynb`**:
  - **Speech-to-Text (STT)**: `Whisper` 모델을 사용하여 음성 파일을 텍스트로 변환하는 방법을 학습합니다.
  - **Text-to-Speech (TTS)**: `TTS` 모델을 사용하여 텍스트를 자연스러운 사람의 목소리로 변환하는 방법을 학습합니다.

## 📁 파일 목록

```
2025.06.23/
├── data/
│   └── *.pdf              # RAG 시스템에 사용될 원본 데이터 (추정)
├── openai.ipynb             # 기본 Chat Completion API 실습
├── openai_add.ipynb         # RAG: 데이터 인덱싱 단계
├── openai_rag.ipynb         # RAG: 검색 및 생성 파이프라인
├── openai_references.ipynb  # RAG: 출처 표시 기능
├── openai_tts.ipynb         # Text-to-Speech API 실습
└── openai_whisper.ipynb     # Speech-to-Text (Whisper) API 실습
```

## 💡 주요 학습 기술

- **핵심 API**: `OpenAI Chat Completion`, `OpenAI Embeddings`, `OpenAI TTS`, `OpenAI Whisper`
- **라이브러리**: `openai`, `langchain`, `llamaindex`, `faiss` 등 (RAG 구현에 따라 다름)
- **핵심 개념**:
    - **검색 증강 생성 (RAG)**: Retrieval, Augmentation, Generation
    - **임베딩 (Embeddings)**: 텍스트를 의미를 담은 벡터로 변환하는 기술
    - **벡터 검색 (Vector Search)**: 벡터 공간에서 유사한 의미의 텍스트를 찾는 기술
    - **음성-텍스트 변환 (Speech-to-Text, STT)**
    - **텍스트-음성 변환 (Text-to-Speech, TTS)**

이 디렉토리의 자료들은 최신 LLM을 단순 활용하는 것을 넘어, 외부 지식과 결합하여 한계를 극복하고, 음성 인터페이스까지 통합하는 고도화된 AI 애플리케이션을 구축하는 방법을 보여줍니다. 

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="mailto:j.1star.0726@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/></a>
<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a> 