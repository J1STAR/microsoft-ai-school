### 📂 Project 보기: [project-ares-interview/ares-backend](https://github.com/project-ares-interview/ares-backend/tree/feature/additional-user-information)

# 📅 2025년 9월 5일: `ares-backend` 사용자 상세 프로필 관리 시스템 구현

## 📝 작성 의도

`ares-frontend`와 연동하여 사용자가 자신의 상세 프로필 정보(병역, 보훈, 장애, 학력, 경력, 관심 직무)를 체계적으로 관리할 수 있는 백엔드 API를 구축합니다. 이 문서는 단순 기능 구현을 넘어, **기본 사용자 정보만으로는 부족한 취업 및 복지 서비스 요구사항을 충족하고, 복잡한 다중 데이터 구조와 사용자 정의 순서 관리를 안정적으로 처리하기 위한 확장 가능한 아키텍처 설계 과정**을 상세히 기록하는 것을 목표로 합니다.

단일 항목(병역)부터 다중 항목(학력, 경력)까지 다양한 데이터 구조를 통합적으로 관리하면서도, **프론트엔드는 일관된 REST API 패턴으로 모든 프로필 항목을 동일하게 처리할 수 있도록** 예측 가능하고 직관적인 API 설계에 중점을 둡니다.

## 🏛️ 구현 의도 및 아키텍처 전략

### 1. 핵심 아키텍처: 모듈화, 표준화, 데이터 무결성을 통한 확장 가능한 시스템

- **문제점**: 모든 프로필 정보를 하나의 거대한 사용자 테이블에 저장하면, 새로운 프로필 항목 추가 시 기존 테이블 구조 변경이 필요하고, 사용하지 않는 정보까지 함께 조회되어 성능이 저하되며, 특정 프로필 항목의 변경이 전체 시스템에 영향을 미치는 문제가 발생합니다.
- **해결책**: 각 프로필 항목을 **독립적인 모델로 분리(모듈화)**하고, Django REST Framework의 **`ModelViewSet`을 표준 템플릿으로 활용(표준화)**했습니다. 또한 **데이터베이스 제약 조건과 비즈니스 로직을 통해 데이터의 정합성(무결성)**을 보장했습니다.

#### ① 모듈화: 레고 블록처럼 기능을 분리하고 조립하기
각 프로필 항목을 별도의 모델과 API로 설계하여, 향후 "자격증"과 같은 새로운 항목이 필요할 때 기존 시스템에 영향을 주지 않고 안전하게 기능을 확장할 수 있는 기반을 마련했습니다.

#### ② 표준화: 모든 프로필에 동일한 '설계도' 적용하기
`ModelViewSet`을 표준 템플릿으로 사용하여 모든 프로필 API가 동일한 CRUD 패턴을 따르도록 구현했습니다. 이를 통해 프론트엔드는 일관된 방식으로 모든 프로필 데이터를 처리할 수 있고, 백엔드는 코드 중복을 최소화하여 생산성을 높였습니다.

#### ③ 데이터 무결성: 사용자의 데이터를 안전하게 지키기
- **사용자 데이터 격리**: API는 로그인한 본인의 데이터만 접근할 수 있도록 설계하여 다른 사용자의 정보가 노출될 위험을 원천 차단했습니다.
- **순서 중복 방지**: `unique_together` 제약 조건을 통해 한 사용자가 동일한 순서 번호를 중복으로 가질 수 없도록 데이터베이스 레벨에서 보장했습니다.
- **자동 순번 할당**: 사용자가 새 항목을 추가하면, 시스템이 알아서 가장 마지막 순서 번호를 계산하여 부여함으로써 데이터의 일관성을 유지합니다.

### 2. 명확하게 분리된 레이어별 역할 및 데이터 흐름

각 레이어는 명확한 단일 책임을 가집니다. 예를 들어, **학력 정보 생성 데이터 흐름**은 다음과 같이 단방향으로 이루어집니다.

