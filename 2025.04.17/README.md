# 2025년 4월 17일 학습 기록

이 디렉토리의 학습 자료는 여러 개의 분리된 데이터 소스를 `Pandas`를 사용하여 통합하고, 이를 기반으로 의미 있는 정보를 추출하는 데이터 분석 프로젝트를 다룹니다. '유성우 미션'이라는 시나리오를 통해 데이터 병합(merge), 변환(transformation), 필터링(filtering) 기술을 학습합니다.

## 📝 학습 내용 요약

`2_유성우_미션.ipynb` 노트북은 여러 CSV 파일(`meteorshowers.csv`, `moonphases.csv`, `constellations.csv`, `cities.csv`)을 다루는 과정을 포함합니다.

- **다중 데이터 소스 통합**:
    - `meteorshowers.csv`, `moonphases.csv`, `constellations.csv`, `cities.csv` 등 4개의 서로 다른 CSV 파일을 각각의 DataFrame으로 불러와 다룹니다.
    - `pd.merge()`를 사용하여 공통된 열(예: `bestmonth`)을 기준으로 여러 DataFrame을 하나로 병합하는 방법을 학습합니다.
- **데이터 타입 변환 및 표준화**:
    - `map()` 메서드와 딕셔너리를 활용하여 'january', 'february'와 같은 문자열 형태의 월(Month) 데이터를 1, 2와 같은 숫자 형태로 일괄 변환하여 데이터의 일관성을 확보합니다.
    - `pd.to_datetime()` 함수를 사용하여, 여러 열에 나뉘어 있는 연(가정), 월, 일 정보를 하나의 `datetime` 객체로 변환합니다. 이는 시계열 데이터 분석의 필수적인 전처리 과정입니다.
- **조건부 데이터 필터링**:
    - 사용자의 위치(위도)를 기반으로 관측 가능한 유성우를 필터링합니다. 이는 숫자 비교를 통한 조건부 인덱싱으로 구현됩니다.
- **정보 추출 및 예측**:
    - 최종적으로 통합된 데이터를 바탕으로, 특정 도시에서 관측하기 좋은 유성우의 이름, 시기, 그리고 그 시기의 달의 밝기(관측의 주요 방해 요인) 정보를 예측하고 사용자에게 제공하는 것을 목표로 합니다.

## 📁 파일 목록

| 파일/디렉토리             | 설명                                                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `2_유성우_미션.ipynb`       | 여러 데이터셋을 병합하고 분석하여 유성우 관측 최적 조건을 찾는 전체 과정을 담은 Jupyter Notebook입니다.                                            |
| `data/`                   | 분석에 사용된 원본 데이터 파일들이 위치하는 디렉토리입니다.                                                                                       |
| `data/meteorshowers.csv`  | 유성우 이름, 최적 관측 월, 시작/종료일 등의 정보를 담고 있습니다.                                                                                  |
| `data/moonphases.csv`     | 날짜별 달의 위상(moonphase) 정보를 담고 있습니다.                                                                                                    |
| `data/constellations.csv` | 별자리 이름, 최적 관측 월, 관측 가능 위도 범위 등의 정보를 담고 있습니다.                                                                           |
| `data/cities.csv`         | 세계 주요 도시의 이름과 위도(latitude) 정보를 담고 있습니다.                                                                                      |

## 💡 주요 코드 예시

### `map`을 이용한 월(Month) 데이터 숫자 변환

문자열로 된 월 이름을 숫자 데이터로 일관성 있게 변환하는 코드입니다.

```python
# 월 이름과 숫자를 매핑하는 딕셔너리 생성
months = {'january':1, 'february':2, 'march':3, ...}

# map 함수를 사용하여 'bestmonth' 열의 값을 숫자로 변환
meteor_showers['bestmonth'] = meteor_showers['bestmonth'].map(months)
```

### `pd.to_datetime`으로 날짜 데이터 생성

여러 열에 나뉘어 있는 날짜 정보를 하나의 `datetime` 객체로 통합하는 코드입니다.

```python
# 연도(2020년으로 가정), 월, 일 정보를 합쳐 datetime 객체 생성
meteor_showers['startdate'] = pd.to_datetime(
    '2020-' + meteor_showers['startmonth'].astype(str) + '-' + meteor_showers['startday'].astype(str)
)
``` 