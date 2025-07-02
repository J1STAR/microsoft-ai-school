### [microsoft-ai-school/2025.07.02](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.07.02)

# 📅 2025년 7월 2일: Azure Vision & Face 서비스를 활용한 이미지 분석 웹 앱 개발

## 📝 학습 목표

이번 학습에서는 Azure의 강력한 인공지능 서비스인 **Vision Service**와 **Face Service**를 활용하여, 이미지 속 정보를 다각도로 분석하는 웹 애플리케이션을 개발합니다. Gradio 프레임워크를 사용하여 사용자가 직관적으로 이미지를 업로드하고 분석 결과를 시각적으로 확인할 수 있는 UI를 구축하는 데 중점을 둡니다.

- **Azure AI 서비스 연동**: Python 환경에서 `requests` 라이브러리를 사용하여 Azure의 REST API(Vision, Face)와 통신하는 방법을 학습합니다.
- **서비스 클래스 모듈화**: API 호출 로직을 `VisionService`와 `FaceService`라는 별도의 클래스로 캡슐화하여, 코드의 재사용성과 유지보수성을 높이는 방법을 익힙니다.
- **대화형 웹 UI 구축**: Gradio를 사용하여 이미지 업로드, 기능 선택(체크박스), 결과 출력(주석 이미지, 텍스트, 마크다운) 등 다양한 컴포넌트를 조합하여 사용자 친화적인 인터페이스를 설계합니다.
- **API 결과 시각화**: API로부터 받은 복잡한 JSON 형식의 데이터를 사용자가 쉽게 이해할 수 있도록, 이미지 위에 바운딩 박스를 그리거나(AnnotatedImage), 주요 정보를 목록(Markdown)으로 요약하는 등 시각적으로 가공하는 방법을 실습합니다.

---

## 🖼️ 프로젝트 개요

이날의 프로젝트는 사용자가 업로드한 이미지 한 장에서 풍부한 정보를 추출하고 시각화해주는 **지능형 이미지 분석 도구**입니다. 애플리케이션은 두 가지 핵심 기능을 탭으로 구분하여 제공합니다.

1.  **이미지 분석 (Vision Service)**: 이미지의 전체적인 맥락을 이해하는 기능입니다.
    -   **Tags**: 이미지와 관련된 핵심 키워드들을 신뢰도 점수와 함께 추출합니다. (`#사람`, `#의류`)
    -   **Caption**: 이미지를 한 문장으로 요약합니다. (`테이블 위의 무언가를 보고 있는 여성들`)
    -   **Dense Captions**: 이미지의 특정 영역별로 상세한 설명을 바운딩 박스와 함께 제공합니다.
    -   이 외에도 `Objects`, `People`, `SmartCrops`, `Read`(OCR) 등 다양한 분석이 가능합니다.

2.  **얼굴 감지 (Face Service)**: 이미지 속 인물의 얼굴에 집중하여 상세 정보를 분석합니다.
    -   얼굴의 위치를 정확히 찾아내고, `age`(나이), `smile`(미소 여부), `glasses`(안경 착용), `mask`(마스크 착용) 등 다양한 속성을 분석하여 반환합니다.

사용자는 이 도구를 통해 단순한 이미지를 넘어, 그 안에 담긴 이야기와 데이터를 발견하는 경험을 할 수 있습니다.

![Gradio UI 최종 결과](results/gradio_vision_rest_api_실습결과.png)

---

## 📁 파일 구성 및 설명

| 파일명 | 설명 |
| :--- | :--- |
| `main.py` | Gradio를 사용하여 **이미지 분석**과 **얼굴 감지** 탭을 가진 메인 애플리케이션 UI를 구성하고, 각 서비스 함수와 연결하는 역할을 합니다. |
| `services/vision_service.py` | Azure AI Vision 서비스 API와 통신하는 `VisionService` 클래스입니다. 이미지 URL 또는 로컬 파일을 받아 분석을 요청하고 결과를 반환합니다. |
| `services/face_service.py` | Azure AI Face 서비스 API와 통신하는 `FaceService` 클래스입니다. 얼굴 감지 및 속성 분석을 요청하고 결과를 반환합니다. |
| `vision.http` | Visual Studio Code의 REST Client 확장 프로그램을 사용하여 각 API를 직접 테스트해 볼 수 있는 HTTP 요청 파일입니다. |
| `data/` | 분석 테스트에 사용할 샘플 이미지들이 저장된 디렉터리입니다. |
| `results/` | 실습 과정에서 생성된 주요 실행 결과 스크린샷이 저장된 디렉터리입니다. |
| `README.md` | 본 학습 내용에 대한 정리 문서입니다. |

---

## 🚀 주요 코드 및 실행 결과

### 이미지 분석 결과 시각화 (`main.py`)

`vision_api_call` 함수는 단순히 API 응답을 텍스트로 출력하는 것을 넘어, 사용자가 결과를 쉽게 이해하도록 시각적으로 가공하는 중요한 역할을 합니다. 특히 여러 분석 결과가 하나의 이미지 위에 겹쳐 어지럽게 보일 수 있는 문제를 해결하기 위해, **각 분석 결과를 별도의 탭으로 분리하여** 명확하게 보여줍니다.

