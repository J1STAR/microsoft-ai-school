### [microsoft-ai-school/2025.05.28](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.05.28)

# 2025년 5월 28일 학습 기록

이 디렉토리는 `Gradio` 라이브러리를 사용하여 머신러닝 모델을 위한 **간단한 웹 데모 UI**를 제작하는 방법을 학습하는 자료를 포함하고 있습니다. 복잡한 웹 프레임워크 없이 몇 줄의 Python 코드만으로 모델의 입력과 출력을 시각적으로 표현하고 사용자와 상호작용할 수 있는 인터페이스를 만드는 데 중점을 둡니다.

## 📝 학습 내용 요약

`GradioTest*.ipynb` 노트북들은 `Gradio`의 다양한 컴포넌트와 기능을 단계적으로 실습합니다.

- **기본 인터페이스 생성**:
  - `gr.Interface` 함수를 사용하여 모델을 감싸는 가장 기본적인 웹 UI를 생성합니다.
  - 함수의 입력(inputs)과 출력(outputs)에 해당하는 UI 컴포넌트(예: 텍스트박스, 이미지 업로더, 슬라이더)를 지정하는 방법을 학습합니다.

- **다양한 입출력 컴포넌트 활용**:
  - **텍스트(Text)**: 간단한 텍스트 입출력을 처리합니다.
  - **이미지(Image)**: 사용자가 이미지를 업로드하고, 모델이 처리된 이미지를 출력하는 인터페이스를 만듭니다. (예: 이미지 분류, 스타일 변환)
  - **숫자(Number), 슬라이더(Slider)**: 숫자 입력을 받거나 슬라이더로 파라미터를 조절하는 UI를 구현합니다.
  - **드롭다운(Dropdown), 라디오(Radio)**: 여러 선택지 중 하나를 고르는 UI를 만듭니다.

- **실제 모델 연동**:
  - 이전에 학습시킨 이미지 분류 모델(`moonrock/`)이나 다른 머신러닝 모델을 가져와 `Gradio` 인터페이스에 연결합니다.
  - 사용자가 웹 UI를 통해 데이터를 입력하면, 백엔드에서 모델이 예측을 수행하고 그 결과를 다시 UI에 표시하는 전체 과정을 실습합니다.

## 📁 파일 목록

```
2025.05.28/
├── data/
│   ├── bungee_character/  # 객체 탐지 테스트용 이미지 (추정)
│   └── moonrock/          # 이미지 분류 테스트용 이미지 (추정)
├── GradioTest.ipynb         # Gradio 기본 기능 테스트
├── GradioTest2.ipynb        # Gradio 추가 기능 테스트
├── GradioTest3.ipynb        # Gradio 심화 기능 테스트
├── moonrock_identification_master.ipynb  # 월석 분류 모델 데모 앱
└── object_detection_master.ipynb     # 객체 탐지 모델 데모 앱
```

## 💡 주요 학습 기술

- **핵심 라이브러리**: `Gradio`, `TensorFlow`/`Keras` 또는 `PyTorch`, `OpenCV`, `Pillow`
- **핵심 개념**:
    - **모델 배포 (Model Deployment)**: 훈련된 모델을 실제 사용자가 접근할 수 있는 형태로 만드는 과정.
    - **웹 인터페이스 (Web Interface)**: 사용자가 모델과 상호작용할 수 있는 그래픽 사용자 환경(GUI).
    - **빠른 프로토타이핑 (Rapid Prototyping)**: `Gradio`를 통해 아이디어나 모델을 빠르게 시각화하고 검증.

이 디렉토리의 자료들은 모델을 훈련시키는 것에서 한 걸음 더 나아가, 그 결과를 다른 사람들에게 보여주고 직접 사용해볼 수 있도록 만드는 '모델 서빙(Model Serving)'의 첫 단계를 경험하는 데 큰 의미가 있습니다. 

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="mailto:j.1star.0726@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/></a>
<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a> 