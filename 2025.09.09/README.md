# 📅 2025년 9월 9일: `ares` Full-Stack 이력서/자소서 관리 시스템 구축 및 리팩토링

이 문서의 목표는 `ares` 프로젝트에 신규 핵심 기능인 **이력서 및 자기소개서 관리 시스템을 구현**하고, 이 과정에서 발견된 **기존 시스템의 순서 관리 로직을 안정적으로 리팩토링**하는 전체 과정을 요약하여 기록하는 것입니다.

기능 확장에 따른 데이터 모델의 일관성을 유지하고, 복잡한 비즈니스 로직을 단순화하여 시스템 전체의 안정성과 유지보수성을 어떻게 향상시켰는지 백엔드와 프론트엔드의 관점에서 각각 설명합니다.

---

## 🚀 핵심 구현 요약

### 1. `ares-backend`: 순서 관리 표준화 및 사용자 경험 중심의 API 설계
- **순서 관리 로직 리팩토링**: 수동으로 순서를 계산하던 기존 방식의 복잡성과 잠재적 오류를 해결하기 위해, `django-ordered-model` 라이브러리를 도입했습니다. 이를 통해 순서 관리 로직을 모델 계층에 위임하여 `ViewSet` 코드를 대폭 단순화하고, 데이터 정합성을 보장하며, 향후 순서 변경 기능의 확장성을 확보했습니다.
- **사용자 경험 향상**: 신규 이력서 생성 시, 사용자가 기존에 '마이페이지'에 입력해 둔 학력 및 경력 정보를 자동으로 복사해주는 API를 구현했습니다. 이를 통해 반복적인 데이터 입력을 최소화하여 서비스 사용 편의성을 높였습니다.
- **RESTful API 설계**: 이력서와 그 하위 항목(학력, 경력 등) 간의 관계를 `Nested URL`(예: `/resumes/{resume_id}/careers/`)로 명확하게 표현하여, 프론트엔드가 직관적으로 리소스를 관리할 수 있도록 RESTful 원칙에 따라 API를 설계했습니다.

> **[➡️ `ares-backend`의 상세 구현 내용 전체 보기](./ares-backend/README.md)]**

### 2. `ares-frontend`: 기능별 상태 분리 및 UX 최적화를 통한 시스템 확장
- **기능별 상태 관리**: 기존의 단일 `profileStore` 구조에서 더 나아가, `resumeStore`, `coverLetterStore` 등 기능 단위로 Zustand `store`를 분리했습니다. 이를 통해 각 기능의 상태와 로직을 독립적으로 관리하여 코드의 복잡도를 낮추고, 기능 간의 의존성을 제거하여 유지보수성을 향상시켰습니다.
- **데이터 모델 동기화**: 백엔드의 모델 변경에 맞춰 프론트엔드의 데이터 타입(`schema`)과 서비스 로직을 통합하여, '마이페이지'와 '이력서 관리' 기능 간에 발생할 수 있었던 데이터 불일치 문제를 해결하고 어플리케이션 전체의 데이터 정합성을 확보했습니다.
- **UX 최적화 및 플랫폼 추상화**: 동적 폼 유효성 검사, 조건부 필드 렌더링 등을 통해 사용자 입력 오류를 최소화했습니다. 또한, 웹과 네이티브 환경의 차이를 흡수하는 `showConfirmation` 유틸리티를 구현하여, 플랫폼에 구애받지 않는 일관된 사용자 경험과 재사용 가능한 코드 기반을 마련했습니다.

> **[➡️ `ares-frontend`의 상세 구현 내용 전체 보기](./ares-frontend/README.md)]**

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact
<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items:center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>&nbsp;j.1star.0726@gmail.com</a>
