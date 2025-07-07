from typing import List
import os

import cv2
import numpy as np

from PIL import Image, ImageFont, ImageDraw
from pprint import pprint

# cv2.data.haarcascades에 포함된 사용 가능한 캐스케이드 파일 목록
# 이 목록은 얼굴, 눈, 상체 등 다양한 객체를 탐지하는 데 사용될 수 있는 사전 훈련된 모델 파일들입니다.
CASCADE_FILES = [
    "haarcascade_upperbody.xml",
    "haarcascade_eye_tree_eyeglasses.xml",
    "haarcascade_eye.xml",
    "haarcascade_frontalcatface_extended.xml",
    "haarcascade_frontalcatface.xml",
    "haarcascade_frontalface_alt_tree.xml",
    "haarcascade_frontalface_alt.xml",
    "haarcascade_frontalface_alt2.xml",
    "haarcascade_frontalface_default.xml",
    "haarcascade_fullbody.xml",
    "haarcascade_lefteye_2splits.xml",
    "haarcascade_license_plate_rus_16stages.xml",
    "haarcascade_lowerbody.xml",
    "haarcascade_profileface.xml",
    "haarcascade_righteye_2splits.xml",
    "haarcascade_russian_plate_number.xml",
    "haarcascade_smile.xml",
]

# 폰트 경로 설정: 결과 이미지에 텍스트(예: 객체 레이블)를 표시할 때 사용할 폰트 파일을 지정합니다.
# 참고: 이 경로는 사용자 시스템에 따라 다를 수 있으므로, 실행 환경에 맞게 수정이 필요할 수 있습니다.
# 예를 들어, Windows의 경우 'C:/Windows/Fonts/malgun.ttf', macOS의 경우 '/System/Library/Fonts/Supplemental/AppleGothic.ttf' 등으로 설정할 수 있습니다.
font = ImageFont.truetype(
    "C:/Users/j1sta/AppData/Local/Microsoft/Windows/Fonts/PretendardGOV-Regular.otf",
    size=16,
)


class _Face:
    """OpenCV의 Haar Cascade를 사용하여 얼굴 탐지를 수행하는 클래스."""

    def __init__(self, face_cascade: str) -> None:
        """
        _Face 클래스의 생성자.

        Args:
            face_cascade (str): 초기 얼굴 탐지에 사용할 캐스케이드 파일의 이름.
        """
        self.set_scale_factor(1.1)
        self.set_min_neighbors(5)
        self.set_cascade(face_cascade)

    def detect(self, image: np.ndarray) -> np.ndarray:
        """
        입력된 이미지에서 얼굴을 탐지하고, 탐지된 얼굴 주위에 사각형을 그립니다.

        Args:
            image (np.ndarray): 얼굴을 탐지할 입력 이미지 (RGB 형식의 NumPy 배열).

        Returns:
            np.ndarray: 탐지된 얼굴에 사각형이 그려진 이미지 (RGB 형식의 NumPy 배열).
        """
        # Gradio의 Image 컴포넌트는 기본적으로 RGB 형식의 이미지를 사용하지만,
        # OpenCV는 BGR 형식을 기본으로 사용하므로, 색상 체계를 변환해줍니다.
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        # 다중 스케일 탐지를 사용하여 이미지에서 얼굴을 찾습니다.
        # scaleFactor: 각 이미지 스케일에서 이미지 크기를 얼마나 줄일지를 지정합니다. 값이 작을수록 더 많은 스케일에서 탐색하므로 탐지율은 높지만 속도가 느려집니다.
        # minNeighbors: 각 후보 사각형이 유지되기 위해 필요한 이웃 사각형의 최소 개수. 이 값이 높을수록 탐지 결과는 더 신뢰할 수 있지만, 일부 얼굴을 놓칠 수 있습니다.
        # minSize: 탐지할 객체의 최소 크기.
        faces = self.cascade.detectMultiScale(
            image,
            scaleFactor=self.scale_factor,
            minNeighbors=self.min_neighbors,
            minSize=(30, 30),
        )
        pprint(faces)  # 탐지된 얼굴의 좌표 정보를 콘솔에 출력합니다.

        # 탐지된 각 얼굴에 대해 사각형을 그립니다.
        for x, y, w, h in faces:
            # (x, y)는 사각형의 왼쪽 위 좌표, (w, h)는 너비와 높이입니다.
            # (0, 0, 255)는 BGR 형식에서 빨간색을 의미합니다. 2는 선의 두께입니다.
            cv2.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 2)

        # 결과를 Gradio에 올바르게 표시하기 위해 이미지를 다시 RGB 형식으로 변환합니다.
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        return image

    def set_cascade(self, cascade: str) -> None:
        """
        얼굴 탐지에 사용할 Haar Cascade 모델을 설정합니다.

        Args:
            cascade (str): 사용할 캐스케이드 파일의 이름 (확장자 제외).
        """
        # OpenCV 라이브러리에 내장된 haarcascades 파일의 전체 경로를 생성합니다.
        self.cascade_path = f"{cv2.data.haarcascades}{cascade}.xml"
        # 지정된 경로의 캐스케이드 파일을 로드하여 CascadeClassifier 객체를 생성합니다.
        self.cascade = cv2.CascadeClassifier(self.cascade_path)

    def set_scale_factor(self, scale_factor: float) -> None:
        """
        얼굴 탐지 시 사용할 scaleFactor 값을 설정합니다.

        Args:
            scale_factor (float): 설정할 scaleFactor 값.
        """
        self.scale_factor = scale_factor

    def set_min_neighbors(self, min_neighbors: int) -> None:
        """
        얼굴 탐지 시 사용할 minNeighbors 값을 설정합니다.

        Args:
            min_neighbors (int): 설정할 minNeighbors 값.
        """
        self.min_neighbors = min_neighbors


