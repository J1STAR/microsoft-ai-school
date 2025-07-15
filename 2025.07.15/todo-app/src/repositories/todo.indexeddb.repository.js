/**
 * @file todo.indexeddb.repository.js
 * @description
 * 이 파일은 TodoRepository 인터페이스의 IndexedDB 기반 구현체입니다.
 * IndexedDB는 브라우저에서 제공하는 비동기식 트랜잭셔널 데이터베이스로,
 * 대용량의 구조화된 데이터를 저장하는 데 적합합니다.
 * 이 구현체는 LocalStorage보다 더 복잡하지만, 더 강력한 데이터 관리 기능을 제공합니다.
 */

import { Todo } from "../domain/Todo.js";

/**
 * 데이터베이스 연결을 관리하는 Promise입니다.
 * 애플리케이션 전체에서 단 하나의 데이터베이스 연결만 생성하고 재사용하기 위한 싱글턴 패턴입니다.
 * @type {Promise<IDBDatabase> | null}
 */
let dbPromise = null;

/**
 * IndexedDB 데이터베이스 연결을 설정하고 반환합니다.
 * 이미 연결이 존재하면 기존 연결을 재사용하여 성능을 최적화합니다.
 * @returns {Promise<IDBDatabase>} 데이터베이스 연결 객체를 resolve하는 Promise를 반환합니다.
 */
const getDb = () => {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      // 'todoDB'라는 이름의 데이터베이스를 버전 1로 엽니다.
      const dbRequest = indexedDB.open("todoDB", 1);

      // 데이터베이스 버전이 변경되거나 처음 생성될 때 호출됩니다.
      // 여기에서 객체 저장소(테이블)와 인덱스를 정의합니다.
      dbRequest.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("todos")) {
            // 'todos' 객체 저장소를 생성합니다. 'id'를 keyPath로 사용하고, 자동으로 증가시킵니다.
            const objectStore = db.createObjectStore("todos", {
              keyPath: "id",
              autoIncrement: true,
            });
            // 'timestamp' 필드를 기준으로 데이터를 조회할 수 있도록 인덱스를 생성합니다.
            objectStore.createIndex("timestamp", "timestamp", { unique: false });
        }
      };

      // 데이터베이스 연결 중 에러가 발생했을 때 호출됩니다.
      dbRequest.onerror = (event) => {
        console.error("Database error:", event.target.error);
        reject(event.target.error);
      };

      // 데이터베이스 연결에 성공했을 때 호출됩니다.
      dbRequest.onsuccess = (event) => {
        resolve(event.target.result);
      };
    });
  }
  return dbPromise;
};

/**
 * @typedef {import('./todo.repository.interface.js').TodoRepository} ITodoRepository
 */

/**
 * IndexedDB를 사용하여 'todo' 데이터를 관리하는 리포지토리입니다.
 * @implements {ITodoRepository}
 */
export const indexedDbRepository = {
  /**
   * IndexedDB에서 모든 'todo' 항목을 조회합니다.
   * @returns {Promise<Todo[]>} 'todo' 객체의 배열을 resolve하는 Promise를 반환합니다.
   */
  async getTodos() {
    const db = await getDb();
    return new Promise((resolve, reject) => {
      // 'readonly' 모드로 트랜잭션을 시작합니다.
      const transaction = db.transaction(["todos"], "readonly");
      const objectStore = transaction.objectStore("todos");
      // 객체 저장소의 모든 데이터를 가져오는 요청을 생성합니다.
      const request = objectStore.getAll();

      // 데이터 조회에 성공했을 때 호출됩니다.
      request.onsuccess = () => {
        // 원시 데이터를 Todo 클래스의 인스턴스로 변환합니다.
        const todos = request.result.map(
          (t) => new Todo(t.id, t.title, t.content, new Date(t.timestamp))
        );
        // 최신 항목이 먼저 오도록 정렬하여 반환합니다.
        resolve(todos.sort((a, b) => b.timestamp - a.timestamp));
      };

      // 데이터 조회 중 에러가 발생했을 때 호출됩니다.
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  },

  /**
   * 새로운 'todo' 항목을 IndexedDB에 생성합니다.
   * @param {string} title - 'todo' 항목의 제목입니다.
   * @param {string} content - 'todo' 항목의 내용입니다.
   * @returns {Promise<Todo>} 생성된 'todo' 객체를 resolve하는 Promise를 반환합니다.
   */
  async createTodo(title, content) {
    const db = await getDb();
    return new Promise((resolve, reject) => {
      // 'readwrite' 모드로 트랜잭션을 시작하여 데이터를 수정할 수 있게 합니다.
      const transaction = db.transaction(["todos"], "readwrite");
      const objectStore = transaction.objectStore("todos");
      const todoData = {
        title,
        content,
        timestamp: new Date().getTime(),
      };
      // 새로운 데이터를 객체 저장소에 추가하는 요청을 생성합니다.
      const request = objectStore.add(todoData);

      // 데이터 추가에 성공했을 때 호출됩니다.
      request.onsuccess = () => {
        // 생성된 ID를 포함하여 Todo 객체를 생성하고 반환합니다.
        const newTodo = new Todo(
          request.result, // add 요청의 결과는 새로 생성된 key입니다.
          title,
          content,
          new Date(todoData.timestamp)
        );
        resolve(newTodo);
      };

      // 데이터 추가 중 에러가 발생했을 때 호출됩니다.
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  },

  /**
   * 기존 'todo' 항목을 수정합니다.
   * @param {number|string} id - 수정할 'todo' 항목의 ID입니다.
   * @param {string} title - 새로운 제목입니다.
   * @param {string} content - 새로운 내용입니다.
   * @returns {Promise<Todo>} 수정된 'todo' 객체를 resolve하는 Promise를 반환합니다.
   */
  async updateTodo(id, title, content) {
    const db = await getDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["todos"], "readwrite");
      const objectStore = transaction.objectStore("todos");
      const todoData = {
        id: Number(id),
        title,
        content,
        timestamp: new Date().getTime(),
      };
      // 기존 데이터를 덮어쓰는(update) 요청을 생성합니다.
      const request = objectStore.put(todoData);

      // 데이터 수정에 성공했을 때 호출됩니다.
      request.onsuccess = () => {
        const updatedTodo = new Todo(
          id,
          title,
          content,
          new Date(todoData.timestamp)
        );
        resolve(updatedTodo);
      };

      // 데이터 수정 중 에러가 발생했을 때 호출됩니다.
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  },

  /**
   * 'todo' 항목을 IndexedDB에서 삭제합니다.
   * @param {number|string} id - 삭제할 'todo' 항목의 ID입니다.
   * @returns {Promise<boolean>} 삭제 성공 여부를 resolve하는 Promise를 반환합니다.
   */
  async deleteTodo(id) {
    const db = await getDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["todos"], "readwrite");
      const objectStore = transaction.objectStore("todos");
      // 특정 key에 해당하는 데이터를 삭제하는 요청을 생성합니다.
      const request = objectStore.delete(Number(id));

      // 데이터 삭제에 성공했을 때 호출됩니다.
      request.onsuccess = () => {
        resolve(true);
      };

      // 데이터 삭제 중 에러가 발생했을 때 호출됩니다.
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  },
}; 