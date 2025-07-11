/**
 * JavaScript 기초
 *
 * 이 파일은 신입 개발자, 주니어 개발자, 그리고 프로그래밍을 처음 접하는 분들을 위해
 * JavaScript의 기본적인 개념들을 설명하고 예시 코드를 제공합니다.
 * 각 개념에 대한 더 자세한 정보는 코드 내에 포함된 MDN 문서 링크를 참고해 주세요.
 */

// -----------------------------------------------------------------------------
// 1. 콘솔 출력 (Console Output)
// -----------------------------------------------------------------------------
// console.log()는 웹 브라우저의 개발자 도구 콘솔에 정보를 출력하는 가장 기본적인 방법입니다.
// 이를 통해 코드의 실행 결과를 확인하거나 변수의 값을 디버깅할 수 있습니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/API/console/log
console.log("Hello, JavaScript!");

// -----------------------------------------------------------------------------
// 2. 변수 (Variables)
// -----------------------------------------------------------------------------
// 변수는 데이터를 저장하기 위한 메모리 공간에 붙이는 이름입니다.
// JavaScript에서는 var, let, const 키워드를 사용하여 변수를 선언합니다.

// 'var'는 오래된 방식의 변수 선언 키워드입니다. 함수 스코프를 가지며, 재선언 및 재할당이 가능합니다.
// 하지만 호이스팅과 관련된 문제로 인해 현대 JavaScript에서는 잘 사용하지 않는 것을 권장합니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/var
var oldVariable = "이것은 var로 선언된 변수입니다.";
console.log(oldVariable);

// 'let'은 블록 스코프({ ... })를 가지는 변수를 선언합니다. 재할당은 가능하지만, 재선언은 불가능합니다.
// 대부분의 경우 변수를 선언할 때 'let'을 사용하는 것이 좋습니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/let
let mutableVariable = "이것은 let으로 선언된 변수입니다.";
mutableVariable = "값이 변경될 수 있습니다.";
console.log(mutableVariable);

// 'const'는 블록 스코프를 가지는 상수를 선언합니다. '상수'이므로 재선언과 재할당이 모두 불가능합니다.
// 값이 변경되지 않을 변수(상수)를 선언할 때 사용합니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/const
const immutableVariable = "이것은 const로 선언된 상수입니다.";
// immutableVariable = "값을 변경하려고 하면 에러가 발생합니다."; // TypeError
console.log(immutableVariable);

// -----------------------------------------------------------------------------
// 3. 데이터 타입 (Data Types)
// -----------------------------------------------------------------------------
// JavaScript의 데이터 타입은 크게 원시 타입(Primitive Type)과 객체 타입(Object Type)으로 나뉩니다.

// -- 3.1 원시 타입 (Primitive Types) --
// 원시 타입은 값을 직접 저장하는 타입입니다.

// 1) String (문자열)
// 텍스트 데이터를 나타냅니다. 작은따옴표(''), 큰따옴표(""), 또는 백틱(``)으로 감싸서 만듭니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String
let myName = "홍길동";
let message = `안녕하세요, ${myName}님!`; // 백틱을 사용하면 문자열 안에 변수를 쉽게 넣을 수 있습니다 (템플릿 리터럴).
console.log(message);
console.log("문자열의 길이:", message.length); // .length 속성으로 길이를 알 수 있습니다.
console.log("첫번째 글자:", message[0]); // 인덱스로 각 문자에 접근할 수 있습니다.

// 2) Number (숫자)
// 정수와 실수를 모두 포함하는 숫자 타입입니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number
let age = 30;
let pi = 3.14;
console.log("나이:", age, "원주율:", pi);

// 3) Boolean (불리언)
// 'true'(참) 또는 'false'(거짓) 두 가지 값만 가집니다. 주로 조건문에서 사용됩니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Boolean
let isStudent = true;
let isMarried = false;
console.log("학생인가요?", isStudent);

// 4) null
// '값이 없음'을 의도적으로 명시할 때 사용하는 값입니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/null
let emptyValue = null;
console.log("의도적으로 비운 값:", emptyValue);

// 5) undefined
// 변수를 선언했지만 아직 값이 할당되지 않았음을 의미합니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/undefined
let notAssigned;
console.log("할당되지 않은 값:", notAssigned);

