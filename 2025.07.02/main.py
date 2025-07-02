"""
이 스크립트는 Azure의 Vision 및 Face 인공지능 서비스를 사용하여
이미지를 분석하고 얼굴을 감지하는 웹 애플리케이션을 생성합니다.

Gradio 라이브러리를 사용하여 사용자가 쉽게 이미지를 업로드하고
분석 옵션을 선택할 수 있는 대화형 웹 UI를 만듭니다.
"""

# 표준 라이브러리
from pprint import pformat  # pprint는 'pretty-print'의 약자로, 복잡한 데이터 구조(예: 딕셔너리, 리스트)를 사람이 보기 좋게 출력할 때 사용합니다.

# 서드파티 라이브러리
import gradio as gr  # Gradio는 몇 줄의 코드만으로 머신러닝 모델을 위한 웹 UI를 빠르고 쉽게 만들 수 있게 해주는 라이브러리입니다.

# 사용자 정의 모듈
# 우리가 직접 만든 서비스 클래스를 가져옵니다.
from services.vision_service import VisionService  # Azure AI Vision 서비스와 통신하는 클래스
from services.face_service import FaceService  # Azure AI Face 서비스와 통신하는 클래스


def vision_api_call(
    image_path: str, features: list[str]
) -> tuple[str | tuple[str, list] | None, str, str]:
    """
    Azure Vision 서비스를 호출하여 이미지를 분석하고, 그 결과를 Gradio UI에 맞게 가공합니다.

    이 함수는 웹 UI에서 '이미지 분석' 버튼을 클릭했을 때 실행됩니다.
    주요 역할은 다음과 같습니다:
    1. 사용자가 업로드한 이미지와 선택한 분석 기능을 입력으로 받습니다.
    2. 입력값이 유효한지 검사합니다 (이미지가 있는지, 기능이 선택되었는지).
    3. `VisionService`를 통해 Azure에 이미지 분석을 요청합니다.
    4. API 응답을 받아 'denseCaptions'(이미지 영역별 상세 설명)과 'tags'(이미지 전체 태그)를 추출합니다.
    5. 'denseCaptions' 결과는 원본 이미지 위에 바운딩 박스와 텍스트로 표시될 수 있도록 데이터를 가공합니다.
    6. 'tags' 결과는 사용자가 보기 편하도록 마크다운(Markdown) 목록 형태로 만듭니다.
    7. 가공된 결과들을 웹 UI의 각 출력 컴포넌트(주석 이미지, 태그 목록, 원본 응답)에 맞게 반환합니다.

    Args:
        image_path (str): Gradio의 Image 컴포넌트를 통해 사용자가 업로드한 이미지 파일이 임시 저장된 경로입니다.
        features (list[str]): 사용자가 UI에서 체크박스로 선택한 분석 기능들의 목록입니다. 예: ["tags", "caption"].

    Returns:
        tuple: 세 개의 값을 담은 튜플을 반환하며, 각 값은 Gradio UI의 특정 출력 컴포넌트로 전달됩니다.
            - (str | tuple | None): 주석이 달린 이미지를 위한 데이터입니다. (이미지 경로, [[박스 좌표, 텍스트], ...]) 형태의 튜플이거나, 오류 발생 시 None이 될 수 있습니다.
            - (str): 이미지 태그를 보여주기 위한 마크다운 형식의 텍스트입니다.
            - (str): API로부터 받은 원본 JSON 응답을 그대로 보여주는 텍스트입니다.
    """
    # --- 1. 입력 유효성 검사 ---
    # 사용자가 이미지를 업로드하지 않고 버튼을 눌렀을 경우를 처리합니다.
    if not image_path:
        # 각 출력 영역에 맞는 기본 메시지를 반환하여 사용자에게 안내합니다.
        return None, "### 이미지 태그\n", "이미지를 먼저 업로드해주세요."
    
    # 이미지는 업로드했지만 분석 기능을 하나도 선택하지 않은 경우를 처리합니다.
    if not features:
        return (
            image_path,  # 분석은 못하지만, 업로드된 이미지는 그대로 보여줍니다.
            "### 이미지 태그\n",
            "하나 이상의 분석 기능을 선택해주세요.",
        )

    # --- 2. Vision 서비스 호출 및 예외 처리 ---
    # VisionService 객체를 생성하여 Azure 서비스에 연결할 준비를 합니다.
    vision_service = VisionService()
    try:
        # 준비된 서비스 객체를 통해 이미지 분석을 요청합니다.
        result = vision_service.analyze_image(image_path, features)
    except Exception as e:
        # API 호출 중 네트워크 오류, 인증 실패 등 예기치 않은 문제가 발생하면 앱이 중단되지 않도록 처리합니다.
        # 사용자에게 에러가 발생했음을 알리는 메시지를 각 출력창에 표시합니다.
        return None, "### 오류 발생", f"서비스 호출 중 오류가 발생했습니다: {e}"

    # --- 3. API 응답 결과 가공: Dense Captions ---
    # 'denseCaptions'는 이미지의 여러 영역에 대해 각각 설명을 제공하는 기능입니다.
    # 이 결과를 이미지 위에 네모 상자(바운딩 박스)와 함께 표시하기 위해 데이터를 가공합니다.
    annotations = []  # 주석 정보를 담을 빈 리스트를 준비합니다.
    
    # 사용자가 'denseCaptions' 기능을 요청했고, 실제 응답에도 해당 결과가 있는지 확인합니다.
    if "denseCaptions" in features and result.get("denseCaptionsResult"):
        # 결과에 포함된 모든 캡션에 대해 반복 작업을 수행합니다.
        for caption in result["denseCaptionsResult"]["values"]:
            box = caption["boundingBox"]  # 캡션이 적용되는 영역의 좌표 정보
            # Gradio의 `AnnotatedImage`는 (x_min, y_min, x_max, y_max) 형식의 좌표를 사용합니다.
            # API가 주는 좌표는 (x_min, y_min, 너비, 높이) 형식이므로 변환이 필요합니다.
            x, y, w, h = box["x"], box["y"], box["w"], box["h"]
            annotation_box = (x, y, x + w, y + h)
            # 변환된 좌표와 캡션 텍스트를 짝지어 리스트에 추가합니다.
            annotations.append((annotation_box, caption["text"]))
    
    # 원본 이미지 경로와 가공된 주석 리스트를 튜플로 묶어 `AnnotatedImage` 컴포넌트에 전달할 최종 데이터를 만듭니다.
    annotated_image = (image_path, annotations)

    # --- 4. API 응답 결과 가공: Tags ---
    # 'tags'는 이미지 전체를 설명하는 키워드들입니다.
    # 사용자가 보기 좋게 마크다운 목록으로 만듭니다.
    tags_markdown = "### 이미지 태그\n"
    
    # 사용자가 'tags' 기능을 요청했고, 실제 응답에도 결과가 있는지 확인합니다.
    if "tags" in features and result.get("tagsResult"):
        # 각 태그를 ' - `태그이름` (정확도: XX.XX%) ' 형식의 문자열로 만듭니다.
        tags_list = [
            f"- `{tag['name']}` (정확도: {tag['confidence']:.2%})"
            for tag in result["tagsResult"]["values"]
        ]
        # 만들어진 문자열 리스트를 줄바꿈(\n)으로 합쳐 하나의 긴 텍스트로 만듭니다.
        tags_markdown += "\n".join(tags_list)
    else:
        # 태그 정보가 없는 경우 안내 메시지를 추가합니다.
        tags_markdown += "_태그를 찾을 수 없거나 'tags' 기능이 선택되지 않았습니다._"

    # --- 5. 원본 응답 준비 및 최종 반환 ---
    # API로부터 받은 원본 JSON 데이터를 사람이 읽기 쉬운 형태로 변환하여, 상세 분석이 필요한 사용자를 위해 제공합니다.
    raw_json_output = pformat(result)

    # 세 종류의 결과물을 튜플로 묶어 반환합니다. 이 값들은 UI의 각 출력 컴포넌트에 순서대로 전달됩니다.
    return annotated_image, tags_markdown, raw_json_output


