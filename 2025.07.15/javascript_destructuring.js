/**
 * @fileoverview JavaScript의 강력한 문법인 '구조 분해 할당(Destructuring)'을 학습합니다.
 * 이 스크립트는 'javascript_destructuring.html' 파일과 함께 동작하며,
 * 각 섹션은 HTML의 실습 예제와 대응됩니다.
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 */

// DOMContentLoaded 이벤트는 브라우저가 HTML 문서를 모두 읽고 파싱하여
// DOM 트리를 완성했을 때 발생합니다. 스크립트가 DOM 요소보다 먼저 실행되어
// 요소를 찾지 못하는 문제를 방지하기 위해 이 이벤트 리스너 내부에 코드를 작성하는 것이 안전합니다.
document.addEventListener("DOMContentLoaded", () => {
  /**
   * 결과를 화면의 pre 태그와 브라우저 콘솔에 동시에 출력하는 헬퍼 함수입니다.
   * @param {string} elementId - 출력을 표시할 pre 태그의 ID
   * @param {...any} args - 출력할 데이터 (여러 개 전달 가능)
   */
  function printResult(elementId, ...args) {
    const outputElement = document.getElementById(elementId);
    if (!outputElement) {
      console.error(`${elementId} 요소를 찾을 수 없습니다.`);
      return;
    }
    const displayText = args
      .map((arg) =>
        typeof arg === "object" && arg !== null
          ? JSON.stringify(arg, null, 2)
          : String(arg),
      )
      .join("\n");
    outputElement.textContent = displayText;
    console.log(`--- ${elementId} 결과 ---`);
    args.forEach((arg) => console.log(arg));
  }

  // ---------------------------------------------------------------------------
  // 1.1. 배열 구조 분해 (Array Destructuring)
  // ---------------------------------------------------------------------------
  // 개념: 배열의 요소를 순서대로 변수에 할당하는 문법입니다.
  //       마치 줄 서 있는 순서대로 값을 나누어주는 것과 같습니다.
  //       배열의 인덱스에 의존하므로, 변수의 순서가 매우 중요합니다.
  document
    .getElementById("runArrayDestructuring")
    .addEventListener("click", () => {
      const fruits = ["🍎 사과", "🍌 바나나", "🍇 포도"];

      // fruits 배열의 0, 1, 2 인덱스에 있는 값이
      // 각각 apple, banana, grape 변수에 순서대로 할당됩니다.
      const [apple, banana, grape] = fruits;

      printResult(
        "outputArrayDestructuring",
        `apple: ${apple}`,
        `banana: ${banana}`,
        `grape: ${grape}`,
      );
    });

  // ---------------------------------------------------------------------------
  // 1.2. 객체 구조 분해 (Object Destructuring)
  // ---------------------------------------------------------------------------
  // 개념: 객체의 속성(key)을 기준으로 값을 변수에 할당합니다.
  //       순서가 아닌 속성 이름(key)이 일치하는 것이 중요합니다.
  //       { key: 변수 } 형태로 값을 꺼내며, 변수 이름이 key와 같다면 단축해서 { key }로 쓸 수 있습니다.
  document
    .getElementById("runObjectDestructuring")
    .addEventListener("click", () => {
      const person = {
        name: "홍길동",
        age: 30,
        job: "개발자",
      };

      // person 객체의 name, age 속성(key)에 해당하는 값이
      // 동일한 이름의 변수 name, age에 할당됩니다.
      // job 속성은 선택하지 않았으므로 변수로 만들어지지 않습니다.
      const { name, age } = person;

      printResult("outputObjectDestructuring", `name: ${name}`, `age: ${age}`);
    });

  // ---------------------------------------------------------------------------
  // 1.3. 변수 이름 변경 및 기본값 할당 (Renaming & Default Values)
  // ---------------------------------------------------------------------------
  // 활용: 구조 분해를 할 때, 원래 속성 이름이 아닌 새로운 변수 이름을 사용하거나,
  //       값이 없는 경우(undefined)를 대비해 기본값을 지정할 수 있습니다.
  // 문법:
  // - 이름 변경: { 원래Key: 새로운변수명 }
  // - 기본값 할당: { key = 기본값 }
  // - 둘 다 사용: { 원래Key: 새로운변수명 = 기본값 }
  document
    .getElementById("runRenameDestructuring")
    .addEventListener("click", () => {
      const user = {
        id: "user123",
        nickname: "Gildong",
      };

      // user.id 값을 loginId 라는 새로운 변수 이름으로 받습니다.
      // user.nickname 값을 nickname 변수로 받습니다.
      // user 객체에 email 속성이 없으므로, 기본값 '이메일 없음'이 email 변수에 할당됩니다.
      const { id: loginId, nickname, email = "이메일 없음" } = user;

      printResult(
        "outputRenameDestructuring",
        `loginId: ${loginId}`,
        `nickname: ${nickname}`,
        `email: ${email}`,
      );
    });

  // ---------------------------------------------------------------------------
  // 1.4. 함수 매개변수에서의 구조 분해 (Function Parameter Destructuring)
  // ---------------------------------------------------------------------------
  // 활용: 함수에 객체를 전달할 때, 함수 정의 부분에서 바로 구조 분해를 사용하면
  //       객체 내부의 필요한 속성만 즉시 변수로 사용할 수 있어 매우 편리합니다.
  //       코드의 가독성을 높이고, 객체 전체를 받을 필요 없이 필요한 부분만 명시적으로 사용할 수 있습니다.
  document
    .getElementById("runFuncParamDestructuring")
    .addEventListener("click", () => {
      const book = {
        title: "모던 JavaScript",
        author: "이몽룡",
        price: 30000,
      };

      // book 객체를 통째로 받는 대신, 매개변수 위치에서
      // { title, author }를 사용하여 필요한 속성만 바로 추출합니다.
      function printBookInfo({ title, author }) {
        // 함수 본문에서는 이미 title, author 변수를 바로 사용할 수 있습니다.
        // props.title, props.author 같은 접근이 필요 없습니다.
        return `책 제목: ${title}, 저자: ${author}`;
      }

      const result = printBookInfo(book);
      printResult("outputFuncParamDestructuring", result);
    });
});
