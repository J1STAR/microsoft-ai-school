/**
 * @file todo.repository.interface.js
 * @description
 * 이 파일은 'Todo' 데이터 저장소에 대한 인터페이스를 JSDoc을 통해 정의합니다.
 * 모든 구체적인 리포지토리(IndexedDB, LocalStorage, Network 등)는 이 인터페이스를 구현해야 합니다.
 * 이를 통해 데이터 소스에 관계없이 일관된 방식으로 데이터에 접근할 수 있습니다.
 */

/**
 * @interface
 * @typedef {object} TodoRepository
 * @description 'Todo' 항목에 대한 CRUD(Create, Read, Update, Delete) 작업을 위한 인터페이스입니다.
 */
export const TodoRepository = {
  /**
   * 모든 'todo' 항목을 조회합니다.
   * @returns {Promise<Todo[]>} 'todo' 객체의 배열을 resolve하는 Promise를 반환합니다.
   */
  async getTodos() {
    throw new Error("getTodos() must be implemented.");
  },

  /**
   * 새로운 'todo' 항목을 생성합니다.
   * @param {string} title - 'todo' 항목의 제목입니다.
   * @param {string} content - 'todo' 항목의 내용입니다.
   * @returns {Promise<Todo>} 생성된 'todo' 객체를 resolve하는 Promise를 반환합니다.
   */
  async createTodo(title, content) {
    throw new Error("createTodo() must be implemented.");
  },

  /**
   * 기존 'todo' 항목을 수정합니다.
   * @param {number|string} id - 수정할 'todo' 항목의 ID입니다.
   * @param {string} title - 새로운 제목입니다.
   * @param {string} content - 새로운 내용입니다.
   * @returns {Promise<Todo>} 수정된 'todo' 객체를 resolve하는 Promise를 반환합니다.
   */
  async updateTodo(id, title, content) {
    throw new Error("updateTodo() must be implemented.");
  },

  /**
   * 'todo' 항목을 삭제합니다.
   * @param {number|string} id - 삭제할 'todo' 항목의 ID입니다.
   * @returns {Promise<boolean>} 삭제 성공 여부를 resolve하는 Promise를 반환합니다.
   */
  async deleteTodo(id) {
    throw new Error("deleteTodo() must be implemented.");
  },
}; 