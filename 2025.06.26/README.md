# 📅 2025년 6월 26일: Gradio를 활용한 AI 문서 분석 웹 애플리케이션 🚀

이 디렉토리의 학습 목표는 이전 날짜(`2025.06.25`)에 개발한 **Azure AI Document Intelligence 분석 모듈을 재사용**하고, **Gradio** 라이브러리를 이용해 이를 위한 대화형 웹 UI를 구축하는 것입니다. 사용자가 이미지를 업로드하고 분석 모델을 선택하면, 서버에서 문서 분석을 수행하고 그 결과를 텍스트와 시각화된 이미지로 반환하는 **완전한 AI 애플리케이션**을 만듭니다.

## 🎯 주요 학습 목표

-   **Gradio 웹 UI 구축**: `gradio` 라이브러리를 사용하여 모델 선택 드롭다운, 이미지 업로드, 텍스트 출력, 이미지 출력 컴포넌트로 구성된 사용자 인터페이스를 생성합니다.
-   **모듈 재사용**: `sys.path`를 동적으로 수정하여, 이전 학습(`2025.06.25`)에서 작성한 `document_intelligence.py` 모듈을 가져와 `analyze_document`, `get_analyze_result` 함수를 재사용하여 코드의 효율성과 확장성을 높입니다.
-   **이벤트 기반 프로그래밍**: 사용자가 이미지를 업로드하면(`input_image.change`) 연결된 콜백 함수(`change_image_callback`)가 실행되어 백엔드 로직을 처리하는 이벤트 기반 로직을 구현합니다.
-   **Pillow를 사용한 결과 시각화**: Azure 서비스로부터 받은 분석 결과(텍스트 내용과 위치 좌표)를 바탕으로, `Pillow` 라이브러리를 사용하여 원본 이미지 위에 감지된 텍스트 영역을 다각형으로 그리고, 해당 텍스트를 직접 쓰는 시각화 기능을 구현합니다.
-   **Full-Stack AI 애플리케이션**: 프론트엔드(Gradio)부터 백엔드(Python), 외부 AI 서비스(Azure)까지 연동되는 전체 애플리케이션의 흐름을 이해하고 구축합니다.

## 🛠️ 애플리케이션 구조 및 실행 흐름

```mermaid
graph TD
    A[사용자: 이미지 업로드 & 모델 선택] -->|Gradio UI| B(main.py);
    B -->|sys.path 수정| C(2025.06.25/document_intelligence.py);
    B -->|분석 요청| D{Azure Document Intelligence};
    D -->|분석 결과 (JSON)| B;
    B -->|Pillow으로 시각화| E[결과 이미지 생성];
    subgraph "웹 브라우저"
        A
        F[분석 결과(텍스트) 표시]
        G[결과 이미지 표시]
    end
    B --> F;
    E --> G;

```

### 엿보기: Gradio 앱 코드 (`main.py`)

```python
// ... (imports and setup) ...
// 이전 디렉토리 모듈 임포트
sibling_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "2025.06.25"))
sys.path.append(sibling_dir)
from document_intelligence import analyze_document, get_analyze_result

def change_image_callback(model, image_path):
    # ... (Azure 분석 호출 및 결과 시각화) ...
    result = get_analyze_result(request_analyze_result_url)
    result_image = draw_result_image(image_path, result)
    return result, result_image

with gr.Blocks() as demo:
    # ... (Gradio 컴포넌트 정의) ...
    input_image = gr.Image(type="filepath", label="이미지 선택")
    output_image = gr.Image(type="pil", label="결과 이미지", interactive=False)

    input_image.change(
        fn=change_image_callback,
        inputs=[model_select, input_image],
        outputs=[response_text, output_image],
    )

demo.launch()
```

## 💡 실행 예시 (스크린샷)

아래는 `main.py`를 실행했을 때의 웹 애플리케이션 화면입니다. 왼쪽에는 원본 '결석계' 이미지를 업로드하고, 오른쪽에는 **Azure Document Intelligence**가 분석하여 텍스트 영역에 경계 상자(bounding box)를 그린 결과 이미지가 나타납니다.

![Gradio App Screenshot](./app_screenshot.png)