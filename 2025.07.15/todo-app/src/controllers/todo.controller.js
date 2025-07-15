/**
 * @file todo.controller.js
 * @description
 * 이 파일은 UI(사용자 인터페이스)와 상호작용을 관리하는 컨트롤러 계층(Controller Layer)입니다.
 * 사용자의 입력을 받아 Service 계층에 처리를 요청하고,
 * Service 계층에서 받은 데이터를 사용하여 동적으로 HTML을 생성하고 화면을 업데이트합니다.
 *
 * 주요 역할:
 * - DOM 요소에 대한 이벤트 리스너 설정 (예: '추가' 버튼 클릭)
 * - 사용자 입력 값 가져오기 및 유효성 검사
 * - todoService를 호출하여 비즈니스 로직 실행 요청
 * - todoService로부터 받은 데이터로 할 일 목록(ul, li)을 동적으로 렌더링
 */

import { todoService } from "../services/todo.service.js";

/**
 * '추가' 버튼 클릭 시 호출되는 함수입니다.
 * 입력 필드에서 제목과 내용을 가져와 유효성을 검사한 후,
 * 'todoService'를 통해 새로운 'todo' 항목을 생성합니다.
 * 작업이 완료되면 목록을 새로고침하고 입력 필드를 초기화합니다.
 */
const addTodo = async () => {
  const todoTitleElement = document.getElementById("todo-title");
  const todoContentElement = document.getElementById("todo-content");

  const title = todoTitleElement.value.trim();
  const content = todoContentElement.value.trim();

  // 입력 값 유효성 검사
  if (!title || !content) {
    alert("제목과 내용을 모두 입력해주세요.");
    return;
  }

  try {
    await todoService.createTodo(title, content);
    await initializeTodos(); // 목록 새로고침
  } catch (error) {
    console.error("Failed to create todo:", error);
    alert("항목 추가에 실패했습니다.");
  }

  // 사용자 편의를 위해 입력 필드를 비우고 제목 필드에 포커스를 줍니다.
  todoTitleElement.value = "";
  todoContentElement.value = "";
  todoTitleElement.focus();
};

/**
 * '삭제' 버튼 클릭 시 호출되는 함수입니다.
 * 주어진 id에 해당하는 'todo' 항목을 todoService를 통해 삭제합니다.
 * 작업이 완료되면 목록을 새로고침합니다.
 * @param {number} id - 삭제할 'todo' 항목의 ID입니다.
 */
const deleteTodo = async (id) => {
  // 사용자에게 삭제 여부 확인
  if (!confirm(`ID ${id} 항목을 정말 삭제하시겠습니까?`)) {
    return;
  }

  try {
    await todoService.deleteTodo(id);
    await initializeTodos(); // 목록 새로고침
  } catch (error) {
    console.error("Failed to delete todo:", error);
    alert("항목 삭제에 실패했습니다.");
  }
};

// deleteTodo 함수를 window 객체에 할당하여 전역에서 접근 가능하게 만듭니다.
// 이 방법은 동적으로 생성된 HTML 요소의 onclick 속성에서 함수를 호출할 수 있게 해줍니다.
// 모던 JavaScript에서는 이벤트 위임(Event Delegation)을 사용하는 것이 더 권장되는 방식입니다.
window.deleteTodo = deleteTodo;

/**
 * 'todo' 목록을 초기화하고 화면에 렌더링하는 함수입니다.
 * 'todoService'에서 모든 'todo' 항목을 가져와 HTML 목록(li)으로 변환한 후,
 * 'todo-list' 요소에 삽입합니다.
 */
const initializeTodos = async () => {
  const todoListElement = document.getElementById("todo-list");

  // UI 요소가 존재하는지 확인합니다.
  if (!todoListElement) {
    console.error("UI element #todo-list not found!");
    return;
  }

  // 로딩 상태 표시
  todoListElement.innerHTML = "<p>목록을 불러오는 중...</p>";

  try {
    // 서비스 계층에서 모든 'todo' 목록을 가져옵니다.
    const todos = await todoService.getTodos();

    // 'todo' 항목이 없을 경우 메시지를 표시합니다.
    if (todos.length === 0) {
      todoListElement.innerHTML = "<p>표시할 TODO 목록이 없습니다.</p>";
      return;
    }

    // 'todo' 배열을 순회하며 각 항목을 HTML 문자열(li)로 변환합니다.
    const todoItems = todos
      .map(
        (todo) =>
          `<li>
            <div>
              <input type="checkbox" id="todo-${todo.id}" /> <strong>${todo.title}</strong>
              <div class="todo-${todo.id}-content">${todo.content}</div>
            </div>
            <div>
              <div class="todo-date">${new Date(todo.date).toLocaleString()}</div>

              <!-- '삭제' 버튼 클릭 시 전역으로 노출된 deleteTodo 함수를 호출합니다. -->
              <div>
                <button onclick="deleteTodo(${
                  todo.id
                })">
                삭제하기
                </button>
              </div>
            </div>
          </li>`,
      )
      .join(""); // 배열의 모든 항목을 하나의 문자열로 결합합니다.

    // 생성된 HTML을 ul 태그로 감싸서 'todo-list' 요소에 삽입합니다.
    todoListElement.innerHTML = `<ul>${todoItems}</ul>`;
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    todoListElement.innerHTML =
      "<p class='error'>TODO 목록을 불러오는 데 실패했습니다.</p>";
  }
};

/**
 * 시계를 초기화하고 1초마다 업데이트
 */
const initializeClock = () => {
  const clockElement = document.getElementById("clock");
  if (!clockElement) return;

  const updateClock = () => {
    clockElement.textContent = new Date().toLocaleTimeString("ko-KR");
  };
  updateClock();
  setInterval(updateClock, 1000);
};

/**
 * 리포지토리 선택 라디오 버튼의 상태를 초기화하고 이벤트 리스너를 설정
 */
const initializeRepoSelector = () => {
  const currentRepo = localStorage.getItem("repositoryType") || "indexeddb";
  const radioButtons = document.querySelectorAll('input[name="repo"]');

  radioButtons.forEach((radio) => {
    if (radio.value === currentRepo) {
      radio.checked = true;
    }
    radio.addEventListener("change", (event) => {
      localStorage.setItem("repositoryType", event.target.value);
      todoService.setRepositoryType(event.target.value);
      initializeTodos();
    });
  });
};

/**
 * UI를 초기화하고 이벤트 리스너를 설정하는 메인 함수입니다.
 * '추가' 버튼에 클릭 이벤트 리스너를 등록하고, 초기 'todo' 목록을 로드합니다.
 */
const initializeUI = () => {
  const addButton = document.getElementById("add-todo");
  if (addButton) {
    addButton.addEventListener("click", addTodo);
  }

  initializeClock();
  initializeRepoSelector();
  initializeTodos();
};

// HTML 문서의 로드가 완료되면 UI 초기화 함수를 실행합니다.
document.addEventListener("DOMContentLoaded", initializeUI);
