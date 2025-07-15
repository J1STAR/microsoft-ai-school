/**
 * @file todo.service.js
 * @description
 * 이 파일은 애플리케이션의 비즈니스 로직을 처리하는 서비스 계층(Service Layer)입니다.
 * 컨트롤러(Controller)로부터의 요청을 받아 데이터 레포지토리(Repository)와 상호작용하여
 * 필요한 데이터 처리 및 비즈니스 규칙을 적용합니다.
 *
 * 현재는 레포지토리의 함수를 그대로 호출하는 간단한 구조이지만,
 * 향후 복잡한 비즈니스 로직(예: 데이터 검증, 조합, 외부 API 호출 등)이 추가될 수 있는 확장 지점입니다.
 */

import { getRepository } from "../repositories/repository.factory.js";

/**
 * 사용할 리포지토리의 타입을 결정합니다.
 * localStorage에 저장된 값이 있으면 그 값을 사용하고, 없으면 'indexeddb'를 기본값으로 사용합니다.
 * @type {'indexeddb' | 'localstorage'}
 */
let repositoryType = localStorage.getItem("repositoryType") || "indexeddb";

/**
 * 현재 선택된 리포지토리 타입에 맞는 리포지토리 인스턴스입니다.
 * getRepository 팩토리 함수를 통해 주입받습니다.
 * @type {import('../repositories/todo.repository.interface.js').TodoRepository}
 */
let todoRepository = getRepository(repositoryType);

/**
 * @typedef {object} TodoService
 * @description
 * 'todo'와 관련된 비즈니스 로직을 수행하는 서비스 객체입니다.
 * 팩토리를 통해 동적으로 선택된 리포지토리를 사용합니다.
 */
export const todoService = {
  /**
   * 사용할 리포지토리의 타입을 동적으로 변경합니다.
   * 컨트롤러(UI)에서 사용자가 저장소를 변경하면 이 함수가 호출됩니다.
   * @param {'indexeddb' | 'localstorage'} type - 새로 설정할 리포지토리의 타입입니다.
   */
  setRepositoryType(type) {
    repositoryType = type;
    todoRepository = getRepository(repositoryType);
  },

  /**
   * 모든 'todo' 항목을 조회하는 비즈니스 로직을 수행합니다.
   * 현재는 데이터 소스에 대한 요청을 그대로 전달하는 역할만 합니다.
   * @returns {Promise<Todo[]>} 'todo' 객체의 배열을 반환하는 Promise입니다.
   */
  async getTodos() {
    return todoRepository.getTodos();
  },

  /**
   * 새로운 'todo' 항목을 생성하는 비즈니스 로직을 수행합니다.
   * 향후 여기에 제목/내용에 대한 유효성 검사 로직을 추가할 수 있습니다.
   * @param {string} title - 생성할 'todo'의 제목입니다.
   * @param {string} content - 생성할 'todo'의 내용입니다.
   * @returns {Promise<Todo>} 생성된 'todo' 객체를 반환하는 Promise입니다.
   */
  async createTodo(title, content) {
    // 예: if (!title || title.length < 3) { throw new Error("제목은 3글자 이상이어야 합니다."); }
    return todoRepository.createTodo(title, content);
  },

  /**
   * 'todo' 항목을 수정하는 비즈니스 로직을 수행합니다.
   * @param {number|string} id - 수정할 'todo'의 ID입니다.
   * @param {string} title - 새로운 제목입니다.
   * @param {string} content - 새로운 내용입니다.
   * @returns {Promise<Todo>} 수정된 'todo' 객체를 반환하는 Promise입니다.
   */
  async updateTodo(id, title, content) {
    return todoRepository.updateTodo(id, title, content);
  },

  /**
   * 'todo' 항목을 삭제하는 비즈니스 로직을 수행합니다.
   * @param {number|string} id - 삭제할 'todo'의 ID입니다.
   * @returns {Promise<boolean>} 삭제 성공 여부를 반환하는 Promise입니다.
   */
  async deleteTodo(id) {
    return todoRepository.deleteTodo(id);
  },
};