def face_api_call(
    image_path: str,
    return_face_id: bool,
    return_face_landmarks: bool,
    return_face_attributes: list[str],
) -> str:
    """
    Azure Face 서비스를 호출하여 이미지에서 얼굴을 감지하고, 그 결과를 문자열로 반환합니다.

    이 함수는 웹 UI의 '얼굴 감지' 탭에서 '얼굴 감지' 버튼을 클릭했을 때 실행됩니다.
    주요 역할은 다음과 같습니다:
    1. 사용자가 업로드한 이미지와 얼굴 감지 옵션들을 입력으로 받습니다.
    2. 이미지가 업로드되었는지 확인합니다.
    3. `FaceService`를 통해 Azure에 얼굴 감지를 요청합니다.
    4. API 응답 결과를 사람이 읽기 좋은 형태의 문자열로 변환하여 반환합니다.

    Args:
        image_path (str): 사용자가 업로드한 이미지 파일의 임시 저장 경로입니다.
        return_face_id (bool): 얼굴에 고유 ID를 부여하여 반환할지 여부를 결정합니다.
        return_face_landmarks (bool): 눈, 코, 입 등 얼굴의 주요 특징점 좌표를 반환할지 여부를 결정합니다.
        return_face_attributes (list[str]): 분석할 얼굴 속성(나이, 성별, 감정 등)의 목록입니다.

    Returns:
        str: 분석 결과를 담은 문자열입니다. 성공 시 보기 좋게 정리된 JSON 형식의 문자열, 오류 발생 시 에러 메시지를 반환합니다.
    """
    # 이미지가 업로드되었는지 확인합니다.
    if not image_path:
        return "이미지를 먼저 업로드해주세요."

    # FaceService 객체를 생성하여 Azure 서비스에 연결할 준비를 합니다.
    face_service = FaceService()
    try:
        # 얼굴 감지를 요청하고 결과를 받습니다.
        result = face_service.detect_faces(
            image_path,
            return_face_id=return_face_id,
            return_face_landmarks=return_face_landmarks,
            return_face_attributes=return_face_attributes,
        )
        # 성공적으로 결과를 받으면, pformat을 사용해 보기 좋은 형태로 변환하여 반환합니다.
        return pformat(result)
    except Exception as e:
        # 서비스 호출 중 오류가 발생하면 사용자에게 에러 메시지를 반환합니다.
        return f"서비스 호출 중 오류가 발생했습니다: {e}"