-   `denseCaptionsResult`가 있으면, '영역별 상세 설명' 탭의 이미지 위에 각 설명과 바운딩 박스를 표시합니다.
-   `objectsResult`가 있으면, '객체 탐지' 탭의 이미지 위에 감지된 각 객체와 그 이름을 바운딩 박스로 표시합니다.
-   `tagsResult`가 있으면, 각 태그의 이름과 신뢰도 점수를 마크다운 목록 형식으로 예쁘게 정리합니다.

```python
# main.py

def vision_api_call(
    image_path: str, features: list[str]
) -> tuple[
    str | tuple[str, list] | None,
    str | tuple[str, list] | None,
    str,
    str,
]:
    # ... (서비스 호출 로직) ...

    # Dense Captions 결과 가공
    dense_captions_annotations = []
    if "denseCaptions" in features and result.get("denseCaptionsResult"):
        for caption in result["denseCaptionsResult"]["values"]:
            box = caption["boundingBox"]
            x, y, w, h = box["x"], box["y"], box["w"], box["h"]
            annotation_box = (x, y, x + w, y + h)
            dense_captions_annotations.append((annotation_box, caption["text"]))
    
    dense_captions_output = (image_path, dense_captions_annotations)

    # Objects 결과 가공
    objects_annotations = []
    if "objects" in features and result.get("objectsResult"):
        for object in result["objectsResult"]["values"]:
            box = object["boundingBox"]
            x, y, w, h = box["x"], box["y"], box["w"], box["h"]
            annotation_box = (x, y, x + w, y + h)
            objects_annotations.append((annotation_box, object["name"]))
    
    objects_output = (image_path, objects_annotations)

    # Tags 결과 가공
    tags_markdown = "### 이미지 태그\n"
    if "tags" in features and result.get("tagsResult"):
        tags_list = [
            f"- `{tag['name']}` (정확도: {tag['confidence']:.2%})"
            for tag in result["tagsResult"]["values"]
        ]
        tags_markdown += "\n".join(tags_list)
    
    return dense_captions_output, objects_output, tags_markdown, pformat(result)
```

#### ✨ 실행 결과 1: 이미지 태그 분석

'tags' 기능을 선택하고 이미지를 분석하면, `tagsResult`의 내용이 우측의 '이미지 태그' 영역에 마크다운 목록으로 깔끔하게 표시됩니다.

![이미지 태그 분석 결과](results/gradio_vision_rest_api_imageTags_실습결과1.png)

#### ✨ 실행 결과 2: 객체 탐지 분석

'objects' 기능을 선택하면, '객체 탐지' 탭에 이미지 속에서 인식된 각 사물(person, seating 등)의 위치가 바운딩 박스와 라벨로 명확하게 표시됩니다.

![객체 탐지 분석 결과](results/gradio_vision_rest_api_객체탐지_시각화.png)

#### ✨ 실행 결과 3: 영역별 상세 설명 분석

'denseCaptions' 기능을 선택하면, '영역별 상세 설명' 탭에서 이미지의 각 주요 영역에 대한 설명이 바운딩 박스와 함께 시각화됩니다.

![영역별 상세 설명 분석 결과 1](results/gradio_vision_rest_api_denseCaptions_실습결과1.png)
![영역별 상세 설명 분석 결과 2](results/gradio_vision_rest_api_denseCaptions_실습결과2.png)

#### ✨ 실행 결과 4: 얼굴 속성 분석

'Face Detection' 탭에서 이미지를 분석하면, API가 반환하는 얼굴의 위치, 나이, 마스크 착용 여부 등의 상세 정보가 우측 'API 응답' 영역에 JSON 형식으로 출력됩니다.

![얼굴 속성 분석 결과](results/gradio_face_rest_api_실습결과.png)

---

## 💡 학습 정리

이번 세션을 통해 Azure의 강력한 AI 서비스를 Python 코드 몇 줄만으로 활용하고, 이를 Gradio라는 도구를 통해 누구나 쉽게 사용할 수 있는 웹 애플리케이션으로 만드는 과정을 경험했습니다.

특히 API가 반환하는 정형 데이터(JSON)를 그대로 보여주는 것에서 한 걸음 더 나아가, **사용자의 관점에서 정보를 재가공하고 시각화하는 것**이 얼마나 사용자 경험을 향상시키는지 체감할 수 있었습니다. 처음에는 모든 시각화 결과를 한 곳에 표시했지만, 정보가 너무 많아 오히려 이해하기 어렵다는 피드백을 통해 **각 분석 결과를 별도의 탭으로 분리하는 개선**을 진행했습니다. 이 과정을 통해 좋은 UI/UX는 단순히 기능을 제공하는 것을 넘어, 사용자가 정보를 명확하고 쾌적하게 소비할 수 있도록 설계해야 함을 깨달았습니다. 