class _Yolo:
    """YOLO(You Only Look Once) 모델을 사용하여 객체 탐지를 수행하는 클래스."""

    def __init__(self, weights_path: str, config_path: str, names_path: str) -> None:
        """
        _Yolo 클래스의 생성자.

        Args:
            weights_path (str): YOLO 모델의 가중치 파일(.weights) 경로.
            config_path (str): YOLO 모델의 구성 파일(.cfg) 경로.
            names_path (str): 모델이 탐지할 수 있는 객체들의 이름이 담긴 파일(.names) 경로.
        """
        # dnn 모듈을 사용하여 YOLO 네트워크를 로드합니다.
        self.net = cv2.dnn.readNet(weights_path, config_path)

        # 클래스 이름 파일을 읽어 리스트로 저장합니다.
        with open(names_path, "r", encoding="utf-8") as f:
            self._names = f.read().strip().splitlines()

    def detect(self, image: np.ndarray) -> np.ndarray:
        """
        입력된 이미지에서 객체를 탐지하고, 결과 바운딩 박스와 레이블을 그립니다.

        Args:
            image (np.ndarray): 객체를 탐지할 입력 이미지 (RGB 형식의 NumPy 배열).

        Returns:
            np.ndarray: 탐지된 객체 정보가 그려진 이미지 (RGB 형식의 NumPy 배열).
        """
        # OpenCV의 NumPy 배열을 PIL 이미지 객체로 변환합니다. 텍스트 렌더링에 PIL을 사용하기 위함입니다.
        pil_image = Image.fromarray(image)

        height, width = image.shape[:2]

        # 이미지를 YOLO 모델의 입력 형식에 맞게 전처리합니다.
        # 1/255.0: 픽셀 값을 0-1 사이로 정규화합니다.
        # (416, 416): YOLO 모델이 학습된 입력 이미지 크기입니다.
        # swapRB=True: OpenCV는 BGR, TensorFlow/PyTorch 등은 RGB를 사용하므로 채널 순서를 맞춥니다.
        # crop=False: 이미지 크기를 조정할 때 잘라내지 않습니다.
        blob = cv2.dnn.blobFromImage(
            image, 1 / 255.0, (416, 416), swapRB=True, crop=False
        )
        self.net.setInput(blob)

        # 네트워크의 모든 레이어 이름을 가져옵니다.
        # layer_names = self.net.getLayerNames()
        
        # 출력 레이어(연결되지 않은 레이어)의 인덱스를 가져와 해당 레이어의 이름을 찾습니다. 이 레이어들에서 최종 탐지 결과가 나옵니다.
        # output_layers = [layer_names[i - 1] for i in self.net.getUnconnectedOutLayers()]
        output_layers = self.net.getUnconnectedOutLayersNames()

        # 입력 이미지를 네트워크에 통과시켜(순방향 전파) 탐지 결과를 얻습니다.
        detections = self.net.forward(output_layers)

        class_ids = []
        confidences = []
        boxes = []

        # 'detections'는 여러 출력 레이어의 결과를 담고 있으므로, 각 결과를 순회합니다.
        for detection in detections:
            # 각 출력 레이어의 결과는 여러 객체(obj)의 탐지 정보를 담고 있습니다.
            for obj in detection:
                # obj[0:4]는 바운딩 박스 정보(중심 x, 중심 y, 너비, 높이)
                # obj[5:]는 각 클래스에 대한 신뢰도(score) 점수입니다.
                scores = obj[5:]
                # 가장 높은 점수를 가진 클래스의 인덱스를 찾습니다.
                class_id = np.argmax(scores)
                # 해당 클래스의 신뢰도 점수를 가져옵니다.
                confidence = scores[class_id]

                # 신뢰도가 0.5 이상인 경우에만 유효한 탐지로 간주합니다.
                if confidence > 0.5:
                    # 바운딩 박스의 좌표와 크기를 원본 이미지의 크기에 맞게 다시 조정합니다.
                    box = obj[0:4] * np.array([width, height, width, height])
                    (center_x, center_y, w, h) = box.astype("int")
                    # 바운딩 박스의 좌측 상단 (x, y) 좌표를 계산합니다.
                    x = int(center_x - (w / 2))
                    y = int(center_y - (h / 2))

                    boxes.append([x, y, int(w), int(h)])
                    confidences.append(float(confidence))
                    class_ids.append(class_id)

        # 비최대 억제(Non-Maximum Suppression, NMS)를 적용하여 겹치는 바운딩 박스 중 가장 신뢰도가 높은 것만 남깁니다.
        # score_threshold (0.5): 이 점수 미만의 박스는 고려하지 않습니다.
        # nms_threshold (0.4): 이 임계값 이상으로 겹치는(IoU) 박스는 억제됩니다.
        indices = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)

        # NMS를 통과한 최종 탐지 결과가 있는 경우
        if len(indices) > 0:
            # 최종 선택된 바운딩 박스들을 순회합니다.
            for i in indices.flatten():
                x, y, w, h = boxes[i]
                # 레이블 텍스트를 생성합니다 (예: "사람 0.95").
                label = f"{self._names[class_ids[i]]} {confidences[i]:.2f}"

                # PIL을 사용하여 이미지에 텍스트와 사각형을 그립니다.
                draw = ImageDraw.Draw(pil_image)
                # 텍스트의 위치를 바운딩 박스 위쪽으로 조정하여 그립니다.
                draw.text((x, y - 20), label, font=font, fill=(255, 0, 0))
                # 바운딩 박스를 그립니다.
                draw.rectangle((x, y, x + w, y + h), outline=(255, 0, 0), width=2)

        # PIL 이미지를 다시 NumPy 배열로 변환하여 반환합니다.
        return np.array(pil_image)


