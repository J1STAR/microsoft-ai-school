### [microsoft-ai-school/2025.04.18](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.04.18)

# 2025년 4월 18일 학습 기록

이 디렉토리의 학습 자료는 여러 개의 대용량 CSV 파일을 `Pandas`로 효율적으로 불러오고 통합하여 분석하는 방법을 다룹니다. 서울시 공공자전거 '따릉이'의 대여 이력 데이터를 활용하여, 데이터 전처리, 통합, 시각화를 통한 탐색적 데이터 분석(EDA)을 수행합니다.

## 📝 학습 내용 요약

`3_따릉이_미션.ipynb` 노트북은 분할된 대용량 데이터를 처리하는 실용적인 기법을 중심으로 구성되어 있습니다.

- **분할된 데이터 불러오기 및 통합**: `glob` 라이브러리를 사용하여 `data/` 디렉토리 내의 `bike_rent_*.csv` 패턴을 가진 모든 파일을 찾아 목록을 만듭니다. 반복문을 통해 각 CSV 파일을 `Pandas` DataFrame으로 읽어온 후, `pd.concat()` 함수를 사용해 하나의 DataFrame으로 병합합니다.
- **데이터 정제 및 전처리**: 데이터의 결측치를 확인하고, 불필요한 열을 제거합니다. 또한, 각 열의 데이터 타입을 적절하게 변환하는 작업을 수행합니다.
- **탐색적 데이터 분석 (EDA)**: 시간대별, 대여소별 대여/반납 건수를 분석하여 이용 패턴을 파악합니다. `matplotlib`이나 `seaborn`과 같은 시각화 라이브러리를 사용하여 시간에 따른 대여량 변화, 주요 대여소의 위치 등을 시각적으로 탐색합니다.

## 📁 파일 목록

| 파일/디렉토리           | 설명                                                                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `3_따릉이_미션.ipynb`     | 대규모 따릉이 대여 이력 데이터를 통합, 분석하고, 다양한 방식으로 시각화하는 전체 분석 과정을 담은 Jupyter Notebook입니다. (파일 크기로 인해 내용 직접 분석은 생략) |
| `data/`                 | 분석에 사용된 원본 데이터 파일들이 위치하는 디렉토리입니다.                                                                                       |
| `data/bike_rent_*.csv`  | 기간별로 분할된 따릉이 대여 이력 원본 데이터 파일들입니다. (1~6)                                                                                  |
| `data/bike_shop.csv`    | 따릉이 대여소의 ID, 이름, 위치(위도, 경도) 등의 정보를 담고 있습니다.                                                                              |
| `data/seoul.json`       | 서울시 행정구역 경계 정보를 담고 있는 GeoJSON 파일로, 지도 시각화에 사용됩니다.                                                                     |

## 💡 주요 분석 기법 (예상)

### Folium을 이용한 지도 시각화

서울시 중심을 기준으로 지도를 생성하고, 그 위에 대여소 위치를 마커로 표시하는 코드입니다.

```python
import folium

# 서울시 중심 위도, 경도를 기준으로 지도 생성
map_seoul = folium.Map(location=[37.5665, 126.9780], zoom_start=11)

# 대여소 위치 데이터를 반복하며 지도에 마커 추가
for idx, row in bike_shop.iterrows():
    folium.Marker(
        location=[row['lat'], row['lng']],
        popup=row['shop_name']
    ).add_to(map_seoul)

map_seoul
```

### 시간대별 대여량 분석

시간 정보를 활용하여 시간대별 평균 대여량을 계산하고, 이를 막대 그래프로 시각화하는 분석입니다.

```python
import matplotlib.pyplot as plt
import seaborn as sns

# 'rent_time' 열을 datetime으로 변환했다고 가정
bike_rent['hour'] = bike_rent['rent_time'].dt.hour

# 시간대별 대여량 집계
hourly_rentals = bike_rent.groupby('hour').size()

# 시각화
plt.figure(figsize=(12, 6))
sns.barplot(x=hourly_rentals.index, y=hourly_rentals.values)
plt.title('시간대별 따릉이 대여량')
plt.xlabel('시간')
plt.ylabel('총 대여 건수')
plt.show()

```

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="mailto:j.1star.0726@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/></a>
<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a> 