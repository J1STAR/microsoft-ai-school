import os
import requests
import time

from dotenv import load_dotenv
from pprint import pprint

load_dotenv()

DOCUEMNT_INTELLIGENCE_ENDPOINT_URL = os.getenv(
    "AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT_URL"
)
DOCUMENT_INTELLIGENCE_API_KEY = os.getenv("AZURE_DOCUMENT_INTELLIGENCE_API_KEY")

HEADERS = {"Ocp-Apim-Subscription-Key": DOCUMENT_INTELLIGENCE_API_KEY}


def analyze_document(
    data: str | bytes,
    service: str,
    model: str,
    api_version: str,
    content_type: str = "application/json",
) -> str | None:
    """Analyze a document with Azure Document Intelligence.

    Args:
        data: The document data to analyze.
              If content_type is 'application/json', this should be the URL of the document.
              If content_type is 'image/png', this should be the raw image data.
        service: The Document Intelligence service to use.
        model: The model to use for the analysis.
        api_version: The API version to use.
        content_type: The content type of the data.

    Returns:
        The URL to retrieve the analysis result, or None if the header is not found.

    Raises:
        ValueError: If an unsupported content_type is provided.
    """
    HEADERS["Content-Type"] = content_type

    params = {
        "api-version": api_version,
        "stringIndexType": "utf16CodeUnit",
        "features": "ocrHighResolution,styleFont,formulas,barcodes,languages",
    }

    post_kwargs = {
        "params": params,
        "headers": HEADERS,
    }

    if content_type == "application/json":
        post_kwargs["json"] = {"urlSource": data}
    elif content_type == "image/png":
        post_kwargs["data"] = data
    else:
        raise ValueError(f"Unsupported content_type: '{content_type}'")

    response = requests.post(
        f"{DOCUEMNT_INTELLIGENCE_ENDPOINT_URL}/{service}/documentModels/{model}:analyze",
        **post_kwargs,
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
        data="https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png",
        service="documentintelligence",
        model="prebuilt-read",
        api_version="2024-11-30",
    )

    result = get_analyze_result(result_url)
    pprint(result)
