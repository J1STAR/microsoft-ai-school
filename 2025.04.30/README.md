# 2025년 4월 30일 학습 기록

이 디렉토리는 데이터 과학 및 머신러닝의 다양한 주제를 다루는 여러 학습 자료와 프로젝트를 포함하고 있습니다. 데이터 전처리, 이미지 분류, 시각화 등 여러 분야의 Jupyter Notebook 예제를 통해 실용적인 기술을 학습합니다.

## 📝 학습 내용 요약

`LearningLab/notebooks/` 디렉토리 내의 각 하위 디렉토리는 특정 데이터 과학 주제를 다룹니다.

- **`Preprocessing-master/`**: 데이터 분석의 필수 단계인 데이터 전처리(preprocessing) 기술을 학습합니다.
  - `02.01.Selection.ipynb`: 데이터에서 특정 행과 열을 선택하는 방법을 다룹니다.
  - `02.02.Aggregation.ipynb`: 데이터를 그룹화하고 합계, 평균 등 집계 연산을 수행하는 방법을 학습합니다.
  - `02.03.Join.ipynb`: 여러 데이터 소스를 결합하는 조인(Join) 연산을 실습합니다.

- **`CustomVision/`**: Azure Custom Vision과 같은 서비스를 활용한 이미지 분류 및 객체 탐지 프로젝트를 다룹니다.
  - `AmsukIdentification.ipynb`: 특정 종류의 암석을 식별하는 이미지 분류 모델을 학습하고 사용하는 방법을 보여줍니다.
  - `objectdetection.ipynb`: 이미지 내에서 특정 객체의 위치를 찾아내는 객체 탐지 모델을 실습합니다.

- **`etc/`**: 기타 데이터 분석 및 시각화 예제를 포함합니다.
  - `image-classifier.ipynb`: 기본적인 이미지 분류 모델을 구축하는 과정을 다룹니다.
  - `matplotlib.ipynb`: `Matplotlib` 라이브러리를 사용한 데이터 시각화 기법을 학습합니다.
  - `atlantis.csv`: 노트북 예제에서 사용되는 샘플 데이터입니다.

- **`awesomebook-master/`**: 특정 교재나 강의 자료와 관련된 심화 프로젝트로, 데이터와 전처리 스크립트를 포함하고 있습니다.

## 📁 파일 목록

```
2025.04.30/
└── LearningLab/
    ├── notebooks/
    │   ├── Preprocessing-master/  # 데이터 전처리 심화 (선택, 집계, 조인 등)
    │   ├── CustomVision/          # 클라우드 AI 기반 이미지 분류/객체 탐지
    │   ├── awesomebook-master/    # 특정 교재 예제 코드
    │   └── etc/                   # 기타 시각화 및 분류기 실습
    └── requirements.txt         # 실습에 필요한 Python 패키지 목록
```

## 💡 주요 학습 기술

- **데이터 처리**: Pandas
- **데이터 시각화**: Matplotlib
- **AI 서비스**: 클라우드 기반 Custom Vision API (예: Azure, GCP, AWS)
- **머신러닝/딥러닝 프레임워크**: Scikit-learn, TensorFlow, PyTorch 등 (교재 내용에 따라 다름)

이 디렉토리는 특정 날짜의 단일 미션이라기보다는, 앞으로의 AI 관련 학습을 위한 포괄적인 자료 저장소 및 실습 환경의 역할을 하는 것으로 보입니다. 