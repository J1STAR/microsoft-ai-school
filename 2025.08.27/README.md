### 📂 GitHub에서 보기: [microsoft-ai-school/2025.08.27/ares-backend](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.08.27/ares-backend)
### 📂 Project 보기: [project-ares-interview/ares-backend](https://github.com/project-ares-interview/ares-backend)

# 📅 2025년 8월 27일: `ares-backend` 프로젝트 기반 설계 및 환경 구축

## 📝 프로젝트 목표와 비전

본 프로젝트는 Python Django와 Django REST Framework(DRF)를 기반으로, **확장 가능하고 유지보수하기 좋은 RESTful API 서버**를 구축하는 것을 목표로 합니다.

단순히 기능을 구현하는 것을 넘어, 장기적인 관점에서 안정적으로 운영될 수 있는 서비스를 만드는 데 중점을 둡니다. 이를 위해 초기 단계에서는 **개발 환경 표준화**를 통해 팀의 생산성을 높이고, 향후 기능 추가에 유연하게 대응할 수 있는 **견고한 아키텍처**를 설계하는 것을 핵심 목표로 삼았습니다.

---

## 🛠️ 개발 환경 전략: "왜, 그리고 어떻게?"

> "제 컴퓨터에서는 잘 됐는데..."

개발팀이라면 한 번쯤 겪어봤을 이 문제를 원천적으로 방지하고, 새로운 팀원이 단 몇 시간 안에 프로젝트에 적응할 수 있도록 개발 환경을 통일하는 과정입니다.

### 1. 핵심 도구: `mise` 와 `uv`

