### 📂 GitHub에서 보기: [microsoft-ai-school/2025.05.27](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.05.27)

# 2025년 5월 27일 학습 기록

이 디렉토리는 딥러닝을 활용한 **이미지 분류(Image Classification)** 프로젝트를 다룹니다. 특히, 사전 훈련된(pre-trained) 모델을 기반으로 새로운 데이터셋에 맞게 모델을 미세 조정하는 **전이 학습(Transfer Learning)** 기법을 중점적으로 학습합니다.

## 📝 학습 내용 요약

`ClassifySpaceRockCode.ipynb` 노트북은 달의 암석 이미지(현무암-`Basalt`, 고지대암-`Highland`)를 분류하는 모델을 구축하는 과정을 담고 있습니다.

- **데이터 준비 및 증강**:
  - `TensorFlow`의 `ImageDataGenerator`를 사용하여 훈련(Train) 및 검증(Validation) 데이터셋을 준비합니다.
  - 훈련 데이터에 회전, 확대/축소, 좌우 반전 등 다양한 변형을 무작위로 적용하는 **데이터 증강(Data Augmentation)**을 통해 모델의 일반화 성능을 높이는 방법을 학습합니다.

- **전이 학습 (Transfer Learning)**:
  - 대규모 이미지 데이터셋(ImageNet)으로 미리 학습된 VGG16, ResNet, InceptionV3와 같은 모델을 불러옵니다.
  - 사전 훈련된 모델의 합성곱 계층(Convolutional Base)은 그대로 사용하여 이미지의 특징을 추출하고, 모델의 마지막 부분인 완전 연결 계층(Fully Connected Layer)만 새로운 데이터셋(달 암석 이미지)에 맞게 재구성하여 훈련시키는 방법을 실습합니다.

- **모델 훈련 및 평가**:
  - 구성된 모델을 훈련시키고, `matplotlib`을 사용하여 훈련 과정에서의 정확도(accuracy)와 손실(loss) 변화를 시각화합니다.
  - 훈련된 모델을 사용하여 검증 데이터셋에 대한 예측을 수행하고, 성능을 평가합니다.

- **기타 노트북**: `imageclassification.ipynb`와 `objectdetection.ipynb`는 각각 일반적인 이미지 분류와 객체 탐지에 대한 추가적인 실습 자료입니다.

## 📁 파일 목록

```
2025.05.27/
├── data/
│   ├── Basalt/        # 현무암 이미지 데이터
│   └── Highland/      # 고지대 암석 이미지 데이터
├── notebooks/
│   ├── imageclassification.ipynb
│   └── objectdetection.ipynb
├── ClassifySpaceRockCode.ipynb  # 메인 이미지 분류 프로젝트 노트북
└── requirements.txt         # 프로젝트에 사용된 Python 패키지 목록
```

## 💡 주요 학습 기술

- **핵심 라이브러리**: `TensorFlow`/`Keras` 또는 `PyTorch`, `OpenCV`, `Pandas`, `Matplotlib`
- **딥러닝 모델**:
    - 합성곱 신경망 (CNN)
    - 사전 훈련 모델 (VGG16, ResNet50 등)
- **핵심 개념**:
    - 이미지 분류 (Image Classification)
    - 데이터 증강 (Data Augmentation)
    - 전이 학습 (Transfer Learning)
    - 모델 평가 지표 (Accuracy, Confusion Matrix)
    - 객체 탐지 (Object Detection)

이 디렉토리의 자료들은 딥러닝을 활용하여 실제 컴퓨터 비전 문제를 해결하는 표준적인 프로젝트 파이프라인을 경험할 수 있도록 구성되어 있습니다. 

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="mailto:j.1star.0726@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/></a>
<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a> 