import gradio as gr
import os
import requests
import time
from dotenv import load_dotenv
from typing import Dict, Any, Optional, Tuple

# .env 파일에서 환경 변수를 로드합니다.
load_dotenv()


def transcribe_audio(audio_path: Optional[str], language: str = "en-US") -> Optional[Dict[str, Any]]:
    """
    Azure Speech Service를 사용하여 오디오 파일을 텍스트로 변환합니다.

    Args:
        audio_path (Optional[str]): 변환할 오디오 파일의 경로.

    Returns:
        Optional[Dict[str, Any]]: API로부터 받은 JSON 응답 또는 오류 발생 시 None.
    """
    if not audio_path:
        gr.Warning("음성 파일을 업로드해주세요.")
        return None

    speech_key = os.getenv("AZURE_SPEECH_API_KEY")
    speech_region = os.getenv("AZURE_SPEECH_REGION")

    if not speech_key or not speech_region:
        raise gr.Error("환경 변수 파일(.env)에 Azure Speech API 키와 지역을 설정해야 합니다.")

    # 2025.06.27/speech.http 파일의 설정을 참조합니다.
    url = f"https://{speech_region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language={language}&format=detailed"

    headers = {
        "Ocp-Apim-Subscription-Key": speech_key,
        "Content-Type": "audio/wav",
    }

    try:
        with open(audio_path, "rb") as audio_file:
            audio_data = audio_file.read()

        response = requests.post(url, headers=headers, data=audio_data, timeout=30)
        response.raise_for_status()  # HTTP 오류 발생 시 예외 발생

        return response.json()

    except FileNotFoundError:
        gr.Error(f"파일을 찾을 수 없습니다: {audio_path}")
        return None
    except requests.exceptions.RequestException as e:
        # 응답 내용을 포함하여 더 자세한 오류 메시지를 표시합니다.
        error_message = f"API 요청 중 오류가 발생했습니다: {e}"
        if e.response is not None:
            error_message += f"\\n응답 내용: {e.response.text}"
        gr.Error(error_message)
        return None
    except Exception as e:
        gr.Error(f"알 수 없는 오류가 발생했습니다: {e}")
        return None


def get_voice_list() -> list[str]:
    """
    Azure Speech Service에서 사용 가능한 음성 목록을 가져옵니다.

    Returns:
        list[str]: 사용 가능한 음성 이름의 목록 ('ShortName').
    """
    speech_key = os.getenv("AZURE_SPEECH_API_KEY")
    speech_region = os.getenv("AZURE_SPEECH_REGION")

    if not speech_key or not speech_region:
        print("Warning: AZURE_SPEECH_API_KEY 또는 AZURE_SPEECH_REGION이 .env 파일에 설정되지 않았습니다.")
        return []

    url = f"https://{speech_region}.tts.speech.microsoft.com/cognitiveservices/voices/list"
    headers = {
        "Ocp-Apim-Subscription-Key": speech_key,
    }

    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        voices = response.json()
        # SSML에서 사용하는 'ShortName'을 반환하고 정렬합니다.
        return sorted([voice["ShortName"] for voice in voices])
    except requests.exceptions.RequestException as e:
        print(f"음성 목록을 가져오는 중 API 요청 오류가 발생했습니다: {e}")
        return []
    except Exception as e:
        print(f"음성 목록을 가져오는 중 알 수 없는 오류가 발생했습니다: {e}")
        return []


