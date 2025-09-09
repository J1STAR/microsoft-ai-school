### 📂 Project 보기: [project-ares-interview/ares-backend](https://github.com/project-ares-interview/ares-backend/tree/feature/cover-letter-and-resume)

# 📅 2025년 9월 9일: `ares-backend` 이력서/자기소개서 기능 구현 및 순서 관리 시스템 리팩토링

## 📝 작성 의도

본 문서는 `ares-backend`에 **이력서 및 자기소개서 관리 기능을 추가**하고, 기존 프로필 관리 시스템과 데이터 일관성을 유지하며, **복잡한 순서 관리 로직을 표준화하고 안정화하는 전체 과정**을 기록하는 것을 목표로 합니다.

특히, 수동으로 순서를 관리할 때 발생할 수 있는 데이터 정합성 문제와 코드 복잡성을 해결하기 위해 `django-ordered-model` 패키지를 도입한 **기술적 결정의 배경**과, 이를 통해 어떻게 **백엔드 로직을 단순화하고 예측 가능성을 높였는지**에 대해 상세히 설명합니다. 또한, 신규 이력서 생성 시 사용자 경험을 향상시키기 위해 **기존 프로필 정보를 자동으로 연동하는 기능의 구현 의도와 데이터 흐름**을 명확히 전달하고자 합니다.

## 🏛️ 구현 의도 및 아키텍처 전략

### 1. 핵심 아키텍처: 기능 확장, 로직 표준화, 사용자 경험 향상

-   **문제점**: 기존 프로필 시스템과 별개로 이력서 기능을 구현할 경우, 학력/경력과 같이 중복되는 데이터 모델의 구조가 달라져 데이터 불일치 문제가 발생할 수 있습니다. 또한, 여러 항목의 순서를 수동으로 관리하는 로직은 항목 삭제 및 순서 변경 시 복잡한 연산을 요구하며 잠재적인 버그 발생 가능성이 높습니다.
-   **해결책**: **① 이력서/자기소개서 기능을 모듈화하여 추가**하고, **② `django-ordered-model` 패키지를 도입하여 순서 관리 로직을 표준화**했으며, **③ 신규 이력서 생성 시 프로필 데이터를 자동으로 이전하여 사용자 경험을 향상**시켰습니다.

#### ① 모듈화된 기능 확장: 이력서와 자기소개서 API 구현
`profile` 기능과 마찬가지로 `resume`, `cover_letter` 기능을 독립적인 모듈로 설계하여 추가했습니다. 특히 `Resume` 모델은 `Education`, `Career` 등 여러 하위 모델을 포함하는 복합적인 구조로, `Nested URL`을 통해 각 하위 항목을 명확하게 관리할 수 있도록 RESTful 원칙에 따라 API를 설계했습니다.
-   **Endpoint 예시**: `GET /api/v1/resumes/1/careers/` (1번 이력서의 모든 경력 정보 조회)

#### ② 순서 관리 로직 표준화: `django-ordered-model` 도입
-   **기존 방식의 문제점**: `ViewSet`의 `perform_create` 메서드 내에서 `queryset.aggregate(Max("order"))`를 조회하여 다음 순서를 수동으로 계산했습니다. 이 방식은 새 항목을 마지막에 추가하는 데는 유효하지만, 중간 항목 삭제 시 순서에 공백이 생기거나, 두 항목의 순서를 맞바꿀 때 `UNIQUE` 제약 조건 위반을 피하기 위한 복잡한 3단계 업데이트가 필요한 등 확장성이 매우 떨어졌습니다.
-   **해결**: `django-ordered-model`을 `Education`, `Career` 등 순서가 필요한 모든 `profile`, `resume` 하위 모델에 적용했습니다.
    -   **자동 순서 관리**: 객체 생성 시 자동으로 마지막 순서가 할당되고, 삭제 시 순서가 자동으로 재조정(re-ordering)됩니다.
    -   **그룹별 순서 지정**: `order_with_respect_to = "user"` (프로필) 또는 `order_with_respect_to = "resume"` (이력서) 옵션을 통해 각 그룹 내에서만 순서가 독립적으로 관리되도록 설정하여 데이터 간섭을 원천 차단했습니다.
    -   **코드 단순화**: 모든 `ViewSet`에서 순서 계산 로직을 완전히 제거하여 코드가 간결해지고 유지보수성이 대폭 향상되었습니다.

#### ③ 사용자 경험 향상: 프로필 연동 이력서 자동 생성
사용자가 새로운 이력서를 만들 때마다 학력, 경력 정보를 처음부터 다시 입력하는 불편함을 해소하기 위해, **단방향 데이터 복사 흐름**을 구현했습니다.

1.  **Frontend**: 사용자가 `POST /api/v1/resumes/` 요청을 `{"title": "새 이력서"}` 와 같이 최소한의 정보로 보냅니다.
2.  **ViewSet Layer (`ResumeViewSet`)**: `perform_create` 메서드가 호출됩니다.
3.  **Business Logic (`perform_create`)**:
    a.  `serializer.save(user=user)`를 통해 새로운 `Resume` 객체를 먼저 생성합니다.
    b.  `ProfileEducation.objects.filter(user=user)`를 통해 해당 유저의 모든 프로필 학력 정보를 조회합니다.
    c.  조회된 각 `ProfileEducation` 객체를 순회하며, 그 내용으로 `ResumeEducation` 객체를 생성하여 (a)에서 만든 `Resume` 객체에 연결합니다.
    d.  경력(`Career`) 정보에 대해서도 (b), (c)와 동일한 과정을 반복합니다.
4.  **(응답)**: 기본 정보가 채워진 새로운 이력서 객체가 프론트엔드에 반환됩니다.

## ✅ 구현된 내용 상세

