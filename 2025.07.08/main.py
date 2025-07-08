import os
import sys

import gradio as gr

# 스크립트의 현재 디렉토리를 기준으로 경로를 설정합니다.
# Jupyter Notebook과 같은 환경에서 '__file__'이 정의되지 않은 경우를 대비합니다.
try:
    # __file__은 현재 실행 중인 스크립트의 경로를 나타냅니다.
    current_dir = os.path.dirname(os.path.abspath(__file__))
except NameError:
    # 대화형 환경에서는 현재 작업 디렉토리를 사용합니다.
    current_dir = os.getcwd()

# sys.path에 추가할 디렉토리 목록입니다.
# 이렇게 목록으로 관리하면 나중에 다른 디렉토리를 추가하기 용이합니다.
directories_to_add = ["2025.07.07"]

for directory in directories_to_add:
    # 상위 디렉토리와 대상 디렉토리 이름을 조합하여 절대 경로를 만듭니다.
    path_to_add = os.path.abspath(os.path.join(current_dir, "..", directory))
    # 생성된 경로가 sys.path에 아직 없으면 추가합니다.
    # 이렇게 하면 중복 추가를 방지할 수 있습니다.
    if path_to_add not in sys.path:
        sys.path.append(path_to_add)

from services.openai_service import OpenAIService
from services.opencv_service import OpenCVService


def capture_image(image):
    """
    Gradio의 Image 컴포넌트에서 이미지를 '캡처'하는 함수.

    실질적인 캡처(스냅샷) 기능은 아니며, 한 이미지 컴포넌트의 값을
    다른 이미지 컴포넌트로 전달하는 역할을 합니다.

    Args:
        image: 입력 이미지 컴포넌트의 값 (NumPy 배열).

    Returns:
        입력 이미지 값. 이미지가 없으면 Gradio 에러를 발생시킴.
    """
    if image is not None:
        return image
    else:
        # 이미지가 없을 경우, Gradio UI에 3초간 에러 메시지를 표시합니다.
        raise gr.Error("이미지가 없습니다.", duration=3)


if __name__ == "__main__":
    # 서비스 클래스 인스턴스 생성
    # OpenAI 관련 기능(GPT-4o 채팅, 음성 합성)을 담당하는 서비스
    openai_service = OpenAIService()
    # OpenCV 관련 기능(YOLO 객체 탐지)을 담당하는 서비스
    opencv_service = OpenCVService()

    # Gradio Blocks API를 사용하여 UI를 구성합니다.
    with gr.Blocks(title="실시간 이상 징후 감지 시스템") as demo:
        # 메인 UI 레이아웃 구성
        with gr.Row():
            # 실시간 웹캠 입력을 받는 컴포넌트
            webcam_image = gr.Image(
                label="실시간 화면",
                sources="webcam",
                streaming=True,  # 실시간 스트리밍 활성화
                webcam_options=gr.WebcamOptions(mirror=False),  # 웹캠 좌우반전 비활성화
            )
            # YOLO 모델이 객체를 탐지한 결과 이미지를 표시하는 컴포넌트
            output_image = gr.Image(label="검출 이미지", interactive=False)
            # '이상 징후 감지' 버튼 클릭 시, '검출 이미지'가 복사되어 표시될 컴포넌트
            captured_image = gr.Image(label="캡처 이미지", interactive=False)

        with gr.Row():
            # 사용자가 특정 장면을 포착하기 위해 클릭하는 버튼
            anormaly_button = gr.Button("이상 징후 감지")
            # 캡처된 이미지를 GPT-4o에 보내 분석을 요청하는 버튼
            analysis_button = gr.Button("분석")

        # OpenAI 서비스와의 대화 내용을 표시할 챗봇 컴포넌트
        chatbot = gr.Chatbot(label="채팅", type="messages", value=[], elem_id="chatbot")

        # 분석 결과를 음성으로 출력할 오디오 컴포넌트 (자동 재생 활성화)
        response_audio = gr.Audio(label="분석 결과 음성", autoplay=True, interactive=False)

        # --- 이벤트 핸들러 연결 ---

        # 1. 실시간 객체 탐지
        # webcam_image의 실시간 스트림을 opencv_service의 yolo_v8n.detect 함수에 연결합니다.
        # 웹캠의 매 프레임이 'detect' 함수의 입력으로 들어가고, 그 반환값(탐지 결과 이미지)이
        # output_image 컴포넌트에 출력됩니다.
        webcam_image.stream(
            fn=opencv_service.yolo_v8n.detect,
            inputs=[webcam_image],
            outputs=[output_image],
        )

        # 2. 이미지 캡처
        # '이상 징후 감지' 버튼을 클릭하면 capture_image 함수가 호출됩니다.
        # 현재 '검출 이미지'(output_image)가 '캡처 이미지'(captured_image)로 복사됩니다.
        anormaly_button.click(
            fn=capture_image,
            inputs=[output_image],
            outputs=[captured_image],
        )

        # 3. 이미지 분석 요청
        # '분석' 버튼을 클릭하면 openai_service.chat 함수가 호출됩니다.
        # 현재 챗봇 기록(chatbot)과 캡처된 이미지(captured_image)가 입력으로 전달됩니다.
        analysis_button.click(
            fn=lambda chatbot, captured_image: openai_service.chat(
                prompt="""
                    너는 물체를 감지하는 YOLO 모델이야.
                    이 사진에서 감지된 물체에 대해서 신뢰도 점수와 자세한 설명을 붙여줘.
                    반드시 감지된 물체, 바운딩 박스 안에 있는 물체에 대해서만 설명해줘.
                """,
                history=chatbot,  # 현재까지의 대화 기록
                args={"image": captured_image},  # 분석할 이미지 전달
            ),
            inputs=[chatbot, captured_image],
            # 함수의 반환값(업데이트된 챗봇 기록, 생성된 음성)을 각 컴포넌트에 출력합니다.
            outputs=[chatbot, response_audio],
        )

    # Gradio 애플리케이션 실행
    demo.launch()
