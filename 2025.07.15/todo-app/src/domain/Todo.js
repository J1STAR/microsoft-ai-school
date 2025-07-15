/**
 * @file Todo.js
 * @description
 * 이 파일은 'Todo' 항목의 데이터 구조를 정의하는 도메인 모델(Domain Model) 클래스입니다.
 * 애플리케이션 전체에서 'Todo' 데이터를 일관된 형태로 다루기 위해 사용됩니다.
 *
 * 이 클래스는 데이터베이스에서 가져온 원시 데이터를 애플리케이션에서 사용하기 쉬운
 * 객체 형태로 변환하는 역할을 합니다.
 */

/**
 * @class Todo
 * @description 'Todo' 항목을 나타내는 클래스입니다.
 */
export class Todo {
  /**
   * Todo 클래스의 인스턴스를 생성합니다.
   * @param {number} id - 'Todo' 항목의 고유 ID입니다.
   * @param {string} title - 'Todo' 항목의 제목입니다.
   * @param {string} content - 'Todo' 항목의 내용입니다.
   * @param {Date} date - 'Todo' 항목의 생성 또는 수정 날짜입니다.
   */
  constructor(id, title, content, date) {
    /** @type {number} */
    this.id = id;
    /** @type {string} */
    this.title = title;
    /** @type {string} */
    this.content = content;
    /** @type {Date} */
    this.date = date;
  }
}
