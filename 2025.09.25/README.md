### 📂 GitHub에서 보기: [microsoft-ai-school/2025.09.25](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.09.25)

### 📂 Projects
[ares-backend](https://github.com/project-ares-interview/ares-backend)
[ares-frontend](https://github.com/project-ares-interview/ares-frontend)

# 📅 2025년 9월 25일: ARES - AI 기반 가상 면접 솔루션

## 📝 학습 목표

- **프로젝트 아키텍처 이해**: Django REST Framework 기반의 백엔드와 React Native (Expo) 기반의 프론트엔드로 구성된 풀스택 애플리케이션의 전체 구조를 파악합니다.
- **AI 기술 스택 분석**: RAG, Multi-modal 분석 등 최신 AI 기술이 실제 서비스에 어떻게 적용되는지 학습합니다.
- **백엔드 핵심 기능 분석**:
    - `LlamaIndex`와 `Azure OpenAI`를 활용한 RAG 기반 맞춤형 면접 질문 생성 로직을 이해합니다.
    - 음성(Praat, Librosa), 영상(OpenCV, MediaPipe) 데이터를 처리하는 다중 모드 분석 파이프라인을 학습합니다.
    - `dj-rest-auth`와 `Simple JWT`를 이용한 토큰 기반 인증 시스템의 작동 원리를 파악합니다.
- **프론트엔드 핵심 기능 분석**:
    - `Expo Router`를 사용한 파일 시스템 기반 라우팅 및 접근 제어 방법을 이해합니다.
    - `Zustand`를 활용한 전역 상태 관리의 효율성과 `React Hook Form`, `Zod`를 이용한 폼 관리 및 유효성 검사 패턴을 학습합니다.
    - `Axios` 인터셉터를 통한 API 통신 및 인증 처리 중앙화 방법을 파악합니다.

---

## 🖼️ 프로젝트 개요

**ARES**는 취업 준비생을 위한 **AI 기반 모의 면접 및 역량 분석 플랫폼**입니다. 실제와 같은 모의 면접 경험을 제공하고, 다각적인 분석 리포트를 통해 사용자의 강점과 약점을 객관적으로 파악할 수 있도록 돕습니다.

-   **ARES Backend**: Django와 DRF를 기반으로 AI 면접, 이력서 분석, 심층 리포트 생성 등 모든 비즈니스 로직을 처리하는 RESTful API 서버입니다.
-   **ARES Frontend**: React Native와 Expo를 사용하여 iOS, Android, Web에서 일관된 사용자 경험을 제공하는 크로스플랫폼 애플리케이션입니다.

이 프로젝트는 AI 기술을 활용하여 정보 비대칭 문제를 해결하고, 사용자에게 개인화된 면접 코칭 경험을 제공하는 것을 목표로 합니다.

---

## 📁 프로젝트 구조 및 기술 스택

### 1. ARES Backend

-   **프로젝트 구조**:
    ```
    /ares-backend
    ├── ares/
    │   ├── api/ -> 핵심 API 로직 (models, serializers, views)
    │   ├── settings.py
    │   └── urls.py
    ├── data/ -> AI 모델 학습용 데이터
    ├── manage.py
    └── pyproject.toml -> uv 기반 의존성 관리
    ```
-   **기술 스택**:
    -   **Backend**: Django, Django REST Framework
    -   **AI/ML**: LlamaIndex, Azure OpenAI, Azure AI Search, Librosa, OpenCV, MediaPipe
    -   **Authentication**: `dj-rest-auth`, `djangorestframework-simplejwt`
    -   **Database**: SQLite (기본), PostgreSQL/MySQL (확장 가능)
    -   **API Docs**: `drf-spectacular`

### 2. ARES Frontend

-   **프로젝트 구조**:
    ```
    /ares-frontend
    ├── app/ -> Expo Router 기반 화면 (auth, protected 그룹)
    ├── components/ -> 재사용 가능한 UI 컴포넌트
    ├── services/ -> Axios API 호출 서비스
    ├── stores/ -> Zustand 전역 상태 스토어
    ├── schemas/ -> Zod 유효성 검사 스키마
    └── package.json -> npm/yarn 의존성 관리
    ```
-   **기술 스택**:
    -   **Framework**: React Native, Expo
    -   **Language**: TypeScript
    -   **Routing**: Expo Router
    -   **State Management**: Zustand
    -   **Data Fetching**: Axios
    -   **Forms**: React Hook Form, Zod

---

## 🚀 주요 기능 및 학습 내용

### 1. RAG 기반 실시간 맞춤 질문 (Backend)

-   **로직**: `Azure Blob Storage`의 기업 보고서를 `LlamaIndex`가 실시간으로 분석 -> `Azure AI Search`에 벡터 인덱싱 -> 사용자 이력서와 연계하여 `Azure OpenAI`가 맞춤형 질문 생성.
-   **학습 포인트**: 정적인 질문이 아닌, 실제 기업 데이터와 사용자 정보를 기반으로 동적으로 질문을 생성하는 RAG 파이프라인의 실제 구현 사례를 학습.

### 2. 다중 모드(Multi-modal) 심층 분석 (Backend)

-   **로직**: 면접 종료 후, 답변 내용(Text), 음성(Speech), 영상(Vision) 데이터를 종합 분석.
    -   **텍스트**: `Azure OpenAI`로 논리성, 직무 관련성 평가.
    -   **음성**: `Librosa`, `parselmouth`로 말 빠르기, 톤 변화 분석.
    -   **영상**: `OpenCV`, `MediaPipe`로 시선 처리, 표정 분석.
-   **학습 포인트**: 단일 데이터 소스를 넘어, 여러 종류의 데이터를 종합하여 사용자에게 깊이 있는 피드백을 제공하는 AI 시스템의 구조를 이해.

### 3. 상태 및 라우팅 관리 (Frontend)

-   **로직**:
    -   `Expo Router`의 `(auth)`, `(protected)` 그룹으로 인증 상태에 따른 접근 제어를 선언적으로 관리.
    -   `Zustand`를 사용하여 `authStore`, `resumeStore` 등 도메인별로 전역 상태를 분리하고, Hook 기반으로 간단하게 상태를 사용.
-   **학습 포인트**: 복잡한 사용자 상태와 페이지 흐름을 효율적으로 관리하는 최신 프론트엔드 아키텍처 패턴을 학습.

---

## 💡 학습 정리

이번 프로젝트 분석을 통해, 최신 AI 기술과 안정적인 웹 프레임워크를 결합하여 실제 사용자의 문제를 해결하는 풀스택 애플리케이션의 개발 과정을 깊이 있게 이해할 수 있었습니다.

-   **백엔드**: 단순히 CRUD API를 제공하는 것을 넘어, RAG, 다중 모드 분석 등 복잡한 AI 파이프라인을 통합하고 안정적으로 서빙하는 역할의 중요성을 확인했습니다. `LlamaIndex`와 같은 도구가 AI 로직 구현을 어떻게 단순화하는지 파악했습니다.
-   **프론트엔드**: `Expo`와 `React Native`를 통해 크로스플랫폼 개발의 생산성을 높이는 방법을 배웠습니다. 특히 `Zustand`와 `Expo Router` 같은 가볍고 효율적인 라이브러리들이 어떻게 개발 경험을 향상시키는지 체감했습니다.
-   **풀스택 연동**: `Axios` 인터셉터와 `JWT` 인증을 통해 프론트엔드와 백엔드가 어떻게 안전하고 효율적으로 통신하는지, 그리고 `RESTful` 원칙에 따른 API 설계가 어떻게 두 파트의 독립적인 개발을 가능하게 하는지 명확히 이해했습니다.

ARES 프로젝트는 AI 기술을 실제 서비스로 구현할 때 필요한 전체적인 아키텍처 설계, 기술 스택 선정, 그리고 각 컴포넌트 간의 유기적인 연동 방식을 학습할 수 있는 훌륭한 예제입니다.

---

## 🚀 관련 프로젝트

- **[ARES Backend 바로가기](https://github.com/project-ares-interview/ares-backend)**
- **[ARES Frontend 바로가기](https://github.com/project-ares-interview/ares-frontend)**

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact
<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items:center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>j.1star.0726@gmail.com</a>
