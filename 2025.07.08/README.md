### 📂 GitHub에서 보기: [microsoft-ai-school/2025.07.08](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.07.08)

# 📅 2025년 7월 8일: AI 모델 체이닝 - 실시간 YOLOv8, GPT-4V 분석, 음성 합성 연동

## 📝 학습 목표

이번 학습에서는 여러 AI 모델과 서비스를 하나의 워크플로우로 연결하는 **AI 모델 체이닝(AI Model Chaining)** 개념을 실제로 구현하는 것을 목표로 합니다. 로컬의 실시간 탐지 모델과 클라우드의 거대 언어/비전/음성 모델을 연동하여, 단순한 기능의 합을 넘어선 새로운 가치를 창출하는 복합 AI 애플리케이션을 구축합니다.

-   **시스템 통합 아키텍처 설계**: 각기 다른 역할을 수행하는 AI 모델(로컬 YOLOv8, 클라우드 GPT-4V, 클라우드 TTS)을 어떻게 유기적으로 연결하여 하나의 완성된 서비스를 만들 수 있는지 그 아키텍처를 이해하고 설계합니다.
-   **로컬-클라우드 하이브리드 모델**: 로컬 모델의 장점(빠른 반응속도, 오프라인 동작)과 클라우드 모델의 장점(강력한 분석 능력, 최신 정보 접근성)을 결합하는 하이브리드 접근법을 학습합니다.
-   **다중 모드(Multi-modal) 입출력**: 텍스트, 이미지, 음성 등 여러 형태의 데이터를 입력받고 출력하는 다중 모드 애플리케이션을 구축하는 방법을 익힙니다.
-   **서비스 간 데이터 전달**: 이미지 데이터를 `Base64` 문자열로 인코딩하여 JSON 페이로드에 담아 REST API로 전송하는 등, 서비스 간에 데이터를 효과적으로 주고받는 기술적인 방법을 실습합니다.
-   **Gradio를 활용한 복합 UI 구현**: Gradio의 `Blocks`와 이벤트 리스너를 사용하여, 실시간 스트리밍, 버튼 클릭, 챗봇 인터페이스, 오디오 출력이 모두 통합된 복잡한 사용자 인터페이스를 구현합니다.

---

## 🖼️ 프로젝트 개요

이날의 프로젝트는 **실시간으로 사물을 탐지하고, 궁금한 장면에 대해 AI에게 질문하면 이미지 분석과 함께 음성으로 답변을 들려주는** 고도로 통합된 AI 애플리케이션입니다.

사용자 경험은 다음과 같은 흐름으로 진행됩니다.

1.  **👀 실시간 탐지**: 먼저, 웹캠 영상이 실시간으로 로컬의 **YOLOv8 모델**에 전달되어 주변 사물을 빠르게 탐지하고 화면에 바운딩 박스를 표시합니다.
2.  **📸 이상 징후 포착**: 사용자는 화면을 보다가 더 자세한 분석이 필요한 장면(예: 이상한 물체, 특정 상황)이 나타나면 **'이상 징후 감지'** 버튼을 클릭하여 해당 프레임을 캡처합니다.
3.  **🤔 AI에게 분석 요청**: **'분석'** 버튼을 누르면, 캡처된 이미지가 "이 사진에 감지된 물체에 대해 자세히 설명해줘"라는 프롬프트와 함께 클라우드의 **Azure OpenAI GPT-4 Vision 모델**로 전송됩니다.
4.  **💬 결과 확인 및 청취**: GPT-4V는 이미지를 깊이 있게 분석하여 챗봇 창에 텍스트로 답변을 표시하고, 동시에 **Azure AI Speech 서비스**가 이 텍스트를 자연스러운 한국어 음성으로 변환하여 스피커로 들려줍니다.

이 프로젝트는 "보고, 분석하고, 말하는" AI 에이전트의 축소판으로, 여러 AI 기술이 어떻게 시너지를 내어 복합적인 문제를 해결하는지 명확하게 보여줍니다.

---

## 🏛️ 시스템 아키텍처

본 프로젝트는 로컬 컴퓨터와 Azure 클라우드 서비스를 넘나드는 하이브리드 아키텍처를 가지고 있습니다. 전체 데이터 흐름은 아래와 같이 4단계로 구성됩니다.

**1️⃣ 단계: 실시간 객체 탐지 (로컬)**
1.  **웹캠 입력**: 사용자의 웹캠에서 실시간 영상 스트림이 `Gradio` UI로 입력됩니다.
2.  **YOLOv8 추론**: 영상의 각 프레임은 로컬의 `OpenCVService`로 전달되어 `YOLOv8` 모델을 통해 객체 탐지를 수행합니다.
3.  **결과 표시**: 탐지 결과(바운딩 박스가 그려진 영상)가 다시 `Gradio` UI에 실시간으로 출력됩니다.

