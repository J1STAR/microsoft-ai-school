### 📂 GitHub에서 보기: [microsoft-ai-school/2025.07.14](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.07.14)

# 📅 2025년 7월 14일: JavaScript 심화: 함수형 프로그래밍부터 비동기, 웹 API까지

## 📝 학습 목표

이번 학습에서는 JavaScript의 고급 주제인 함수형 프로그래밍 기법, 비동기 처리 모델, 그리고 브라우저의 데이터 저장소와 최신 웹 통신 기술을 깊이 있게 탐구하는 것을 목표로 합니다. 각 주제에 대한 명확한 설명과 실용적인 코드 예제를 `.js` 파일에 담고, 이를 학습용 웹 페이지(`.html`)로 정리하여 복잡한 개념을 체계적으로 정복합니다.

- **고급 함수형 프로그래밍**: 함수의 재사용성을 극대화하는 커링(Currying) 기법과, 상태를 은닉하고 기억하는 클로저(Closure)의 동작 원리를 이해합니다.
- **JavaScript 런타임 환경 이해**: 이벤트 루프(Event Loop), 콜 스택(Call Stack), 마이크로태스크(Microtask) 및 매크로태스크(Macrotask) 큐의 상호작용을 시각적인 예제를 통해 학습하여 비동기 코드의 실행 흐름을 완벽히 파악합니다.
- **비동기 프로그래밍 패턴 이해**: 전통적인 콜백(Callback) 패턴의 한계를 이해하고, 이를 개선한 프로미스(Promise)와 `async/await` 문법을 사용하여 가독성 높고 효율적인 비동기 코드를 작성하는 방법을 숙달합니다.
- **브라우저 저장소 활용**: `localStorage`와 `sessionStorage`를 사용한 간단한 Key-Value 데이터 저장 방법을 익히고, 대용량의 정형 데이터를 다루기 위한 클라이언트 측 데이터베이스인 `IndexedDB`의 트랜잭션 및 객체 저장소(Object Store) 사용법을 학습합니다. 또한, 서버와의 상태 유지를 위한 `쿠키(Cookie)`의 동작 방식과 속성을 이해하고 활용합니다.
- **웹 통신 기술**: 최신 웹 애플리케이션의 핵심인 비동기 데이터 통신 방법을 학습합니다. `fetch` API와 `XMLHttpRequest`를 이용한 기본적인 비동기 요청부터, `Long Polling`, `WebSocket`, `Server-Sent Events(SSE)`와 같은 실시간 양방향 및 단방향 통신 기술의 차이점과 구현 방법을 익힙니다.

---

## 🖼️ 프로젝트 개요

본 프로젝트는 복잡하고 동적인 현대 웹 애플리케이션 개발의 근간을 이루는 **JavaScript 핵심 원리를 체계적으로 정립**하고, 이를 실용적인 **학습 자료로 구축**하는 것을 목표로 합니다. 각 주제는 상세한 주석이 담긴 `.js` 스크립트와, 가독성을 높인 `.html` 학습 페이지로 구성되어 상호 보완적인 학습 경험을 제공합니다.

이 프로젝트는 다음과 같은 JavaScript의 핵심 영역을 깊이 있게 다룹니다.

1.  **고급 함수형 프로그래밍 패러다임**:
    -   `커링(Currying)`: 함수의 재사용성을 극대화하고, 인자를 나누어 처리하는 기법
    -   `클로저(Closure)`: 함수가 자신의 렉시컬 환경을 기억하여 상태를 안전하게 관리하는 원리

2.  **JavaScript 런타임과 비동기 모델**:
    -   `이벤트 루프(Event Loop)`: 자바스크립트의 동시성 모델과 비동기 작업 처리 순서의 핵심 원리
    -   `콜백(Callback)`부터 `프로미스(Promise)`, `async/await`까지 이어지는 비동기 프로그래밍의 발전 과정

3.  **최신 웹 통신 API**:
    -   HTTP 요청(`fetch`, `XMLHttpRequest`)
    -   실시간 양방향/단방향 통신(`WebSocket`, `Server-Sent Events`, `Long Polling`)

4.  **브라우저 저장소 API**:
    -   `쿠키(Cookie)`: 서버-클라이언트 간 상태 유지를 위한 데이터 조각
    -   키-값 기반 저장소 (`localStorage`, `sessionStorage`)
    -   클라이언트 사이드 데이터베이스 (`IndexedDB`)

이러한 지식들을 체계적으로 정리함으로써, JavaScript의 내부 동작에 대한 깊은 이해를 바탕으로 성능과 유지보수성이 뛰어난 웹 애플리케이션을 설계하고 구현하는 역량을 강화하는 것을 최종 목표로 삼습니다.

---

## 📁 파일 구성 및 설명

