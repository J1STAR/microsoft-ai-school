# services 폴더에 있는 custom_vision_service.py 파일에서 CustomVisionService 클래스를 가져옵니다.
# 이 클래스는 Azure Custom Vision 서비스의 복잡한 기능들을 쉽게 사용할 수 있도록 미리 만들어 놓은 것입니다.
from services.custom_vision_service import CustomVisionService

# os 라이브러리는 파일 경로를 다루거나, 시스템 환경 변수를 읽는 등
# 운영체제와 관련된 기능들을 사용하기 위해 필요합니다.
import os

# time 라이브러리는 프로그램의 실행을 잠시 멈추는 등의 시간 관련 기능을 제공합니다.
import time

# requests 라이브러리는 웹 URL에 HTTP 요청을 보내고 응답을 받기 위해 사용됩니다.
import requests

# io 라이브러리의 BytesIO는 메모리 상에서 바이너리 데이터를 다루기 위해 사용됩니다.
from io import BytesIO

# Pillow(PIL) 라이브러리는 이미지 파일을 열고, 그리고, 저장하는 등 다양한 이미지 처리 기능을 제공합니다.
from PIL import Image, ImageDraw, ImageFont

# dotenv 라이브러리는 .env 파일에 저장된 환경 변수들을
# 프로그램으로 쉽게 불러올 수 있게 도와주는 역할을 합니다.
from dotenv import load_dotenv

# .env 파일에 정의된 환경 변수들을 현재 실행 환경으로 로드합니다.
# 이 과정을 통해 API 키와 같은 민감한 정보를 코드에 직접 노출하지 않고 안전하게 사용할 수 있습니다.
load_dotenv()


