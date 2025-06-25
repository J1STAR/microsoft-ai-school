import os
import requests
import time

from dotenv import load_dotenv
from pprint import pprint

load_dotenv()

DOCUEMNT_INTELLIGENCE_ENDPOINT_URL = os.getenv("AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT_URL")
DOCUMENT_INTELLIGENCE_API_KEY = os.getenv("AZURE_DOCUMENT_INTELLIGENCE_API_KEY")

HEADERS = {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": DOCUMENT_INTELLIGENCE_API_KEY
}

def analyze_document(url_source: str, model: str, api_version: str):
    payload = {
        "urlSource": url_source
    }

    response = requests.post(
        f"{DOCUEMNT_INTELLIGENCE_ENDPOINT_URL}/documentintelligence/documentModels/{model}:analyze?api-version={api_version}",
        headers=HEADERS,
        json=payload
    )

    return response.headers.get("operation-location")

def get_analyze_result(operation_location: str):
    def request_result():
        return requests.get(operation_location, headers=HEADERS).json()

    response_json = request_result()

    pprint(response_json)

    while response_json.get("status") == "running":
        time.sleep(1)
        response_json = request_result()

    return response_json

if __name__ == "__main__":
    result_url = analyze_document(
        url_source="https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png",
        model="prebuilt-read",
        api_version="2024-11-30"
    )

    result = get_analyze_result(result_url)
    pprint(result)