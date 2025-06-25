from duckduckgo_search import DDGS
from pprint import pprint

def search(query: str, max_results: int = 5) -> list[str]:
    pprint(f"query: {query}")

    with DDGS() as ddgs:
        results = [result for result in ddgs.text(query, max_results=max_results)]

    pprint(f"search results: {results}")

    return results