### 1. 모델 계층: 표준화된 순서 관리 및 데이터 구조 동기화

#### `django-ordered-model` 적용 전후 비교
수동 `order` 필드와 `Meta` 클래스를 제거하고 `OrderedModel`을 상속받는 방식으로 변경하여 모델 코드를 선언적이고 간결하게 개선했습니다.

```python
# ares/api/models/profile/career.py (수정 전)
class Career(models.Model):
    user = models.ForeignKey(...)
    # ... other fields ...
    order = models.PositiveIntegerField(...)

    class Meta:
        ordering = ["order"]
        unique_together = ("user", "order")

# ares/api/models/profile/career.py (수정 후)
from ordered_model.models import OrderedModel

class Career(OrderedModel):
    user = models.ForeignKey(...)
    # ... other fields ...

    # 'user'를 기준으로 Career 목록의 순서를 관리
    order_with_respect_to = "user"

    class Meta(OrderedModel.Meta):
        pass
```

#### 프로필-이력서 모델 구조 개선 및 동기화
사용자 요구사항 변경에 따라 `Education`과 `Career` 모델의 구조를 개선하고, `profile`과 `resume` 양쪽에 동일하게 적용하여 데이터 일관성을 확보했습니다.
-   **`Education` 모델**: `school_type` 선택지를 확장하고, `choices`가 있는 `degree`(학위) 필드를 `blank=True, null=True` 옵션과 함께 추가하여 선택적으로 입력받도록 변경했습니다.
-   **`Career` 모델**: 기존 `responsibilities` 필드를 '직위/직책'으로 의미를 명확히 하고, '담당 업무'를 위한 `task` 필드를 `blank=True` 옵션으로 새로 추가했습니다.

### 2. API 계층: 자동화되고 단순화된 비즈니스 로직

#### `ViewSet`의 순서 계산 로직 제거
`django-ordered-model`이 순서 관리를 자동으로 처리하므로, `ViewSet`에서 `Max`를 이용해 순번을 계산하던 코드를 완전히 제거했습니다.

```python
# ares/api/views/v1/profile/career.py (수정 전)
class CareerViewSet(viewsets.ModelViewSet):
    # ...
    def perform_create(self, serializer):
        queryset = self.get_queryset()
        max_order = queryset.aggregate(Max("order"))["order__max"]
        next_order = max_order + 1 if max_order is not None else 0
        serializer.save(user=self.request.user, order=next_order)

# ares/api/views/v1/profile/career.py (수정 후)
class CareerViewSet(viewsets.ModelViewSet):
    # ...
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
```

#### 이력서 자동 생성 로직 구현
`ResumeViewSet`에 프로필 정보를 복사하는 상세 로직은 다음과 같습니다.
```python
# ares/api/views/v1/resume/base.py
class ResumeViewSet(viewsets.ModelViewSet):
    # ...
    def perform_create(self, serializer):
        user = self.request.user
        resume = serializer.save(user=user)

        # 프로필 학력 정보 복사
        profile_educations = ProfileEducation.objects.filter(user=user)
        for edu in profile_educations:
            ResumeEducation.objects.create(
                resume=resume,
                school_type=edu.school_type,
                school_name=edu.school_name,
                major=edu.major,
                degree=edu.degree,
                status=edu.status,
                admission_date=edu.admission_date,
                graduation_date=edu.graduation_date,
            )

        # 프로필 경력 정보 복사 (task 필드 포함)
        profile_careers = ProfileCareer.objects.filter(user=user)
        for career in profile_careers:
            ResumeCareer.objects.create(
                resume=resume,
                company_name=career.company_name,
                experience_type=career.experience_type,
                is_attending=career.is_attending,
                start_date=career.start_date,
                end_date=career.end_date,
                department=career.department,
                responsibilities=career.responsibilities,
                task=career.task,
                reason_for_leaving=career.reason_for_leaving,
            )
```

## 🤔 트러블 슈팅 및 고민한 내용

-   **고민**: 다중 항목의 순서를 어떻게 효율적이고 안전하게 관리할 것인가?
-   **문제 분석**: 단순히 `order` 필드를 추가하는 방식은 생성 시에는 간단하지만, 중간 항목 삭제 시 순서를 재정렬(re-ordering)하거나, 두 항목의 순서를 맞바꿀 때 `UNIQUE` 제약 조건 위반 등 복잡한 문제를 야기합니다. 예를 들어, `item A(order=2)`와 `item B(order=5)`의 순서를 바꾸려면, `A`를 임시 값으로 바꾸고, `B`를 2로 바꾸고, 다시 `A`를 5로 바꾸는 등 최소 3번의 DB 업데이트가 필요하며 이는 트랜잭션으로 묶여야 합니다.
-   **해결**: 이러한 순서 관리 로직을 직접 구현하는 대신, 검증되고 널리 사용되는 `django-ordered-model` 라이브러리를 도입하기로 결정했습니다. 이를 통해 직접 구현에 드는 시간을 절약하고, 순서 관리의 안정성과 정확성을 높일 수 있었습니다. 향후 순서 변경 API를 구현할 때도 패키지가 제공하는 `up()`, `down()`, `to()` 메서드를 활용하여 손쉽게 확장할 수 있는 기반을 마련했습니다.
-   **마이그레이션**: 기존에 `order` 필드가 있던 모델에 `django-ordered-model`을 적용하면서 마이그레이션 충돌이 발생했습니다. `order` 필드를 수동으로 관리하던 이전 마이그레이션 파일들을 삭제하고, `django-ordered-model`이 적용된 최종 모델 상태를 기준으로 마이그레이션 파일을 새로 생성하여 문제를 해결했습니다.

--- 

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact

<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items.center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>j.1star.0726@gmail.com</a>