# --- Gradio UI 구성 ---
# `gr.Blocks`는 Gradio 앱의 전체 레이아웃을 구성하는 최상위 컨테이너입니다.
# `theme`으로 앱의 전체적인 색상과 스타일을 지정하고, `title`로 웹 브라우저 탭에 표시될 제목을 설정합니다.
with gr.Blocks(theme=gr.themes.Soft(), title="Azure AI Vision & Face Demo") as demo:
    # `gr.Markdown`을 사용하여 앱의 제목과 설명을 텍스트로 표시합니다.
    gr.Markdown("# Azure AI Vision and Face Services Demo")
    gr.Markdown(
        "Azure의 Vision과 Face 서비스의 기능을 탐색해보세요. "
        "이미지를 업로드하고 원하는 분석 옵션을 선택하세요."
    )

    # `gr.Tabs`를 사용하여 여러 기능을 탭으로 구분합니다. 사용자는 '이미지 분석'과 '얼굴 감지' 탭을 오가며 사용할 수 있습니다.
    with gr.Tabs():
        # 첫 번째 탭: 이미지 분석 (Vision)
        with gr.TabItem("🖼️ Image Analysis (Vision)"):
            # `gr.Row`는 컴포넌트들을 가로로 나란히 배치합니다.
            with gr.Row():
                # `gr.Column`은 컴포넌트들을 세로로 쌓습니다. `scale`은 열의 너비 비율을 조정합니다.
                with gr.Column(scale=1):
                    # `gr.Image`는 사용자가 이미지를 업로드할 수 있는 입력 컴포넌트입니다.
                    # `type="filepath"`는 업로드된 이미지를 파일로 저장하고 그 경로를 함수에 전달하도록 설정합니다.
                    vision_image_input = gr.Image(
                        type="filepath", label="이미지 업로드"
                    )
                    # `gr.CheckboxGroup`은 여러 개의 체크박스를 그룹으로 묶어 제공합니다.
                    # 사용자는 여러 분석 기능을 동시에 선택할 수 있습니다.
                    vision_features = gr.CheckboxGroup(
                        [
                            "tags",
                            "read",
                            "caption",
                            "denseCaptions",
                            "smartCrops",
                            "objects",
                            "people",
                        ],
                        label="분석할 기능 선택",
                        value=["tags", "caption", "objects"],  # 앱이 시작될 때 기본으로 선택될 값들입니다.
                    )
                    # `gr.Button`은 사용자가 클릭할 수 있는 버튼입니다. `variant="primary"`는 버튼을 강조색으로 표시합니다.
                    analyze_button = gr.Button("이미지 분석", variant="primary")
                
                # 오른쪽 결과 표시 영역
                with gr.Column(scale=2):
                    # `gr.AnnotatedImage`는 이미지 위에 바운딩 박스와 라벨을 표시할 수 있는 특별한 출력 컴포넌트입니다.
                    vision_output_image = gr.AnnotatedImage(
                        label="영역별 상세 설명 (Dense Captions) 분석 결과"
                    )
                    # `gr.Markdown`은 텍스트를 서식과 함께 보여주는 출력 컴포넌트입니다. 여기서는 태그 결과를 보여줍니다.
                    vision_tags_output = gr.Markdown(label="이미지 태그")
                    # `gr.Textbox`는 텍스트를 보여주는 출력 컴포넌트입니다.
                    # `interactive=False`는 사용자가 직접 수정할 수 없도록 설정합니다.
                    vision_raw_output = gr.Textbox(
                        label="전체 API 응답 (Raw)", interactive=False, lines=15
                    )

        # 두 번째 탭: 얼굴 감지 (Face)
        with gr.TabItem("😊 Face Detection (Face)"):
            with gr.Row():
                with gr.Column(scale=1):
                    face_image_input = gr.Image(type="filepath", label="이미지 업로드")
                    # `gr.Accordion`은 클릭하면 펼쳐지고 접히는 영역을 만듭니다.
                    # `open=True`는 기본적으로 펼쳐진 상태로 시작하도록 합니다.
                    with gr.Accordion("얼굴 감지 옵션", open=True):
                        # `gr.Checkbox`는 단일 선택/해제 옵션을 제공합니다.
                        face_id_checkbox = gr.Checkbox(
                            label="얼굴 ID 반환", value=True
                        )
                        face_landmarks_checkbox = gr.Checkbox(
                            label="얼굴 특징점 반환", value=False
                        )
                        # 얼굴 속성들을 선택할 수 있는 체크박스 그룹입니다.
                        face_attributes_checkbox_group = gr.CheckboxGroup(
                            choices=[
                                "accessories", "age", "blur", "exposure", "facialHair",
                                "glasses", "hair", "headPose", "mask", "noise",
                                "occlusion", "qualityForRecognition", "smile",
                            ],
                            label="반환할 얼굴 속성",
                        )
                    detect_button = gr.Button("얼굴 감지", variant="primary")
                
                with gr.Column(scale=2):
                    # 얼굴 감지 결과를 보여줄 텍스트 상자입니다.
                    face_output = gr.Textbox(
                        label="API 응답", lines=25, interactive=False
                    )

    # --- 이벤트 핸들러 연결 ---
    # `analyze_button.click(...)`은 '이미지 분석' 버튼이 클릭되었을 때 어떤 동작을 할지 정의합니다.
    analyze_button.click(
        fn=vision_api_call,  # 클릭 시 `vision_api_call` 함수를 실행합니다.
        inputs=[vision_image_input, vision_features],  # 함수의 입력으로 `vision_image_input`과 `vision_features`의 현재 값을 전달합니다.
        outputs=[vision_output_image, vision_tags_output, vision_raw_output],  # 함수가 반환한 결과들을 순서대로 각 출력 컴포넌트에 전달하여 화면을 업데이트합니다.
    )

    # '얼굴 감지' 버튼에 대한 이벤트 핸들러입니다.
    detect_button.click(
        fn=face_api_call,
        inputs=[
            face_image_input,
            face_id_checkbox,
            face_landmarks_checkbox,
            face_attributes_checkbox_group,
        ],
        outputs=face_output,
    )

# 이 스크립트가 직접 실행되었을 때 (예: python main.py), Gradio 앱을 실행합니다.
if __name__ == "__main__":
    demo.launch()  # `launch()` 메소드가 웹 서버를 시작하고 로컬 주소를 출력합니다.
