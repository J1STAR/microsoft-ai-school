/**
 * @fileoverview JavaScript에서 쿠키(Cookie)를 다루는 방법에 대해 설명하는 예제 파일입니다.
 * 쿠키는 서버가 사용자의 웹 브라우저에 전송하는 작은 데이터 조각으로,
 * 브라우저는 그 데이터를 저장해 두었다가 동일한 서버로 다음 요청을 보낼 때 함께 전송합니다.
 * 주로 세션 관리, 개인화, 사용자 추적 등에 사용됩니다.
 *
 * @see https://developer.mozilla.org/ko/docs/Web/API/Document/cookie
 */

console.log("--- JavaScript 쿠키(Cookie) 다루기 ---");

// -----------------------------------------------------------------------------
// 1. 쿠키 생성 및 수정 (Create & Update)
// -----------------------------------------------------------------------------
/*
 * document.cookie 속성에 "키=값" 형태의 문자열을 할당하여 쿠키를 생성하거나 수정합니다.
 * 쿠키는 여러 속성을 가질 수 있으며, 각 속성은 세미콜론(;)으로 구분합니다.
 * - `expires=날짜`: 쿠키의 만료일을 UTC 형식으로 지정합니다. 지정하지 않으면 세션 쿠키가 됩니다.
 * - `max-age=초`: 쿠키가 활성 상태를 유지할 시간을 초 단위로 지정합니다. `expires`보다 우선순위가 높습니다.
 * - `path=경로`: 쿠키가 유효한 디렉토리 경로를 지정합니다. 기본값은 현재 문서의 경로입니다.
 * - `domain=도메인`: 쿠키가 유효한 도메인을 지정합니다.
 * - `secure`: HTTPS 프로토콜을 통해서만 쿠키가 전송되도록 합니다.
 * - `samesite`: CSRF(Cross-Site Request Forgery) 공격을 방지하기 위한 속성입니다. (Strict, Lax, None)
 */
console.log("\n1. 쿠키 생성 및 수정:");

// 기본 쿠키 생성 (세션 쿠키: 브라우저가 닫히면 사라짐)
document.cookie = "username=JohnDoe";
console.log("  - 기본 쿠키 'username'을 생성했습니다.");

// 만료일(expires)과 경로(path)를 지정하여 쿠키 생성
const expiryDate = new Date();
expiryDate.setDate(expiryDate.getDate() + 7); // 7일 후 만료
document.cookie = `theme=dark; expires=${expiryDate.toUTCString()}; path=/`;
console.log("  - 만료일과 경로를 가진 쿠키 'theme'를 생성했습니다.");

// max-age를 사용하여 1시간 동안 유효한 쿠키 생성
document.cookie = "sessionToken=abc12345; max-age=3600; path=/"; // 3600초 = 1시간
console.log("  - max-age를 가진 쿠키 'sessionToken'을 생성했습니다.");

// 쿠키 수정 (같은 키로 다시 할당)
document.cookie = "username=JaneSmith; path=/";
console.log("  - 쿠키 'username'의 값을 'JaneSmith'로 수정했습니다.");


// -----------------------------------------------------------------------------
// 2. 쿠키 읽기 (Read)
// -----------------------------------------------------------------------------
/*
 * document.cookie는 '키=값; 키2=값2; ...' 형태의 단일 문자열로 모든 쿠키를 반환합니다.
 * 특정 쿠키의 값을 얻으려면 이 문자열을 파싱하는 함수를 만들어 사용하는 것이 편리합니다.
 */
console.log("\n2. 쿠키 읽기:");

function getCookie(name) {
  const cookies = document.cookie.split(';'); // 모든 쿠키를 배열로 변환
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      // 디코딩하여 원래 값 반환
      return decodeURIComponent(cookieValue);
    }
  }
  return null; // 해당 이름의 쿠키가 없으면 null 반환
}

const username = getCookie("username");
const theme = getCookie("theme");
console.log(`  - 'username' 쿠키 값: ${username}`);
console.log(`  - 'theme' 쿠키 값: ${theme}`);
console.log(`  - 존재하지 않는 쿠키 'lang': ${getCookie('lang')}`);

// 인코딩된 쿠키 값 읽기
document.cookie = `greeting=${encodeURIComponent("안녕하세요!")}`;
const greeting = getCookie("greeting");
console.log(`  - 인코딩된 'greeting' 쿠키 값: ${greeting}`);


// -----------------------------------------------------------------------------
// 3. 쿠키 삭제 (Delete)
// -----------------------------------------------------------------------------
/*
 * 쿠키를 삭제하는 직접적인 메서드는 없습니다.
 * 대신, 쿠키의 만료일을 과거 날짜로 설정하여 브라우저가 즉시 삭제하도록 만듭니다.
 * 삭제하려는 쿠키의 `path`와 `domain`이 생성 시의 값과 일치해야 정확히 삭제됩니다.
 */
console.log("\n3. 쿠키 삭제:");

function deleteCookie(name, path = '/') {
  // 만료일을 과거로 설정하고, 경로를 명시하여 쿠키 삭제
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
}

// 'theme' 쿠키 삭제
deleteCookie('theme', '/');
console.log("  - 'theme' 쿠키를 삭제했습니다.");
console.log(`  - 삭제 후 'theme' 쿠키 값: ${getCookie('theme')}`);

// 'sessionToken' 쿠키 삭제
deleteCookie('sessionToken', '/');
console.log("  - 'sessionToken' 쿠키를 삭제했습니다.");
console.log(`  - 삭제 후 'sessionToken' 쿠키 값: ${getCookie('sessionToken')}`);

console.log("\n현재 document.cookie 값:", document.cookie); 