/**
 * @fileoverview JavaScript의 클로저(Closure)에 대해 설명하는 예제 파일입니다.
 * 클로저는 함수와 그 함수가 선언된 렉시컬 환경(Lexical Environment)의 조합입니다.
 * 외부 함수의 실행이 끝나도 내부 함수는 자신이 선언된 환경을 '기억'하여
 * 외부 함수의 변수에 접근할 수 있는 강력하고 중요한 개념입니다.
 *
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures
 * @see https://javascript.info/closure
 */

console.log("--- JavaScript 클로저(Closure) ---");

// -----------------------------------------------------------------------------
// 1. 클로저의 기본 원리
// -----------------------------------------------------------------------------
/*
 * 함수가 자신이 선언된 렉시컬 스코프를 기억하여, 그 스코프 밖에서 호출될 때에도
 * 해당 스코프의 변수에 접근할 수 있는 현상을 의미합니다.
 */
console.log("\n1. 클로저의 기본 원리:");

function outerFunction() {
  const outerVariable = "외부 함수의 변수";

  // innerFunction은 outerFunction의 스코프에 접근할 수 있습니다.
  function innerFunction() {
    console.log("  - 내부 함수에서 접근:", outerVariable);
  }

  return innerFunction;
}

const myClosure = outerFunction(); // outerFunction의 실행은 끝났지만,
                                   // innerFunction은 outerVariable을 '기억'하고 있습니다.

myClosure(); // 기억하고 있던 변수에 접근하여 출력합니다.


// -----------------------------------------------------------------------------
// 2. 클로저의 활용 (1): 데이터 은닉 (Data Encapsulation)
// -----------------------------------------------------------------------------
/*
 * 클로저를 사용하면 외부에서 직접 접근할 수 없는 비공개(private) 변수를 만들 수 있습니다.
 * 이는 객체지향 프로그래밍의 캡슐화를 흉내 내는 강력한 패턴입니다.
 */
console.log("\n2. 데이터 은닉 예제 (카운터):");

function createCounter() {
  let count = 0; // 이 변수는 외부에서 직접 수정이 불가능한 '비공개' 상태가 됩니다.

  /*
   * 반환되는 객체의 메서드들은 자신이 선언된 환경(createCounter)을 기억하는 클로저입니다.
   * 따라서 이 메서드들을 통해서만 'count' 변수를 제어할 수 있습니다.
   */
  return {
    increment: function () {
      count++;
    },
    decrement: function () {
      count--;
    },
    getCount: function () {
      return count;
    },
  };
}

const counter1 = createCounter();
counter1.increment();
counter1.increment();
console.log("  - Counter 1의 값:", counter1.getCount()); // 2

try {
  console.log(counter1.count); // undefined. 외부에서 직접 접근할 수 없습니다.
} catch (e) {
  console.log("  - count 변수에 직접 접근 시도... 실패!");
}


// -----------------------------------------------------------------------------
// 3. 클로저의 활용 (2): 상태 유지 (Stateful Functions)
// -----------------------------------------------------------------------------
// 클로저는 함수 호출 간에 특정 상태를 기억하고 유지하는 데 사용될 수 있습니다.
console.log("\n3. 상태 유지 예제 (ID 생성기):");

function createUniqueIdGenerator() {
  let lastId = 0;

  return function () {
    lastId++;
    return `ID-${lastId}`;
  };
}

const generateId = createUniqueIdGenerator();
console.log("  - 첫 번째 ID 생성:", generateId()); // ID-1
console.log("  - 두 번째 ID 생성:", generateId()); // ID-2
// 'lastId'는 generateId 함수가 호출될 때마다 유지되고 증가합니다.


// -----------------------------------------------------------------------------
// 4. 반복문에서의 클로저 문제와 해결
// -----------------------------------------------------------------------------
// 반복문에서 클로저를 사용할 때, 변수의 스코프 문제로 예상과 다르게 동작할 수 있습니다.
console.log("\n4. 반복문에서의 클로저 문제:");

function problemWithVar() {
  console.log("  - 문제 상황 (var 사용):");
  for (var i = 1; i <= 3; i++) {
    setTimeout(function () {
      /*
       * setTimeout의 콜백이 실행될 시점(1초 후)에는 루프가 모두 끝난 상태입니다.
       * var로 선언된 i는 함수 스코프를 가지므로, 모든 콜백이 마지막 i 값(4)을 참조합니다.
       */
      console.log(`    var i: ${i}`); // 4, 4, 4가 출력됨
    }, 100);
  }
}
problemWithVar();

// 해결책: `let`을 사용하거나, IIFE(즉시 실행 함수)를 사용합니다.
function solutionWithLet() {
  setTimeout(() => {
    console.log("  - 해결책 (let 사용):");
    // `let`은 블록 스코프를 가집니다. 루프의 각 반복마다 새로운 `i` 변수가 생성됩니다.
    // 따라서 각 콜백은 자신이 생성된 시점의 `i` 값을 올바르게 기억합니다.
    for (let i = 1; i <= 3; i++) {
      setTimeout(function () {
        console.log(`    let i: ${i}`); // 1, 2, 3이 출력됨
      }, 500);
    }
  }, 300); // 문제 상황과 겹치지 않게 약간의 딜레이를 줍니다.
}
solutionWithLet(); 