# 이 스크립트가 직접 실행되었을 때만 아래의 코드를 실행하도록 하는 파이썬의 표준적인 구문입니다.
if __name__ == "__main__":
    # --- 1. 서비스 초기화 ---
    # CustomVisionService 클래스의 인스턴스(실체)를 생성합니다.
    # 이 때, .env 파일에서 불러온 Azure 서비스의 접속 정보(엔드포인트, API 키)를 전달합니다.
    custom_vision_service = CustomVisionService(
        training_endpoint=os.getenv("AZURE_CUSTOM_VISION_TRAINING_ENDPOINT_URL"),
        prediction_endpoint=os.getenv("AZURE_CUSTOM_VISION_PREDICTION_ENDPOINT_URL"),
        training_key=os.getenv("AZURE_CUSTOM_VISION_TRAINING_API_KEY"),
        prediction_key=os.getenv("AZURE_CUSTOM_VISION_PREDICTION_API_KEY"),
    )

    # --- 2. 기존 프로젝트 및 도메인 목록 조회 ---
    # Custom Vision 서비스에 어떤 프로젝트들이 만들어져 있는지 확인합니다.
    # 이 단계는 개발 중 현재 상태를 파악하거나, 기존 프로젝트와 상호작용할 때 유용합니다.
    custom_vision_service.trainer.get_projects()
    # 어떤 종류의 모델(도메인)을 만들 수 있는지 목록을 확인합니다.
    # 도메인은 '음식', '리테일', '랜드마크' 등 특정 목적에 최적화된 모델 유형을 의미합니다.
    custom_vision_service.trainer.get_domains()

    # --- 3. "포크 및 가위" 객체 탐지(Object Detection) 프로젝트 생성 ---
    # 서비스 객체를 사용하여 새로운 이미지 분류 프로젝트를 생성합니다.
    # 만약 '7ai050 Kitchen'이라는 이름의 프로젝트가 이미 있다면, 새로 만들지 않고 기존 프로젝트 정보를 가져옵니다.
    kitchen_project = custom_vision_service.trainer.create_project(
        project_name="7ai050 Kitchen",
        project_description="포크, 가위를 분류하는 객체 탐지 모델",
        domain_type="ObjectDetection",  # "ObjectDetection"으로 지정하여 객체 탐지용 프로젝트를 생성합니다.
        domain_name="General (compact)",  # "일반" 유형의 범용 객체 탐지 도메인을 사용합니다.
    )

    # --- 4. 이미지 학습을 위한 태그(카테고리) 생성 ---
    # `data/kitchen` 폴더 안에 있는 하위 폴더('fork', 'scissor')들의 이름을 읽어옵니다.
    # 이 폴더 이름들이 Custom Vision 프로젝트에서 이미지를 분류하는 기준, 즉 '태그'가 됩니다.
    kitchen_tags = os.listdir(
        os.path.join(os.path.dirname(__file__), "data", "kitchen")
    )
    # 위에서 읽어온 폴더 이름('fork', 'scissor')들을 사용하여, Custom Vision 프로젝트에 실제로 태그를 생성합니다.
    # 이 태그들은 나중에 이미지를 업로드하고 학습시킬 때, 각 이미지나 영역에 대한 라벨로 사용됩니다.
    custom_vision_service.trainer.create_tags(
        project_id=kitchen_project.id,
        tag_names=kitchen_tags,
    )

    # --- 5. 업로드할 이미지와 메타데이터 준비 ---
    # 객체 탐지 모델을 학습시키려면, 각 이미지 파일과 함께 이미지 안에서
    # 객체가 있는 위치(Bounding Box 좌표)와 해당 객체의 태그(라벨) 정보가 필요합니다.
    # 여기서는 '포크'와 '가위' 이미지들의 파일 이름과 좌표 정보를 딕셔너리 형태로 미리 정의합니다.
    # 좌표는 [left, top, width, height] 형식이며, 전체 이미지 크기에 대한 상대적인 비율(0.0 ~ 1.0)입니다.
    region_by_fork_images = {
        "fork_1": [0.145833328, 0.3509314, 0.5894608, 0.238562092],
        "fork_2": [0.294117659, 0.216944471, 0.534313738, 0.5980392],
        "fork_3": [0.09191177, 0.0682516545, 0.757352948, 0.6143791],
        "fork_4": [0.254901975, 0.185898721, 0.5232843, 0.594771266],
        "fork_5": [0.2365196, 0.128709182, 0.5845588, 0.71405226],
        "fork_6": [0.115196079, 0.133611143, 0.676470637, 0.6993464],
        "fork_7": [0.164215669, 0.31008172, 0.767156839, 0.410130739],
        "fork_8": [0.118872553, 0.318251669, 0.817401946, 0.225490168],
        "fork_9": [0.18259804, 0.2136765, 0.6335784, 0.643790841],
        "fork_10": [0.05269608, 0.282303959, 0.8088235, 0.452614367],
        "fork_11": [0.05759804, 0.0894935, 0.9007353, 0.3251634],
        "fork_12": [0.3345588, 0.07315363, 0.375, 0.9150327],
        "fork_13": [0.269607842, 0.194068655, 0.4093137, 0.6732026],
        "fork_14": [0.143382356, 0.218578458, 0.7977941, 0.295751631],
        "fork_15": [0.19240196, 0.0633497, 0.5710784, 0.8398692],
        "fork_16": [0.140931368, 0.480016381, 0.6838235, 0.240196079],
        "fork_17": [0.305147052, 0.2512582, 0.4791667, 0.5408496],
        "fork_18": [0.234068632, 0.445702642, 0.6127451, 0.344771236],
        "fork_19": [0.219362751, 0.141781077, 0.5919118, 0.6683006],
        "fork_20": [0.180147052, 0.239820287, 0.6887255, 0.235294119],
    }

    region_by_scissor_images = {
        "scissors_1": [0.4007353, 0.194068655, 0.259803921, 0.6617647],
        "scissors_2": [0.426470578, 0.185898721, 0.172794119, 0.5539216],
        "scissors_3": [0.289215684, 0.259428144, 0.403186262, 0.421568632],
        "scissors_4": [0.343137264, 0.105833367, 0.332107842, 0.8055556],
        "scissors_5": [0.3125, 0.09766343, 0.435049027, 0.71405226],
        "scissors_6": [0.379901975, 0.24308826, 0.32107842, 0.5718954],
        "scissors_7": [0.341911763, 0.20714055, 0.3137255, 0.6356209],
        "scissors_8": [0.231617644, 0.08459154, 0.504901946, 0.8480392],
        "scissors_9": [0.170343131, 0.332957536, 0.767156839, 0.403594762],
        "scissors_10": [0.204656869, 0.120539248, 0.5245098, 0.743464053],
        "scissors_11": [0.05514706, 0.159754932, 0.799019635, 0.730392158],
        "scissors_12": [0.265931368, 0.169558853, 0.5061275, 0.606209159],
        "scissors_13": [0.241421565, 0.184264734, 0.448529422, 0.6830065],
        "scissors_14": [0.05759804, 0.05027781, 0.75, 0.882352948],
        "scissors_15": [0.191176474, 0.169558853, 0.6936275, 0.6748366],
        "scissors_16": [0.1004902, 0.279036, 0.6911765, 0.477124184],
        "scissors_17": [0.2720588, 0.131977156, 0.4987745, 0.6911765],
        "scissors_18": [0.180147052, 0.112369314, 0.6262255, 0.6666667],
        "scissors_19": [0.333333343, 0.0274019931, 0.443627447, 0.852941155],
        "scissors_20": [0.158088237, 0.04047389, 0.6691176, 0.843137264],
    }

    # `upload_images` 메서드에 전달할 데이터 구조를 생성합니다.
    # 이 리스트는 각 이미지의 파일 경로, 영역 좌표, 태그 정보를 담은 딕셔너리들의 모음입니다.
    images_to_upload = []

    # '포크' 이미지 데이터를 `images_to_upload` 리스트에 추가합니다.
    for file_name, region in region_by_fork_images.items():
        images_to_upload.append(
            {
                # "path": 이미지 파일의 전체 경로를 생성합니다.
                "path": os.path.join(
                    os.path.dirname(__file__),
                    "data",
                    "kitchen",
                    "fork",
                    f"{file_name}.jpg",
                ),
                # "regions": 이미지 내에서 '포크' 객체가 있는 위치와 라벨 정보를 지정합니다.
                "regions": [
                    {
                        "tag_name": "fork",  # 이 영역의 라벨은 'fork'입니다.
                        "left": region[0],
                        "top": region[1],
                        "width": region[2],
                        "height": region[3],
                    }
                ],
            }
        )

    # '가위' 이미지 데이터를 `images_to_upload` 리스트에 추가합니다.
    for file_name, region in region_by_scissor_images.items():
        images_to_upload.append(
            {
                # "path": 이미지 파일의 전체 경로를 생성합니다.
                "path": os.path.join(
                    os.path.dirname(__file__),
                    "data",
                    "kitchen",
                    "scissor",
                    f"{file_name}.jpg",
                ),
                # "regions": 이미지 내에서 '가위' 객체가 있는 위치와 라벨 정보를 지정합니다.
                "regions": [
                    {
                        "tag_name": "scissor",  # 이 영역의 라벨은 'scissor'입니다.
                        "left": region[0],
                        "top": region[1],
                        "width": region[2],
                        "height": region[3],
                    }
                ],
            }
        )

    # --- 6. 이미지 일괄 업로드 및 결과 확인 ---
    # 위에서 준비한 데이터 리스트를 `upload_images` 함수에 전달하여
    # 모든 이미지를 Custom Vision 프로젝트에 한 번에 업로드합니다.
    upload_result = custom_vision_service.trainer.upload_images(
        project_id=kitchen_project.id, images_data=images_to_upload
    )
    # 업로드 작업의 결과를 콘솔에 출력하여 성공 여부나 오류를 확인합니다.
    print(f"이미지 업로드 결과: {upload_result}")

    # --- 7. 모델 학습 시작 ---
    # 모든 이미지가 성공적으로 업로드되었으므로, 이제 모델 학습을 시작하도록 명령합니다.
    # 이 과정은 Custom Vision 서비스 서버에서 비동기적으로 수행되며, 데이터의 양에 따라 시간이 소요될 수 있습니다.
    training_iterations = custom_vision_service.trainer.get_iterations(
        project_id=kitchen_project.id
    )

    try:
        # 새로운 학습을 시작하도록 서비스에 요청합니다.
        # 만약 학습 가능한 이미지나 변경사항이 없으면 예외가 발생할 수 있습니다.
        iteration = custom_vision_service.trainer.train(project_id=kitchen_project.id)
        print(f"새로운 학습 시작: {iteration}")
    except Exception as e:
        # 예외 발생 시 (예: "No new images to train"), 이미 존재하는 학습 버전 중 첫 번째 것을 사용합니다.
        print(f"학습 시작 실패 ({e}), 기존 학습 버전을 사용합니다.")
        iteration = training_iterations[0]

    # --- 8. 학습 완료 대기 (폴링) ---
    # 학습은 서버에서 비동기적으로 수행되므로, 완료될 때까지 주기적으로 상태를 확인해야 합니다 (폴링).
    print("학습 상태를 확인합니다. 완료될 때까지 대기합니다...")
    while iteration.status == "Training":
        time.sleep(5)  # 5초 대기
        # 현재 iteration의 최신 상태 정보를 다시 가져옵니다.
        iteration = custom_vision_service.trainer.get_iteration(
            project_id=kitchen_project.id, iteration_id=iteration.id
        )
        print(f"  - 현재 학습 상태: {iteration.status} (Iteration ID: {iteration.id})")

    print(f"학습이 완료되었습니다! 최종 상태: {iteration.status}")

    # --- 9. 학습된 모델 게시(Publish) ---
    # 학습이 완료된 모델(Iteration)을 예측에 사용할 수 있도록 '게시'합니다.
    # 게시된 모델은 고유한 '게시 이름'을 갖게 되며, 이 이름으로 예측 API를 호출할 수 있습니다.
    publish_name = "7ai050-kitchen-v1"
    publish_result = custom_vision_service.trainer.publish(
        project_id=kitchen_project.id,
        iteration_id=iteration.id,
        publish_name=publish_name,
        prediction_id=os.getenv("AZURE_CUSTOM_VISION_PREDICTION_RESOURCE_ID"),
    )
    print(f"'{publish_name}' 이름으로 모델을 게시했습니다.")

    # --- 10. 게시된 모델로 예측 수행 ---
    # 테스트할 이미지 URL을 지정하고, 해당 URL에서 이미지 데이터를 다운로드합니다.
    predict_image_url = (
        "https://images.unsplash.com/photo-1569702824812-351205c9cde5?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    )
    predict_image_data = requests.get(predict_image_url).content

    # 다운로드한 이미지 데이터를 사용하여 예측을 수행합니다.
    predict_response = custom_vision_service.predictor.predict_using_image_data(
        project_id=kitchen_project.id,
        published_name=publish_name,  # 위에서 지정한 게시 이름 사용
        image_data=predict_image_data,
    )

    # --- 11. 예측 결과 시각화 ---
    # 예측 결과를 원본 이미지 위에 직접 그려서 확인하기 위해 준비합니다.
    predict_image = Image.open(BytesIO(predict_image_data))
    draw = ImageDraw.Draw(predict_image, "RGBA")
    try:
        font = ImageFont.truetype("malgun.ttf", size=20)
    except IOError:
        font = ImageFont.load_default()
        print("맑은 고딕 폰트를 찾을 수 없어 기본 폰트를 사용합니다.")

    print("예측 결과:")
    # 예측 결과(predictions) 리스트를 순회하며 각 항목을 처리합니다.
    for prediction in predict_response.predictions:
        # 신뢰도(probability)가 50% 이상인 예측만 처리합니다.
        if prediction.probability > 0.5:
            # 예측된 객체의 바운딩 박스 좌표를 가져옵니다. (0.0 ~ 1.0 사이의 상대 좌표)
            bbox = prediction.bounding_box
            # 상대 좌표를 이미지의 실제 픽셀 좌표로 변환합니다.
            left = bbox.left * predict_image.width
            top = bbox.top * predict_image.height
            width = bbox.width * predict_image.width
            height = bbox.height * predict_image.height

            print(
                f"  - 태그: {prediction.tag_name}, 신뢰도: {prediction.probability:.2%}, "
                f"위치: (L:{left:.0f}, T:{top:.0f}, W:{width:.0f}, H:{height:.0f})"
            )

            # 이미지 위에 사각형(바운딩 박스)을 그립니다.
            draw.rectangle(
                (left, top, left + width, top + height),
                outline="red",  # 윤곽선 색상
                width=3,  # 윤곽선 두께
            )
            # 이미지 위에 태그 이름과 신뢰도를 텍스트로 씁니다.
            draw.text(
                (left, top - 25 if top > 25 else top + 10),  # 텍스트 위치 조정
                f"{prediction.tag_name}: {prediction.probability:.2%}",
                fill="red",
                font=font,
            )

    # --- 12. 결과 이미지 저장 ---
    # 바운딩 박스와 텍스트가 그려진 최종 이미지를 파일로 저장합니다.
    output_path = os.path.join(os.path.dirname(__file__), "output", "predict_image.png")
    predict_image.save(output_path)
    print(f"예측 결과 이미지를 '{output_path}'에 저장했습니다.")
