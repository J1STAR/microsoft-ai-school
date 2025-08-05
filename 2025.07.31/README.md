### 📂 GitHub에서 보기: [microsoft-ai-school/2025.07.31](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.07.31)


# 📅 2025년 7월 31일: Django, React Native를 사용한 뉴스 애플리케이션 개발

## 📝 개요

이 디렉토리에는 React Native와 Django REST Framework를 사용하여 개발한 풀스택 뉴스 애플리케이션 프로젝트가 포함되어 있습니다.

클라이언트(React Native)와 서버(Django)를 함께 구현하여, 최신 웹 및 모바일 기술 스택을 활용한 엔드투엔드(End-to-End) 개발 경험을 학습합니다.

## 📂 프로젝트 구성

-   **[📱 React Native 클라이언트](./node/README.md)**
    -   `Expo`와 `TypeScript`를 기반으로 한 크로스 플랫폼 모바일 뉴스 앱입니다.
    -   백엔드 API와 통신하여 뉴스 데이터를 받아와 사용자에게 보여줍니다.

-   **[🐍 Django 백엔드](./python/README.md)**
    -   `Django REST Framework`를 사용하여 뉴스 기사 데이터를 제공하는 RESTful API 서버입니다.
    -   커스텀 사용자 모델, API 버전 관리 등 확장성 있는 백엔드 아키텍처를 구현했습니다.

## 🚀 실행 방법

각 프로젝트의 실행 방법은 해당 프로젝트의 `README.md` 문서를 참고하세요.

---

## 📚 학습 및 구현 내용

### 2025년 7월 31일

#### 🐍 Python (Django)
- **프로젝트 초기 설정**: Django 프로젝트 및 `news` 앱을 생성하고, `uv`와 `mise`를 이용한 개발 환경을 구축했습니다.
- **커스텀 사용자 모델 구현**: Django의 기본 사용자 모델을 확장하여, 이메일을 주 식별자로 사용하는 커스텀 `User` 모델을 설계했습니다.
- **뉴스 데이터 모델링**: `NewsChannel`과 `NewsItem` 모델을 정의하여 뉴스 데이터를 구조화했습니다.
- **뉴스 목록 API 구현**: `GET /api/v1/news` 엔드포인트를 통해 데이터베이스에 저장된 뉴스 목록을 JSON 형태로 제공하는 API를 구현했습니다.

#### 📱 Node.js (React Native)
- **프로젝트 초기 설정**: Expo CLI를 사용하여 React Native 프로젝트를 생성하고, `TypeScript`와 `tamagui` UI 라이브러리를 설정했습니다.
- **파일 기반 라우팅**: `expo-router`를 도입하여, 파일 시스템 기반의 직관적인 네비게이션 구조를 구축했습니다. `(tabs)` 디렉토리를 통해 탭 기반 레이아웃을 구현했습니다.
- **API 데이터 연동**: Django 백엔드 서버의 뉴스 목록 API를 호출하여 데이터를 가져온 후, `useState`와 `useEffect`를 사용하여 화면에 뉴스 목록을 동적으로 렌더링했습니다.
- **디자인 시스템**: `Tamagui`를 활용하여 다크/라이트 모드를 지원하는 반응형 UI 컴포넌트를 구성했습니다.

### 2025년 8월 4일 ~ 8월 5일

#### 🐍 Python (Django)
- **사용자 인증 API 구현**:
  - `sign-up`, `sign-in`, `sign-out`, `me` API 엔드포인트를 구현하여 완전한 사용자 인증 흐름을 구축했습니다.
  - 회원가입 시 `create_user`를 통해 비밀번호를 안전하게 해싱하고, `login` 함수로 자동 로그인 처리합니다.
  - `GET /api/v1/users/me` 엔드포인트는 세션 쿠키를 기반으로 로그인 상태를 확인하여 클라이언트의 세션 복원을 지원합니다.
- **게시글(Post) API 구현**:
  - `Post` 모델을 `title`, `content`, `author` 필드를 포함하여 생성했습니다.
  - `/api/v1/posts/` 엔드포인트에서 `GET` 요청 시 게시글 목록과 검색 결과를, `POST` 요청 시 인증된 사용자의 신규 게시글 생성을 처리합니다.

#### 📱 Node.js (React Native)
- **전역 인증 상태 관리 구축**:
  - `React Context API`와 `useAuth` 커스텀 훅을 사용하여 중앙화된 인증 상태 관리 시스템을 구현했습니다.
  - `AuthProvider`는 앱 최상위에서 모든 컴포넌트에 `isSignedIn` 상태와 `signIn`, `signUp` 등의 함수를 제공합니다.
- **인증 화면 흐름 구현**:
  - **로그인/회원가입**: 백엔드 API와 연동하여 실제 동작하는 로그인/회원가입 페이지를 구현했습니다.
  - **자동 리디렉션 및 로그인**: 로그인 상태에 따라 적절한 화면으로 자동 이동시키고, 회원가입 성공 시 즉시 로그인 처리하여 사용자 편의성을 높였습니다.
  - **UI/UX 개선**: 회원가입 폼에 단계별 입력 필드 표시와 실시간 유효성 검사 기능을 적용했습니다.
- **게시글 화면 구현**:
  - **목록 및 작성**: 백엔드 API와 연동하여 게시글 목록 조회(`posts.tsx`) 및 새 글 작성(`posts/write.tsx`) 화면을 구현했습니다.
  - **인증 기반 UI**: 로그인 상태(`isSignedIn`)에 따라 '글쓰기' 버튼을 조건부로 렌더링하여 인증된 사용자에게만 기능이 노출되도록 구현했습니다.

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact
<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items:center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>j.1star.0726@gmail.com</a> 