// 6) Symbol (심볼)
// ES6에서 추가된 타입으로, 유일하고 변경 불가능한 값을 만듭니다. 주로 객체의 고유한 속성 키를 만들 때 사용됩니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Symbol
const uniqueKey = Symbol("uniqueKey");
console.log("심볼 값:", uniqueKey);

// -- 3.2 객체 타입 (Object Type) --
// 원시 타입을 제외한 모든 것은 객체입니다. 객체는 여러 값(원시 타입 또는 다른 객체)들을 속성(property)으로 저장할 수 있는 데이터 모음입니다.

// 1) Object (객체)
// key-value 쌍으로 데이터를 저장합니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object
let person = {
  name: "김철수",
  age: 25,
  job: "개발자",
  "has-license": true, // 키에 특수문자가 포함될 경우 따옴표로 감쌉니다.
};
console.log("사람 객체:", person);
console.log("이름:", person.name); // 점(.) 표기법으로 속성에 접근
console.log("직업:", person["job"]); // 대괄호([]) 표기법으로 속성에 접근
console.log("라이선스 유무:", person["has-license"]);

// 2) Array (배열)
// 여러 개의 데이터를 순서대로 저장하는 리스트 형태의 객체입니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array
let fruits = ["사과", "바나나", "딸기"];
console.log("과일 배열:", fruits);
console.log("첫 번째 과일:", fruits[0]); // 인덱스(0부터 시작)로 요소에 접근
console.log("배열의 길이:", fruits.length);
fruits.push("오렌지"); // .push() 메소드로 배열의 끝에 요소를 추가
console.log("오렌지 추가 후:", fruits);
fruits.pop(); // .pop() 메소드로 배열의 마지막 요소를 제거
console.log("마지막 요소 제거 후:", fruits);

// 3) Function (함수)
// 특정 작업을 수행하는 코드 블록입니다. 함수도 객체의 일종입니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function
function greet(name) {
  return `안녕하세요, ${name}님!`;
}
let greetingMessage = greet("이영희");
console.log(greetingMessage);

// -----------------------------------------------------------------------------
// 4. 연산자 (Operators)
// -----------------------------------------------------------------------------
// 값을 확인, 변경, 결합하는 데 사용되는 기호입니다.

// 1) 산술 연산자: +, -, *, /, %, ++, --
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators#산술_연산자
let x = 10;
let y = 4;
console.log("덧셈:", x + y); // 14
console.log("뺄셈:", x - y); // 6
console.log("곱셈:", x * y); // 40
console.log("나눗셈:", x / y); // 2.5
console.log("나머지:", x % y); // 2

// 2) 할당 연산자: =, +=, -=, *=, /=
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators#할당_연산자
let a = 5;
a += 3; // a = a + 3 과 동일
console.log("할당 연산자:", a); // 8

// 3) 같음 연산자 (Equality Operators)
// 두 피연산자가 같은지 비교합니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators#같음_연산자
console.log("동등(==):", "1" == 1); // true (값만 비교, 타입은 비교하지 않음)
console.log("부동등(!=):", "1" != 1); // false
console.log("일치(===):", "1" === 1); // false (값과 타입을 모두 비교 - 권장됨)
console.log("불일치(!==):", "1" !== 1); // true

// 4) 관계 연산자 (Relational Operators)
// 피연산자의 관계(크고 작음)를 비교합니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators#관계_연산자
let num1 = 10;
let num2 = 5;
console.log(`${num1} > ${num2}:`, num1 > num2); // true
console.log(`${num1} < ${num2}:`, num1 < num2); // false
console.log(`${num1} >= 10:`, num1 >= 10); // true
console.log(`${num1} <= ${num2}:`, num1 <= num2); // false

// 5) 논리 연산자 (Logical Operators)
// 불리언(boolean) 값을 다룰 때 사용합니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators#이진_논리_연산자
let hasToken = true;
let isVIP = false;
console.log("AND (&&):", hasToken && isVIP); // false
console.log("OR (||):", hasToken || isVIP); // true

// 6) 단항 연산자 (Unary Operators)
// 하나의 피연산자에 대해 연산을 수행합니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators#단항_연산자
console.log("NOT (!):", !hasToken); // false (불리언 값을 반전)
console.log("typeof:", typeof myName); // 'string' (피연산자의 타입을 문자열로 반환)

