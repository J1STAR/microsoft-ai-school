/**
 * @file todo.localstorage.repository.js
 * @description
 * 이 파일은 TodoRepository 인터페이스의 LocalStorage 기반 구현체입니다.
 * 브라우저의 LocalStorage API를 사용하여 'todo' 데이터를 영구적으로 저장하고 관리합니다.
 * 이 구현체는 간단한 클라이언트 사이드 저장소 솔루션으로,
 * 서버 없이도 데이터를 유지해야 할 때 유용합니다.
 */

import { Todo } from "../domain/Todo.js";

/**
 * LocalStorage에 'todo' 데이터를 저장할 때 사용할 키(key)입니다.
 * @type {string}
 */
const STORAGE_KEY = "todos-localstorage";

/**
 * 새로운 'todo' 항목에 할당할 고유 ID를 관리하는 인덱스 변수입니다.
 * LocalStorage에서 마지막으로 저장된 인덱스 값을 가져와 초기화합니다.
 * @type {number}
 */
let storageIdx = Number(localStorage.getItem(`${STORAGE_KEY}-idx`) || 0);

/**
 * LocalStorage에서 'todo' 목록을 가져와 JSON 객체로 파싱합니다.
 * 저장된 데이터가 없으면 빈 배열을 반환합니다.
 * @returns {Array<object>} LocalStorage에서 가져온 'todo' 데이터 배열입니다.
 */
const getTodosFromStorage = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

/**
 * 'todo' 목록을 JSON 문자열로 변환하여 LocalStorage에 저장합니다.
 * @param {Array<object>} todos - 저장할 'todo' 데이터 배열입니다.
 */
const saveTodosToStorage = (todos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    localStorage.setItem(`${STORAGE_KEY}-idx`, JSON.stringify(storageIdx));
};

/**
 * @typedef {import('./todo.repository.interface.js').TodoRepository} ITodoRepository
 */

/**
 * LocalStorage를 사용하여 'todo' 데이터를 관리하는 리포지토리입니다.
 * @implements {ITodoRepository}
 */
export const localStorageRepository = {
  /**
   * LocalStorage에 저장된 모든 'todo' 항목을 조회합니다.
   * 가져온 데이터를 Todo 도메인 객체로 변환하고, 최신순으로 정렬하여 반환합니다.
   * @returns {Promise<Todo[]>} 'todo' 객체의 배열을 resolve하는 Promise를 반환합니다.
   */
  async getTodos() {
    const todosData = getTodosFromStorage();
    // 원시 데이터를 Todo 클래스의 인스턴스로 변환합니다.
    const todos = todosData.map(t => new Todo(t.id, t.title, t.content, new Date(t.timestamp)));
    // 최신 항목이 먼저 오도록 정렬합니다.
    return Promise.resolve(todos.sort((a, b) => b.timestamp - a.timestamp));
  },

  /**
   * 새로운 'todo' 항목을 LocalStorage에 생성합니다.
   * @param {string} title - 'todo' 항목의 제목입니다.
   * @param {string} content - 'todo' 항목의 내용입니다.
   * @returns {Promise<Todo>} 생성된 'todo' 객체를 resolve하는 Promise를 반환합니다.
   */
  async createTodo(title, content) {
    const todos = getTodosFromStorage();
    const newId = storageIdx++; // 고유 ID를 생성하고 인덱스를 증가시킵니다.
    const todoData = {
      id: newId,
      title,
      content,
      timestamp: new Date().getTime(), // 현재 시간을 타임스탬프로 저장합니다.
    };
    todos.push(todoData);
    saveTodosToStorage(todos);
    
    // 생성된 데이터를 Todo 클래스의 인스턴스로 변환하여 반환합니다.
    const newTodo = new Todo(todoData.id, todoData.title, todoData.content, new Date(todoData.timestamp));
    return Promise.resolve(newTodo);
  },

  /**
   * 기존 'todo' 항목을 수정합니다.
   * @param {number|string} id - 수정할 'todo' 항목의 ID입니다.
   * @param {string} title - 새로운 제목입니다.
   * @param {string} content - 새로운 내용입니다.
   * @returns {Promise<Todo>} 수정된 'todo' 객체를 resolve하는 Promise를 반환합니다.
   */
  async updateTodo(id, title, content) {
    let todos = getTodosFromStorage();
    const todoIndex = todos.findIndex(t => t.id === Number(id));

    if (todoIndex === -1) {
        return Promise.reject(new Error(`Todo with id ${id} not found.`));
    }

    // 기존 데이터에 새로운 제목, 내용을 업데이트하고 타임스탬프를 갱신합니다.
    const todoData = {
        ...todos[todoIndex],
        title,
        content,
        timestamp: new Date().getTime(),
    };
    
    todos[todoIndex] = todoData;
    saveTodosToStorage(todos);
    
    // 업데이트된 데이터를 Todo 클래스의 인스턴스로 변환하여 반환합니다.
    const updatedTodo = new Todo(todoData.id, todoData.title, todoData.content, new Date(todoData.timestamp));
    return Promise.resolve(updatedTodo);
  },

  /**
   * 'todo' 항목을 LocalStorage에서 삭제합니다.
   * @param {number|string} id - 삭제할 'todo' 항목의 ID입니다.
   * @returns {Promise<boolean>} 삭제 성공 여부를 resolve하는 Promise를 반환합니다.
   */
  async deleteTodo(id) {
    let todos = getTodosFromStorage();
    const initialLength = todos.length;
    // 주어진 ID와 일치하지 않는 항목만 필터링하여 새로운 배열을 생성합니다.
    todos = todos.filter(t => t.id !== Number(id));

    // ID에 해당하는 항목이 없었다면 에러를 발생시킵니다.
    if (todos.length === initialLength) {
        return Promise.reject(new Error(`Todo with id ${id} not found.`));
    }

    saveTodosToStorage(todos);
    return Promise.resolve(true);
  },
}; 