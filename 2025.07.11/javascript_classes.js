/**
 * @fileoverview JavaScript의 클래스(Class)에 대해 상세히 설명하는 예제 파일입니다.
 * 이 파일은 클래스의 기본 문법, 상속, 캡슐화, 정적 멤버 등 ES6 클래스의 주요 기능을 다룹니다.
 * JavaScript 클래스는 프로토타입 기반 상속에 대한 문법적 설탕(syntactic sugar)입니다.
 */

// -----------------------------------------------------------------------------
// 1. 클래스 기본 (Class Basics)
// -----------------------------------------------------------------------------
// `class` 키워드를 사용하여 클래스를 정의합니다.
// `constructor`는 클래스의 인스턴스가 생성될 때 호출되는 특별한 메서드입니다.
class Animal {
  /**
   * Animal 클래스의 생성자
   * @param {string} name - 동물의 이름
   */
  constructor(name) {
    // 'this'는 생성될 인스턴스를 가리킵니다.
    this.name = name;
  }

  // 메서드 정의
  speak() {
    console.log(`${this.name}이(가) 소리를 냅니다.`);
  }
}

// `new` 키워드를 사용하여 클래스의 인스턴스를 생성합니다.
const dog = new Animal("멍멍이");
console.log("1. 클래스 인스턴스:", dog);
console.log("   - 이름:", dog.name); // "멍멍이"
dog.speak(); // "멍멍이이(가) 소리를 냅니다."

// -----------------------------------------------------------------------------
// 2. 클래스 상속 (Inheritance)
// -----------------------------------------------------------------------------
// `extends` 키워드를 사용하여 다른 클래스를 상속받을 수 있습니다.
// 상속을 통해 부모 클래스의 속성과 메서드를 재사용할 수 있습니다.
class Cat extends Animal {
  /**
   * Cat 클래스의 생성자
   * @param {string} name - 고양이의 이름
   */
  constructor(name) {
    // `super()`는 부모 클래스의 생성자를 호출합니다.
    // 자식 클래스의 생성자에서는 `this`를 사용하기 전에 반드시 `super()`를 호출해야 합니다.
    super(name);
  }

  // 메서드 오버라이딩 (Method Overriding)
  // 부모 클래스와 동일한 이름의 메서드를 재정의하여 동작을 변경할 수 있습니다.
  speak() {
    console.log(`${this.name}이(가) "야옹"하고 웁니다.`);
  }

  // 자식 클래스 고유의 메서드
  purr() {
    console.log(`${this.name}이(가) 가르랑거립니다.`);
  }
}

const nabi = new Cat("나비");
console.log("\n2. 클래스 상속:");
nabi.speak(); // "나비이(가) "야옹"하고 웁니다." (오버라이드된 메서드)
nabi.purr(); // "나비이(가) 가르랑거립니다." (자식 클래스 고유 메서드)

// -----------------------------------------------------------------------------
// 3. Getter와 Setter (Getters and Setters)
// -----------------------------------------------------------------------------
// `get`과 `set` 키워드를 사용하여 객체의 속성 값을 가져오고 설정하는 방법을 제어할 수 있습니다.
// 이를 통해 데이터에 대한 접근을 캡슐화하고 유효성 검사 등을 추가할 수 있습니다.
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // Getter: 속성 값을 읽을 때 호출됩니다.
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // Setter: 속성에 값을 할당할 때 호출됩니다.
  set fullName(name) {
    // 유효성 검사
    if (typeof name !== "string" || name.split(" ").length !== 2) {
      console.error("오류: 이름은 '성 이름' 형식의 문자열이어야 합니다.");
      return;
    }
    const [firstName, lastName] = name.split(" ");
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const user = new Person("길동", "홍");
console.log("\n3. Getter와 Setter:");
console.log("   - Getter:", user.fullName); // "길동 홍" (메서드처럼 호출하지 않음)

user.fullName = "철수 김"; // Setter 호출
console.log("   - Setter 이후:", user.fullName); // "철수 김"

// -----------------------------------------------------------------------------
// 4. 정적 멤버 (Static Members)
// -----------------------------------------------------------------------------
// `static` 키워드를 사용하여 클래스 자체에 속한 메서드나 속성을 정의할 수 있습니다.
// 정적 멤버는 클래스의 인스턴스를 생성하지 않고도 `클래스이름.멤버` 형식으로 직접 접근할 수 있습니다.
// 주로 유틸리티 함수나 클래스 수준의 상수를 정의할 때 사용됩니다.
class MathHelper {
  static PI = 3.14159;

  static add(a, b) {
    return a + b;
  }
}

console.log("\n4. 정적 멤버:");
console.log("   - 정적 속성:", MathHelper.PI); // 3.14159
console.log("   - 정적 메서드:", MathHelper.add(5, 10)); // 15

// const mathInstance = new MathHelper();
// console.log(mathInstance.PI); // undefined (인스턴스로는 접근 불가)

// -----------------------------------------------------------------------------
// 5. 캡슐화: Private 멤버 (Encapsulation: Private Members)
// -----------------------------------------------------------------------------
// `#` 접두사를 사용하여 클래스 외부에서 접근할 수 없는 비공개(private) 필드와 메서드를 만들 수 있습니다.
// 이는 객체의 내부 상태를 보호하고 클래스의 인터페이스를 명확하게 하는 데 도움이 됩니다.
class BankAccount {
  // Private 필드
  #balance = 0;

  constructor(initialBalance) {
    if (initialBalance > 0) {
      this.#balance = initialBalance;
    }
  }

  // Public 메서드를 통해 Private 필드에 접근
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      console.log(
        `${amount}원이 입금되었습니다. 현재 잔액: ${this.#getFormattedBalance()}원`
      );
    }
  }

  withdraw(amount) {
    if (amount > this.#balance) {
      console.error("오류: 잔액이 부족합니다.");
      return;
    }
    this.#balance -= amount;
    console.log(
      `${amount}원이 출금되었습니다. 현재 잔액: ${this.#getFormattedBalance()}원`
    );
  }

  // Private 메서드
  #getFormattedBalance() {
    return this.#balance.toLocaleString();
  }
}

const myAccount = new BankAccount(10000);
console.log("\n5. Private 멤버 (캡슐화):");
myAccount.deposit(5000); // 5000원이 입금되었습니다. 현재 잔액: 15,000원
myAccount.withdraw(2000); // 2000원이 출금되었습니다. 현재 잔액: 13,000원

// console.log(myAccount.#balance); // SyntaxError: Private field '#balance' must be declared in an enclosing class
// myAccount.#getFormattedBalance(); // SyntaxError

// -----------------------------------------------------------------------------
// 6. instanceof 연산자
// -----------------------------------------------------------------------------
// `instanceof` 연산자는 특정 객체가 특정 클래스의 인스턴스인지 확인하는 데 사용됩니다.
// 상속 관계도 확인 가능합니다.
console.log("\n6. instanceof 연산자:");
console.log("   - nabi는 Cat의 인스턴스인가?", nabi instanceof Cat); // true
console.log("   - nabi는 Animal의 인스턴스인가?", nabi instanceof Animal); // true (상속 관계)
console.log("   - nabi는 Person의 인스턴스인가?", nabi instanceof Person); // false
console.log("   - dog는 Cat의 인스턴스인가?", dog instanceof Cat); // false
