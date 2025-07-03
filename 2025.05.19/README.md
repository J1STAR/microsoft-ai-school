### 📂 GitHub에서 보기: [microsoft-ai-school/2025.05.19](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.05.19)

# 2025년 5월 19일 학습 기록

이 디렉토리의 학습 자료는 웹에서 데이터를 수집하는 **웹 크롤링(Web Crawling)** 기술과, 정답 없이 데이터의 숨겨진 구조를 찾는 **비지도 학습(Unsupervised Learning)**의 대표적인 알고리즘인 **K-Means 군집화**를 다룹니다.

## 📝 학습 내용 요약

- **웹 크롤링 (Web Crawling)**:
  - `Crawling/` 디렉토리의 노트북들은 웹 페이지의 데이터를 프로그래밍 방식으로 수집하는 방법을 학습합니다.
  - `BeautifulSoup` 라이브러리를 사용하여 정적인 웹 페이지의 HTML 구조를 분석하고, 원하는 데이터를 추출(parsing)하는 방법을 실습합니다.
  - 네이버 뉴스 기사와 같이 특정 구조를 가진 웹사이트에서 제목, 내용 등의 정보를 대량으로 수집하는 방법을 다룹니다.

- **비지도 학습 (Unsupervised Learning)**:
  - `05_군집화_k-means.ipynb` 노트북은 대표적인 군집화(Clustering) 알고리즘인 K-Means를 학습합니다.
  - `Scikit-learn`의 `KMeans`를 사용하여 주어진 데이터를 유사한 특성을 가진 K개의 그룹으로 나누는 과정을 실습합니다.
  - 최적의 군집 개수(K)를 찾기 위한 "엘보우 방법(Elbow Method)"을 학습하고, 군집화 결과를 시각화하여 데이터의 내부 구조를 파악합니다.

- **데이터 시각화 (Data Visualization)**:
  - `03_워드클라우드시각화.ipynb` 노트북은 텍스트 데이터의 빈도를 시각적으로 표현하는 워드 클라우드(Word Cloud)를 생성하는 방법을 다룹니다. 크롤링 등으로 수집한 텍스트 데이터의 핵심 키워드를 직관적으로 파악하는 데 사용됩니다.

## 📁 디렉토리 구조 (요약)

```
2025.05.19/
├── Crawling/
│   ├── 01_정적웹페이지 데이터 수집_*.ipynb
│   └── 02_네이버뉴스데이터수집*_*.ipynb
├── 03_워드클라우드시각화.ipynb
├── 05_군집화_k-means_*.ipynb
├── 06_군집화_프로야구_*.ipynb
└── silhouette_analysis.py
```

## 💡 주요 학습 기술

- **웹 크롤링**: `requests`, `BeautifulSoup4`
- **데이터 분석**: `Pandas`, `NumPy`
- **데이터 시각화**: `Matplotlib`, `Seaborn`, `WordCloud`
- **머신러닝**: `Scikit-learn` (KMeans, silhouette_score)
- **핵심 개념**:
    - 웹 크롤링 (정적 페이지, 동적 페이지 탐색)
    - 텍스트 마이닝 및 시각화
    - 비지도 학습 (Unsupervised Learning)
    - 군집화 (Clustering), K-Means
    - 군집 성능 평가 (실루엣 분석)

이 디렉토리의 자료들은 외부에서 데이터를 직접 수집하고, 레이블이 없는 데이터로부터 의미 있는 패턴이나 그룹을 발견하는 데이터 분석의 중요한 두 축을 다루고 있습니다. 

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="mailto:j.1star.0726@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/></a>
<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a> 