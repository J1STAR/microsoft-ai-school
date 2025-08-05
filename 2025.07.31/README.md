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

### 2025년 8월 4일 ~ 8월 5일

#### 🐍 Python (Django)
- **사용자 회원가입 API 구현**:
  - `POST /api/v1/users/sign-up` 엔드포인트를 추가하여 신규 사용자 계정 생성을 지원합니다.
  - API 뷰 내에서 이메일 형식, 비밀번호 길이 등 직접적인 유효성 검사를 수행합니다.
  - 회원가입 성공 시, `django.contrib.auth.login`을 통해 사용자를 즉시 로그인 상태로 만들고 세션 쿠키를 발급합니다.
- **사용자 인증 상태 확인 API 구현**:
  - `GET /api/v1/users/me` 엔드포인트를 통해, 클라이언트가 세션 쿠키를 기반으로 현재 로그인된 사용자의 정보를 조회할 수 있도록 구현했습니다.
  - 이 기능은 클라이언트 앱이 시작될 때 사용자의 로그인 상태를 복원하는 데 핵심적인 역할을 합니다.

#### 📱 Node.js (React Native)
- **전역 인증 상태 관리 아키텍처 구축**:
  - `React Context API`와 `useAuth` 커스텀 훅을 사용하여, 앱 전반에서 사용자의 로그인 상태(`isSignedIn`, `isLoading`)와 관련 함수(`signIn`, `signUp`)를 관리하는 중앙화된 인증 시스템을 구현했습니다.
  - `AuthProvider`를 최상위 레이아웃에 적용하여 모든 컴포넌트가 인증 컨텍스트에 접근할 수 있도록 설계했습니다.
- **로그인 및 회원가입 페이지 구현**:
  - **로그인 (`sign-in.tsx`)**: 백엔드 API와 연동하여 사용자 로그인을 처리합니다. 이미 로그인된 사용자가 접근 시 메인 화면으로 자동 리디렉션됩니다.
  - **회원가입 (`sign-up.tsx`)**:
    - **단계별 애니메이션 폼**: 이름, 이메일, 비밀번호 등 각 입력 필드가 사용자의 입력에 따라 순차적으로 나타나는 UI/UX를 구현하여 사용자 경험을 향상시켰습니다.
    - **실시간 유효성 검사**: 각 필드에 실시간으로 유효성 검사 메시지를 표시하여 사용자에게 즉각적인 피드백을 제공합니다.
    - **자동 로그인**: 회원가입 성공 후, 별도의 절차 없이 즉시 로그인 상태가 되어 메인 페이지로 이동합니다.

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact
<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items:center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>j.1star.0726@gmail.com</a> 