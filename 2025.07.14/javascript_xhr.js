/**
 * @fileoverview JavaScript의 XMLHttpRequest(XHR) 객체를 사용하여 비동기 네트워크 요청을 보내는 예제입니다.
 * XHR은 Fetch API 이전에 널리 사용되던 기술로, 콜백 기반으로 동작합니다.
 * 최신 프로젝트에서는 주로 Fetch나 Axios 같은 라이브러리를 사용하지만,
 * 기존 코드베이스나 특정 환경에서는 여전히 XHR을 이해하는 것이 중요합니다.
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/XMLHttpRequest
 */

// -----------------------------------------------------------------------------
// 1. 기본 GET 요청 (Basic GET Request)
// -----------------------------------------------------------------------------
/*
 * XHR 요청은 여러 단계로 이루어집니다:
 * 1. XMLHttpRequest 객체를 생성합니다.
 * 2. onreadystatechange 이벤트 핸들러를 설정하여 상태 변화를 감지합니다.
 * 3. open() 메서드로 요청을 초기화합니다. (메서드, URL, 비동기 여부 설정)
 * 4. send() 메서드로 실제 요청을 전송합니다.
 *
 * `readyState`는 XHR 객체의 현재 상태를 나타내는 숫자입니다.
 * - 0 (UNSENT): 아직 open()이 호출되지 않음.
 * - 1 (OPENED): open()이 호출됨.
 * - 2 (HEADERS_RECEIVED): send()가 호출되었고, 헤더와 상태를 사용할 수 있음.
 * - 3 (LOADING): 응답을 받는 중.
 * - 4 (DONE): 작업 완료.
 *
 * MDN: https://developer.mozilla.org/ko/docs/Web/API/XMLHttpRequest
 */
console.log("1. XHR GET 요청");

const xhrGet = new XMLHttpRequest();
xhrGet.onreadystatechange = function () {
  // 작업이 완료되고(readyState === 4), 요청이 성공했을 때(status === 200)
  if (xhrGet.readyState === 4 && xhrGet.status === 200) {
    console.log("  - XHR GET 응답 수신 성공!");
    // 응답은 기본적으로 문자열이므로, JSON 데이터는 직접 파싱해야 합니다.
    const data = JSON.parse(xhrGet.responseText);
    console.log("  - 파싱된 데이터:", data);
  } else if (xhrGet.readyState === 4) {
    // 작업은 완료되었지만 에러가 발생한 경우
    console.error(`  - XHR GET 에러 발생! status: ${xhrGet.status}`);
  }
};
xhrGet.open("GET", "https://jsonplaceholder.typicode.com/posts/4", true);
xhrGet.send();

// -----------------------------------------------------------------------------
// 2. POST 요청 (POST Request)
// -----------------------------------------------------------------------------
/*
 * POST 요청 시에는, setRequestHeader()로 Content-Type을 지정하고
 * send() 메서드의 인자로 보낼 데이터를 전달해야 합니다. 데이터는 보통 JSON.stringify()를
 * 사용하여 문자열 형태로 변환합니다.
 */
console.log("\n2. XHR POST 요청");

const xhrPost = new XMLHttpRequest();
xhrPost.onreadystatechange = function () {
  if (xhrPost.readyState === 4 && xhrPost.status === 201) { // 201 Created
    console.log("  - XHR POST 응답 수신:", xhrPost.responseText);
  } else if (xhrPost.readyState === 4) {
    console.error(`  - XHR POST 에러 발생! status: ${xhrPost.status}`);
  }
};
xhrPost.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
xhrPost.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
const newPost = {
  title: "XHR 포스트",
  body: "XMLHttpRequest를 사용하여 생성되었습니다.",
  userId: 2,
};
xhrPost.send(JSON.stringify(newPost));

// -----------------------------------------------------------------------------
// 3. onload와 onerror 이벤트 핸들러 사용
// -----------------------------------------------------------------------------
/*
 * onreadystatechange 대신 onload, onerror, onprogress 등의 이벤트를 사용하면
 * 코드를 더 직관적으로 작성할 수 있습니다. (IE9+ 지원)
 * 이 방식이 더 현대적이고 가독성이 좋습니다.
 * - onload: 요청이 성공적으로 완료되었을 때 호출됩니다. (readyState 4)
 * - onerror: 네트워크 수준의 에러가 발생했을 때 호출됩니다.
 */
console.log("\n3. onload/onerror 이벤트 핸들러 사용");

const xhrOnload = new XMLHttpRequest();

xhrOnload.onload = function () {
  // readyState가 4인 경우에만 호출되므로 확인할 필요가 없습니다.
  if (xhrOnload.status >= 200 && xhrOnload.status < 300) {
    console.log("  - onload: 요청 성공, 데이터:", xhrOnload.responseText);
  } else {
    // 서버 에러 (4xx, 5xx)
    console.error(`  - onload: 서버 에러 발생, status: ${xhrOnload.status}`);
  }
};

xhrOnload.onerror = function () {
  console.error("  - onerror: 네트워크 에러가 발생했습니다.");
};

xhrOnload.open("GET", "https://jsonplaceholder.typicode.com/posts/5", true);
xhrOnload.send(); 