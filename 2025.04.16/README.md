### 📂 GitHub에서 보기: [microsoft-ai-school/2025.04.16](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.04.16)

# 2025년 4월 16일 학습 기록

이 디렉토리의 학습 자료는 데이터 분석 라이브러리 `Pandas`를 처음 접하고, 이를 활용하여 실제 데이터를 불러와 기본적인 분석을 수행하는 과정을 다룹니다. 가상의 '달 탐사 미션' 시나리오를 통해 데이터 분석의 기초를 학습합니다.

## 📝 학습 내용 요약

`1_달탐사_미션.ipynb` 노트북은 `Pandas`를 사용한 데이터 처리 및 분석의 기본 단계를 안내합니다.

- **데이터 불러오기**: `pd.read_csv()` 함수를 사용하여 `data/rocksamples.csv` 파일을 `DataFrame`으로 로드합니다.
- **데이터 탐색**: `.head()`, `.info()`, `.describe()` 등의 메소드를 사용하여 데이터의 기본 구조(행/열), 데이터 타입, 기초 통계 정보를 확인합니다.
- **데이터 정제**: `.isnull().sum()`으로 결측치를 확인하고, `fillna()` 또는 `dropna()`를 사용해 처리하는 방법을 학습합니다. 데이터의 단위를 통일하거나 형식을 변경하는 기본적인 전처리 작업을 수행합니다.
- **데이터 분석 및 시각화**: 특정 조건에 맞는 데이터를 필터링하고, 간단한 통계(예: 평균, 합계)를 계산합니다. `matplotlib` 또는 `seaborn`을 활용하여 데이터를 시각화하고 분석 결과를 직관적으로 이해하는 방법을 배웁니다.
- **결과 저장**: 분석이 완료된 `DataFrame`을 `.to_csv()` 함수를 사용해 새로운 CSV 파일로 저장하는 방법을 실습합니다.

## 📁 파일 목록

| 파일/디렉토리       | 설명                                                                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `1_달탐사_미션.ipynb` | Pandas를 사용하여 월석 샘플 데이터를 불러오고, 정제, 변환, 분석하는 전체 과정을 담은 Jupyter Notebook 파일입니다.                         |
| `data/`             | 분석에 사용될 원본 데이터가 위치하는 디렉토리입니다.                                                                                     |
| `data/rocksamples.csv` | 아폴로 임무 ID, 임무명, 암석 종류, 무게(g) 등의 정보를 담고 있는 원본 CSV 데이터 파일입니다.                                            |

## 💡 주요 코드 예시

### `groupby`를 이용한 임무별 샘플 무게 계산

`Mission` 열을 기준으로 데이터를 그룹화하고, 각 임무별로 수집한 암석의 총 무게(`Weight (kg)`)를 계산하는 코드입니다.

```python
# rock_samples 데이터프레임에서 'Mission' 별로 그룹화하여 'Weight (kg)'의 합계를 계산
sample_total_weight = rock_samples.groupby('Mission')['Weight (kg)'].sum()
```

### 데이터 변환 및 이름 변경

무게 단위를 변환하고, 해당 열의 이름을 바꾸는 일련의 데이터 처리 과정입니다.

```python
# 'Weight (g)' 열의 모든 값을 1000으로 나누어 단위를 변환
rock_samples['Weight (g)'] = rock_samples['Weight (g)'].apply(lambda weight: weight / 1000.0)

# 열 이름을 'Weight (g)'에서 'Weight (kg)'으로 변경
rock_samples.rename(columns={'Weight (g)': 'Weight (kg)'}, inplace=True)
```

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact
<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items:center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>j.1star.0726@gmail.com</a> 