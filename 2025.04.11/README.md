### [microsoft-ai-school/2025.04.11](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.04.11)

# 2025년 4월 11일 학습 기록

이 디렉토리의 학습 자료는 Python의 핵심 제어 구조인 조건문과 반복문을 다룹니다. 이를 활용하여 프로그램의 흐름을 제어하고, 사용자 입력 처리, 반복을 통한 문제 해결, 간단한 라이브러리 활용법을 실습합니다.

## 📝 학습 내용 요약

`practice_01.ipynb` 파일은 Python의 제어 흐름을 다루는 다양한 예제를 포함합니다.

- **조건문 (`if`, `elif`, `else`)**: 사용자로부터 나이를 입력받아 성인 여부를 판별하거나, 점수에 따라 학점을 부여하는 등 다양한 조건 분기 예제를 통해 `if`문의 활용법을 익힙니다. 또한, 조건부 표현식(3항 연산자)을 사용하여 코드를 더 간결하게 작성하는 방법을 학습합니다.
- **반복문 (`while`, `for`)**: `while` 루프를 사용하여 특정 조건이 만족될 때까지 반복하는 로그인 기능을 구현하고, `for` 루프와 `range()` 함수를 사용해 1부터 10까지의 합이나 구구단을 출력하는 예제를 실습합니다.
- **반복 제어 (`break`, `continue`)**: 반복문 내에서 `break`를 사용하여 특정 조건이 만족되면 루프를 즉시 중단하거나, `continue`를 사용하여 특정 조건일 때 현재 반복을 건너뛰고 다음 반복으로 넘어가는 방법을 학습합니다.
- **기본 라이브러리 활용**: `random` 라이브러리를 `import`하여 임의의 숫자를 생성하고, 이를 활용한 숫자 맞추기 게임을 만들며 외부 모듈의 기본적인 사용법을 경험합니다.

## 📁 파일 목록

| 파일명             | 설명                                                                                                             |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `practice_01.ipynb` | Python의 조건문, 반복문, 반복 제어 등 제어 흐름에 대한 다양한 예제와 실습 코드를 포함하는 Jupyter Notebook 파일입니다. |

## 💡 주요 코드 예시

### 중첩 조건문을 활용한 학점 계산

`if-elif-else` 구조를 사용하여 점수에 따라 다른 등급을 부여하는 방법을 보여주는 코드입니다.

```python
score = 85

grade = (
    "A"
    if score >= 90
    else "B" if score >= 80 else "C" if score >= 70 else "D" if score >= 60 else "F"
)

print(grade)
```

### `while` 반복문과 `break`, `continue`를 사용한 숫자 맞추기 게임

`random` 모듈로 생성된 숫자를 맞출 때까지 사용자 입력을 반복해서 받고, `break`와 `continue`를 활용하여 게임의 흐름을 제어하는 예제입니다.

```python
import random

answer = random.randint(1, 100)

while True:
    user_number = int(input("1~100 사이의 숫자를 입력하세요: "))

    if user_number == answer:
        break
    elif user_number > answer:
        print("DOWN")
    else:
        print("UP")

print(f"{answer} 정답입니다!")
``` 