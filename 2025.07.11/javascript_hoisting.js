/**
 * @fileoverview JavaScript의 호이스팅(Hoisting)에 대해 설명하는 예제 파일입니다.
 * 호이스팅은 인터프리터가 코드를 실행하기 전에 변수 및 함수 선언을
 * 해당 스코프의 최상단으로 끌어올리는 것처럼 동작하는 방식을 의미합니다.
 * 실제 코드가 물리적으로 이동하는 것은 아니며, 컴파일 단계에서 메모리에 먼저 할당되는 과정입니다.
 *
 * @see https://developer.mozilla.org/ko/docs/Glossary/Hoisting
 */

console.log("--- JavaScript 호이스팅(Hoisting) ---");

// -----------------------------------------------------------------------------
// 1. var 변수 호이스팅
// -----------------------------------------------------------------------------
// `var`로 선언된 변수는 선언이 스코프 최상단으로 끌어올려지며, `undefined`로 초기화됩니다.
console.log("\n1. var 변수 호이스팅:");
console.log("  - 선언 전 myVar:", myVar); // undefined (에러가 발생하지 않음)

var myVar = "Hello, Hoisting!";

console.log("  - 선언 후 myVar:", myVar); // "Hello, Hoisting!"

// -----------------------------------------------------------------------------
// 2. let, const와 TDZ(Temporal Dead Zone)
// -----------------------------------------------------------------------------
// `let`과 `const`로 선언된 변수도 호이스팅되지만, `var`와 달리 초기화되지 않습니다.
// 스코프의 시작부터 변수 선언 지점까지의 구간을 '일시적 사각지대(TDZ)'라고 부르며,
// 이 구간에서 해당 변수에 접근하면 참조 에러(ReferenceError)가 발생합니다.

console.log("\n2. let과 TDZ:");
try {
  // console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization
} catch (e) {
  console.log("  - TDZ에서 let 변수 접근 시 에러 발생");
}

let myLet = "No Hoisting for let?"; // 실제로는 호이스팅되지만, TDZ 때문에 접근 불가
console.log("  - 선언 후 myLet:", myLet);

// -----------------------------------------------------------------------------
// 3. 함수 선언문(Function Declaration) 호이스팅
// -----------------------------------------------------------------------------
// 함수 선언문은 선언과 동시에 전체 함수(본문까지)가 호이스팅됩니다.
// 따라서 코드상 선언 위치보다 앞에서 함수를 호출할 수 있습니다.

console.log("\n3. 함수 선언문 호이스팅:");
sayHello(); // "Hello, World!"

function sayHello() {
  console.log("  - Hello, World!");
}

// -----------------------------------------------------------------------------
// 4. 함수 표현식(Function Expression) 호이스팅
// -----------------------------------------------------------------------------
// 함수 표현식은 변수 호이스팅 규칙을 따릅니다.
// 변수(sayGoodbye)는 호이스팅되지만, 함수 할당은 코드 실행 시점에 이루어집니다.

console.log("\n4. 함수 표현식 호이스팅:");
try {
  // sayGoodbye(); // TypeError: sayGoodbye is not a function
} catch (e) {
  console.log("  - var 함수 표현식 호출 시 TypeError 발생 (변수는 undefined)");
}

var sayGoodbye = function () {
  console.log("  - Goodbye!");
};

sayGoodbye(); // "Goodbye!"

// let/const를 사용한 함수 표현식은 TDZ의 영향을 받습니다.
try {
  // sayHi(); // ReferenceError: Cannot access 'sayHi' before initialization
} catch (e) {
  console.log("  - let 함수 표현식 호출 시 ReferenceError 발생 (TDZ)");
}

const sayHi = function () {
  console.log("  - Hi!");
};
sayHi();

// -----------------------------------------------------------------------------
// 5. 호이스팅의 우선순위
// -----------------------------------------------------------------------------
// 변수 선언과 함수 선언이 같은 이름으로 충돌할 경우, 함수 선언이 더 높은 우선순위를 가집니다.
console.log("\n5. 호이스팅 우선순위:");
console.log("  - typeof myPriority:", typeof myPriority); // "function"

var myPriority = "Variable";

function myPriority() {
  console.log("Function");
}

console.log("  - 할당 후 typeof myPriority:", typeof myPriority); // "string"

// 위 코드는 아래처럼 해석됩니다.
/*
function myPriority() { // 함수 선언이 먼저 호이스팅됨
    console.log("Function");
}
var myPriority; // 변수 선언은 함수 선언에 의해 무시됨 (이미 선언됨)

console.log(typeof myPriority); // function

myPriority = "Variable"; // 실행 시점에 변수에 값이 할당됨
console.log(typeof myPriority); // string
*/
