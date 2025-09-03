# 📅 2025년 9월 3일: `ares` Full-Stack 인증 시스템 구축

이 문서의 목표는 `ares` 프로젝트의 백엔드와 프론트엔드에 걸쳐 구현된 사용자 인증 시스템의 핵심 아키텍처와 기술적 결정 사항을 요약하여 기록하는 것입니다.

보안성과 확장성을 갖춘 백엔드 API와, 플랫폼에 구애받지 않는 반응형 프론트엔드 아키텍처를 어떻게 결합하여 안정적인 인증 흐름을 완성했는지 설명합니다.

---

## 🚀 핵심 구현 요약

### 1. `ares-backend`: JWT 기반의 안전하고 확장 가능한 인증 API
- **보안 중심 설계**: `HttpOnly` 쿠키를 사용해 Access/Refresh 이중 토큰을 전달함으로써, XSS 공격으로부터 JWT를 안전하게 보호하는 상태 비저장(Stateless) API를 구축했습니다.
- **유연한 회원가입**: 소셜 로그인 시 추가 정보(전화번호, 생년월일 등)를 요구하는 비즈니스 로직을 수용하기 위해, 임시 `signed_data`를 활용하는 **2단계 회원가입** 흐름을 설계하여 유연성을 확보했습니다.
- **검증된 라이브러리 활용**: `djangorestframework-simplejwt`, `dj-rest-auth`, `django-allauth` 등 Django 생태계에서 널리 검증된 라이브러리를 조합하여 직접 구현의 복잡성을 줄이고 시스템의 안정성을 높였습니다.

> **[➡️ `ares-backend`의 상세 구현 내용 전체 보기](./ares-backend/README.md)]**

### 2. `ares-frontend`: 반응형 상태 관리를 위한 아키텍처 리팩토링
- **UI 반응성 문제 해결**: `useAuth` 커스텀 훅을 **Facade 패턴**처럼 활용하여 모든 인증 관련 로직(API 요청, 상태 업데이트)의 진입점을 단일화했습니다. 이를 통해 모든 상태 변경이 React 생명주기 내에서 발생하도록 보장하여 UI가 상태를 즉시 반영하지 못하는 문제를 근본적으로 해결했습니다.
- **플랫폼 추상화**: `HttpOnly` 쿠키를 사용하는 **웹(Web)**과, `Expo SecureStore`에 토큰을 직접 저장해야 하는 **모바일(iOS/Android)** 환경의 차이를 `axios` 인터셉터와 초기화 로직 내부에 캡슐화했습니다. 덕분에 UI 컴포넌트는 플랫폼을 신경 쓸 필요 없이 일관된 방식으로 인증 기능을 사용할 수 있습니다.
- **예측 가능한 데이터 흐름**: `UI Layer` -> `UI Logic Layer (Hooks)` -> `API Layer` -> `State Management (Zustand)`로 이어지는 명확한 단방향 데이터 흐름을 정립하여, 코드의 예측 가능성과 유지보수성을 크게 향상시켰습니다.

> **[➡️ `ares-frontend`의 상세 구현 내용 전체 보기](./ares-frontend/README.md)]**

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact
<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items:center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>&nbsp;j.1star.0726@gmail.com</a>