**2️⃣ 단계: 데이터 캡처 및 클라우드 전송 (로컬 → 클라우드)**
1.  **이미지 캡처**: 사용자가 UI에서 **'이상 징후 감지'** 버튼을 클릭하면, 현재 화면의 프레임이 이미지로 캡처되어 UI 상태에 저장됩니다.
2.  **분석 요청**: 사용자가 **'분석'** 버튼을 클릭하면, 캡처된 이미지와 사용자 프롬프트가 Azure 클라우드로 전송될 준비를 합니다. 이미지는 API 전송을 위해 **Base64**로 인코딩됩니다.

**3️⃣ 단계: AI 분석 및 음성 합성 (클라우드)**
1.  **이미지 분석 (GPT-4 Vision)**: 인코딩된 이미지와 프롬프트가 **Azure OpenAI 서비스**의 `GPT-4 Vision` 모델로 전달됩니다. 모델은 이미지를 분석하고 상황에 대한 설명을 텍스트로 생성합니다.
2.  **음성 합성 (TTS)**: `GPT-4 Vision`이 생성한 텍스트 설명은 다시 **Azure AI Speech 서비스**의 `TTS(Text-to-Speech)` API로 전달됩니다.
3.  **음성 데이터 생성**: TTS API는 텍스트를 자연스러운 한국어 음성 데이터로 변환합니다.

**4️⃣ 단계: 결과 통합 및 출력 (클라우드 → 로컬)**
1.  **텍스트 결과 수신**: `GPT-4 Vision`의 텍스트 분석 결과가 로컬의 `Gradio` UI로 돌아와 챗봇 창에 표시됩니다.
2.  **음성 결과 수신**: `TTS` 서비스에서 생성된 음성 데이터가 로컬의 `Gradio` UI로 돌아옵니다.
3.  **최종 출력**: UI는 수신된 음성 데이터를 사용자의 **스피커**를 통해 자동으로 재생합니다.

---

## 📁 파일 구성 및 설명

| 파일명 | 설명 |
| :--- | :--- |
| `main.py` | Gradio를 사용하여 실시간 탐지, 이미지 캡처, 분석 요청, 챗봇, 오디오 출력을 모두 담은 UI를 구성합니다. 각 컴포넌트의 이벤트를 `OpenCVService` 및 `OpenAIService`와 연결하여 전체 워크플로우를 조율합니다. |
| `services/openai_service.py` | Azure OpenAI(GPT-4V) 및 Azure AI Speech API와 통신하는 로직을 캡슐화한 `OpenAIService` 클래스를 정의합니다. 이미지 인코딩, API 요청, 음성 합성 호출 등을 담당합니다. |
| `2025.07.07/services/opencv_service.py` | (외부 의존성) 실시간 YOLOv8 객체 탐지를 수행하는 `OpenCVService`가 정의된 파일입니다. |
| `2025.06.27/speech.py` | (외부 의존성) 텍스트를 음성으로 변환하는 `synthesize_speech` 함수가 정의된 파일입니다. |
| `results/` | 실습 과정에서 생성된 주요 실행 결과 스크린샷 등이 저장될 디렉터리입니다. |
| `README.md` | 본 학습 내용에 대한 정리 문서입니다. |

---

## 🚀 주요 실행 과정 및 결과

### 1. 이미지의 Base64 인코딩 및 API 요청 (`services/openai_service.py`)

GPT-4 Vision과 같은 Vision 모델에 이미지를 전송하기 위해서는, 이미지 파일을 텍스트 기반의 `Base64` 문자열로 인코딩해야 합니다. `OpenAIService.chat` 메서드는 이 과정을 수행합니다.

1.  Gradio를 통해 전달받은 NumPy 배열 형식의 이미지를 PIL `Image` 객체로 변환합니다.
2.  이 PIL 이미지를 메모리상의 바이트 스트림(`io.BytesIO`)에 PNG 형식으로 저장합니다.
3.  저장된 바이트 데이터를 `base64.b64encode`를 사용하여 인코딩하고, UTF-8 문자열로 디코딩합니다.
4.  최종적으로, 이 Base64 문자열을 `data:image/png;base64,...` 형식의 URL로 만들어 API 요청 메시지에 포함시킵니다.

이렇게 인코딩된 이미지는 텍스트 프롬프트와 함께 OpenAI API로 전송됩니다.

```python
# services/openai_service.py

def chat(self, prompt: str, history, args):
    # ...
    # args 딕셔너리에서 이미지(NumPy 배열)를 가져옵니다.
    image_np = args.get("image")
    if image_np is not None:
        # NumPy 배열 -> PIL 이미지로 변환
        image = Image.fromarray(image_np)
        
        # PIL 이미지를 메모리 내 바이트 스트림에 저장
        with io.BytesIO() as byte_stream:
            image.save(byte_stream, format="PNG")
            image_bytes = byte_stream.getvalue()
        
        # 바이트 데이터를 Base64 문자열로 인코딩
        b64_image = base64.b64encode(image_bytes).decode("utf-8")

        # API가 요구하는 형식에 맞춰 메시지 구성
        image_content = {
            "type": "image_url",
            "image_url": {"url": f"data:image/png;base64,{b64_image}"},
        }
        # ... 메시지 리스트에 image_content 추가 ...
    
    # ... self._request_to_openai(messages, ...) 호출 ...
```

