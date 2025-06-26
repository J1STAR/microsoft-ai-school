# 2025년 5월 16일 학습 기록

이 디렉토리의 학습 자료는 머신러닝의 핵심 분야인 **분류(Classification)** 모델링을 다룹니다. `Scikit-learn` 라이브러리를 사용하여 붓꽃(Iris) 품종 예측과 로켓 발사 성공 예측 같은 실제 문제를 해결하며 분류 모델 구축의 전 과정을 학습합니다.

## 📝 학습 내용 요약

`notebooks/` 디렉토리의 Jupyter Notebook들은 분류 모델링의 핵심 개념과 기법을 단계적으로 다룹니다.

- **분류 모델 기초**: 붓꽃 데이터셋을 사용하여 의사결정나무(Decision Tree), 서포트 벡터 머신(SVM), 로지스틱 회귀(Logistic Regression) 등 기본적인 분류 알고리즘을 학습하고 성능을 평가합니다.
- **교차 검증 (Cross-Validation)**: 모델의 일반화 성능을 더 신뢰성 있게 평가하기 위해, 훈련 데이터를 여러 번 나누어 검증하는 K-Fold 교차 검증의 원리를 학습하고 실습합니다.
- **하이퍼파라미터 튜닝 (Hyperparameter Tuning)**: 모델의 성능을 최적화하기 위해, `GridSearchCV`를 사용하여 최적의 하이퍼파라미터 조합을 체계적으로 탐색하는 방법을 학습합니다.
- **앙상블 모델 (Ensemble Model)**: 단일 모델보다 뛰어난 성능을 내기 위해 여러 모델을 결합하는 앙상블 기법 중 하나인 `RandomForest`를 학습합니다.
- **특성 중요도 (Feature Importance)**: 의사결정나무 기반 모델에서 어떤 특성(feature)이 예측에 더 중요한 영향을 미치는지 확인하는 방법을 학습합니다.
- **모델 저장 및 재사용**: `pickle`을 사용하여 학습이 완료된 최적의 모델(`rocket_launch_model.pkl`)을 파일로 저장하고, 필요할 때 불러와 새로운 데이터에 대한 예측을 수행하는 방법을 실습합니다.

## 📁 디렉토리 구조 (요약)

```
2025.05.16/
├── data/
│   └── RocketLaunchDataCompleted.csv  # 로켓 발사 데이터
├── notebooks/
│   ├── 03_*_붓꽃품종예측_*.ipynb
│   └── 04_*_로켓발사 성공여부 예측_*.ipynb
└── models/
    └── rocket_launch_model.pkl      # 훈련된 로켓 발사 예측 모델
```

## 💡 주요 학습 기술

- **라이브러리**: Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn
- **핵심 개념**:
    - 분류 모델 (Decision Tree, RandomForest, SVM 등)
    - 교차 검증 (Cross Validation)
    - 하이퍼파라미터 튜닝 (`GridSearchCV`, `RandomizedSearchCV`)
    - 모델 평가 지표 (Accuracy, Precision, Recall, F1-score, Confusion Matrix)
    - 모델 직렬화 (`pickle`)

이 디렉토리의 자료들은 분류 문제 정의부터 모델 선택, 성능 검증, 최적화, 저장까지 머신러닝 분류 프로젝트의 핵심 파이프라인을 깊이 있게 다루고 있습니다. 