| 파일명                                                                                                | 설명                                                                                                                                                               | 공식 문서                                                                                                                            |
| :---------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| [`javascript_currying.js`](./javascript_currying.js) / [`html`](./javascript_currying.html)           | 여러 개의 인자를 받는 함수를, 단일 인자를 받는 함수의 연속으로 변환하는 커링 기법의 원리와 활용 사례를 다룹니다.                                                         | [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)                                   |
| [`javascript_closure.js`](./javascript_closure.js) / [`html`](./javascript_closure.html)             | 함수가 선언될 때의 렉시컬 환경을 기억하여, 외부 변수에 접근할 수 있게 하는 클로저의 개념과 상태 관리 패턴을 설명합니다.                                                | [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)                                                                 |
| [`javascript_event_loop.js`](./javascript_event_loop.js) / [`html`](./javascript_event_loop.html)    | 콜 스택, 이벤트 루프, 태스크 큐(마이크로/매크로)의 상호작용을 통해 JavaScript 비동기 모델의 동작 원리를 심층 분석합니다.                                            | [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop)                                                                |
| [`javascript_callback.js`](./javascript_callback.js) / [`html`](./javascript_callback.html)          | 비동기 처리의 기본인 콜백 함수의 사용법과 '콜백 지옥' 문제를 해결하기 위한 기법을 설명합니다.                                                                        | [MDN](https://developer.mozilla.org/ko/docs/Glossary/Callback_function)                                                              |
| [`javascript_promise.js`](./javascript_promise.js) / [`html`](./javascript_promise.html)             | 비동기 작업의 최종 성공 또는 실패를 나타내는 프로미스 객체의 상태(pending, fulfilled, rejected)와 `.then()`, `.catch()` 체이닝을 다룹니다.                            | [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)                                         |
| [`javascript_async_await.js`](./javascript_async_await.js) / [`html`](./javascript_async_await.html) | 프로미스를 더욱 동기 코드처럼 간결하게 작성할 수 있게 해주는 `async/await` 문법의 사용법과 예외 처리 방법을 설명합니다.                                            | [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)                                      |
| [`javascript_fetch.js`](./javascript_fetch.js) / [`html`](./javascript_fetch.html)                   | 최신 비동기 HTTP 요청 표준인 `fetch` API의 사용법과 `Promise` 기반의 응답 처리, `async/await` 문법과의 결합 방법을 학습합니다.                                        | [MDN](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API)                                                                       |
| [`javascript_xhr.js`](./javascript_xhr.js) / [`html`](./javascript_xhr.html)                         | 전통적인 비동기 통신 방법인 `XMLHttpRequest` 객체를 사용하여 서버와 데이터를 교환하는 방법을 다룹니다.                                                                 | [MDN](https://developer.mozilla.org/ko/docs/Web/API/XMLHttpRequest)                                                                  |
| [`javascript_long_polling.js`](./javascript_long_polling.js) / [`html`](./javascript_long_polling.html) | 서버의 이벤트 발생 시점까지 클라이언트의 응답을 지연시켜 실시간 통신을 흉내 내는 롱 폴링(Long Polling) 기법의 원리를 이해하고 구현합니다.                                   | -                                                                                                                                  |
| [`javascript_websocket.js`](./javascript_websocket.js) / [`html`](./javascript_websocket.html)       | 클라이언트와 서버 간의 지속적인 양방향 연결을 제공하는 WebSocket 프로토콜의 사용법과 주요 이벤트를 다룹니다.                                                         | [MDN](https://developer.mozilla.org/ko/docs/Web/API/WebSocket)                                                                       |
| [`javascript_sse.js`](./javascript_sse.js) / [`html`](./javascript_sse.html)                         | 서버에서 클라이언트로 텍스트 이벤트를 실시간으로 푸시하는 단방향 통신 기술인 Server-Sent Events(SSE)의 구현 방법을 학습합니다.                                         | [MDN](https://developer.mozilla.org/ko/docs/Web/API/Server-sent_events/Using_server-sent_events)                                     |
| [`javascript_cookie.js`](./javascript_cookie.js) / [`html`](./javascript_cookie.html)                 | 서버-클라이언트 간 상태 유지를 위한 쿠키의 동작 원리, 생성/조회/삭제 방법 및 주요 속성(Expires, Path, Secure 등)을 다룹니다.                                     | [MDN](https://developer.mozilla.org/ko/docs/Web/API/Document/cookie)                                                                 |
| [`javascript_local_storage.js`](./javascript_local_storage.js) / [`html`](./javascript_local_storage.html) | 브라우저를 닫았다 열어도 데이터가 유지되는 `localStorage`의 사용법과 특징을 다룹니다.                                                                                | [MDN](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)                                                             |
| [`javascript_session_storage.js`](./javascript_session_storage.js) / [`html`](./javascript_session_storage.html) | 브라우저 세션이 유지되는 동안만 데이터를 저장하는 `sessionStorage`의 사용법과 `localStorage`와의 차이점을 설명합니다.                                                    | [MDN](https://developer.mozilla.org/ko/docs/Web/API/Window/sessionStorage)                                                           |
| [`javascript_indexeddb.js`](./javascript_indexeddb.js) / [`html`](./javascript_indexeddb.html)       | 대용량 정형 데이터를 위한 클라이언트 사이드 DB인 `IndexedDB`의 데이터베이스 연결, 객체 저장소 생성, 트랜잭션, 인덱싱 등을 다룹니다.                                       | [MDN](https://developer.mozilla.org/ko/docs/Web/API/IndexedDB_API)                                                                   |
| [`javascript_dom_manipulation.js`](./javascript_dom_manipulation.js) / [`html`](./javascript_dom_manipulation.html) | JavaScript로 웹 페이지의 요소를 선택, 생성, 변경, 삭제하는 DOM(문서 객체 모델) 조작의 핵심 개념과 다양한 API 사용법을 학습합니다. | [MDN](https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model) |
| `README.md`                                                                                           | 본 학습 내용에 대한 정리 문서입니다.                                                                                                                               | -                                                                                                                                  |

---

## 🚀 주요 학습 내용 및 결과

### 1. 웹 페이지 조작의 핵심: DOM(문서 객체 모델)

`javascript_dom_manipulation.html`을 통해 DOM의 기본 개념과 트리 구조를 이해하고, `js` 파일의 코드 예제를 개발자 도구 콘솔에서 직접 실행하며 웹 페이지의 요소를 동적으로 조작하는 방법을 실습했습니다. 이를 통해 JavaScript가 어떻게 웹 페이지와 상호작용하는지에 대한 근본적인 원리를 파악했습니다.

```javascript
// javascript_dom_manipulation.js의 일부

// 1. 요소 선택: 조작할 대상을 찾습니다.
const title = document.getElementById('title-1');

// 2. 내용 변경: 선택한 요소의 텍스트를 변경합니다.
title.textContent = 'JavaScript로 변경된 제목!';

// 5. 새로운 요소 생성 및 추가: 새 요소를 만들어 페이지에 붙입니다.
const newParagraph = document.createElement('p');
newParagraph.textContent = '새롭게 추가된 문단입니다.';
document.getElementById('container-5').appendChild(newParagraph);

// 8. 요소 목록 순회: 여러 요소를 한 번에 처리합니다.
const items = document.querySelectorAll('.p-iterate-8');
items.forEach(item => {
    item.style.color = 'blue';
});
```

### 2. 고급 함수형 프로그래밍: 클로저를 이용한 상태 관리

`javascript_closure.js`를 통해 클로저가 어떻게 함수의 상태를 캡슐화하고 외부로부터의 접근을 제어하는지 학습했습니다. 아래 예제는 클로저를 활용하여 외부에서 직접 수정할 수 없는 비공개(private) 카운터를 구현한 것입니다. 이를 통해 데이터 은닉과 상태 유지의 중요성을 이해할 수 있었습니다.

```javascript
// javascript_closure.js의 일부
function createCounter() {
  let count = 0; // '비공개' 상태가 되는 변수

  // 반환되는 객체의 메서드들은 자신이 선언된 환경을 기억하는 클로저입니다.
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
console.log("Counter 1의 값:", counter1.getCount()); // 2
console.log(counter1.count); // undefined. 외부에서 직접 접근 불가
```

### 3. JavaScript 비동기 모델: 이벤트 루프의 동작 원리

`javascript_event_loop.js`의 복합 예제를 통해 JavaScript의 비동기 처리 핵심인 이벤트 루프의 동작 방식을 시각적으로 확인했습니다. 동기 코드, 마이크로태스크(`Promise`), 매크로태스크(`setTimeout`)가 어떤 우선순위로 실행되는지 명확히 파악하여 비동기 코드의 실행 흐름을 예측하는 능력을 길렀습니다.

```javascript
// javascript_event_loop.js의 일부
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

console.log("  (2) 동기: 코드 종료");
/*
실행 순서:
  (1) 동기: 코드 시작
  (2) 동기: 코드 종료
  (3) Microtask: 첫 번째 Promise.then
  (5) Macrotask: 첫 번째 setTimeout 콜백
  (6) Microtask: (setTimeout 내부의) Promise.then
*/
```

### 4. 최신 웹 통신 API: `async/await`를 사용한 Fetch

`javascript_fetch.js`를 통해 `async/await` 문법을 사용하여 비동기 네트워크 요청을 얼마나 간결하고 직관적으로 작성할 수 있는지 학습했습니다. Promise 체이닝보다 가독성이 높고, `try...catch`를 이용한 에러 처리가 용이한 현대적인 비동기 코드 작성법을 익혔습니다.

```javascript
// javascript_fetch.js의 일부
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
```

### 5. 브라우저 저장소 API: IndexedDB 데이터베이스 작업

`javascript_indexeddb.js`를 통해 대용량 데이터를 다루기 위한 클라이언트 사이드 데이터베이스 `IndexedDB`의 사용법을 익혔습니다. 아래 코드는 데이터베이스에 연결하고, 'readwrite' 트랜잭션을 시작하여 객체 저장소에 새로운 데이터를 추가하는 과정을 보여줍니다. 이를 통해 트랜잭션 기반의 비동기 데이터 처리 방식을 이해했습니다.

```javascript
// javascript_indexeddb.js의 일부
function performDatabaseOperations(db) {
  // 'readwrite' 모드로 트랜잭션을 시작합니다.
  const addTransaction = db.transaction(["notes"], "readwrite");
  const noteObjectStore = addTransaction.objectStore("notes");

  const newNote = {
    text: "IndexedDB 배우기",
    timestamp: new Date().getTime(),
  };

  const addRequest = noteObjectStore.add(newNote);
  addRequest.onsuccess = () => {
    console.log(`  - 데이터 추가 성공! ID: ${addRequest.result}`);
  };
  addRequest.onerror = (event) => console.error("데이터 추가 실패:", event.target.error);

  // 트랜잭션 완료 이벤트
  addTransaction.oncomplete = () => console.log("  - 추가 트랜잭션 완료.");
}
```

### 6. 클라이언트 데이터 관리: 쿠키(Cookie) 활용

`javascript_cookie.js`를 통해 서버와 클라이언트 간의 상태를 유지하는 데 사용되는 쿠키를 다루는 법을 배웠습니다. `document.cookie`가 단일 문자열로 관리되는 특성 때문에 아래와 같이 특정 쿠키 값을 편리하게 읽고 쓰는 헬퍼 함수를 작성하여 활용하는 방법을 익혔습니다.

```javascript
// javascript_cookie.js의 일부
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

function deleteCookie(name, path = '/') {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
}

// 쿠키 생성 및 사용
document.cookie = "username=JaneSmith; path=/";
const currentUser = getCookie("username");
console.log(`현재 사용자: ${currentUser}`); // "JaneSmith"
```

---

## 💡 학습 정리

이번 세션을 통해 JavaScript의 비동기 처리 방식, 웹 통신 기술, 브라우저의 데이터 저장소에 대한 심층적인 이해를 할 수 있었습니다.

- **웹 페이지의 동적 제어**: DOM의 개념을 이해하고, JavaScript를 통해 웹 페이지의 요소를 자유롭게 선택, 변경, 추가, 삭제하는 방법을 익혔습니다. 이를 통해 정적인 HTML 문서를 사용자와 상호작용하는 동적인 웹 애플리케이션으로 만드는 기본기를 다졌습니다.
- **비동기 흐름의 명확화**: 이벤트 루프와 태스크 큐의 동작 원리를 학습함으로써, 비동기 코드의 실행 순서를 예측하고 제어하는 능력을 갖추게 되었습니다. `Promise`와 `async/await`를 통해 콜백 지옥을 벗어나 현대적인 비동기 코드를 작성할 수 있게 되었습니다.
- **함수형 프로그래밍의 가치**: 클로저와 커링 같은 함수형 프로그래밍 패턴이 어떻게 코드의 재사용성을 높이고 상태를 안전하게 관리하는 데 기여하는지 깨달았습니다.
- **상황에 맞는 데이터 저장소 선택**: 간단한 데이터는 웹 스토리지(`localStorage`, `sessionStorage`)를, 복잡하고 구조적인 데이터는 `IndexedDB`를 사용하는 등, 애플리케이션의 요구사항에 맞는 클라이언트 측 저장 기술을 선택하고 활용하는 기준을 세울 수 있었습니다.
- **통신 아키텍처 이해**: `fetch`와 `XHR` 같은 요청/응답 모델부터 `Long Polling`, `WebSocket`, `SSE`와 같은 실시간 푸시 기술까지, 각 통신 방식의 장단점과 적합한 사용 사례를 이해하게 되었습니다. 이를 통해 다양한 웹 애플리케이션 요구사항에 맞는 최적의 통신 아키텍처를 설계할 수 있는 기반을 마련했습니다.

결론적으로, JavaScript의 내부 동작 원리를 깊이 있게 파고들면서, 이를 바탕으로 복잡한 웹 애플리케이션을 구현하는 데 필수적인 고급 기술들을 체계적으로 습득하는 시간이었습니다.

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact

<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items:center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>j.1star.0726@gmail.com</a> 