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
