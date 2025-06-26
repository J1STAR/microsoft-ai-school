import gradio as gr
import sys
import os
import random

from dotenv import load_dotenv
from PIL import Image, ImageDraw, ImageFont

load_dotenv()

# 2025.06.25 디렉토리에 있는 document_intelligence.py를 임포트하기 위해
# 해당 디렉토리를 시스템 경로에 추가합니다.
sibling_dir = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "2025.06.25")
)
if sibling_dir not in sys.path:
    sys.path.append(sibling_dir)

from document_intelligence import analyze_document, get_analyze_result


def change_image_callback(model, image_path):
    with open(image_path, "rb") as image_file:
        image_bytes = image_file.read()

    api_version_by_model = {
        "prebuilt-document": "2023-07-31",
        "prebuilt-read": "2024-11-30",
    }

    request_analyze_result_url = analyze_document(
        data=image_bytes,
        service="formrecognizer",
        model=model,
        api_version=api_version_by_model[model],
        content_type="image/png",
    )

    result = get_analyze_result(request_analyze_result_url)
    result_image = draw_result_image(image_path, result)

    return result, result_image


def draw_result_image(image_path: str, result: dict) -> Image.Image:
    """Draw polygons on the image based on the analysis result.

    Args:
        image_path (str): The path to the image file.
        result (dict): The analysis result from the document intelligence service.

    Returns:
        Image.Image: The image with polygons drawn on it.
    """
    image = Image.open(image_path)
    font = ImageFont.truetype(
        "C:/Users/j1sta/AppData/Local/Microsoft/Windows/Fonts/PretendardGOV-Regular.otf",
        size=16,
    )

    draw = ImageDraw.Draw(image)
    if result.get("analyzeResult"):
        for page in result["analyzeResult"]["pages"]:
            for line in page["lines"]:
                color = (
                    random.randint(0, 255),
                    random.randint(0, 255),
                    random.randint(0, 255),
                )
                draw.polygon(line["polygon"], outline=color, width=2)

                # 다각형의 첫 번째 좌표를 가져와서 텍스트를 표시합니다.
                text_x = line["polygon"][0]
                text_y = line["polygon"][1]

                draw.text(
                    (text_x, text_y - 20),
                    line["content"],
                    fill=color,
                    font=font,
                )

    return image


with gr.Blocks() as demo:
    # input_image = gr.Image(type="pil", label="이미지 선택")
    # encoded_b64_image = gr.Text(label="인코딩된 이미지", interactive=False)

    # output_image = gr.Image(type="pil", label="결과 이미지", interactive=False)

    # input_image.change(fn=lambda image: [image, base64.b64encode(image.tobytes())], inputs=input_image, outputs=[output_image, encoded_b64_image])

    with gr.Row():
        with gr.Column():
            model_select = gr.Dropdown(
                label="모델 선택", choices=["prebuilt-document", "prebuilt-read"]
            )
            input_image = gr.Image(type="filepath", label="이미지 선택")

            response_text = gr.Text(label="분석 요청 결과", interactive=False)

        output_image = gr.Image(type="pil", label="결과 이미지", interactive=False)

    input_image.change(
        fn=change_image_callback,
        inputs=[model_select, input_image],
        outputs=[response_text, output_image],
    )

demo.launch()
