/**
 * @fileoverview JavaScript의 비동기 처리를 위한 Promise에 대해 설명합니다.
 * Promise는 비동기 작업의 최종 완료 또는 실패를 나타내는 객체입니다.
 *
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise
 */

console.log("--- JavaScript Promise ---");

// -----------------------------------------------------------------------------
// 1. Promise의 기본 개념
// -----------------------------------------------------------------------------
/*
 * Promise는 세 가지 상태를 가집니다.
 * - pending(대기): 비동기 처리가 아직 완료되지 않은 초기 상태.
 * - fulfilled(이행): 비동기 처리가 성공적으로 완료된 상태.
 * - rejected(거부): 비동기 처리가 실패한 상태.
 *
 * new Promise((resolve, reject) => { ... }) 형태로 생성하며,
 * 성공 시 resolve(결과값)를, 실패 시 reject(에러)를 호출합니다.
 */
console.log("\n1. Promise 생성 및 상태:");

const myPromise = new Promise((resolve, reject) => {
  console.log("  - Promise 내부의 코드는 즉시 실행됩니다.");
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("데이터를 성공적으로 가져왔습니다!"); // 성공 -> fulfilled
    } else {
      reject(new Error("데이터를 가져오는 데 실패했습니다.")); // 실패 -> rejected
    }
  }, 1000);
});

// -----------------------------------------------------------------------------
// 2. Promise 후속 처리 메서드 (.then, .catch, .finally)
// -----------------------------------------------------------------------------
/*
 * .then(onFulfilled, onRejected): Promise가 이행(fulfilled)되었을 때의 콜백과
 *                                거부(rejected)되었을 때의 콜백을 등록합니다.
 * .catch(onRejected): Promise가 거부되었을 때의 콜백만 등록합니다.
 * .finally(onFinally): 성공/실패 여부와 상관없이 항상 실행되는 콜백을 등록합니다.
 */
console.log("\n2. Promise 후속 처리:");

myPromise
  .then((result) => {
    // 성공(fulfilled) 시 실행
    console.log("  - .then():", result);
    return "다음 then으로 넘길 데이터";
  })
  .then((nextResult) => {
    // 앞선 .then에서 반환한 값을 받아 처리 (Promise Chaining)
    console.log("  - .then() 체이닝:", nextResult);
  })
  .catch((error) => {
    // 실패(rejected) 시 실행
    console.error("  - .catch():", error.message);
  })
  .finally(() => {
    // 성공/실패와 관계없이 항상 실행
    console.log("  - .finally(): 작업 완료.");
  });

// -----------------------------------------------------------------------------
// 3. Promise 정적 메서드 (Promise.all, Promise.race)
// -----------------------------------------------------------------------------
/*
 * Promise.all(iterable): 여러 Promise를 병렬로 처리하고, 모든 Promise가
 *                       이행되면 그 결과 배열을 반환합니다. 하나라도 거부되면 즉시 거부됩니다.
 * Promise.race(iterable): 여러 Promise 중 가장 먼저 처리되는 Promise(이행 또는 거부)의
 *                        결과를 그대로 반환합니다.
 */
console.log("\n3. Promise.all / Promise.race");

const p1 = new Promise((resolve) => setTimeout(() => resolve("Promise 1 성공"), 500));
const p2 = new Promise((resolve) => setTimeout(() => resolve("Promise 2 성공"), 800));
const p3 = new Promise((_, reject) => setTimeout(() => reject(new Error("Promise 3 실패")), 600));

// Promise.all 예제 (p3 때문에 실패)
Promise.all([p1, p2, p3])
  .then((results) => console.log("  - Promise.all 성공:", results))
  .catch((error) => console.error("  - Promise.all 실패:", error.message));

// Promise.race 예제 (p1이 가장 빠르므로 성공)
Promise.race([p1, p2, p3])
  .then((result) => console.log("  - Promise.race 결과:", result))
  .catch((error) => console.error("  - Promise.race 실패:", error.message)); 