1.  **Frontend**: 사용자가 학력 정보를 입력하고 `POST /api/v1/profile/educations/` 요청을 보냅니다.
2.  **URL Router (`urls.py`)**: 요청을 `EducationViewSet`의 `create` 액션으로 라우팅합니다.
3.  **ViewSet Layer (`EducationViewSet`)**: `permission_classes`로 인증을 확인하고, `get_queryset()`으로 사용자별 데이터 격리를 보장합니다.
4.  **Serializer Layer (`EducationSerializer`)**: 입력 데이터의 유효성을 검증하고 Python 객체로 변환합니다.
5.  **Business Logic (`perform_create`)**: 현재 사용자의 기존 학력 중 최대 `order` 값을 조회하여 새 항목에 자동으로 다음 순서를 할당합니다.
6.  **Model Layer (`Education`)**: 데이터베이스에 저장하며, `unique_together` 제약 조건으로 데이터 무결성을 보장합니다.
7.  **(응답)**: 생성된 학력 정보를 JSON으로 직렬화하여 프론트엔드에 반환합니다.
8.  **Frontend**: 새로 생성된 학력이 목록의 마지막에 자동으로 추가되어 화면에 표시됩니다.

## ✅ 구현된 내용 상세

### 1. 모델 계층: 유연하고 안전한 데이터 구조

#### 단일 항목 모델 (1:1 관계)
`OneToOneField`를 사용하여 사용자당 하나의 정보만 관리합니다.
```python
# ares/api/models/profile/military_service.py
class MilitaryService(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    status = models.CharField(choices=ServiceStatus.choices, ...)
```

#### 다중 항목 모델 (1:N 관계)
`ForeignKey`를 사용하여 사용자당 여러 정보를 관리하며, `Meta` 클래스를 통해 데이터베이스 규칙을 정의합니다.
```python
# ares/api/models/profile/education.py
class Education(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    school_name = models.CharField(...)
    # ... other fields ...
    order = models.PositiveIntegerField(...) # 순서 필드

    class Meta:
        ordering = ["order"] # 조회 시 order 필드로 자동 정렬
        unique_together = ("user", "order") # 사용자별 순서 중복 방지
```

### 2. API 계층: 일관되고 예측 가능한 인터페이스

#### ViewSet: 비즈니스 로직과 보안 처리
`ModelViewSet`을 상속받아 표준 CRUD 기능을 구현하고, `get_queryset`과 `perform_create`를 오버라이드하여 커스텀 로직을 추가합니다.
```python
# ares/api/views/v1/profile/education.py
class EducationViewSet(viewsets.ModelViewSet):
    serializer_class = EducationSerializer
    permission_classes = [IsAuthenticated] # 로그인 필수

    # 1. 보안: 로그인한 본인의 데이터만 조회하도록 제한
    def get_queryset(self):
        return Education.objects.filter(user=self.request.user)

    # 2. 비즈니스 로직: 새 항목 생성 시 순서 자동 할당
    def perform_create(self, serializer):
        queryset = self.get_queryset()
        max_order = queryset.aggregate(Max("order"))["order__max"]
        next_order = max_order + 1 if max_order is not None else 0
        serializer.save(user=self.request.user, order=next_order)
```

#### Serializer: 데이터 유효성 검증 및 변환
API의 입출력 데이터 형식을 정의하고 유효성을 검증합니다.
```python
# ares/api/serializers/v1/profile/education.py
class EducationSerializer(serializers.ModelSerializer):
    # 생성 시에는 order 필드가 필수가 아님
    order = serializers.IntegerField(required=False)
    # ISO 8601 형식의 문자열을 datetime 객체로 변환
    admission_date = serializers.DateTimeField()
    
    class Meta:
        model = Education
        fields = "__all__"
        # ViewSet에서 자동으로 할당하므로 읽기 전용으로 설정
        read_only_fields = ["user"]
```

#### URL 라우팅: 명시적이고 직관적인 경로 설정
`DefaultRouter` 대신 `urlpatterns`에 직접 경로를 명시하여 URL 구조와 `ViewSet` 액션 간의 관계를 명확하게 표현했습니다.
```python
# ares/api/views/v1/urls.py
urlpatterns = [
    # 목록 조회(GET) 및 생성(POST)
    path("profile/educations/", EducationViewSet.as_view({"get": "list", "post": "create"})),
    # 상세 조회(GET), 수정(PUT/PATCH), 삭제(DELETE)
    path("profile/educations/<int:pk>/", EducationViewSet.as_view({
        "get": "retrieve", "put": "update", 
        "patch": "partial_update", "delete": "destroy"
    })),
]
```

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact

<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items-center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>j.1star.0726@gmail.com</a>