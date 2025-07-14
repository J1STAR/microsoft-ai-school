/**
 * @fileoverview JavaScript의 Server-Sent Events(SSE)를 사용하여 서버로부터 단방향으로 데이터를 수신하는 예제입니다.
 * SSE는 서버가 클라이언트에게 지속적으로 데이터를 푸시(push)할 수 있는 기술입니다.
 * WebSocket과 달리 단방향 통신(서버 -> 클라이언트)만 지원하지만, 일반 HTTP를 통해 구현되므로 더 간단하고
 * 기존 인프라와 호환성이 좋습니다. 실시간 알림, 뉴스 피드 업데이트 등에 사용됩니다.
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/Server-sent_events/Using_server-sent_events
 */

// -----------------------------------------------------------------------------
// 1. EventSource를 이용한 연결
// -----------------------------------------------------------------------------
/*
 * 클라이언트는 EventSource 객체를 생성하여 SSE 엔드포인트에 연결합니다.
 * 브라우저는 지정된 URL에 HTTP GET 요청을 보내고, 서버는 'text/event-stream'
 * Content-Type으로 응답하며 연결을 유지합니다.
 *
 * MDN: https://developer.mozilla.org/ko/docs/Web/API/EventSource
 */
console.log("1. SSE 연결 시도...");
const eventSource = new EventSource("https://sse.jasoncrouse.com/sse");

// -----------------------------------------------------------------------------
// 2. SSE 이벤트 핸들러
// -----------------------------------------------------------------------------
/*
 * SSE의 상태 변화와 데이터 수신은 이벤트를 통해 처리됩니다.
 * - onopen: 연결이 성공적으로 수립되었을 때 호출됩니다.
 * - onmessage: 이름 없는(unnamed) 메시지를 수신했을 때 호출됩니다.
 * - onerror: 에러가 발생했을 때 호출됩니다. (연결이 끊어지면 자동 재연결 시도)
 * - addEventListener(eventName, handler): 이름 있는(named) 이벤트를 처리합니다.
 */
console.log("\n2. SSE 이벤트 핸들러 설정");

eventSource.onopen = function (event) {
  console.log("  - (onopen) SSE 연결 성공:", event);
};

eventSource.onmessage = function (event) {
  console.log(`  - (onmessage) 일반 메시지 수신: ${event.data}`);
};

eventSource.onerror = function (error) {
  console.error("  - (onerror) SSE 에러 발생:", error);
  // readyState가 CONNECTING이면 브라우저가 자동으로 재연결 중임을 의미합니다.
  if (eventSource.readyState === EventSource.CONNECTING) {
    console.log("  - SSE 연결이 끊어져 재연결을 시도합니다...");
  }
};

// -----------------------------------------------------------------------------
// 3. 명명된 이벤트 처리 (Handling Named Events)
// -----------------------------------------------------------------------------
/*
 * 서버는 'event:' 필드를 사용하여 이벤트에 이름을 지정할 수 있습니다.
 * 클라이언트는 addEventListener를 사용하여 특정 이름의 이벤트를 수신할 수 있습니다.
 */
console.log("\n3. 명명된 이벤트 리스너 설정");

eventSource.addEventListener("user-joined", function (event) {
  console.log(`  - (named event) 'user-joined' 수신: ${event.data}`);
});

eventSource.addEventListener("heartbeat", function (event) {
  console.log(`  - (named event) 'heartbeat' 수신: ${event.data}`);
});

// -----------------------------------------------------------------------------
// 4. 연결 종료 (Closing the Connection)
// -----------------------------------------------------------------------------
/*
 * close() 메서드를 호출하여 클라이언트 측에서 명시적으로 연결을 종료할 수 있습니다.
 * 연결이 종료되면 더 이상 재연결을 시도하지 않습니다.
 */
setTimeout(() => {
  if (eventSource.readyState !== EventSource.CLOSED) {
    console.log("\n4. 30초 후 SSE 연결을 강제로 종료합니다.");
    eventSource.close();
  }
}, 30000); 