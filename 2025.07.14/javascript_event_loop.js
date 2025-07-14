/**
 * @fileoverview JavaScript의 비동기 처리 모델인 이벤트 루프(Event Loop)에 대해 설명합니다.
 * JavaScript는 싱글 스레드 언어이지만, 이벤트 루프 덕분에 논블로킹(non-blocking) 방식으로
 * 동시성(concurrency)을 처리할 수 있습니다.
 *
 * @see https://html.spec.whatwg.org/multipage/webappapis.html#event-loops
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop
 */

console.log("--- JavaScript 이벤트 루프(Event Loop) ---");

// -----------------------------------------------------------------------------
// 1. Call Stack (호출 스택)
// -----------------------------------------------------------------------------
/*
 * - 현재 실행 중인 코드(함수)를 추적하는 자료 구조입니다. (LIFO: Last-In, First-Out)
 * - 함수가 호출되면 스택에 쌓이고(push), 함수 실행이 끝나면 스택에서 제거됩니다(pop).
 * - JavaScript는 단 하나의 호출 스택을 가지므로, 한 번에 하나의 작업만 처리할 수 있습니다.
 * - 스택이 가득 차면 'Stack Overflow' 에러가 발생합니다.
 */
console.log("\n1. Call Stack 예제");

function first() {
  console.log("  - first() 시작");
  second();
  console.log("  - first() 종료");
}
function second() {
  console.log("    - second() 시작");
  third();
  console.log("    - second() 종료");
}
function third() {
  console.log("      - third() 실행");
}

first(); // first -> second -> third 순으로 스택에 쌓이고, 역순으로 제거됩니다.

// -----------------------------------------------------------------------------
// 2. Microtask Queue
// -----------------------------------------------------------------------------
/*
 * - Macrotask보다 우선순위가 높은 비동기 작업의 콜백이 대기하는 큐입니다.
 * - 대표적인 Microtask: Promise.then/catch/finally, async/await, MutationObserver.
 * - 현재 실행 중인 동기 코드가 끝나면, 이벤트 루프는 Macrotask를 처리하기 전에
 *   이 큐에 있는 '모든' 작업을 먼저 처리합니다.
 */
console.log("\n2. Microtask 예제");
Promise.resolve().then(function () {
  console.log("  - Microtask (Promise.then)가 Call Stack으로 이동하여 실행됨");
});

// -----------------------------------------------------------------------------
// 3. Macrotask Queue (또는 Task Queue)
// -----------------------------------------------------------------------------
/*
 * - 처리하는 데 시간이 걸리는 비동기 작업의 콜백 함수가 대기하는 큐입니다.
 * - 대표적인 Macrotask: setTimeout, setInterval, I/O 작업, UI 렌더링 이벤트.
 * - 이벤트 루프는 한 번의 '틱(tick)'에서 이 큐의 작업 '하나'만 처리합니다.
 */
console.log("\n3. Macrotask 예제");
setTimeout(function () {
  console.log("  - Macrotask (setTimeout)가 Call Stack으로 이동하여 실행됨");
}, 0);

// -----------------------------------------------------------------------------
// 4. 이벤트 루프 처리 순서 및 종합 예제
// -----------------------------------------------------------------------------
/*
 * 1. Call Stack에 있는 동기 코드를 모두 실행한다.
 * 2. Call Stack이 비워지면, Microtask Queue에 있는 모든 작업을 순서대로 꺼내 실행한다.
 *    (이 과정에서 새로운 Microtask가 추가되면, 그 작업도 이번 사이클에 함께 실행된다.)
 * 3. Microtask Queue가 완전히 비워지면, Macrotask Queue에서 가장 오래된 작업 '하나'를 꺼내 실행한다.
 * 4. 해당 Macrotask 실행이 완료되면, 브라우저는 필요한 경우 렌더링을 수행할 수 있다.
 * 5. 2번 과정부터 다시 반복한다. (이것이 '이벤트 루프'의 한 사이클/틱 이다.)
 */
console.log(
  "\n4. 종합 예제: (동기 코드) -> (Microtasks) -> (Macrotask) -> 반복"
);

console.log("  (1) 동기: 코드 시작");

// Macrotask 1
setTimeout(function () {
  console.log("  (5) Macrotask: 첫 번째 setTimeout 콜백");
  // 이 Macrotask가 실행되는 동안 Microtask가 추가됨
  Promise.resolve().then(function () {
    console.log("  (6) Microtask: (setTimeout 내부의) Promise.then");
  });
}, 0);

// Microtask 1
Promise.resolve().then(function () {
  console.log("  (3) Microtask: 첫 번째 Promise.then");
});

// Macrotask 2
setTimeout(function () {
  console.log("  (7) Macrotask: 두 번째 setTimeout 콜백");
}, 0);

// Microtask 2
Promise.resolve().then(function () {
  console.log("  (4) Microtask: 두 번째 Promise.then");
});

console.log("  (2) 동기: 코드 종료"); 