// 7) 삼항 연산자 (Ternary Operator)
// 조건에 따라 두 개의 값 중 하나를 선택하는 유일한 3개 항 연산자입니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Conditional_operator
let userAge = 20;
let beverage = userAge >= 19 ? "맥주" : "사이다";
console.log("주문 가능한 음료:", beverage);

// 8) 선택적 연결 연산자 (Optional Chaining Operator)
// 객체의 속성에 접근할 때, 해당 객체가 null 또는 undefined인 경우 에러를 발생시키지 않고 undefined를 반환합니다.
// 중첩된 객체 구조에서 안전하게 값을 조회할 때 유용합니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Optional_chaining
const user = {
  name: "Alice",
  details: {
    age: 30,
    // address 속성이 없는 경우를 가정
    // address: { city: "Seoul" }
  },
  // 메서드가 없을 수도 있는 경우
  // getCity() { return this.details.address.city; }
};
// user.details.address가 undefined이므로 에러 대신 undefined가 반환됩니다.
console.log("도시:", user.details.address?.city);
// user.getCity가 존재하지 않으므로 에러 대신 undefined가 반환됩니다.
console.log("도시(메서드):", user.getCity?.());

// 9) 이진 비트 연산자 (Binary Bitwise Operators)
// 피연산자를 32비트 정수로 취급하고, 각 비트에 대해 이진 연산을 수행합니다.
// 주로 저수준 프로그래밍, 특정 플래그 관리 등에 사용됩니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators#이진_비트_연산자
let val1 = 5; // 2진수: 0101
let val2 = 3; // 2진수: 0011
console.log("Bitwise AND (&):", val1 & val2); // 0001 -> 1
console.log("Bitwise OR (|):", val1 | val2); // 0111 -> 7
console.log("Bitwise XOR (^):", val1 ^ val2); // 0110 -> 6
console.log("Bitwise NOT (~):", ~val1); // 1111...1010 -> -6 (2의 보수)

// 10) 비트 시프트 연산자 (Bitwise Shift Operators)
// 피연산자의 비트 표현을 왼쪽이나 오른쪽으로 지정된 수만큼 이동시킵니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators#비트_시프트_연산자
let numForShift = 5; // 0101
console.log("Left Shift (<< 1):", numForShift << 1); // 1010 -> 10 (곱하기 2 효과)
console.log("Sign-propagating Right Shift (>> 1):", numForShift >> 1); // 0010 -> 2 (나누기 2 효과, 부호 유지)
let negNumForShift = -5; // ...11111011
console.log("Right Shift (>> 1) for negative:", negNumForShift >> 1); // ...11111101 -> -3
console.log("Zero-fill Right Shift (>>> 1):", numForShift >>> 1); // 0010 -> 2 (부호 비트를 0으로 채움)
console.log(
  "Zero-fill Right Shift (>>> 1) for negative:",
  negNumForShift >>> 1
); // 0...11111101 -> 2147483645 (양수로 변환)

// -----------------------------------------------------------------------------
// 5. 제어문 (Control Flow)
// -----------------------------------------------------------------------------
// 코드의 실행 흐름을 제어하는 구문입니다.

// 1) if...else
// 조건이 참(true)일 때와 거짓(false)일 때 다른 코드를 실행합니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/if...else
let score = 85;
if (score >= 90) {
  console.log("A 등급입니다.");
} else if (score >= 80) {
  console.log("B 등급입니다.");
} else {
  console.log("C 등급 이하입니다.");
}

// 2) switch
// 하나의 표현식을 여러 값과 비교하여 일치하는 경우의 코드를 실행합니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/switch
let fruit = "바나나";
switch (fruit) {
  case "사과":
    console.log("사과는 1000원입니다.");
    break; // break를 만나면 switch 문을 빠져나갑니다.
  case "바나나":
    console.log("바나나는 1500원입니다.");
    break;
  default: // 일치하는 case가 없을 때 실행
    console.log("해당 과일은 판매하지 않습니다.");
}

// 3) for 반복문
// 정해진 횟수만큼 코드를 반복 실행합니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for
for (let i = 0; i < 5; i++) {
  console.log(`${i + 1}번째 반복입니다.`);
}

