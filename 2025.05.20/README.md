### [microsoft-ai-school/2025.05.20](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.05.20)

# 2025년 5월 20일 학습 기록

이 디렉토리의 학습 자료는 **고급 웹 크롤링** 기술을 다룹니다. 자바스크립트(JavaScript)로 동적으로 생성되는 콘텐츠를 수집하기 위한 `Selenium` 사용법과, 서비스에서 공식적으로 제공하는 **OpenAPI**를 활용하여 데이터를 수집하는 방법을 학습합니다.

## 📝 학습 내용 요약

`Crawling/` 디렉토리의 Jupyter Notebook들은 다양한 데이터 수집 시나리오를 다룹니다.

- **동적 웹 페이지 크롤링**:
  - `03_동적웹페이지 데이터수집.ipynb` 노트북에서는 `Selenium` 라이브러리를 사용하여 웹 브라우저를 자동화하는 방법을 학습합니다.
  - 사용자의 스크롤과 같은 행동을 시뮬레이션하여 동적으로 로드되는 콘텐츠(예: 더보기 버튼 클릭 후 나타나는 데이터)를 수집하는 실용적인 기법을 실습합니다.

- **서버 부하를 고려한 크롤링**:
  - `04_뉴스댓글 수집1_sleep.ipynb` 노트북은 크롤링 시 짧은 시간 동안 너무 많은 요청을 보내 서버에 부하를 주는 것을 방지하기 위해 `time.sleep()` 함수를 사용하여 요청 사이에 지연 시간을 주는 방법을 다룹니다.

- **OpenAPI 활용**:
  - `05_네이버오픈API활용.ipynb` 노트북은 웹사이트의 HTML을 직접 분석하는 대신, 네이버에서 제공하는 검색 API를 사용하여 정제된 형식(JSON)의 데이터를 얻는 방법을 학습합니다. API 키를 발급받고 요청 헤더에 인증 정보를 포함하여 데이터를 요청하는 과정을 실습합니다.

- **간단한 자연어 처리 (NLP)**:
  - 수집된 텍스트 데이터(예: 뉴스 댓글)를 분석하기 위한 기본적인 자연어 처리 기법을 다룹니다. `Okt` (Open Korean Text) 형태소 분석기를 사용하여 텍스트를 명사, 동사 등 의미 있는 단위로 분리하고, 각 단어의 빈도를 계산하는 방법을 학습합니다.

## 📁 파일 목록

```
2025.05.20/
├── Crawling/
│   ├── 03_동적웹페이지 데이터수집_*.ipynb
│   ├── 04_뉴스댓글 수집*.ipynb          # sleep과 명시적 대기 비교
│   ├── 06_무한스크롤.ipynb
│   ├── 07_셀렉트박스_*.ipynb
│   ├── 08_opneAPI_*.ipynb
│   └── 99_*.ipynb                     # 수집 데이터 활용(시각화, 감성분석)
└── data/
    └── naver_comments_*.csv           # 크롤링으로 수집한 데이터 저장 파일 (추정)
```

## 💡 주요 학습 기술

- **웹 크롤링**: `Selenium`, `BeautifulSoup4`, `requests`
- **OpenAPI**: `requests` (JSON/XML 처리)
- **데이터 처리**: `Pandas`, `NumPy`
- **시각화**: `WordCloud`, `Matplotlib`
- **자연어 처리**: 사전 기반 감성 분석 등
- **핵심 개념**: 동적/정적 웹 페이지, 웹 드라이버, 명시적/암시적 대기, API, 자연어 처리

이 디렉토리의 자료들은 현대 웹 환경의 복잡한 데이터를 수집하고, 이를 실제 분석 및 서비스에 활용할 수 있는 수준의 고급 크롤링 기술과 데이터 처리 능력을 함양하는 데 초점을 맞추고 있습니다. 

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="mailto:j.1star.0726@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/></a>
<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a> 