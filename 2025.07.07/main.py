import gradio as gr

from services.opencv_service import OpenCVService


if __name__ == "__main__":
    # OpenCVService 클래스의 인스턴스를 생성합니다.
    # 이 서비스 객체는 얼굴 탐지 및 YOLO 객체 탐지와 관련된 모든 기능을 포함하고 있습니다.
    opencv_service = OpenCVService()

    # Gradio의 Blocks API를 사용하여 웹 UI를 구성합니다.
    # Blocks를 사용하면 더 복잡하고 사용자 정의된 레이아웃을 만들 수 있습니다.
    with gr.Blocks() as demo:
        # 'Face Detection' 탭을 생성합니다.
        with gr.Tab("😀 Face Detection"):
            # 얼굴 탐지에 사용할 Haar Cascade 모델을 선택할 수 있는 드롭다운 메뉴입니다.
            cascade_dropdown = gr.Dropdown(
                # 서비스에서 얼굴 관련 캐스케이드 목록을 가져와 선택 항목으로 설정합니다.
                opencv_service.get_cascades(),
                label="Face Cascade",  # 드롭다운 메뉴의 레이블
                value="haarcascade_frontalface_default",  # 기본 선택값
            )

            # 얼굴 탐지 함수의 'scaleFactor' 파라미터를 조절하는 슬라이더입니다.
            # 이 값은 이미지 피라미드의 스케일 간 비율을 결정하며, 1보다 커야 합니다.
            scale_factor_slider = gr.Slider(
                minimum=1.1,  # 최소값
                maximum=2.0,  # 최대값
                step=0.01,  # 증감 단위
                value=1.1,  # 기본값
                label="Scale Factor",  # 슬라이더의 레이블
            )

            # 얼굴 탐지 함수의 'minNeighbors' 파라미터를 조절하는 슬라이더입니다.
            # 이 값은 각 후보 사각형이 유지되기 위해 필요한 최소 이웃 수를 결정합니다.
            min_neighbors_slider = gr.Slider(
                minimum=1,  # 최소값
                maximum=10,  # 최대값
                step=1,  # 증감 단위
                value=5,  # 기본값
                label="Min Neighbors",  # 슬라이더의 레이블
            )

            # 이미지 파일을 이용한 얼굴 탐지 기능을 위한 하위 탭을 생성합니다.
            with gr.Tab("🖼️ Face Image Detection"):
                # 가로로 컴포넌트를 정렬하기 위해 Row를 사용합니다.
                with gr.Row():
                    # 세로로 컴포넌트를 정렬하기 위해 Column을 사용합니다.
                    with gr.Column():
                        gr.Markdown("## 입력 Image")
                        # 사용자가 이미지를 업로드할 수 있는 Image 컴포넌트입니다.
                        # type="numpy"는 이미지를 NumPy 배열 형태로 처리하도록 설정합니다.
                        input_image = gr.Image(type="numpy")

                    with gr.Column():
                        gr.Markdown("## Face Detection")
                        # 얼굴 탐지 결과가 표시될 Image 컴포넌트입니다.
                        face_detection_image = gr.Image(type="numpy")

                # input_image 컴포넌트에 변경(이미지 업로드)이 발생했을 때 실행될 함수를 지정합니다.
                input_image.change(
                    fn=opencv_service.face.detect,  # 실행할 함수 (얼굴 탐지)
                    inputs=input_image,  # 함수의 입력으로 input_image의 값을 사용
                    outputs=face_detection_image,  # 함수의 반환값을 face_detection_image에 출력
                )

            # 웹캠을 이용한 실시간 얼굴 탐지 기능을 위한 하위 탭을 생성합니다.
            with gr.Tab("🎥 Real-Time Face Detection"):
                with gr.Row():
                    with gr.Column():
                        gr.Markdown("## 입력 영상")
                        # 웹캠 입력을 받는 Image 컴포넌트입니다.
                        # sources="webcam"으로 웹캠 입력을 활성화합니다.
                        # streaming=True로 실시간 스트리밍 모드를 사용합니다.
                        input_webcam = gr.Image(
                            sources="webcam", streaming=True, mirror_webcam=False
                        )

                    with gr.Column():
                        gr.Markdown("## Real-Time Face Detection")
                        # 실시간 얼굴 탐지 결과가 출력될 Image 컴포넌트입니다.
                        output_webcam = gr.Image(streaming=True)

                # input_webcam의 스트림 데이터가 들어올 때마다 지정된 함수를 실행합니다.
                input_webcam.stream(
                    fn=opencv_service.face.detect,  # 스트림 프레임마다 실행할 함수
                    inputs=input_webcam,  # 함수의 입력
                    outputs=output_webcam,  # 함수의 출력
                )

            # 캐스케이드 드롭다운 메뉴의 값이 변경될 때 실행될 함수를 지정합니다.
            cascade_dropdown.change(
                fn=opencv_service.face.set_cascade,  # 실행할 함수 (캐스케이드 모델 변경)
                inputs=cascade_dropdown,  # 함수의 입력
            )

            # scaleFactor 슬라이더의 값이 변경될 때 실행될 함수를 지정합니다.
            scale_factor_slider.change(
                fn=opencv_service.face.set_scale_factor,  # 실행할 함수 (scaleFactor 값 변경)
                inputs=scale_factor_slider,  # 함수의 입력
            )

            # minNeighbors 슬라이더의 값이 변경될 때 실행될 함수를 지정합니다.
            min_neighbors_slider.change(
                fn=opencv_service.face.set_min_neighbors,  # 실행할 함수 (minNeighbors 값 변경)
                inputs=min_neighbors_slider,  # 함수의 입력
            )

    # 생성된 Gradio 데모를 실행하여 웹 서버를 시작합니다.
    demo.launch()
