### [microsoft-ai-school/2025.05.15](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.05.15)

# 📅 2025년 5월 15일: Scikit-learn을 활용한 회귀 모델링 및 파이프라인 구축

## 📝 학습 목표

이번 학습에서는 머신러닝의 핵심 예측 모델인 **회귀(Regression)**를 깊이 있게 다룹니다. Scikit-learn 라이브러리를 중심으로, 간단한 선형 회귀부터 복잡한 데이터에 대응하기 위한 다항 회귀 및 규제 모델까지 학습합니다. 더 나아가, 데이터 전처리부터 모델 학습까지의 전체 워크플로우를 자동화하고 재사용성을 극대화하는 **파이프라인(Pipeline)** 구축 방법을 중점적으로 실습합니다.

- **다양한 회귀 모델 이해**: 단순/다중/다항 회귀 모델의 원리를 이해하고, 각 모델이 어떠한 데이터 특성에 적합한지 학습합니다.
- **과적합 제어**: 모델의 과적합 문제를 이해하고, 이를 완화하기 위한 L1(Lasso), L2(Ridge) 규제 기법을 적용하는 방법을 익힙니다.
- **모델링 워크플로우 자동화**: Scikit-learn의 `Pipeline`과 `ColumnTransformer`를 사용하여 데이터 스케일링, 인코딩, 모델 학습 과정을 체계적으로 연결하고 자동화하는 방법을 실습합니다.
- **모델 관리**: 학습이 완료된 모델을 `joblib`을 사용해 파일(`.pkl`)로 저장하고, 필요할 때 다시 불러와 새로운 데이터에 대한 예측을 수행하는 방법을 학습합니다.

---

## 🖼️ 프로젝트 개요

두 가지 데이터셋을 활용하여 회귀 분석의 전 과정을 단계별로 학습합니다.

1.  **광고 플랫폼에 따른 판매량 예측 (`advertising.csv`)**: TV, 라디오, 신문 광고비가 실제 매출(Sales)에 미치는 영향을 분석합니다. 회귀 분석의 기초 개념을 다지기에 적합한 간단한 데이터셋을 통해 다양한 회귀 모델을 실험합니다.
2.  **공공자전거 수요 예측 (`bike_sharing_demand.csv`)**: 날짜, 시간, 날씨, 온도 등 복합적인 요인을 바탕으로 특정 시간대의 자전거 대여 수요(`count`)를 예측합니다. 범주형과 수치형 변수가 혼합된 현실적인 데이터를 통해 고급 전처리 기법과 파이프라인의 중요성을 학습합니다.

---

## 📁 파일 구성 및 설명

| 파일명 | 설명 |
| :--- | :--- |
| `notebooks/` | 두 프로젝트에 대한 Jupyter Notebook 파일들이 저장된 디렉터리입니다. EDA, 모델링, 파이프라인 구축 등 단계별 학습 내용이 포함됩니다. |
| `data/` | 분석에 사용된 `advertising.csv`와 `bike_sharing_demand.csv` 원본 데이터 파일이 저장되어 있습니다. |
| `models/` | 학습이 완료되어 저장된 모델 파이프라인(`.pkl`) 파일들이 위치합니다. (`ad_pipe.pkl`, `bike_rent_pipe.pkl` 등) |
| `README.md` | 본 학습 내용에 대한 정리 문서입니다. |

---

## 🚀 주요 학습 내용 및 코드

### 프로젝트 1: 광고 플랫폼에 따른 판매량 예측

이 프로젝트는 간단한 데이터셋을 통해 회귀 분석의 기본기를 다지는 데 중점을 둡니다. 특히 모든 변수가 수치형 데이터일 때, `make_pipeline`을 사용하여 전처리(다항 특성 생성, 스케일링)와 모델 학습을 간단하게 연결할 수 있습니다.

-   **주요 모델**: `LinearRegression`, `Ridge`
-   **핵심 코드**: `make_pipeline`을 활용한 간단한 파이프라인 구성

```python
# notebooks/01_회귀_광고플랫폼에따른판매량예측4_파이프라인구성_완성.ipynb

from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import Ridge

# 다항 특성 생성 -> 스케일링 -> 릿지 회귀 모델 순으로 파이프라인 정의
pipeline = make_pipeline(
    PolynomialFeatures(degree=2, include_bias=False),
    StandardScaler(),
    Ridge(alpha=10)
)

# 파이프라인을 이용한 훈련 (내부적으로 전처리 및 모델 학습이 순차적으로 실행됨)
pipeline.fit(X_train, y_train)

# 훈련된 파이프라인 저장
import joblib
joblib.dump(pipeline, 'models/ad_ridge_pipeline.pkl')
```

### 프로젝트 2: 공공자전거 수요 예측

이 프로젝트는 범주형 변수(계절, 날씨 등)와 수치형 변수(온도, 습도 등)가 섞여있는 복잡한 데이터셋을 다룹니다. 각 변수의 특성에 맞는 전처리(원-핫 인코딩, 스케일링)를 적용하기 위해 `ColumnTransformer`를 `Pipeline`과 결합하는 방법을 학습합니다.

-   **주요 모델**: `LinearRegression`, `KNeighborsRegressor`, `DecisionTreeRegressor` 등 다양한 모델 비교
-   **핵심 코드**: `ColumnTransformer`와 `Pipeline`을 결합하여 변수별 맞춤형 전처리 파이프라인 구성

```python
# notebooks/02_회귀_공공자전거 수요 예측4_파이프라인구성_완성.ipynb

from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.linear_model import LinearRegression

# 1. 전처리할 변수 목록 정의
categorical_features = ["season", "weather", "year", "month", "hour", "dayofweek"]
numerical_features = ["atemp", "humidity", "windspeed"]

# 2. ColumnTransformer로 변수별 전처리 방법 정의
# - 범주형 변수: OneHotEncoder 적용
# - 수치형 변수: StandardScaler 적용
preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features),
        ("num", StandardScaler(), numerical_features)
    ],
    remainder="passthrough" # 지정되지 않은 컬럼은 그대로 통과
)

# 3. 전처리기와 모델을 하나의 파이프라인으로 연결
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', LinearRegression()) # 또는 다른 회귀 모델
])

# 4. 파이프라인 훈련
pipeline.fit(X_train, y_train)
```

---

## 💡 학습 정리

이번 학습을 통해 간단한 회귀 분석부터 시작하여, 현실 데이터를 다루기 위한 복잡한 전처리 과정을 **파이프라인**으로 체계화하고 자동화하는 능력을 길렀습니다.

`make_pipeline`은 모든 변수에 동일한 전처리를 적용할 때 유용하며, `ColumnTransformer`와 `Pipeline`을 함께 사용하면 변수 유형별로 각기 다른 전처리를 적용하는 정교한 워크플로우를 구축할 수 있음을 확인했습니다. 이러한 파이프라인 설계 능력은 재현 가능하고 확장성 있는 머신러닝 프로젝트를 수행하는 데 핵심적인 역량임을 깨달았습니다.

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="mailto:j.1star.0726@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/></a>
<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a> 