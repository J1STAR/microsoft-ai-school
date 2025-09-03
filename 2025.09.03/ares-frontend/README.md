### 📂 Project 보기: [project-ares-interview/ares-frontend](https://github.com/project-ares-interview/ares-frontend/tree/feature/authoize-user)

# 📅 2025년 9월 3일: `ares-frontend` 인증 시스템 아키텍처 리팩토링 및 구현

## 📝 작성 의도

`ares-backend`와 연동하여 실제 사용자에게 인증 기능을 제공하는 프론트엔드 시스템을 구축합니다. 이 문서는 단순 기능 구현을 넘어, **초기 구현에서 발생한 UI 반응성 문제를 해결하고, 예측 가능한 상태 관리를 통해 향후 확장성과 유지보수성을 확보하기 위한 아키텍처 개선 과정**을 상세히 기록하는 것을 목표로 합니다.

백엔드가 `HttpOnly` 쿠키를 사용하는 웹 환경과, 토큰을 직접 관리해야 하는 모바일 환경의 차이를 흡수하여, **UI 컴포넌트는 플랫폼에 구애받지 않고 일관된 방식으로 인증 기능을 사용할 수 있도록** 안정적인 인증 흐름을 설계하는 데 중점을 둡니다.

## 🏛️ 구현 의도 및 아키텍처 전략

### 1. 핵심 아키텍처: `useAuth` 훅을 통한 로직 중앙화

- **문제점**: React의 렌더링 생명주기 외부(`Service` 파일)에서 Zustand 상태를 업데이트하여, 상태는 변경되지만 UI 컴포넌트가 이를 인지하지 못해 리렌더링되지 않는 문제가 발생했습니다.
- **해결책**: 인증 관련 모든 비동기 로직과 상태 업데이트를 담당하는 **`useAuth` 커스텀 훅을 'Facade 패턴'의 퍼사드(Facade)처럼 활용**했습니다. 모든 인증 액션은 이 훅을 통해서만 실행되도록 강제하여, 모든 상태 변경이 React의 생명주기 안에서 일어나도록 보장하고 UI 반응성 문제를 근본적으로 해결했습니다.

### 2. 명확하게 분리된 레이어별 역할 및 데이터 흐름

각 레이어는 명확한 단일 책임을 가집니다. 예를 들어, **로그인 데이터 흐름**은 다음과 같이 단방향으로 이루어집니다.

1. **UI Layer (`SignInScreen`)**: 사용자의 입력을 받아 `useSignIn` 훅을 호출합니다.
2. **UI Logic Layer (`useSignIn`)**: 폼 데이터 유효성을 검증한 뒤, `useAuth` 훅의 `signIn` 함수를 호출합니다.
3. **UI Logic Layer (`useAuth`)**: `authService`를 호출하여 API 통신을 시작합니다.
4. **API Layer (`authService` -> `api`)**: 백엔드에 로그인 요청을 보냅니다.
5. **(응답)**: `authService`는 응답 데이터를 `useAuth` 훅으로 반환합니다.
6. **UI Logic Layer (`useAuth`)**: 반환된 데이터로 `authStore`의 `setter` 함수들(`setUser`, `setTokens` 등)을 호출하여 상태를 업데이트합니다.
7. **State Management Layer (`authStore`)**: 전역 상태가 변경됩니다.
8. **UI Layer (`Header`, 등)**: `authStore`의 상태 변화를 감지하고 자동으로 리렌더링되어 '로그아웃' 버튼으로 즉시 변경됩니다.

### 3. 플랫폼별 세션 관리 전략

- **Web**: 리프레시 토큰을 **`HttpOnly` 쿠키**로 관리합니다. 이 방식은 JavaScript가 토큰에 접근하는 것을 원천적으로 차단하므로, `localStorage` 사용 시 발생할 수 있는 **XSS(Cross-Site Scripting) 공격으로부터 토큰을 안전하게 보호**합니다.
- **Mobile (iOS/Android)**: 쿠키를 사용할 수 없으므로, **`Expo SecureStore`**를 사용하여 리프레시 토큰을 기기 내 안전한 공간에 암호화하여 저장합니다.

## ✅ 구현된 내용 상세

### 1. `useAuth` 커스텀 훅: 인증 로직의 단일 진입점

- `signIn`, `googleSignIn`, `logout` 등 컴포넌트에서 호출할 수 있는 명시적인 액션 함수들을 제공합니다.
- 복잡한 내부 로직(API 호출, 상태 업데이트, 플랫폼 분기)을 모두 추상화하여, UI 컴포넌트는 단순히 `const { login } = useAuth()` 와 같이 간편하게 인증 기능을 사용할 수 있습니다.

### 2. 플랫폼 분기 로직: 일관된 개발 경험

- **`initializeAuth` (앱 시작 시)**: 앱이 시작될 때 웹/모바일 환경을 자동으로 감지하여 각기 다른 방식으로 세션을 복원합니다.
- **`axios` 인터셉터 (토큰 재발급 시)**: 401 에러가 발생하면, 플랫폼에 맞는 방식으로 자동으로 토큰을 재발급합니다.
- **추상화의 이점**: 이 로직들 덕분에 UI 컴포넌트 개발자는 현재 플랫폼이 웹인지 모바일인지 전혀 신경 쓸 필요 없이, 동일한 `useAuth` 훅을 사용하여 기능을 구현할 수 있습니다.

### 3. 소셜 로그인 흐름

- `useGoogleSignIn` 훅은 Google 로그인 SDK와 관련된 복잡한 절차를 담당하고, 최종적으로 얻은 토큰을 `useAuth.googleSignIn` 함수에 전달하는 역할만 수행합니다.
- 백엔드로부터 `registration_required` 응답을 받는 복잡한 분기 처리 또한 `useAuth` 훅 내부에 캡슐화되어 있어, UI 로직을 단순하게 유지합니다.

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact

<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items:center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>j.1star.0726@gmail.com</a>