class OpenCVService:
    """얼굴 탐지 및 YOLO 객체 탐지 기능을 제공하는 메인 서비스 클래스."""

    def __init__(self) -> None:
        """OpenCVService 클래스의 생성자."""
        self.cascade_files = CASCADE_FILES

        # 내부적으로 사용할 _Face와 _Yolo 헬퍼 클래스를 초기화합니다.
        self._face = _Face(face_cascade="haarcascade_frontalface_default")
        self._yolo = _Yolo(
            weights_path=os.path.join(
                os.path.dirname(__file__), "..", "models", "yolov3", "yolov3.weights"
            ),
            config_path=os.path.join(
                os.path.dirname(__file__), "..", "models", "yolov3", "yolov3.cfg"
            ),
            names_path=os.path.join(
                os.path.dirname(__file__),
                "..",
                "models",
                "yolov3",
                "coco_korean.names",
            ),
        )

    def get_cascades(self) -> List[str]:
        """
        사용 가능한 Haar Cascade 파일 목록 중 'face'를 포함하는 파일들의 이름을 반환합니다.

        Returns:
            List[str]: 얼굴 탐지용 캐스케이드 파일 이름의 리스트.
        """
        # CASCADE_FILES 리스트에서 파일 이름에 'face'가 포함된 것만 필터링합니다.
        face_cascades = filter(
            lambda cascade_file: "face" in cascade_file, CASCADE_FILES
        )
        # 파일 이름에서 '.xml' 확장자를 제거하여 반환합니다.
        return list(
            map(lambda cascade_file: f"{cascade_file.split('.')[0]}", face_cascades)
        )

    @property
    def face(self) -> _Face:
        """
        얼굴 탐지(_Face) 서비스 인스턴스를 반환하는 프로퍼티.

        Returns:
            _Face: _Face 클래스의 인스턴스.
        """
        return self._face

    @property
    def yolo(self) -> _Yolo:
        """
        YOLO 객체 탐지(_Yolo) 서비스 인스턴스를 반환하는 프로퍼티.

        Returns:
            _Yolo: _Yolo 클래스의 인스턴스.
        """
        return self._yolo