-   **`mise` (런타임 및 도구 버전 관리자)**:
    -   **선택 이유**: 팀원마다 컴퓨터에 설치된 Python 버전이 다를 경우, 예상치 못한 오류가 발생할 수 있습니다. `mise`는 `mise.toml` 설정 파일 하나로 "이 프로젝트는 반드시 Python 3.11.9 버전을 사용한다"고 명시하고 강제합니다. 이를 통해 모든 팀원이 동일한 개발 환경의 기반 위에서 작업하도록 보장하여 잠재적인 문제를 사전에 차단합니다.
    -   **설치**: [REQUIREMENTS.md](https://github.com/project-ares-interview/ares-backend/blob/main/REQUIREMENTS.md) 문서의 "2.1. `mise`" 섹션을 참고하여 설치를 진행해주세요.

-   **`uv` (Python 프로젝트 및 패키지 관리자)**:
    -   **선택 이유**: `uv`는 Django, DRF와 같은 라이브러리(패키지)를 매우 빠르게 설치하고, 프로젝트별로 격리된 개발 공간(가상 환경)을 만들어주는 차세대 도구입니다. `A` 프로젝트와 `B` 프로젝트가 서로 다른 버전의 Django를 사용하더라도 충돌하지 않도록 깨끗하게 관리하며, 뛰어난 성능으로 개발 경험을 향상시킵니다.
    -   **설치**: `mise`가 `mise.toml` 파일을 읽어 자동으로 설치하므로 별도의 설치 과정은 필요 없습니다.

### 2. 프로젝트 설정 단계

1.  **프로젝트 소스 코드 복제**:
    가장 먼저 GitHub에서 프로젝트를 컴퓨터로 내려받습니다.
    ```bash
    git clone https://github.com/project-ares-interview/ares-backend.git
    cd ares-backend
    ```

2.  **개발 도구 자동 설치**:
    프로젝트 폴더 안에서 아래 명령어를 실행하면, `mise`가 `mise.toml`을 읽고 필요한 Python과 `uv`를 자동으로 설치합니다.
    ```bash
    mise install
    ```

3.  **의존성 설치 및 가상 환경 생성**:
    `uv`를 사용하여 프로젝트에 필요한 모든 라이브러리를 설치합니다. 이 명령어는 `.venv`라는 격리된 가상 환경을 만들고 그 안에 라이브러리들을 설치합니다.
    ```bash
    uv sync
    ```

---

## 🔒 보안 및 환경 변수 관리 전략: `dotenvx` 도입

### 1. 문제 정의: "어떻게 민감한 정보를 안전하게 관리하고 공유할까?"

현대 애플리케이션은 API 키, 데이터베이스 자격 증명 등 수많은 비밀 정보(secrets)에 의존합니다. 이 정보들을 코드에 직접 저장하는 것은 심각한 보안 취약점이며, `.env` 파일을 사용하더라도 팀원 간에 이 파일을 안전하게 공유하는 것은 또 다른 문제입니다.

### 2. 해결 전략: 암호화 기반의 환경 변수 관리

이 문제를 해결하기 위해, 우리는 `dotenvx`를 표준 도구로 채택했습니다. `dotenvx`는 기존 `.env` 파일의 편리함은 유지하면서, 강력한 암호화 계층을 추가하여 민감한 정보를 안전하게 버전 관리(Git)하고 공유할 수 있게 해줍니다.

**우리의 운영 방식:**

1.  **암호화**: `production` 환경의 데이터베이스 비밀번호와 같은 민감 정보는 `dotenvx`에 의해 암호화됩니다. 그 결과, 암호화된 내용과 암호화에 사용된 공개 키(public key)가 담긴 `.env.production` 파일이 생성됩니다. 이 파일은 Git에 커밋해도 안전합니다.
2.  **비밀 키**: 암호화된 내용을 해독하기 위해서는 해당 공개 키에 대응하는 비밀 키(private key)가 필요합니다. 이 비밀 키는 `.env.keys`라는 파일에 저장됩니다.
3.  **보안**: **`.env.keys` 파일은 `.gitignore`에 등록하여 절대 Git에 커밋되지 않도록 관리합니다.** 이 비밀 키 파일은 팀원 간에 1Password와 같은 안전한 채널을 통해서만 공유되어야 합니다.

### 3. 기대 효과

이 전략을 통해 우리는 환경 설정을 안전하게 버전 관리할 수 있게 되었습니다. 새로운 팀원은 저장소(Git)를 복제하고, 안전하게 전달받은 `.env.keys` 파일 하나만 있으면, 민감한 정보 원문을 직접 보지 않고도 즉시 모든 환경의 애플리케이션을 실행할 수 있습니다. `dotenvx run -f .env.{environments} -- ...` 명령어는 이 모든 과정을 추상화하여, 개발자가 보안에 대한 걱정 없이 개발에만 집중할 수 있는 환경을 제공합니다.

---

## 🏛️ 아키텍처 설계: 지속 가능한 구조 만들기

효율적인 협업과 장기적인 유지보수를 위해 프로젝트의 폴더 구조를 신중하게 설계했습니다.

### 1. 관심사 분리 (Separation of Concerns)

API 관련 코드를 역할에 따라 명확하게 `models`, `views`, `serializers` 디렉토리로 분리했습니다. 이는 코드를 찾기 쉽게 만들고, 하나의 파일이 너무 비대해지는 것을 막아 가독성과 유지보수성을 극대화합니다.

-   `ares/api/models/`: 데이터베이스 테이블의 구조, 즉 데이터의 '뼈대'를 정의하는 곳입니다.
-   `ares/api/views/`: 클라이언트의 요청을 받아 어떤 비즈니스 로직으로 전달할지 결정하고, 처리된 결과를 클라이언트에게 응답(Response)으로 반환하는 API의 핵심 진입점입니다.
-   `ares/api/serializers/`: 데이터베이스의 데이터를 클라이언트가 이해할 수 있는 JSON 형태로 '번역'하거나, 그 반대의 역할을 수행합니다.

### 2. API 버전 관리

"API를 수정했더니 갑자기 앱이 동작하지 않아요!"와 같은 문제를 방지하기 위해, URL에 버전(`v1`)을 명시하는 방식을 채택했습니다. (예: `/api/v1/...`)

이를 통해 나중에 API를 대대적으로 변경(`v2`)하더라도, 기존 `v1`을 사용하는 클라이언트는 아무런 영향 없이 서비스를 계속 이용할 수 있습니다.

### 3. 계층적 URL 라우팅

URL 설정을 역할에 따라 여러 파일로 나누어 관리의 용이성을 높였습니다.

-   `ares/urls.py` (최상위): 프로젝트의 모든 진입점을 관리합니다. `admin/`, `health/` 같은 핵심 경로와 `/api/`로 시작하는 모든 요청을 `api` 앱으로 전달하는 '교통 경찰' 역할을 합니다.
-   `ares/api/urls.py`: `/api/` 하위의 URL을 관리합니다. 버전 관리되는 API(`/v1/`)와 그렇지 않은 공통 API를 구분합니다.
-   `ares/api/v1/urls.py`: `v1` API의 각 기능(리소스)별 URL(예: `/examples`)을 최종적으로 담당합니다.

---

## 🚀 초기 기능 구현: 아키텍처 검증하기

설계한 아키텍처가 실제로 동작하는지 확인하고, 앞으로의 개발에 대한 구체적인 가이드라인을 제시하기 위해 두 개의 초기 API를 구현했습니다.

### 1. `GET /health`

-   **목적**: API 서버의 현재 상태를 외부에 알리는 가장 기본적인 엔드포인트입니다. 로드 밸런서나 모니터링 시스템이 이 API를 주기적으로 호출하여 서비스의 정상 동작 여부를 확인할 수 있습니다.
-   **구현**: `rest_framework.views.APIView`를 상속받아 간단하게 구현했으며, 호출 시 `{"status": "ok"}` JSON 응답과 HTTP 상태 코드 `200`을 반환합니다.

### 2. `GET /api/v1/examples/`

-   **목적**: 실제 데이터베이스 연동 없이, 우리가 정의한 아키텍처(버전 관리, 관심사 분리, 라우팅)가 어떻게 동작하는지 보여주는 역할을 합니다.
-   **구현**:
    -   `rest_framework.viewsets.ViewSet`을 사용하여 `list`, `retrieve`와 같은 표준 RESTful API 동작을 정의했습니다.
    -   데이터베이스 모델(`models.py`) 대신, **코드 내에 미리 정의된 더미 데이터(dummy data)를 사용**합니다. 이를 통해 데이터베이스 설정 없이도 API의 전체 흐름을 테스트하고 이해할 수 있습니다.
    -   `serializers.Serializer`를 사용하여 더미 데이터를 JSON 형식으로 직렬화합니다.

---

## 💡 결과 및 요약 (Results & Summary)

프로젝트 초기 단계의 목표는 단순히 기능을 나열하는 것이 아닌, 장기적인 안정성과 확장성을 보장하는 기술적 기반을 확립하는 것이었습니다.

**주요 성과:**

1.  **재현 가능한 개발 환경 구축 (Reproducible Development Environment):**
    -   `mise`와 `mise.toml`을 도입하여 Python과 `uv`의 버전을 명시적으로 고정했습니다. 이를 통해 모든 참여자가 OS에 관계없이 100% 동일한 환경에서 개발을 시작할 수 있는 기술적 표준을 마련했습니다.
    -   `uv sync`와 `uv.lock`을 활용하여 프로젝트의 모든 의존성 패키지를 정확한 버전으로 통일, "내 컴퓨터에서만 동작하는" 문제를 원천적으로 차단했습니다.

2.  **확장성을 고려한 아키텍처 설계 (Scalable Architecture):**
    -   **관심사 분리(SoC):** API 모듈을 `models`, `views`, `serializers`로 물리적으로 분리하여 코드의 응집도를 높이고 결합도를 낮췄습니다. 이는 향후 특정 기능을 수정하거나 추가할 때 다른 부분에 미치는 영향을 최소화하는 효과를 가집니다.
    -   **API 버전 관리:** URL에 `v1`을 명시적으로 포함시켜, 향후 API의 breaking change가 발생하더라도 기존 클라이언트의 호환성을 보장할 수 있는 인프라를 구축했습니다.
    -   **계층적 라우팅:** Django의 `include`를 활용하여 URL 설정을 프로젝트 전체 -> API -> 버전 -> 리소스 순으로 계층화했습니다. 이를 통해 URL 구조의 가독성을 높이고, 리소스가 많아져도 체계적으로 관리할 수 있도록 설계했습니다.

3.  **설계 검증 및 가이드라인 제시:**
    -   `GET /api/health`와 `GET /api/v1/examples/` API는 단순한 초기 기능을 넘어, 앞서 설계한 아키텍처가 실제로 동작함을 증명하는 프로토타입(Prototype) 역할을 합니다.
    -   특히 `example` 리소스는 **실제 DB 연동 없이 더미 데이터를 사용**함으로써, 새로운 기능 개발 시 '코드로 작성된 컨벤션(Convention as Code)'을 참고하여 향후 개발될 모든 API의 일관성을 보장하는 실질적인 가이드라인의 일부를 제시합니다.

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact
<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items:center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>j.1star.0726@gmail.com</a> 
