### [microsoft-ai-school/2025.06.27](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.06.27)

# 📅 2025년 6월 27일: Azure AI 음성 및 사용자 지정 언어 서비스를 활용한 대화형 AI 개발

## 📝 학습 목표

이번 학습에서는 Azure의 강력한 음성 및 언어 서비스를 활용하여, 실시간 음성 처리 및 도메인 특화 정보 추출 애플리케이션을 개발하는 방법을 배웁니다. 음성을 텍스트로 변환(STT)하고, 텍스트를 다시 자연스러운 음성으로 합성(TTS)하는 과정을 경험하며, 사용자 지정 모델을 통해 특정 비즈니스 문서(예: 대출 계약서)에서 원하는 정보만 정확히 추출하는 사용자 지정 명명된 개체 인식(Custom NER) 기술을 학습합니다.

- **Azure Speech Service 활용**: 실시간 음성-텍스트 변환(STT)과 텍스트-음성 합성(TTS) API를 사용하여 음성 기반 상호작용 기능을 구현합니다.
- **동적 API 연동**: Azure에서 제공하는 음성 목록을 API로 동적으로 가져와 UI에 반영하는 방법을 익힙니다.
- **Gradio 기반의 대화형 UI**: STT와 TTS 기능을 쉽게 테스트할 수 있는 탭 기반의 대화형 웹 애플리케이션을 구축합니다.
- **사용자 지정 명명된 개체 인식 (Custom NER)**: Azure AI 언어 스튜디오에서 사전에 학습시킨 모델을 API로 호출하여, 비정형 텍스트에서 '대출자', '대출 금액', '이자율' 등 특정 도메인에 맞는 개체를 정확하게 추출하는 방법을 학습합니다.
- **비동기 작업 처리**: Custom NER과 같이 처리 시간이 긴 작업을 비동기적으로 요청하고, 작업이 완료될 때까지 폴링하여 결과를 확인하는 과정을 이해합니다.

---

## 🖼️ 프로젝트 개요

이날의 프로젝트는 두 가지 핵심 AI 기능을 중심으로 구성됩니다.

1.  **음성 처리 애플리케이션 (`speech.py`)**: Azure Speech Service를 기반으로 STT와 TTS 기능을 제공하는 Gradio 웹 앱입니다. 사용자는 음성 파일을 업로드하여 텍스트로 변환하거나, 텍스트를 입력하여 다양한 목소리의 음성으로 생성하고 바로 들어볼 수 있습니다.
2.  **사용자 지정 정보 추출기 (`custom_ner.py`)**: 대출 계약서 텍스트에서 핵심 정보를 추출하는 Custom NER 모델을 사용하는 Python 스크립트입니다. 비동기 API 호출을 통해 대량의 문서에서도 효율적으로 정보를 추출하는 방법을 보여줍니다.

이 두 프로젝트를 통해 음성 및 언어 데이터를 처리하는 AI 애플리케이션 개발의 핵심적인 두 축을 경험합니다.

---

## 📁 파일 구성 및 설명

| 파일명 | 설명 |
| :--- | :--- |
| `speech.py` | Gradio를 사용하여 **음성-텍스트 변환(STT)**과 **텍스트-음성 합성(TTS)** 기능을 제공하는 메인 애플리케이션입니다. |
| `custom_ner.py` | **사용자 지정 명명된 개체 인식(Custom NER)** 모델을 호출하여 대출 계약서에서 특정 엔터티를 추출하는 스크립트입니다. |
| `speech.http` | STT 및 TTS API를 테스트하기 위한 HTTP 요청 파일입니다. |
| `custom_ner.http`| Custom NER API의 비동기 작업을 테스트하기 위한 HTTP 요청 파일입니다. |
| `data/` | `whatstheweatherlike.wav`와 같은 샘플 오디오 파일과, NER 학습 및 테스트에 사용된 `LoanAgreements` 텍스트 파일이 포함된 디렉토리입니다. |
| `README.md` | 본 학습 내용에 대한 정리 문서입니다. |

---

