/**
 * @fileoverview DOM(Document Object Model)을 JavaScript로 조작하는 다양한 방법을 학습합니다.
 * 이 스크립트의 각 섹션은 'javascript_dom_manipulation.html' 파일의 각 실습장과 대응됩니다.
 * 사용자는 이 스크립트 코드를 참조하여 HTML 페이지의 개발자 도구 콘솔에서 직접 실행해볼 수 있습니다.
 * @see https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model
 * @see https://javascript.info/document
 */

/*
 * DOM (Document Object Model) 이란?
 * 브라우저가 HTML 문서를 읽고, 그것을 JavaScript가 조작할 수 있도록 객체 모델로 변환한 것입니다.
 * 문서는 'document' 객체로 표현되며, 모든 HTML 요소, 속성, 텍스트는 이 객체의 일부가 됩니다.
 * 
 * DOM 트리 (DOM Tree)
 * DOM은 문서를 논리적인 트리 구조로 표현합니다. 각 HTML 태그는 '요소 노드', 텍스트는 '텍스트 노드'가 되어
 * 부모-자식 관계를 형성합니다. JavaScript는 이 노드들을 탐색하고 수정함으로써 웹 페이지를 동적으로 변경합니다.
 */

// DOMContentLoaded 이벤트는 브라우저가 HTML 문서를 모두 읽고 파싱하여 DOM 트리를 완성했을 때 발생합니다.
// 스크립트가 DOM 요소보다 먼저 실행되어 요소를 찾지 못하는 문제를 방지하기 위해 이 이벤트 리스너 내부에 코드를 작성하는 것이 안전합니다.
document.addEventListener('DOMContentLoaded', () => {
  console.log("--- JavaScript DOM 조작 실습 ---");
  console.log("이 스크립트의 각 코드 블록을 개발자 도구 콘솔에서 실행해보세요.");

  // ---------------------------------------------------------------------------
  // 1. 요소 선택 (Selecting Elements)
  // ---------------------------------------------------------------------------
  // getElementsByClassName은 '살아있는(live)' HTMLCollection을 반환합니다.
  // 이는 DOM이 변경되면 자동으로 업데이트되지만, forEach 메서드를 쓸 수 없습니다.
  // querySelectorAll은 '정적(static)' NodeList를 반환합니다.
  // 선택된 시점의 상태를 유지하며, forEach를 사용할 수 있어 다루기 편리합니다.
  console.log("\n1. 요소 선택:");
  const title1 = document.getElementById('title-1');
  const contentTexts1 = document.getElementsByClassName('content-text-1');
  const title1_qs = document.querySelector('#title-1');
  const contentTexts1_qs = document.querySelectorAll('.content-text-1');
  console.log({ title1, contentTexts1, title1_qs, contentTexts1_qs });

  // ---------------------------------------------------------------------------
  // 2. 내용 변경 (Changing Content)
  // ---------------------------------------------------------------------------
  // textContent는 순수 텍스트만 다루므로 속도가 빠르고 XSS(Cross-Site Scripting) 공격으로부터 안전합니다.
  // innerHTML은 HTML 문자열을 파싱하고 DOM을 재구성하므로 상대적으로 느리고,
  // 신뢰할 수 없는 외부 데이터와 함께 사용하면 보안 취약점이 생길 수 있습니다.
  console.log("\n2. 내용 변경:");
  const title2 = document.getElementById('title-2');
  if(title2) title2.textContent = '콘솔로 변경한 새로운 제목!';
  const container2 = document.getElementById('container-2');
  if(container2) container2.innerHTML = '<p>innerHTML로 추가된 문단</p>';
  console.log("  - 2번 실습장 내용 변경 완료.");

  // ---------------------------------------------------------------------------
  // 3. 속성 변경 (Manipulating Attributes)
  // ---------------------------------------------------------------------------
  // HTML 속성(attribute)과 DOM 프로퍼티(property)는 다릅니다.
  // attribute는 HTML 문서에 정의된 초기 값이며, property는 DOM 객체가 가진 현재 값입니다.
  // setAttribute는 attribute를 직접 조작하며, element.id와 같은 접근은 property를 조작합니다.
  // 대부분의 표준 속성은 서로 동기화되지만, 비표준 속성이나 값의 타입에서 차이가 있을 수 있습니다.
  console.log("\n3. 속성 변경:");
  const btn3 = document.getElementById('btn-3');
  if (btn3) {
    btn3.setAttribute('data-action', 'changed-by-console');
    btn3.id = 'new-btn-3';
  }
  console.log("  - 3번 실습장 버튼 속성 변경 완료. 새 ID: new-btn-3");
  
  // ---------------------------------------------------------------------------
  // 4. 스타일 변경 (Manipulating Styles)
  // ---------------------------------------------------------------------------
  // element.style은 요소의 '인라인 스타일'을 직접 수정합니다.
  // 인라인 스타일은 CSS 규칙에서 가장 높은 우선순위(specificity)를 가지므로 다른 스타일을 덮어쓰기 쉽습니다.
  // 하지만 유지보수가 어렵기 때문에, 일반적으로 classList를 통해 CSS 클래스를 제어하는 방식이 권장됩니다.
  console.log("\n4. 스타일 변경:");
  const div4 = document.getElementById('div-4');
  if (div4) {
    div4.style.color = 'white';
    div4.style.backgroundColor = 'indigo';
    div4.classList.add('title-highlight');
    div4.classList.toggle('title-active');
  }
  console.log("  - 4번 실습장 스타일 변경 완료.");

  // ---------------------------------------------------------------------------
  // 5. 새로운 요소 생성 및 추가 (Creating and Adding Elements)
  // ---------------------------------------------------------------------------
  // 여러 요소를 반복해서 추가할 때는 DOM 조작 횟수를 최소화하는 것이 성능에 중요합니다.
  // DocumentFragment는 실제 DOM의 일부가 아닌 가상의 컨테이너입니다.
  // 여기에 여러 요소를 추가한 뒤, 최종적으로 DocumentFragment를 실제 DOM에 한 번만 추가하면
  // 리플로우(reflow)와 리페인트(repaint)를 최소화하여 성능을 향상시킬 수 있습니다.
  console.log("\n5. 새로운 요소 생성 및 추가:");
  // 단일 요소 추가
  const newP = document.createElement('p');
  newP.textContent = '이것은 JS 파일 실행으로 추가된 문단입니다.';
  const container5 = document.getElementById('container-5');
  if (container5) {
    container5.appendChild(newP);
  }
  // DocumentFragment를 사용한 여러 요소 추가
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 3; i++) {
    const li = document.createElement('li');
    li.textContent = `Fragment 아이템 ${i + 1}`;
    fragment.appendChild(li);
  }
  if (container5) {
      container5.appendChild(fragment);
  }
  console.log("  - 5번 실습장에 요소들 추가 완료.");

  // ---------------------------------------------------------------------------
  // 6. 요소 제거 (Removing Elements)
  // ---------------------------------------------------------------------------
  // 요소를 DOM에서 제거하면, 해당 요소에 연결된 모든 자식 요소와 이벤트 리스너도 함께 제거됩니다.
  // 이는 메모리 누수를 방지하는 데 도움이 됩니다.
  console.log("\n6. 요소 제거:");
  const pToRemove6 = document.getElementById('p-to-remove-6');
  pToRemove6?.remove();
  console.log("  - 6번 실습장 문단 제거 완료.");
  
  // ---------------------------------------------------------------------------
  // 7. 이벤트 처리 (Event Handling)
  // ---------------------------------------------------------------------------
  // addEventListener에 전달하는 함수를 '이벤트 핸들러' 또는 '콜백 함수'라고 부릅니다.
  // 이 함수는 특정 이벤트가 발생했을 때 호출되며, 첫 번째 인자로 이벤트에 대한
  // 상세 정보가 담긴 Event 객체(e.g., event.target, event.key)를 받을 수 있습니다.
  console.log("\n7. 이벤트 처리: 이벤트 리스너 등록.");
  const btn7 = document.getElementById('btn-7');
  const p7 = document.getElementById('p-for-event-7');
  if(btn7 && p7) {
    btn7.addEventListener('click', (event) => {
        p7.textContent = `버튼이 클릭되었습니다! (타겟: ${event.target.tagName})`;
    });
  }
  console.log("  - 7번 실습장 버튼에 클릭 이벤트 추가 완료.");

  // ---------------------------------------------------------------------------
  // 8. 요소 목록 순회 (Iterating Over Element Lists)
  // ---------------------------------------------------------------------------
  console.log("\n8. 요소 목록 순회:");
  // for...of 반복문은 HTMLCollection, NodeList 등 '반복 가능한(iterable)' 객체를 모두 순회할 수 있어 범용적입니다.
  const itemsForOf = document.querySelectorAll('.p-iterate-8');
  for (const item of itemsForOf) {
      item.style.fontWeight = 'bold'; // 글씨를 굵게
  }
  console.log("  - for...of로 순회하며 스타일 변경 완료.");

  // forEach는 NodeList에서는 바로 사용할 수 있지만, getElementsByClassName이 반환하는 HTMLCollection에서는 바로 쓸 수 없습니다.
  const itemsForEach = document.querySelectorAll('.p-iterate-8');
  itemsForEach.forEach((item, index) => {
      item.style.color = 'green';
      item.textContent = `${index + 1}번째 항목 (forEach 순회)`;
  });
  console.log("  - NodeList.forEach()로 순회하며 내용 변경 완료.");

  // Array.from()을 사용하면 HTMLCollection처럼 배열이 아닌 객체를 실제 배열로 변환할 수 있습니다.
  // 그 후에는 map, filter, forEach 등 모든 배열 메서드를 자유롭게 사용할 수 있습니다.
  const itemsHtmlCollection = document.getElementsByClassName('p-iterate-8');
  Array.from(itemsHtmlCollection).forEach(item => {
      item.style.border = '1px solid blue';
  });
  console.log("  - Array.from()으로 변환 후 forEach로 순회하며 테두리 추가 완료.");
}); 