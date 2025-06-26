# 2025년 4월 14일 학습 기록

이 디렉토리의 학습 자료는 Python의 주요 자료 구조(튜플, 세트, 딕셔너리)와 코드 재사용성을 높이는 모듈화 개념을 다룹니다.

## 📝 학습 내용 요약

- **`practice_01.ipynb`**: Python의 기본 자료 구조인 리스트(list)에 이어 튜플(tuple), 세트(set), 딕셔너리(dictionary)의 특성과 사용법을 실습합니다. 각 자료 구조가 언제 유용한지에 대한 이해를 높입니다.
- **`calculator.py`, `my_module.py`**: 모듈(module) 생성 및 사용법을 학습합니다. `calculator.py`에 정의된 함수를 `my_module.py`에서 `import`하여 사용함으로써, 코드의 분리, 재사용성, 관리 용이성을 높이는 모듈화의 이점을 실습합니다.
- **`main.py`**: 프로그램의 시작점(entry point) 역할을 하는 `main` 스크립트에서 다른 모듈들을 어떻게 가져와서 사용하는지를 보여줍니다.

## 📁 파일 목록

| 파일명              | 설명                                                                                                                                   |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `practice_01.ipynb` | 튜플, 세트, 딕셔너리 등 다양한 자료 구조와 함수 정의, 활용법에 대한 실습 코드를 담고 있는 Jupyter Notebook 파일입니다.                   |
| `my_module.py`      | 덧셈(`add`)과 뺄셈(`sub`) 함수가 정의된 간단한 Python 모듈입니다.                                                                       |
| `calculator.py`     | 덧셈 기능을 가진 `Calculator` 클래스가 정의된 파일로, 클래스와 객체 지향 프로그래밍의 기초를 학습하기 위한 모듈입니다.                     |

## 💡 주요 코드 예시

### 딕셔너리를 활용한 데이터 처리

리스트와 딕셔너리를 조합하여 학생들의 성적 데이터를 관리하고, 반복문을 통해 평균을 계산하는 예제입니다.

```python
students = [
    {"name": "Alice", "scores": [90, 85, 92]},
    {"name": "Bob", "scores": [78, 80, 88]},
    {"name": "Charlie", "scores": [95, 92, 89]}
]
# ... (코드 생략) ...
for student in students:
    # ... (학생별 평균 계산) ...
# ... (전체 평균 계산) ...
```

### 클래스 정의

간단한 계산기 기능을 하는 `Calculator` 클래스를 정의한 코드입니다.

```python
# calculator.py
class Calculator:
    def __init__(self):
        self.result = 0

    def add(self, num):
        self.result += num
        return self.result
``` 