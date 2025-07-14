/**
 * @fileoverview JavaScript를 사용한 롱 폴링(Long Polling) 기법을 설명하는 예제입니다.
 * 롱 폴링은 클라이언트가 서버에 요청을 보내고, 서버는 새로운 데이터가 있을 때까지 응답을 지연시키는 방식입니다.
 * 데이터가 생기면 서버는 응답을 보내고, 클라이언트는 응답을 받자마자 즉시 다음 요청을 보냅니다.
 * 이를 통해 실시간에 가까운 데이터 통신을 HTTP를 통해 흉내 낼 수 있습니다.
 * WebSocket이 지원되지 않는 환경에서 실시간 통신을 구현하기 위한 대안으로 사용될 수 있습니다.
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/XMLHttpRequest
 */

// -----------------------------------------------------------------------------
// 1. Long Polling의 동작 원리
// -----------------------------------------------------------------------------
/*
 * 1. 클라이언트가 서버에 데이터를 요청합니다.
 * 2. 서버는 즉시 응답하지 않고, 연결을 열어둔 상태로 대기합니다.
 * 3. 서버에서 새로운 이벤트(예: 새 메시지, 데이터 업데이트)가 발생하면, 해당 데이터를 담아 클라이언트에 응답합니다.
 * 4. 클라이언트는 응답을 받으면 데이터를 처리하고, 즉시 서버에 새로운 요청을 보내 1번 과정부터 다시 시작합니다.
 * 5. 만약 정해진 타임아웃 시간 동안 아무런 이벤트가 없으면, 서버는 타임아웃 상태를 알리는 응답을 보냅니다.
 *    클라이언트는 이 응답을 받고 즉시 다시 요청을 보냅니다.
 */

// -----------------------------------------------------------------------------
// 2. 클라이언트 측 구현 예시 (Client-Side Implementation)
// -----------------------------------------------------------------------------
/*
 * 여기서는 Fetch API와 재귀적 async 함수를 사용하여 Long Polling을 구현합니다.
 * 실제 프로덕션에서는 예기치 않은 에러나 네트워크 중단에 대비한 더 정교한 에러 처리 로직이 필요합니다.
 * 아래 코드는 실제 동작하는 서버 엔드포인트가 없으므로 개념 이해용으로 참고해 주세요.
 */
console.log("2. Long Polling 클라이언트 구현 예시");

async function subscribe() {
  console.log("  - 서버에 구독 요청을 보냅니다...");
  try {
    const response = await fetch("/subscribe"); // '/subscribe' 엔드포인트는 응답을 지연시킴
    if (response.status === 502) {
      // 서버 타임아웃
      console.log("  - 서버 타임아웃, 즉시 재구독합니다.");
      await subscribe();
    } else if (response.status !== 200) {
      // 기타 에러
      console.error(`  - 에러 발생: ${response.statusText}. 1초 후 재시도합니다.`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      await subscribe();
    } else {
      // 성공적으로 데이터를 받은 경우
      const message = await response.text();
      console.log("  - 새로운 메시지 수신:", message);
      await subscribe(); // 즉시 재구독
    }
  } catch (e) {
    // 네트워크 에러
    console.log("  - 네트워크 에러. 5초 후 재연결을 시도합니다.");
    await new Promise(resolve => setTimeout(resolve, 5000));
    await subscribe();
  }
}
// 실제 환경에서는 아래 주석을 해제하여 실행합니다.
// subscribe();

// -----------------------------------------------------------------------------
// 3. 서버 측 구현 개념 (Node.js/Express)
// -----------------------------------------------------------------------------
/*
 * 아래는 Node.js와 Express를 사용한 Long Polling 서버의 개념적인 코드입니다.
 * 실제로는 EventEmitter나 메시지 큐(예: Redis Pub/Sub)를 사용하여
 * 이벤트 발생을 효율적으로 처리하는 것이 일반적입니다.
 */
/*
  const express = require('express');
  const app = express();
  const events = require('events');

  const emitter = new events.EventEmitter();

  app.get('/subscribe', (req, res) => {
    emitter.once('newMessage', (message) => {
      res.json(message);
    });
  });

  app.post('/publish', express.json(), (req, res) => {
    emitter.emit('newMessage', req.body);
    res.status(204).end();
  });

  app.listen(3000, () => {
    console.log('Long Polling 서버가 3000번 포트에서 실행 중입니다.');
  });
*/
console.log("\n3. 서버 측 코드는 Node.js 환경에서 실행되어야 하는 개념 예시입니다."); 