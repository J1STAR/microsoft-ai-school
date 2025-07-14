/**
 * @fileoverview JavaScript의 WebSocket API를 사용하여 실시간 양방향 통신을 구현하는 예제입니다.
 * WebSocket은 클라이언트와 서버 간에 지속적인 연결을 제공하여, 양쪽에서 언제든지 데이터를 보낼 수 있게 합니다.
 * 이는 HTTP 기반의 요청-응답 모델과 달리, 채팅, 실시간 게임, 주식 시세 등과 같은 서비스에 매우 유용합니다.
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/WebSockets_API
 */

// -----------------------------------------------------------------------------
// 1. WebSocket 연결 생성
// -----------------------------------------------------------------------------
/*
 * WebSocket 객체를 생성하여 서버에 연결을 시도합니다.
 * URL 스킴은 'ws://' 또는 보안 연결(TLS)을 위한 'wss://'를 사용합니다.
 *
 * MDN: https://developer.mozilla.org/ko/docs/Web/API/WebSocket
 */
console.log("1. WebSocket 연결 시도...");
// 'wss://echo.websocket.events/'는 테스트용 public WebSocket 서버로,
// 클라이언트가 보낸 메시지를 그대로 다시 보내줍니다(echo).
const socket = new WebSocket("wss://echo.websocket.events/");

// -----------------------------------------------------------------------------
// 2. WebSocket 이벤트 핸들러
// -----------------------------------------------------------------------------
/*
 * WebSocket의 상태 변화와 데이터 수신은 이벤트를 통해 처리됩니다.
 * - onopen: 연결이 성공적으로 수립되었을 때 호출됩니다.
 * - onmessage: 서버로부터 메시지를 수신했을 때 호출됩니다.
 * - onclose: 연결이 종료되었을 때 호출됩니다.
 * - onerror: 에러가 발생했을 때 호출됩니다.
 */
console.log("\n2. WebSocket 이벤트 핸들러 설정");

socket.onopen = function (event) {
  console.log("  - (onopen) WebSocket 연결 성공:", event);
  socket.send("안녕하세요, WebSocket!");
};

socket.onmessage = function (event) {
  console.log(`  - (onmessage) 서버로부터 메시지 수신: "${event.data}"`);
  // 5초 후 연결을 종료합니다.
  setTimeout(() => socket.close(1000, "작업 완료"), 5000);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    console.log(`  - (onclose) WebSocket 연결이 정상적으로 종료되었습니다. 코드: ${event.code}, 이유: ${event.reason}`);
  } else {
    console.error(`  - (onclose) WebSocket 연결이 비정상적으로 끊어졌습니다. 코드: ${event.code}`);
  }
};

socket.onerror = function (error) {
  console.error("  - (onerror) WebSocket 에러 발생:", error);
};

// -----------------------------------------------------------------------------
// 3. WebSocket의 상태 (readyState)
// -----------------------------------------------------------------------------
/*
 * WebSocket 객체는 현재 연결 상태를 나타내는 readyState 속성을 가집니다.
 * - WebSocket.CONNECTING (0): 연결 중입니다.
 * - WebSocket.OPEN (1): 연결이 수립되어 데이터를 주고받을 수 있습니다.
 * - WebSocket.CLOSING (2): 연결 종료 중입니다.
 * - WebSocket.CLOSED (3): 연결이 종료되었거나 실패했습니다.
 */
function logReadyState() {
  let state = "";
  switch (socket.readyState) {
    case WebSocket.CONNECTING: state = "CONNECTING"; break;
    case WebSocket.OPEN: state = "OPEN"; break;
    case WebSocket.CLOSING: state = "CLOSING"; break;
    case WebSocket.CLOSED: state = "CLOSED"; break;
    default: state = "UNKNOWN"; break;
  }
  console.log(`  - 현재 readyState: ${state} (${socket.readyState})`);
}

console.log("\n3. WebSocket의 현재 상태(readyState) 확인");
logReadyState(); // 스크립트 실행 시점 (주로 CONNECTING)
setTimeout(logReadyState, 1000); // 1초 후 (주로 OPEN)
setTimeout(logReadyState, 6000); // 6초 후 (주로 CLOSED) 