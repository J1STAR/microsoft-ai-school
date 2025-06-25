import asyncio
import requests
import os

from pprint import pprint
from pydoll.browser.chromium import Chrome
from pydoll.browser.options import ChromiumOptions

dirname = os.path.dirname(__file__)

async def download_pdf(url: str):
    response = requests.get(url)
    with open(f"{os.path.join(dirname, '../data', 'japan_travel_brochures', url.split('/')[-1])}", "wb") as f:
        f.write(response.content)
        
    pprint(f"completed download {url}")

async def download_task(url: str, browser):
    print(f"going to {url}")

    brochure_tab = await browser.new_tab()
    await brochure_tab.go_to(url)

    pdf_elements = await brochure_tab.query("ul.list_result div.pdf_img a", find_all=True)
    pdf_urls = [pdf_element.get_attribute("href") for pdf_element in pdf_elements]
    
    tasks = [download_pdf(pdf_url) for pdf_url in pdf_urls]
    await asyncio.gather(*tasks)

    await brochure_tab.close()

# www.japan.travel/brochures/kor/index.php?page=
async def download_japan_travel_brochures():
    options = ChromiumOptions()
    options.add_argument("--headless=new")
    browser = Chrome(options=options)
    
    await browser.start()

    total_pages = 2
    tasks = [
        download_task(f"https://www.japan.travel/brochures/kor/index.php?page={page}", browser)
        for page in range(1, total_pages + 1)
    ]

    await asyncio.gather(*tasks)

if __name__ == "__main__":
    asyncio.run(download_japan_travel_brochures())