## 🚀 주요 코드 및 실행 결과

### 1. 음성 처리 애플리케이션 (`speech.py`)

`speech.py`는 STT와 TTS 기능을 하나의 웹 애플리케이션에서 제공합니다. 특히 TTS 기능은 Azure API를 통해 현재 사용 가능한 모든 음성 목록을 동적으로 불러와 드롭다운 메뉴에 채워주는 기능을 포함합니다.

```python
# speech.py

def get_voice_list() -> list[str]:
    """Azure Speech Service에서 사용 가능한 음성 목록을 가져옵니다."""
    # ... (API 호출 로직) ...
    try:
        # ...
        voices = response.json()
        # SSML에서 사용하는 'ShortName'을 반환하고 정렬합니다.
        return sorted([voice["ShortName"] for voice in voices])
    except requests.exceptions.RequestException as e:
        # ...
        return []

# ...

if __name__ == "__main__":
    # 애플리케이션 시작 시 음성 목록을 가져옵니다.
    available_voices = get_voice_list()
    # ... (Gradio UI 설정) ...
    with gr.Blocks(theme=gr.themes.Soft()) as demo:
        # ...
        with gr.TabItem("텍스트를 음성으로 (TTS)"):
            # ...
            tts_voice_select = gr.Dropdown(
                label="음성 선택",
                choices=available_voices, # 동적으로 채워진 음성 목록
                value=default_voice,
            )
            # ...
    demo.launch()
```

#### ✨ 실행 결과

`speech.py`를 실행하면 두 개의 탭이 있는 웹 UI가 나타납니다. TTS 탭에서는 동적으로 로드된 다양한 음성을 선택하여 텍스트를 음성으로 변환하고 즉시 들어볼 수 있습니다.

### 2. 사용자 지정 개체 인식 (`custom_ner.py`)

`custom_ner.py`는 대출 계약서와 같은 특정 형식의 문서에서 필요한 정보만 정확히 뽑아내는 방법을 보여줍니다. 이 스크립트는 비동기 API 호출 패턴을 사용합니다. 먼저 분석 작업을 요청하고, 응답으로 받은 `operation-location` URL을 주기적으로 확인(polling)하여 작업이 완료되면 최종 결과를 가져옵니다.

```python
# custom_ner.py

def submit_ner_job(document_text: str) -> Optional[str]:
    """Custom NER 작업을 제출하고 작업 상태 확인 URL을 반환합니다."""
    # ... (작업 제출 로직) ...
    response = requests.post(url, headers=headers, json=job_payload)
    if response.status_code == 202:
        return response.headers.get("operation-location")
    # ...

def get_ner_result(job_url: str) -> Optional[Dict[str, Any]]:
    """작업이 완료될 때까지 주기적으로 상태를 확인하고 결과를 반환합니다."""
    while True:
        response = requests.get(job_url, headers=headers)
        if response.status_code == 200:
            result = response.json()
            status = result.get("status")
            if status == "succeeded":
                return result # 작업 성공 시 결과 반환
            # ...
            time.sleep(2) # 실행 중이면 잠시 대기
        # ...

if __name__ == "__main__":
    # ...
    job_url = submit_ner_job(document_content)
    if job_url:
        ner_results = get_ner_result(job_url)
        # ... (결과 출력) ...
```

---

## 💡 학습 정리

이번 세션에서는 Azure의 음성 및 언어 서비스를 활용하여 한 단계 더 나아간 AI 애플리케이션을 개발했습니다. 미리 정의된 모델을 사용하는 것을 넘어, **사용자 지정(Custom) 모델**을 통해 특정 비즈니스 요구사항에 맞는 솔루션을 만드는 방법을 배웠습니다. 특히 Custom NER은 금융, 법률, 의료 등 특정 도메인의 문서 처리 자동화에 매우 강력한 도구임을 확인했습니다. 또한, 동적 API 연동과 비동기 처리 패턴을 구현하며 실제 프로덕션 환경에서 마주할 수 있는 기술적인 과제들을 해결하는 경험을 쌓았습니다. 