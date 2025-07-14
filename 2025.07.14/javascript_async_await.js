/**
 * @fileoverview Promise를 더 쉽게 다루기 위한 async/await 문법에 대해 설명합니다.
 * async/await는 Promise를 기반으로 동기 코드처럼 보이는 비동기 코드를 작성할 수 있게 해주는 문법적 설탕입니다.
 *
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function
 */

console.log("--- JavaScript async/await ---");

// -----------------------------------------------------------------------------
// 1. async/await 기본 사용법
// -----------------------------------------------------------------------------
/*
 * async 함수는 항상 Promise를 반환합니다.
 * await 키워드는 async 함수 내부에서만 사용할 수 있으며, Promise가 처리될 때까지
 * 함수 실행을 일시 중지하고, 처리된 후 결과를 반환합니다.
 */
console.log("\n1. async/await 기본:");

// 예제를 위한 Promise 생성 함수
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("async/await로 데이터를 가져왔습니다!"), 1000);
  });
}

async function processData() {
  console.log("  - async 함수 시작");
  // await: fetchData() Promise가 이행될 때까지 기다렸다가 결과를 반환
  const data = await fetchData();
  console.log("  - await로 받은 데이터:", data);
  console.log("  - async 함수 종료");
  return data;
}

processData();

// -----------------------------------------------------------------------------
// 2. async/await 오류 처리 (try...catch)
// -----------------------------------------------------------------------------
/*
 * async/await에서의 에러는 동기 코드와 마찬가지로 try...catch 구문을 사용하여 처리합니다.
 * .then/.catch 체이닝보다 가독성이 좋습니다.
 */
console.log("\n2. async/await 오류 처리:");

// 예제를 위한 에러 발생 Promise 생성 함수
function fetchWithError() {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("의도된 에러 발생")), 1500);
  });
}

async function processDataWithError() {
  try {
    console.log("  - 오류 처리 예제: try 블록 시작");
    const data = await fetchWithError();
    console.log("이 줄은 실행되지 않습니다.");
  } catch (error) {
    console.error("  - catch 블록에서 에러 처리:", error.message);
  } finally {
    console.log("  - finally 블록은 항상 실행됩니다.");
  }
}

processDataWithError(); 