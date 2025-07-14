/**
 * @fileoverview JavaScript의 Fetch API를 사용하여 비동기 네트워크 요청을 보내는 예제입니다.
 * Fetch API는 Promise 기반으로 동작하므로, 비동기 코드를 더 현대적이고 깔끔하게 작성할 수 있게 해줍니다.
 * 각 개념에 대한 더 자세한 정보는 코드 내에 포함된 MDN 문서 링크를 참고해 주세요.
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch
 */

// -----------------------------------------------------------------------------
// 1. 기본 GET 요청 (Basic GET Request)
// -----------------------------------------------------------------------------
/*
 * fetch() 함수는 첫 번째 인자로 요청할 URL을 받으며, 기본적으로 GET 요청을 보냅니다.
 * 이 함수는 Promise를 반환하고, 이 Promise는 HTTP 응답을 나타내는 Response 객체로 이행됩니다.
 *
 * 네트워크 에러(예: CORS, 연결 실패)가 발생하면 Promise는 reject되지만,
 * 서버가 404(Not Found)나 500(Internal Server Error) 같은 에러 상태 코드를 응답하더라도
 * reject되지 않는다는 점에 유의해야 합니다. 따라서 `response.ok` 속성을 확인하는 것이 중요합니다.
 *
 * MDN: https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch
 */
console.log("1. 기본 GET 요청");

fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => {
    // response.ok는 상태 코드가 200-299 범위에 있는지 여부를 나타내는 boolean 값입니다.
    if (!response.ok) {
      throw new Error(`HTTP 에러! status: ${response.status}`);
    }
    // Response 객체의 json() 메서드는 응답 본문을 JSON으로 파싱하는 Promise를 반환합니다.
    return response.json();
  })
  .then((data) => {
    console.log("  - 데이터 수신:", data);
  })
  .catch((error) => {
    console.error("  - 요청 실패:", error);
  });

// -----------------------------------------------------------------------------
// 2. POST 요청 (POST Request)
// -----------------------------------------------------------------------------
/*
 * GET 이외의 메서드를 사용하거나 헤더, 본문(body) 등을 설정하려면
 * fetch()의 두 번째 인자로 options 객체를 전달해야 합니다.
 * - method: 요청 메서드 ('POST', 'PUT', 'DELETE' 등)
 * - headers: 요청 헤더를 담는 객체
 * - body: 요청 본문. JSON.stringify()를 사용하여 객체를 문자열로 변환해야 합니다.
 */
console.log("\n2. POST 요청");

const newPost = {
  title: "새로운 포스트",
  body: "Fetch API를 사용하여 생성되었습니다.",
  userId: 1,
};

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
  body: JSON.stringify(newPost),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("  - 서버로부터 받은 응답:", data);
  })
  .catch((error) => {
    console.error("  - POST 요청 실패:", error);
  });
// -----------------------------------------------------------------------------
// 3. async/await와 함께 사용하기 (Using with async/await)
// -----------------------------------------------------------------------------
/*
 * async/await 문법을 사용하면 Promise 기반의 코드를 동기 코드처럼 더 간결하고 읽기 쉽게
 * 작성할 수 있습니다. 비동기 작업의 결과를 기다렸다가 다음 코드를 실행하게 해줍니다.
 * 에러 처리는 try...catch 블록을 사용하여 더 직관적으로 관리할 수 있습니다.
 */
console.log("\n3. async/await와 함께 사용하기");

const getPostById = async (postId) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP 에러! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("  - async/await 데이터 수신:", data);
  } catch (error) {
    console.error("  - async/await 요청 실패:", error);
  }
};

getPostById(2); 
