/**
 * @fileoverview JavaScript의 스코프(Scope)와 클로저(Closure)에 대해 설명하는 예제 파일입니다.
 * 스코프는 변수와 함수에 접근할 수 있는 범위를 결정합니다.
 * JavaScript에는 전역 스코프, 함수 스코프, 블록 스코프가 있습니다.
 */

console.log("--- JavaScript 스코프와 클로저 ---");

// -----------------------------------------------------------------------------
// 1. 전역 스코프 (Global Scope)
// -----------------------------------------------------------------------------
// 코드의 가장 바깥 영역에 정의된 변수나 함수는 전역 스코프에 속합니다.
// 전역 변수는 코드 어디에서든 접근할 수 있어 편리하지만,
// 코드의 복잡도가 높아질수록 변수 이름 충돌이나 의도치 않은 변경을 유발할 수 있으므로
// 남용하지 않는 것이 좋습니다.
const globalVar = "나는 전역 변수입니다.";

function showGlobal() {
  console.log("1. 전역 스코프:", globalVar);
}
showGlobal();

// -----------------------------------------------------------------------------
// 2. 함수 스코프 (Function Scope)
// -----------------------------------------------------------------------------
// `var` 키워드로 선언된 변수는 함수 내에서만 유효한 함수 스코프를 가집니다.
// 함수 외부에서는 이 변수에 접근할 수 없습니다.

function functionScopeTest() {
  var functionScopedVar = "나는 함수 스코프 변수입니다.";
  console.log("2. 함수 스코프 (내부):", functionScopedVar);
}

functionScopeTest();
// console.log(functionScopedVar); // ReferenceError: functionScopedVar is not defined

// -----------------------------------------------------------------------------
// 3. 블록 스코프 (Block Scope)
// -----------------------------------------------------------------------------
// `let`과 `const` 키워드로 선언된 변수는 중괄호 `{}`로 둘러싸인 블록(if, for, while 등)
// 내에서만 유효한 블록 스코프를 가집니다.
// 이는 변수의 유효 범위를 최소화하여 더 예측 가능하고 안정적인 코드를 작성하게 돕습니다.

if (true) {
  let blockScopedLet = "나는 블록 스코프(let) 변수입니다.";
  const blockScopedConst = "나는 블록 스코프(const) 상수입니다.";
  var legacyVar = "나는 함수 스코프(var)입니다."; // var는 블록 스코프를 무시합니다.

  console.log("3. 블록 스코프 (내부):", blockScopedLet);
  console.log("   (내부):", blockScopedConst);
}

// console.log(blockScopedLet); // ReferenceError: blockScopedLet is not defined
// console.log(blockScopedConst); // ReferenceError: blockScopedConst is not defined
console.log("   (외부):", legacyVar); // '나는 함수 스코프(var)입니다.' - 블록 밖에서도 접근 가능

// -----------------------------------------------------------------------------
// 4. 렉시컬 스코프와 클로저 (Lexical Scope and Closure)
// -----------------------------------------------------------------------------
// 렉시컬 스코프는 함수를 어디서 '선언'했는지에 따라 상위 스코프가 결정되는 방식입니다.
// JavaScript는 렉시컬 스코프를 따르므로, 함수는 자신의 상위 스코프를 기억하고 접근할 수 있습니다.

// 클로저는 이러한 렉시컬 스코프의 특성을 이용하여, 함수가 자신의 선언 환경(상위 스코프)을
// 기억하고, 그 환경 밖에서 호출될 때에도 해당 환경의 변수에 접근할 수 있게 하는 기능입니다.

function createCounter() {
  let count = 0; // 자유 변수(free variable). createCounter의 환경에 속합니다.

  // 아래 반환되는 함수는 자신이 선언된 환경(createCounter)을 '기억'합니다.
  // 이것이 바로 클로저입니다.
  return function () {
    count++;
    console.log(count);
  };
}

console.log("\n4. 클로저 예제:");
const counter1 = createCounter(); // counter1은 자신만의 독립된 'count' 변수를 가집니다.
const counter2 = createCounter(); // counter2도 자신만의 독립된 'count' 변수를 가집니다.

console.log("  - 카운터 1:");
counter1(); // 1
counter1(); // 2
counter1(); // 3

console.log("  - 카운터 2:");
counter2(); // 1

// 클로저의 주요 용도:
// 1. 데이터 은닉(Data Encapsulation): 외부에서 `count` 변수에 직접 접근할 수 없으므로 상태를 안전하게 보호할 수 있습니다.
// 2. 상태 유지(Stateful Functions): 함수가 호출될 때마다 이전 상태를 기억하고 업데이트할 수 있습니다.
