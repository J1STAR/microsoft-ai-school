### 📂 Project 보기: [project-ares-interview/ares-backend](https://github.com/project-ares-interview/ares-backend/tree/feature/authorize-user)

# 📅 2025년 9월 3일: `ares-backend` 사용자 인증 시스템 구축

## 📝 작성 의도

[project-ares-interview/ares-frontend](https://github.com/project-ares-interview/ares-frontend/tree/feature/authoize-user)의 회원가입 및 로그인 기능 요구사항을 충족시키기 위한 백엔드 시스템을 구축합니다. 이 문서는 단순한 기능 구현을 넘어, **보안성, 확장성, 그리고 프론트엔드와의 유연한 연동**을 고려한 기술적 결정 과정을 상세히 기록하는 것을 목표로 합니다.

프론트엔드가 React Native 기반의 크로스플랫폼(Web, iOS, Android) 앱이라는 특성을 고려하여, 플랫폼에 구애받지 않는 표준적인 인증 방식인 **JWT(JSON Web Token) 기반의 상태 비저장(Stateless) API**를 설계하는 데 중점을 둡니다.

## 🏛️ 구현 의도 및 아키텍처 전략

본 인증 시스템의 아키텍처는 **보안성, 확장성, 유연성**을 목표로 설계되었습니다. 이를 위해 Django 생태계에서 검증된 라이브러리들을 조합하여 표준적인 구현 방식을 채택했습니다.

### 1. 핵심 라이브러리 선택

-   **`djangorestframework-simplejwt`**: JWT 생성, 검증, 재발급 등 토큰 관련 핵심 기능을 안정적으로 처리합니다.
-   **`dj-rest-auth` & `django-allauth`**: 이메일/비밀번호 로그인, 소셜 로그인, 로그아웃, 회원가입 등 복잡한 인증 흐름을 직접 구현하는 대신, 검증된 라이브러리를 활용하여 개발 시간을 단축하고 보안성을 향상시킵니다.
-   **`django-cors-headers`**: 프론트엔드(`localhost:8081`)와 백엔드(`localhost:8000`)의 출처(Origin)가 다른 개발 환경에서 발생하는 CORS 문제를 해결합니다.

### 2. 보안을 고려한 토큰 처리 전략: Access Token과 Refresh Token의 분리

-   **Access Token (액세스 토큰)**:
    -   **역할**: 실제 API를 호출할 때 사용자의 신원을 증명하는 단기 출입증입니다.
    -   **전송 방식**: 보안을 극대화하기 위해 **`HttpOnly` 쿠키**에 저장하여 전달합니다. 이 방식은 JavaScript가 쿠키에 접근하는 것을 원천적으로 차단하여, XSS(Cross-Site Scripting) 공격으로 리프레시 토큰이 탈취될 위험을 방지합니다.
    -   **특징**: 수명이 짧아(예: 2시간) 탈취되더라도 피해를 최소화할 수 있습니다.

-   **Refresh Token (리프레시 토큰)**:
    -   **역할**: 액세스 토큰이 만료되었을 때, 새로운 액세스 토큰을 발급받기 위한 장기 인증서입니다.
    -   **전송 방식**: 보안을 극대화하기 위해 **`HttpOnly` 쿠키**에 저장하여 전달합니다. 이 방식은 JavaScript가 쿠키에 접근하는 것을 원천적으로 차단하여, XSS(Cross-Site Scripting) 공격으로 리프레시 토큰이 탈취될 위험을 방지합니다.
    -   **특징**: 수명이 길지만(예: 7일), 오직 액세스 토큰 재발급 용도로만 사용됩니다.

이중 토큰 전략은 상태 비저장(Stateless) API의 보안을 강화하고 사용자 세션을 안전하게 관리하기 위한 표준적인 접근 방식입니다.

### 3. 유연한 소셜 로그인 흐름 설계: 2단계 회원가입

-   **문제점**: `ares-frontend`의 회원가입 폼에는 전화번호, 생년월일 등 소셜 제공자(Google)가 기본으로 제공하지 않는 추가 정보가 필요합니다.
-   **해결책**: 신규 소셜 로그인 사용자를 만났을 때, 즉시 계정을 생성하는 대신 다음과 같은 2단계 절차를 거치도록 설계했습니다.
    1.  **신원 확인 단계**: 프론트엔드가 보낸 Google 토큰을 검증하고, 해당 사용자가 신규 사용자인지 판별합니다. 신규 사용자일 경우, JWT 대신 **암호화된 서명이 포함된 임시 데이터(`signed_data`)**를 프론트엔드에 반환합니다.
    2.  **최종 가입 단계**: 프론트엔드는 추가 정보 입력 페이지를 보여준 뒤, 사용자가 입력한 추가 정보와 1단계에서 받은 `signed_data`를 함께 백엔드로 보냅니다. 백엔드는 서명을 검증하여 데이터 위변조 여부를 확인하고, 안전하게 최종 사용자 계정을 생성합니다.
-   **구조적 이점**: 이 방식을 통해 소셜 로그인의 편의성을 유지하면서, 서비스에 필요한 추가 사용자 정보를 수집하는 커스텀 회원가입 절차를 구현할 수 있습니다.

## ✅ 구현된 내용 상세

### 1. 커스텀 사용자 모델 (`api.models.user.User`)
- Django의 기본 `User` 모델을 확장하여, `username` 대신 `email`을 사용자의 주 식별자(ID)로 사용하도록 변경했습니다.
- `name`, `gender`, `birth`, `phone_number` 필드를 추가하여 프론트엔드의 요구사항을 반영했습니다.

### 2. API 엔드포인트 및 명세

#### ① 이메일/비밀번호 기반 인증
- **`POST /api/v1/auth/registration/` (회원가입)**
  - **역할**: 이메일, 비밀번호 및 추가 정보를 받아 새로운 사용자를 생성합니다.
  - **Body**: `{ "email", "password", "name", "gender", "birth", "phone_number" }`

- **`POST /api/v1/auth/login/` (로그인)**
  - **역할**: 이메일, 비밀번호를 검증하고, 성공 시 JWT를 발급합니다.
  - **Body**: `{ "email", "password" }`
  - **Response**: `access(access_token)`, `refresh(refresh_token)`은 `HttpOnly` 쿠키로 반환됩니다.

#### ② 소셜 로그인 (Google)
- **`POST /api/v1/auth/google/` (1단계: Google 토큰 검증)**
  - **역할**: 프론트엔드가 전달한 Google `access_token`을 검증하고, 사용자의 가입 상태를 판별합니다.
  - **Body**: `{ "access_token": "..." }`
  - **Response (기존 사용자)**: 로그인 성공, JWT 발급.
  - **Response (신규 사용자)**: `{ "status": "registration_required", "signed_data": "..." }`

- **`POST /api/v1/auth/google/register/` (2단계: 최종 가입)**
  - **역할**: 신규 소셜 사용자가 추가 정보를 입력한 뒤 최종 가입을 완료합니다.
  - **Body**: `{ "signed_data", "gender", "birth", "phone_number" }`
  - **Note**: `password` 필드는 필요 없으며, `email`과 `name`은 `signed_data`를 통해 안전하게 처리됩니다.

#### ③ JWT 및 사용자 정보
- **`POST /api/v1/auth/token/refresh/` (Access Token 재발급)**
  - **역할**: 브라우저에 저장된 `HttpOnly` 리프레시 토큰 쿠키를 사용하여 새로운 `access(access_token)`을 발급받습니다.
  - **Header/Body**: 불필요 (브라우저가 쿠키를 자동으로 전송)

- **`POST /api/v1/auth/logout/` (로그아웃)**
  - **역할**: 리프레시 토큰 쿠키를 만료시켜 세션을 안전하게 종료합니다.
  - **Header/Body**: 불필요 (브라우저가 쿠키를 자동으로 전송)

- **`GET/PUT/PATCH /api/v1/auth/user/` (사용자 정보 관리)**
  - **역할**: 인증된 사용자의 정보를 조회하거나 수정합니다.
  - **Header/Body**: 불필요 (브라우저가 쿠키를 자동으로 전송)

### 3. 환경 설정 및 트러블슈팅
- **CORS/CSRF**: `settings.py`에 `CORS_ALLOWED_ORIGINS`와 `CSRF_TRUSTED_ORIGINS`를 설정하여, `localhost` 개발 환경에서 프론트엔드의 API 요청을 안전하게 허용하도록 처리했습니다.
- **쿠키 정책**: 로컬 개발 환경(`http`)과 프로덕션 환경(`https`)에서 모두 `HttpOnly` 쿠키가 정상적으로 동작하도록 `SameSite`와 `Secure` 속성을 `DEBUG` 값에 따라 동적으로 제어하는 로직을 구현하여 복잡한 브라우저 정책 문제를 해결했습니다.


---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact

<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items:center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>j.1star.0726@gmail.com</a>
