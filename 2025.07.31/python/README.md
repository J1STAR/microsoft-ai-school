### 📂 GitHub에서 보기: [microsoft-ai-school/2025.07.31/python](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.07.31/python)

# 📅 2025년 7월 31일: Django REST Framework 기반 뉴스 API 서버 구축

## 🛠️ 개발 환경 설정 및 실행

본 프로젝트는 `mise`를 사용한 개발 환경 관리와 `uv`를 사용한 Python 패키지 관리를 권장합니다.

### 1. 사전 준비: `mise` 와 `uv`

-   **`mise`**: 다양한 프로그래밍 언어와 개발 도구의 버전을 프로젝트별로 손쉽게 관리해주는 도구입니다. `mise.toml` 파일을 통해 필요한 도구(예: Python 3.11)와 버전을 명시하면, 해당 디렉토리에 들어왔을 때 자동으로 지정된 버전으로 전환해줍니다. 이를 통해 각 개발자의 로컬 환경에 설치된 도구 버전에 관계없이 프로젝트에 명시된 특정 버전(예: Python 3.11)을 일관되게 사용하도록 보장합니다. 결과적으로 팀 전체의 개발 환경을 표준화하고, 환경 차이에서 발생하는 잠재적 오류를 방지합니다.
    -   **설치 가이드**: [공식 설치 문서](https://mise.jdx.dev/getting-started.html)를 참고하여 `mise`를 설치하세요.

-   **`uv`**: Rust로 작성된 매우 빠른 Python 패키지 관리 도구입니다. `pip`과 `venv`의 기능을 하나로 합쳐, 가상 환경 생성, 패키지 설치/삭제 등을 단일 명령어로 빠르고 일관되게 처리할 수 있습니다. `pyproject.toml`과 호환되며, `uv.lock` 파일을 통해 의존성을 고정하여 재현 가능한 빌드를 보장합니다.
    -   **설치 가이드**: [공식 설치 문서](https://github.com/astral-sh/uv#installation)를 참고하여 `uv`를 설치하세요. `mise`를 사용한다면 `mise install uv`로 간단히 설치할 수 있습니다.

### 2. 프로젝트 실행 단계

1.  **개발 환경 활성화**:
    프로젝트 루트 디렉토리에서 아래 명령어를 실행하면 `mise.toml`에 정의된 Python 버전이 자동으로 활성화됩니다.
    ```bash
    mise use python@3.11
    ```

2.  **가상 환경 생성 및 활성화**:
    `uv`를 사용하여 프로젝트를 위한 격리된 가상 환경을 생성합니다.
    ```bash
    # .venv 라는 이름의 가상환경 생성
    uv venv
    # 가상환경 활성화 (Windows)
    .venv\Scripts\activate
    # 가상환경 활성화 (macOS/Linux)
    source .venv/bin/activate
    ```

3.  **의존성 설치**:
    `pyproject.toml` 파일에 명시된 의존성을 `uv`를 통해 설치합니다.
    ```bash
    uv pip install -e .
    ```

4.  **데이터베이스 마이그레이션**:
    모델 변경 사항을 데이터베이스 스키마에 적용합니다.
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

5.  **개발 서버 실행**:
    ```bash
    python manage.py runserver
    ```
    서버가 실행되면 `http://127.0.0.1:8000` 주소로 API에 접근할 수 있습니다.

---

## 📝 프로젝트 목표

이번 프로젝트는 Django와 Django REST Framework(DRF)를 사용하여 견고하고 확장 가능한 뉴스 API 서버를 구축하는 것을 목표로 합니다. 외부 뉴스 소스(예: RSS 피드)에서 데이터를 수집, 저장하고, 이를 모바일 클라이언트나 다른 웹 서비스에서 사용할 수 있도록 RESTful API 형태로 제공하는 백엔드 시스템을 구현합니다.

- **Django 프로젝트 구조화**: Django의 앱(app) 개념을 활용하여 프로젝트의 관심사를 명확하게 분리합니다. 모델, 뷰, 시리얼라이저, URL 설정을 각각 모듈화하여 관리함으로써 유지보수성을 높입니다.
- **커스텀 사용자 모델 구현**: Django의 기본 사용자 모델을 확장하여, 이메일을 주 식별자로 사용하는 커스텀 `User` 모델을 설계하고 적용합니다. 이를 통해 실제 서비스에서 요구하는 유연한 회원 관리 시스템의 기반을 다집니다.
- **RESTful API 설계 및 구현**: DRF를 사용하여 뉴스 목록 조회, 사용자 인증(로그인/로그아웃), 사용자 정보 조회 등 핵심 기능을 위한 API 엔드포인트를 설계하고 구현합니다.
- **API 버전 관리**: URL 경로에 버전(예: `/v1/`)을 명시적으로 포함시켜, 향후 API가 변경되더라도 기존 클라이언트와의 호환성을 유지할 수 있는 API 버전 관리 전략을 학습합니다.
- **의존성 관리**: `uv`와 `pyproject.toml`을 사용하여 Python 프로젝트의 의존성을 선언적으로 관리하고, 일관된 개발 및 배포 환경을 보장합니다.

---

## 🏛️ 시스템 아키텍처

본 백엔드 서버는 클라이언트의 요청을 받아 처리하고 데이터베이스와 상호작용합니다.

1.  **클라이언트 (Client)**: React Native로 만들어진 모바일 앱 또는 다른 웹 서비스에서 HTTP 요청을 보냅니다.
2.  **웹 서버 (Web Server - Django)**:
    -   **URL Dispatcher**: 들어온 요청의 URL을 분석하여 적절한 API 뷰(View)로 전달합니다.
    -   **API Views**: DRF의 `APIView`를 사용하여 각 엔드포인트의 비즈니스 로직을 처리합니다. 요청 데이터를 검증하고, 서비스 로직을 호출하거나 직접 모델과 상호작용합니다.
    -   **Serializers**: Django 모델 인스턴스(쿼리셋)를 JSON과 같은 원시 데이터 타입으로 변환(직렬화)하거나, 반대로 클라이언트가 보낸 JSON 데이터를 모델 인스턴스로 변환(역직렬화)하는 역할을 합니다.
3.  **데이터베이스 (Database - SQLite)**:
    -   **Models**: `NewsItem`, `NewsChannel`, `User` 등 애플리케이션의 데이터를 구조화하여 정의합니다. Django ORM을 통해 데이터베이스 테이블과 매핑됩니다.
    -   **DB**: 실제 데이터가 영구적으로 저장되는 공간입니다. 개발 환경에서는 간편한 `SQLite`를 사용합니다.

```
+------------------+      HTTP Request       +--------------------------+
|                  | ----------------------> |                          |
|   📱 클라이언트   |                         |     🌐 Django 웹 서버     |
|                  | <---------------------- |                          |
+------------------+      HTTP Response      +--------------------------+
                                                    |
                                                    | 1. URL 분석
                                                    v
                             +---------------------------------------------+
                             |              Django Application             |
                             | +------------------+   +------------------+ |
                             | | URL Dispatcher   |-->|    API Views     | |
                             | +------------------+   +------------------+ |
                             |         ^                      | ^          |
                             |         |                      v |          |
                             | +------------------+   +------------------+ |
                             | |   Serializers    |<->|      Models      | |
                             | +------------------+   +------------------+ |
                             |                                |            |
                             +--------------------------------|------------+
                                                              |
                                                              v 5. DB 쿼리
                                                      +------------------+
                                                      |  🗄️ 데이터베이스   |
                                                      +------------------+
```

---

## 📁 파일 구성 및 설명

| 경로 | 파일명/디렉토리 | 설명 |
| :--- | :--- | :--- |
| `project/` | | Django 프로젝트의 전반적인 설정을 담고 있는 패키지입니다. |
| | `settings.py` | 데이터베이스, 설치된 앱, 미들웨어 등 프로젝트의 모든 설정을 정의합니다. |
| | `urls.py` | 프로젝트의 최상위 URL 라우팅을 담당합니다. 각 앱의 `urls.py`를 `include`하여 전체 URL 구조를 형성합니다. |
| `news/` | | 뉴스와 사용자 관련 기능을 모두 포함하는 핵심 Django 앱입니다. 기능별로 패키지를 분리하여 구조화했습니다. |
| | `models/` | 데이터베이스 모델을 기능별(`news.py`, `user.py`)로 분리하여 정의한 패키지입니다. `__init__.py`를 통해 모델들을 상위 `models` 네임스페이스로 노출시켜 `from news.models import User`와 같이 쉽게 임포트할 수 있도록 구성했습니다. |
| | `apis/` | API 뷰 로직을 버전별(`v1/`), 기능별(`news.py`, `user.py`)로 분리하여 정의한 패키지입니다. 이를 통해 API의 버전이 올라가더라도 기존 코드를 해치지 않고 새로운 로직을 추가할 수 있습니다. |
| | `serializers/` | Django 모델 인스턴스를 JSON으로 변환(직렬화)하거나 그 반대의 역할(역직렬화)을 하는 DRF 시리얼라이저를 기능별(`news.py`, `user.py`)로 정의하는 패키지입니다. |
| | `urls/` | API URL 설정을 버전별(`v1/`), 기능별(`news.py`, `user.py`)로 분리하여 정의한 패키지입니다. 최상위 `urls.py`에서 이 설정들을 `include`하여 API 엔드포인트를 구성합니다. |
| `manage.py` | | `runserver`, `makemigrations` 등 Django 관리 명령을 실행하기 위한 유틸리티 스크립트입니다. |
| `pyproject.toml` | | `uv`를 위한 의존성 및 프로젝트 메타데이터 설정 파일입니다. |
| `uv.lock` | | 설치된 패키지의 정확한 버전을 기록하여 환경의 일관성을 보장하는 lock 파일입니다. |
| `README.md` | | 본 프로젝트에 대한 설명 문서입니다. |

---

## 📢 API 응답 예시

`GET /v1/news/` 요청 시 다음과 같은 형식의 JSON 응답을 반환합니다.

<img src="./results/api_news_response.png" alt="뉴스 API 응답 예시"/>

---

## 🚀 주요 기능 및 코드

### 1. 커스텀 사용자 모델 (`news/models/user.py`)

Django의 기본 `User` 모델 대신 이메일을 `USERNAME_FIELD`로 사용하는 커스텀 `User` 모델을 정의하여, 현대 웹 서비스의 일반적인 인증 방식을 따릅니다. `BaseUserManager`를 상속받은 `UserManager`를 구현하여 `create_user`, `create_superuser` 명령을 처리합니다.

```python
class User(BaseModel, AbstractBaseUser, PermissionsMixin):
    """
    애플리케이션의 커스텀 사용자 모델입니다.
    이메일 주소를 사용자 이름(`USERNAME_FIELD`)으로 사용합니다.
    """
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS: list[str] = ['name']

    username = models.EmailField(
        max_length=50, unique=True, verbose_name="이메일",
        help_text="로그인 시 사용될 사용자의 이메일 주소입니다."
    )
    name = models.CharField(
        max_length=30, null=True, blank=True, verbose_name="이름",
        help_text="사용자의 실명 또는 별명입니다."
    )
    # ...
    objects = UserManager()
```

### 2. 뉴스 목록 API 뷰 (`news/apis/v1/news.py`)

`APIView`를 상속받아 뉴스 기사 목록을 조회하는 `GET` 요청을 처리합니다. `NewsItem` 모델에서 모든 객체를 가져와 `NewsItemSerializer`로 직렬화한 후, 표준화된 JSON 형식으로 응답합니다.

```python
class NewsItemListAPIView(APIView):
    """
    뉴스 기사 목록을 조회하기 위한 API 뷰입니다.
    """
    def get(self, request: HttpRequest, *args: Any, **kwargs: Any) -> JsonResponse:
        """
        GET 요청을 처리하여 모든 뉴스 기사 목록을 반환합니다.
        """
        news_items = NewsItem.objects.all().order_by("-pub_date")
        serializer = NewsItemSerializer(news_items, many=True)

        response_data: Dict[str, Any] = {
            "status": "OK",
            "message": "뉴스 목록을 조회하였습니다.",
            "data": serializer.data
        }
        return JsonResponse(response_data)
```

### 3. URL 버전 관리 (`project/urls.py` 및 `news/urls/`)

프로젝트의 최상위 `urls.py`에서 `v1` 접두사를 가진 경로를 각 앱의 하위 URL 설정 파일로 위임합니다. 이를 통해 API 버전별로 엔드포인트를 그룹화하여 관리의 용이성과 확장성을 확보합니다.

```python
# project/urls.py
urlpatterns = [
    path('admin/', admin.site.urls),
    # 'v1/users/' 경로 요청은 news.urls.v1.user 모듈로 위임
    path('v1/users/', include('news.urls.v1.user')),
    # 'v1/news/' 경로 요청은 news.urls.v1.news 모듈로 위임
    path('v1/news/', include('news.urls.v1.news')),
]

# news/urls/v1/news.py
urlpatterns = [
    # '/v1/news/' 에 해당하는 뷰
    path("", NewsItemListAPIView.as_view(), name="news-list"),
]
```

---

## 💡 학습 정리

이번 프로젝트를 통해 Django와 DRF를 사용하여 체계적인 백엔드 API 서버를 구축하는 전반적인 과정을 학습했습니다. 특히, 단순히 기능을 구현하는 것을 넘어, 커스텀 사용자 모델 적용, 모듈화된 프로젝트 구조 설계, API 버전 관리 등 실제 프로덕션 환경에서 요구되는 중요한 설계 원칙들을 적용하는 경험을 할 수 있었습니다. 이는 향후 더 복잡하고 규모가 큰 백엔드 시스템을 개발하는 데 있어 튼튼한 기반이 될 것입니다.

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact
<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items:center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>j.1star.0726@gmail.com</a> 