def synthesize_speech(text: str, voice_name: str) -> Optional[str]:
    """
    Azure Speech Service를 사용하여 텍스트를 음성으로 변환합니다.

    Args:
        text (str): 음성으로 변환할 텍스트.
        voice_name (str): 사용할 음성의 이름.

    Returns:
        Optional[str]: 생성된 오디오 파일의 경로 또는 실패 시 None.
    """
    if not text.strip():
        gr.Warning("음성으로 변환할 텍스트를 입력해주세요.")
        return None

    speech_key = os.getenv("AZURE_SPEECH_API_KEY")
    speech_region = os.getenv("AZURE_SPEECH_REGION")

    if not speech_key or not speech_region:
        raise gr.Error("환경 변수 파일(.env)에 Azure Speech API 키와 지역을 설정해야 합니다.")

    # 2025.06.27/speech.http 파일의 설정을 참조합니다.
    url = f"https://{speech_region}.tts.speech.microsoft.com/cognitiveservices/v1"
    headers = {
        "Ocp-Apim-Subscription-Key": speech_key,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
        "User-Agent": "curl",
    }

    language = "-".join(voice_name.split("-")[0:2])

    # SSML(Speech Synthesis Markup Language) 본문을 생성합니다.
    ssml_body = f"""
    <speak version='1.0' xml:lang='{language}'>
        <voice xml:lang='{language}' name='{voice_name}'>
            {text}
        </voice>
    </speak>
    """

    try:
        response = requests.post(
            url, headers=headers, data=ssml_body.encode("utf-8"), timeout=30
        )
        response.raise_for_status()

        # 생성된 음성 파일을 저장할 경로를 설정합니다.
        output_dir = os.path.join(os.path.dirname(__file__), "data", "speech", "output")
        os.makedirs(output_dir, exist_ok=True)
        timestamp = time.strftime("%Y%m%d_%H%M%S")
        output_audio_path = os.path.join(output_dir, f"output_{timestamp}.mp3")

        with open(output_audio_path, "wb") as audio_file:
            audio_file.write(response.content)

        gr.Info(f"음성 파일이 '{output_audio_path}' 경로에 저장되었습니다.")
        return output_audio_path

    except requests.exceptions.RequestException as e:
        error_message = f"API 요청 중 오류가 발생했습니다: {e}"
        if e.response is not None:
            error_message += f"\\n응답 내용: {e.response.text}"
        gr.Error(error_message)
        return None
    except Exception as e:
        gr.Error(f"알 수 없는 오류가 발생했습니다: {e}")
        return None


if __name__ == "__main__":
    available_voices = get_voice_list()
    if not available_voices:
        print("경고: Azure에서 음성 목록을 가져오지 못했습니다. 기본 목록을 사용합니다.")
        # Provide a default list if fetching fails
        available_voices = [
            "en-US-AvaMultilingualNeural",
            "en-US-JennyNeural",
            "en-US-AndrewMultilingualNeural",
            "en-US-BrianMultilingualNeural",
            "en-US-EmmaMultilingualNeural",
        ]

    default_voice = (
        "en-US-AvaMultilingualNeural"
        if "en-US-AvaMultilingualNeural" in available_voices
        else available_voices[0] if available_voices else ""
    )
    with gr.Blocks(theme=gr.themes.Soft()) as demo:
        gr.Markdown(
            """
            # Azure Speech Service
            """
        )
        with gr.Tabs():
            with gr.TabItem("음성을 텍스트로 (STT)"):
                gr.Markdown(
                    """
                    ## Speech to Text
                    음성 파일을 업로드하고 "음성 변환" 버튼을 클릭하여 텍스트로 변환합니다.<br>
                    `.env` 파일에 `AZURE_SPEECH_API_KEY`와 `AZURE_SPEECH_REGION`가 설정되어 있어야 합니다.<br>
                    기본으로 `whatstheweatherlike.wav` 파일이 선택되어 있습니다.
                    """
                )
                with gr.Row():
                    with gr.Column(scale=1):
                        stt_audio_input = gr.Audio(
                            type="filepath",
                            label="음성 파일 업로드 (.wav)",
                            value="whatstheweatherlike.wav",
                        )
                        stt_transcribe_button = gr.Button("음성 변환", variant="primary")

                    with gr.Column(scale=2):
                        stt_json_output = gr.JSON(label="변환 결과")

                stt_transcribe_button.click(
                    fn=transcribe_audio,
                    inputs=stt_audio_input,
                    outputs=stt_json_output,
                    api_name="transcribe_audio",
                )

            with gr.TabItem("텍스트를 음성으로 (TTS)"):
                gr.Markdown(
                    """
                    ## Text to Speech
                    텍스트를 입력하고 "음성 생성" 버튼을 클릭하여 음성으로 변환합니다.<br>
                    """
                )
                with gr.Row():
                    with gr.Column(scale=1):
                        tts_text_input = gr.Textbox(
                            label="변환할 텍스트",
                            placeholder="Hello, world!",
                            lines=5,
                        )
                        tts_voice_select = gr.Dropdown(
                            label="음성 선택",
                            choices=available_voices,
                            value=default_voice,
                        )
                        tts_synthesize_button = gr.Button("음성 생성", variant="primary")

                    with gr.Column(scale=2):
                        tts_audio_output = gr.Audio(
                            label="생성된 음성", type="filepath", autoplay=True
                        )
                tts_synthesize_button.click(
                    fn=synthesize_speech,
                    inputs=[tts_text_input, tts_voice_select],
                    outputs=tts_audio_output,
                    api_name="synthesize_speech",
                )
                
        demo.launch() 