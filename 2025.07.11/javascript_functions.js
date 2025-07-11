/**
 * @fileoverview JavaScript의 다양한 함수 선언 방식을 보여주는 예제 파일입니다.
 * 이 파일은 JavaScript에서 함수를 정의하는 6가지 주요 방법을 설명합니다.
 */

// JavaScript에서 함수를 선언하는 6가지 주요 방법을 소개합니다.
// 각 방식은 고유한 특징과 사용 사례를 가지고 있습니다.

// 1. 함수 선언문 (Function Declaration)
// 가장 일반적이고 전통적인 함수 선언 방식입니다.
// 함수 선언문은 호이스팅(hoisting)의 대상이 되므로, 코드의 어느 위치에서든 선언부보다 먼저 호출할 수 있습니다.
/**
 * 두 숫자를 더하는 함수 (함수 선언문)
 * @param {number} a - 첫 번째 숫자
 * @param {number} b - 두 번째 숫자
 * @returns {number} 두 숫자의 합
 */
function add(a, b) {
  return a + b;
}
console.log("1. 함수 선언문:", add(5, 3)); // 8

// 2. 함수 표현식 (Function Expression)
// 함수를 변수에 할당하는 방식입니다. 일반적으로 함수는 익명(anonymous)으로 작성됩니다.
// 함수 표현식은 변수 선언부에 도달했을 때만 유효하므로, 선언 이전에 호출하면 에러가 발생합니다.
/**
 * 두 숫자를 빼는 함수 (함수 표현식)
 * @param {number} a - 첫 번째 숫자
 * @param {number} b - 두 번째 숫자
 * @returns {number} 두 숫자의 차
 */
const subtract = function (a, b) {
  return a - b;
};
console.log("2. 함수 표현식:", subtract(10, 4)); // 6

// 3. 화살표 함수 표현식 (Arrow Function Expression)
// ES6(ECMAScript 2015)에서 도입된 더 간결한 함수 표현 방식입니다.
// 'this' 바인딩 방식이 기존 함수와 다르며, 'arguments' 객체를 가지지 않는 특징이 있습니다.
/**
 * 두 숫자를 곱하는 함수 (화살표 함수)
 * @param {number} a - 첫 번째 숫자
 * @param {number} b - 두 번째 숫자
 * @returns {number} 두 숫자의 곱
 */
const multiply = (a, b) => {
  return a * b;
};
// 함수의 본문이 한 줄일 경우, 중괄호({})와 'return' 키워드를 생략할 수 있습니다.
const divide = (a, b) => a / b;

console.log("3. 화살표 함수:", multiply(3, 4)); // 12
console.log("   (간결한 화살표 함수):", divide(10, 2)); // 5

// 4. Function 생성자 (Function Constructor)
// 문자열로부터 함수를 동적으로 생성하는 방식입니다.
// 보안 및 성능상의 이유로 거의 사용되지 않으며, 코드 파싱과 관련된 문제를 일으킬 수 있어 사용을 권장하지 않습니다.
/**
 * 두 숫자의 거듭제곱을 계산하는 함수 (Function 생성자)
 * @param {number} a - 밑
 * @param {number} b - 지수
 * @returns {number} 거듭제곱 결과
 */
const power = new Function("a", "b", "return Math.pow(a, b);");
console.log("4. Function 생성자:", power(2, 3)); // 8

// 5. 제너레이터 함수 (Generator Function)
// 'function*' 키워드로 선언하며, 함수의 실행을 중간에 멈추고 재개할 수 있는 이터레이터(iterator) 객체를 반환합니다.
// 'yield' 키워드를 사용하여 값을 순차적으로 반환할 수 있습니다.
/**
 * 숫자를 순차적으로 생성하는 제너레이터 함수
 * @param {number} start - 시작 숫자
 * @yields {number} 순차적인 숫자
 */
function* numberGenerator(start) {
  let i = start;
  yield i++;
  yield i++;
  yield i++;
}
const gen = numberGenerator(1);
console.log("5. 제너레이터 함수 (첫 번째 호출):", gen.next().value); // 1
console.log("   (두 번째 호출):", gen.next().value); // 2
console.log("   (세 번째 호출):", gen.next().value); // 3

// 6. 즉시 실행 함수 표현식 (IIFE, Immediately Invoked Function Expression)
// 함수를 정의함과 동시에 즉시 실행하는 자바스크립트 디자인 패턴입니다.
// 전역 스코프를 오염시키지 않고 변수를 캡슐화하여 private 변수처럼 사용할 때 유용합니다.
(function () {
  const message = "IIFE가 즉시 실행되었습니다.";
  console.log("6. 즉시 실행 함수 표현식:", message);
})();

// --- 번외 ---
// 이름 있는 함수 표현식 (Named Function Expression)
// 함수 표현식에 이름을 붙이는 방식입니다. 이 이름은 함수 내부에서만 접근 가능하며,
// 디버깅 시 콜 스택에서 함수 이름을 확인할 수 있어 유용합니다.
const factorial = function findFactorial(n) {
  if (n <= 1) {
    return 1;
  }
  // 재귀 호출 시 자기 자신을 참조할 수 있습니다.
  return n * findFactorial(n - 1);
};
console.log("번외. 이름 있는 함수 표현식:", factorial(5)); // 120
// console.log(findFactorial(5)); // Error: findFactorial is not defined (외부에서 접근 불가)
