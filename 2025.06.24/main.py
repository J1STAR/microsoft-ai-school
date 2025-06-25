import gradio as gr

from services.openai_service import OpenAIService


if __name__ == "__main__":
    openai_service = OpenAIService()

    with gr.Blocks() as demo:
        with gr.Tab("채팅"):
            chatbot = gr.Chatbot(label="채팅", value=[], elem_id="chatbot")

            with gr.Row(equal_height=True):
                input_textbox = gr.Textbox(
                    label="메시지를 입력하세요.",
                    placeholder="메시지를 입력하고 Enter를 누르거나 채팅 전송 버튼을 클릭하세요.",
                    scale=7,
                )
                submit_button = gr.Button(
                    "채팅 전송",
                    scale=1,
                )

                # Chatbot event handlers
                submit_button.click(
                    fn=openai_service.chat,
                    inputs=[input_textbox, chatbot],
                    outputs=[input_textbox, chatbot],
                )
                input_textbox.submit(
                    fn=openai_service.chat,
                    inputs=[input_textbox, chatbot],
                    outputs=[input_textbox, chatbot],
                )

        with gr.Tab("이미지 생성"):

            with gr.Row(equal_height=True):
                image_prompt_textbox = gr.Textbox(
                    label="이미지 생성 프롬프트",
                    placeholder="생성할 이미지에 대한 설명을 입력하세요.",
                    scale=7,
                )
                image_submit_button = gr.Button("이미지 생성", scale=1)

            image_output_image = gr.Image(label="생성된 이미지", interactive=False)

            # Image generation event handlers
            image_submit_button.click(
                fn=openai_service.generate_image,
                inputs=[image_prompt_textbox],
                outputs=[image_output_image],
            )
            image_prompt_textbox.submit(
                fn=openai_service.generate_image,
                inputs=[image_prompt_textbox],
                outputs=[image_output_image],
            )

        with gr.Tab("텍스트 검색"):
            with gr.Row(equal_height=True):
                search_prompt_textbox = gr.Textbox(
                    label="텍스트 검색 프롬프트",
                    placeholder="검색할 텍스트를 입력하세요.",
                    scale=7,
                )
                search_submit_button = gr.Button("텍스트 검색", scale=1)

            search_output_text = gr.Textbox(label="검색 결과", interactive=False)

            # Search event handlers
            search_submit_button.click(
                fn=openai_service.search,
                inputs=[search_prompt_textbox],
                outputs=[search_output_text],
            )
            search_prompt_textbox.submit(
                fn=openai_service.search,
                inputs=[search_prompt_textbox],
                outputs=[search_output_text],
            )

        with gr.Tab("일본 여행 정보"):
            japan_chatbot = gr.Chatbot(
                label="채팅", value=[], elem_id="japan_chatbot", resizable=True
            )

            with gr.Row(equal_height=True):
                japan_travel_prompt_textbox = gr.Textbox(
                    label="일본 여행 정보 프롬프트",
                    placeholder="일본 여행 정보를 검색하세요.",
                    scale=7,
                )
                japan_travel_submit_button = gr.Button("추천 시작", scale=1)

            with gr.Row():
                citations_textbox = gr.Textbox(
                    label="참고 문헌", interactive=False, lines=60
                )

            # Japan travel event handlers
            japan_travel_submit_button.click(
                fn=openai_service.japan_travel,
                inputs=[japan_travel_prompt_textbox, japan_chatbot],
                outputs=[japan_travel_prompt_textbox, japan_chatbot, citations_textbox],
            )
            japan_travel_prompt_textbox.submit(
                fn=openai_service.japan_travel,
                inputs=[japan_travel_prompt_textbox, japan_chatbot],
                outputs=[japan_travel_prompt_textbox, japan_chatbot, citations_textbox],
            )


demo.launch()
