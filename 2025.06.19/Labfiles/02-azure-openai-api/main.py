import os
from dotenv import load_dotenv

# Add Azure OpenAI package
from openai import AzureOpenAI

from pprint import pprint


def main():

    try:

        # Get configuration settings
        load_dotenv()
        azure_openai_key = os.getenv("AZURE_OPENAI_API_KEY")
        azure_openai_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT_URL")
        azure_openai_deployment = os.getenv("AZURE_OPENAI_DEPLOYMENT")

        # Initialize the Azure OpenAI client...
        client = AzureOpenAI(
            azure_endpoint=azure_openai_endpoint,
            api_key=azure_openai_key,
            api_version="2025-01-01-preview",
        )

        while True:
            # Get input text
            input_text = input("Enter the prompt (or type 'quit' to exit): ")
            if input_text.lower() == "quit":
                break
            if len(input_text) == 0:
                print("Please enter a prompt.")
                continue

            system_message = "너는 과일 전문가야"
            print("\nSending request for summary to Azure OpenAI endpoint...\n\n")
            messages = [
                {"role": "user", "content": "체리에 대해서 소개해줘."},
                {
                    "role": "assistant",
                    "content": "체리는 새콤달콤한 과일이에요! 비타민이 풍부해서 피부에도 좋아요 🍒",
                },
                {"role": "user", "content": "수박 알려줘."},
                {
                    "role": "assistant",
                    "content": "다양한 비타민과 미네랄이 풍부한 과일이에요. 건강에 도움이 되는 과일이에요.",
                },
                {"role": "user", "content": input_text},  # 1
            ]

            # Add code to send request...
            completion = client.chat.completions.create(
                model=azure_openai_deployment,
                messages=messages,
                max_tokens=800,
                temperature=0.8,
                top_p=0.95,
            )
            print(completion.choices[0].message.content)

    except Exception as ex:
        print(ex)


if __name__ == "__main__":
    main()