// 4) while 반복문
// 조건이 참인 동안 코드를 계속해서 반복 실행합니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/while
let count = 0;
while (count < 3) {
  console.log(`while 반복: ${count}`);
  count++;
}

// 5) for...of 반복문
// 반복 가능한 객체(배열, 문자열 등)의 각 요소를 순회합니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for...of
const numbers = [10, 20, 30];
for (const num of numbers) {
  console.log("for...of:", num);
}

// 6) for...in 반복문
// 객체의 열거 가능한 속성들을 순회합니다. (주로 객체에 사용)
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for...in
const car = {
  brand: "Hyundai",
  model: "Sonata",
  year: 2024,
};
for (const key in car) {
  console.log(`for...in: ${key} = ${car[key]}`);
}

// -----------------------------------------------------------------------------
// 6. 함수 (Functions)
// -----------------------------------------------------------------------------
// 재사용 가능한 코드 조각입니다.

// 1) 함수 선언문 (Function Declaration)
// function 키워드로 함수를 정의합니다. 호이스팅의 영향을 받습니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/function
function add(num1, num2) {
  return num1 + num2;
}
console.log("함수 선언문:", add(5, 3));

// 2) 함수 표현식 (Function Expression)
// 변수에 익명 함수를 할당하는 방식입니다. 호이스팅의 영향을 받지 않습니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/function
const subtract = function (num1, num2) {
  return num1 - num2;
};
console.log("함수 표현식:", subtract(10, 4));

// 3) 화살표 함수 (Arrow Function)
// ES6에서 도입된 더 간결한 함수 표현 방식입니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Arrow_functions
const multiply = (num1, num2) => num1 * num2;
// 본문이 한 줄일 경우 중괄호와 return을 생략할 수 있습니다.
console.log("화살표 함수:", multiply(6, 7));

// -----------------------------------------------------------------------------
// 7. 배열의 유용한 메소드 (Useful Array Methods)
// -----------------------------------------------------------------------------
// 배열을 다룰 때 매우 유용한 내장 함수들입니다.

const userList = [
  { id: 1, name: "Alice", age: 28 },
  { id: 2, name: "Bob", age: 35 },
  { id: 3, name: "Charlie", age: 22 },
  { id: 4, name: "David", age: 35 },
];

// 1) forEach: 배열의 각 요소에 대해 주어진 함수를 실행합니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
console.log("-- forEach 예제 --");
userList.forEach((user) => {
  console.log(user.name);
});

// 2) map: 배열의 각 요소에 대해 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map
const userNames = userList.map((user) => user.name);
console.log("map 결과 (이름만 추출):", userNames); // ['Alice', 'Bob', 'Charlie', 'David']

// 3) filter: 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열을 반환합니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
const usersOver30 = userList.filter((user) => user.age >= 30);
console.log("filter 결과 (30세 이상):", usersOver30);

// 4) find: 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환합니다. 없으면 undefined를 반환합니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/find
const findBob = userList.find((user) => user.name === "Bob");
console.log("find 결과 (Bob 찾기):", findBob);

// 5) reduce: 배열의 각 요소에 대해 주어진 리듀서(reducer) 함수를 실행하고, 하나의 결과값을 반환합니다.
// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
const totalAge = userList.reduce((accumulator, currentUser) => {
  // accumulator: 누적값, currentUser: 현재 요소
  return accumulator + currentUser.age;
}, 0); // 0은 accumulator의 초기값입니다.
console.log("reduce 결과 (나이 총합):", totalAge);

// -----------------------------------------------------------------------------
// 8. 에러 핸들링 (Error Handling) - try...catch
// -----------------------------------------------------------------------------
// 코드 실행 중 발생할 수 있는 오류에 대처하기 위한 구문입니다.

// MDN: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/try...catch
try {
  // 오류가 발생할 가능성이 있는 코드를 이 블록 안에 넣습니다.
  console.log("try 블록 시작");
  //   nonExistentFunction(); // 존재하지 않는 함수를 호출하여 에러 발생
  console.log("이 코드는 실행되지 않습니다.");
} catch (error) {
  // try 블록에서 오류가 발생하면 catch 블록이 실행됩니다.
  console.error("에러가 발생했습니다:", error.message);
} finally {
  // 오류 발생 여부와 상관없이 항상 실행되는 코드입니다.
  console.log("finally 블록은 항상 실행됩니다.");
}
