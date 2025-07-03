### [microsoft-ai-school/2025.05.15](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.05.15)

# 2025년 5월 15일 학습 기록

이 디렉토리의 학습 자료는 머신러닝의 핵심 분야 중 하나인 **회귀(Regression)** 모델링을 다룹니다. `Scikit-learn` 라이브러리를 사용하여 단순 선형 회귀부터 다중 회귀, 다항 회귀, 규제가 있는 회귀 모델(Ridge, Lasso)까지 다양한 기법을 학습하고, 모델의 성능을 평가하는 방법을 실습합니다.

## 📝 학습 내용 요약

`notebooks/` 디렉토리의 Jupyter Notebook들은 회귀 분석의 다양한 측면을 단계적으로 다룹니다.

- **단순 선형 회귀 (Simple Linear Regression)**: 하나의 독립 변수를 사용하여 종속 변수를 예측하는 가장 기본적인 회귀 모델을 학습합니다. 광고 비용(`advertising.csv`)에 따른 판매량 예측 예제를 통해 회귀의 기본 개념을 이해합니다.
- **다중 선형 회귀 (Multiple Linear Regression)**: 두 개 이상의 독립 변수를 사용하여 예측 정확도를 높이는 다중 회귀 모델을 학습합니다.
- **다항 회귀 (Polynomial Regression)**: 변수 간의 비선형 관계를 모델링하기 위해 다항 특성을 생성하고, 이를 선형 모델에 적용하는 방법을 학습합니다.
- **과대적합과 규제 (Overfitting and Regularization)**: 모델이 훈련 데이터에만 과도하게 최적화되는 과대적합 문제를 이해하고, 이를 완화하기 위한 **Ridge(L2)** 및 **Lasso(L1)** 규제 기법을 학습합니다.
- **파이프라인 (Pipeline)**: 데이터 전처리(예: 스케일링)와 모델 학습을 하나로 묶어주는 `Pipeline`을 구축하여 코드의 간결성과 재사용성을 높이는 방법을 실습합니다.
- **모델 저장 및 재사용**: 학습된 모델(`ad_lr_model.pkl`)과 스케일러(`ad_lr_scaler.pkl`)를 `pickle`을 사용하여 파일로 저장하고, 필요할 때 다시 불러와 예측에 사용하는 방법을 학습합니다.

## 📁 파일 목록
// ... existing code ... 

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="mailto:j.1star.0726@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/></a>
<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a> 