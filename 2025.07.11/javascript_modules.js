/**
 * @fileoverview JavaScript의 모듈(Module) 시스템에 대해 설명하는 예제 파일입니다.
 * ES6(ECMAScript 2015)에서 도입된 모듈 시스템은 코드를 재사용 가능한 조각으로 구성하고,
 * 전역 스코프의 오염을 방지하며, 의존성을 명확하게 관리할 수 있도록 돕습니다.
 *
 * 참고: 이 파일 자체는 Node.js나 웹 브라우저의 모듈 로더 없이는 직접 실행되지 않습니다.
 *       아래 코드는 여러 파일에 나뉘어 있다고 가정하고 작성되었습니다.
 */

console.log("--- JavaScript ES6 모듈 시스템 ---");

// =============================================================================
// 가상의 파일 1: `math.js`
// =============================================================================
/*
// -- math.js 파일 내용 시작 --

// 1. 이름 있는 내보내기 (Named Exports)
// `export` 키워드를 사용하여 변수, 함수, 클래스를 개별적으로 내보낼 수 있습니다.
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export class Calculator {
  constructor() {
    console.log("계산기 인스턴스가 생성되었습니다.");
  }
  multiply(a, b) {
    return a * b;
  }
}

// -- math.js 파일 내용 끝 --
*/

// =============================================================================
// 가상의 파일 2: `logger.js`
// =============================================================================
/*
// -- logger.js 파일 내용 시작 --

// 2. 기본 내보내기 (Default Export)
// 모듈에서 단 하나의 값만 내보내고 싶을 때 사용합니다. 파일 당 한 번만 사용할 수 있습니다.
// `export default` 뒤에는 변수 이름이 없어도 됩니다 (익명으로 내보내기 가능).

export default function log(message) {
  console.log(`[LOG] ${new Date().toLocaleTimeString()}: ${message}`);
}

// -- logger.js 파일 내용 끝 --
*/

// =============================================================================
// 가상의 파일 3: `main.js` (현재 파일이라고 가정)
// =============================================================================
/*
// -- main.js 파일 내용 시작 --

// 3. 모듈 가져오기 (Importing Modules)
// `import` 키워드를 사용하여 다른 모듈에서 내보낸 기능을 가져옵니다.

// 3.1 이름 있는 가져오기 (Named Imports)
// 중괄호 `{}` 안에 가져올 기능의 이름을 명시합니다.
// `as` 키워드를 사용하여 이름을 변경해서 가져올 수 있습니다.
import { PI, add as sum, Calculator } from './math.js';

// 3.2 기본 가져오기 (Default Import)
// 중괄호 없이 원하는 변수 이름으로 가져올 수 있습니다.
import printLog from './logger.js';

// 3.3 모듈 전체 가져오기 (Importing all from a module)
// `* as` 구문을 사용하여 모듈의 모든 named export를 하나의 객체로 가져올 수 있습니다.
import * as mathUtils from './math.js';


// --- 모듈 사용 예제 ---
console.log("\n1. 이름 있는 가져오기 사용:");
console.log("  - PI 값:", PI);
console.log("  - add 함수 (as sum):", sum(5, 3));
const calc = new Calculator();
console.log("  - Calculator 클래스:", calc.multiply(4, 5));

console.log("\n2. 기본 가져오기 사용:");
printLog("애플리케이션이 시작되었습니다.");

console.log("\n3. 전체 가져오기 사용:");
console.log("  - mathUtils.PI:", mathUtils.PI);
console.log("  - mathUtils.add:", mathUtils.add(10, 20));


// -- main.js 파일 내용 끝 --
*/

console.log(`
위 주석 처리된 코드는 JavaScript의 모듈 시스템이 동작하는 방식을 보여줍니다.
- \`export\`를 사용하여 기능을 내보냅니다 (named/default).
- \`import\`를 사용하여 다른 파일에서 내보낸 기능을 가져옵니다.
- 이 시스템을 사용하려면 HTML 파일에서 <script type="module" src="main.js"></script>와 같이
  타입을 "module"로 지정하거나, Node.js 환경을 사용해야 합니다.
`);