### 2. Gradio를 이용한 서비스 체이닝 (`main.py`)

`main.py`에서는 각기 다른 Gradio 이벤트 핸들러가 순차적으로 호출되면서 전체 AI 모델 체인이 동작하도록 합니다.

-   **`webcam_image.stream(...)`**: 웹캠의 매 프레임을 `opencv_service.yolo_v8n.detect` 함수로 보내 실시간 객체 탐지를 수행하고, 그 결과를 `output_image`에 표시합니다. 이것이 1차 체인입니다.
-   **`anormaly_button.click(...)`**: `output_image`에 표시된 이미지를 `captured_image` 컴포넌트로 복사하여 '고정'하는 역할을 합니다.
-   **`analysis_button.click(...)`**: '고정'된 `captured_image`와 챗봇 기록(`chatbot`)을 `openai_service.chat` 함수로 전달합니다. 이 함수는 내부적으로 GPT-4V 분석과 TTS 합성을 모두 처리하고, 그 결과를 `chatbot`과 `response_audio` 컴포넌트에 각각 반환합니다. 이것이 2차 및 3차 체인입니다.

**1. 실시간 영상 출력 및 객체 탐지**
![실시간 영상 출력](./results/1.%20openai_yolo_실시간영상_출력.png)
![실시간 객체 탐지](./results/2.%20openai_yolo_실시간영상_objectdetection.png)

**2. 특정 장면 캡처**
![이미지 캡처](./results/3.%20openai_yolo_실시간영상_이미지캡쳐.png)
![YoloV8 ObjectDetection](./results/7.%20openai_yolov8_objectdetection.png)

**3. 이미지 분석 및 음성 안내**
![분석 결과(텍스트)](./results/4.%20openai_yolo_캡쳐이미지_챗봇_요청_결과.png)
![분석 결과(음성)](./results/5.%20openai_yolo_캡쳐이미지_챗봇_요청_TTS_결과.png)

**음성 분석 결과 듣기:**
[음성 분석 결과 듣기](./results/6.%20openai_yolo_캡쳐이미지_챗봇_요청_TTS.mp3)

```python
# main.py

# 1차 체인: 실시간 YOLOv8 탐지
webcam_image.stream(
    fn=opencv_service.yolo_v8n.detect,
    inputs=[webcam_image],
    outputs=[output_image],
)

# 분석할 이미지 캡처
anormaly_button.click(
    fn=capture_image,
    inputs=[output_image],
    outputs=[captured_image],
)

# 2차/3차 체인: GPT-4 분석 및 TTS 음성 합성
analysis_button.click(
    fn=openai_service.chat,
    inputs=[chatbot, captured_image],
    outputs=[chatbot, response_audio],
)
```

---

## 💡 학습 정리

이번 세션은 단일 AI 모델을 사용하는 것을 넘어, 여러 AI 모델을 유기적으로 결합하여 복합적인 문제를 해결하는 **AI 시스템 통합(System Integration)**의 중요성과 그 구현 방법을 깊이 있게 학습하는 시간이었습니다.

-   **최적의 역할 분배**: 실시간 처리가 중요한 '탐지'는 로컬 YOLO 모델에 맡기고, 깊이 있는 '이해와 설명'은 클라우드의 거대 비전 모델에 맡기는 역할 분배가 왜 효율적인지를 명확히 이해했습니다. 이는 실제 AI 서비스를 개발할 때 비용, 속도, 성능을 모두 고려하는 중요한 설계 원칙입니다.
-   **데이터 형식의 중요성**: 서비스와 모델 간에 데이터를 주고받을 때, 각 시스템이 요구하는 형식(예: NumPy, PIL, Base64)을 정확히 이해하고 변환하는 과정이 얼마나 중요한지를 실감했습니다.
-   **경험의 연쇄 설계**: 단순히 버튼을 누르면 기능이 실행되는 것을 넘어, '실시간으로 보다가 -> 중요한 것을 포착하고 -> 질문하면 -> 보고 듣는' 일련의 사용자 경험 흐름을 설계하고 구현함으로써, 기술을 어떻게 사용자 가치로 변환하는지에 대한 통찰을 얻었습니다.

결론적으로, 현대의 AI 애플리케이션 개발은 최고의 단일 모델을 찾는 것뿐만 아니라, 각 분야 최고의 모델들을 어떻게 창의적으로 '연결'하고 '조율'하여 새로운 시너지를 만들어내는가에 달려있다는 점을 깨달았습니다.

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact
<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items:center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>j.1star.0726@gmail.com</a> 