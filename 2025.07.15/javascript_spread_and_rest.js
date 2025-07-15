/**
 * @fileoverview JavaScript의 Spread(펼치기)와 Rest(나머지) 문법을 학습합니다.
 * 이 두 문법은 동일하게 세 개의 점(...)을 사용하지만, 사용되는 위치에 따라 완전히 반대의 역할을 합니다.
 * 이 스크립트는 'javascript_spread_and_rest.html' 파일과 함께 동작합니다.
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/rest_parameters
 */

document.addEventListener('DOMContentLoaded', () => {
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
        typeof arg === 'object' && arg !== null ?
        JSON.stringify(arg, null, 2) :
        String(arg)
      )
      .join('\n');
    outputElement.textContent = displayText;
    console.log(`--- ${elementId} 결과 ---`);
    args.forEach((arg) => console.log(arg));
  }

  // =========================================================================
  // 1. 펼치기 문법 (Spread Syntax)
  // =========================================================================
  // 개념: 배열이나 객체와 같이 묶여있는 데이터를 개별 요소로 펼쳐주는 역할.
  //       주로 배열이나 객체를 복사하거나 합칠 때, 또는 함수 인자를 전달할 때 사용됩니다.
  //       불변성을 유지하며 작업할 수 있게 도와주는 핵심 문법입니다.
  //       '...'가 할당(=)의 오른쪽이나 함수 호출 시 인자로 사용되면 '펼치기(Spread)' 입니다.

  // 1.1. 배열 펼치기
  document.getElementById('runArraySpread').addEventListener('click', () => {
    const groupA = ['철수', '영희'];
    const groupB = ['민준'];

    // ...groupA는 ['철수', '영희']를 '철수', '영희'로 펼쳐줍니다.
    // 그 결과, newGroup은 ['철수', '영희', '새 멤버', '민준'] 이라는 새로운 배열이 됩니다.
    // 원본인 groupA, groupB 배열은 전혀 변경되지 않습니다 (불변성).
    const newGroup = [...groupA, '새 멤버', ...groupB];
    printResult('outputArraySpread', '새로운 그룹:', newGroup);
  });

  // 1.2. 객체 펼치기
  document.getElementById('runObjectSpread').addEventListener('click', () => {
    const userProfile = {
      name: '성춘향',
      age: 25,
    };
    const userDetails = {
      job: '디자이너',
      city: '서울',
    };

    // ...userProfile은 userProfile 객체의 모든 속성을 가져와 펼쳐놓습니다.
    // 여러 객체를 펼칠 때 동일한 속성(key)이 있으면, 가장 마지막에 위치한 값으로 덮어씌워집니다.
    // 여기서는 age: 25가 먼저 설정된 후, age: 26으로 덮어씌워집니다.
    const mergedUser = {
      ...userProfile,
      ...userDetails,
      age: 26
    };
    printResult('outputObjectSpread', '병합된 사용자 정보:', mergedUser);
  });

  // =========================================================================
  // 2. 나머지 매개변수 & 속성 (Rest Parameters & Properties)
  // =========================================================================
  // 개념: 펼치기와 정반대로, 흩어져 있는 여러 항목들을 하나의 배열이나 객체로 '모아주는' 역할.
  //       주로 함수의 매개변수나 구조 분해 할당에서 사용됩니다.
  //       '...'가 함수 정의의 매개변수 목록이나 할당(=)의 왼쪽에 있으면 '모으기(Rest)' 입니다.

  // 2.1. 함수에서의 나머지 매개변수
  document.getElementById('runFuncRest').addEventListener('click', () => {
    // captain 매개변수는 첫 번째 인자('김연아')를 받습니다.
    // ...members는 그 이후의 '나머지 모든' 인자들을 members라는 '배열'로 모아줍니다.
    // members -> ['이상화', '박태환', '손흥민']
    function formTeam(captain, ...members) {
      const teamInfo = {
        주장: captain,
        팀원들: members,
        '총 인원': `${1 + members.length}명`,
      };
      printResult('outputFuncRest', teamInfo);
    }

    formTeam('김연아', '이상화', '박태환', '손흥민');
  });

  // 2.2. 구조 분해에서의 나머지 속성
  document
    .getElementById('runDestructuringRest')
    .addEventListener('click', () => {
      const book = {
        id: 'bk-101',
        title: '프론트엔드 개발 필독서',
        author: '김코딩',
        publicationYear: 2025,
      };

      // 객체 구조 분해 시, id 속성은 id 변수에 할당됩니다.
      // ...otherDetails는 id를 제외한 '나머지 모든' 속성들을
      // otherDetails라는 새로운 '객체'로 모아줍니다.
      const {
        id,
        ...otherDetails
      } = book;

      printResult(
        'outputDestructuringRest',
        `추출된 id: ${id}`,
        '나머지 정보 (otherDetails):',
        otherDetails
      );
    });
});