import gradio as gr
import sys
import os


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
directories_to_add = ["2025.06.24", "2025.06.27"]

for directory in directories_to_add:
    # 상위 디렉토리와 대상 디렉토리 이름을 조합하여 절대 경로를 만듭니다.
    path_to_add = os.path.abspath(os.path.join(current_dir, "..", directory))
    # 생성된 경로가 sys.path에 아직 없으면 추가합니다.
    # 이렇게 하면 중복 추가를 방지할 수 있습니다.
    if path_to_add not in sys.path:
        sys.path.append(path_to_add)


from speech import transcribe_audio, synthesize_speech, get_voice_list
from services.openai_service import OpenAIService

if __name__ == "__main__":
    with gr.Blocks() as demo:
        openai_service = OpenAIService()
        with gr.Row():
            with gr.Column():
                chatbot = gr.Chatbot(type="messages")
                with gr.Row(equal_height=True):
                    with gr.Column(scale=7):
                        user_input = gr.Textbox(
                            label="Message",
                            placeholder="Enter your message here...",
                        )

                        output_audio = gr.Audio(
                            label="음성 출력",
                            type="filepath",
                            interactive=False,
                            autoplay=True,
                            visible=False
                        )
                    with gr.Column(scale=1):
                        send_button = gr.Button("Send")

                # Chatbot event handlers
                send_button.click(
                    fn=openai_service.chat,
                    inputs=[user_input, chatbot],
                    outputs=[user_input, chatbot, output_audio],
                )
                user_input.submit(
                    fn=openai_service.chat,
                    inputs=[user_input, chatbot],
                    outputs=[user_input, chatbot, output_audio],
                )

            with gr.Column():
                with gr.Column():
                    gr.Markdown("# Speech to Text")
                    input_audio = gr.Audio(
                        label="음성 입력",
                        type="filepath",
                        sources=["microphone"],
                    )
                    output_text = gr.Textbox(
                        label="음성 인식 결과",
                        placeholder="음성을 인식하고 텍스트로 변환합니다.",
                        interactive=False,
                    )

                    input_audio.change(
                        lambda audio_path: (
                            transcribe_audio(audio_path, language="ko-KR").get(
                                "DisplayText"
                            )
                            if audio_path is not None
                            else ""
                        ),
                        inputs=[input_audio],
                        outputs=[output_text],
                    )

                with gr.Column():
                    gr.Markdown("# Text to Speech")
                    input_text = gr.Textbox(
                        label="텍스트 입력",
                        placeholder="텍스트를 입력하고 음성으로 변환합니다.",
                    )
                    voice_list = gr.Dropdown(
                        label="음성 선택",
                        choices=get_voice_list(),
                    )
                    submit_button = gr.Button("음성 생성")

                    output_audio = gr.Audio(
                        label="음성 출력",
                        type="filepath",
                        interactive=False,
                        autoplay=True,
                    )

                    submit_button.click(
                        lambda text, voice: synthesize_speech(text, voice),
                        inputs=[input_text, voice_list],
                        outputs=[output_audio],
                    )

    demo.launch()
