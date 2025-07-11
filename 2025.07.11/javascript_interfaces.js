/**
 * @fileoverview JavaScript에서의 인터페이스 개념을 설명하는 예제 파일입니다.
 * JavaScript는 TypeScript와 달리 `interface` 키워드를 제공하지 않습니다.
 * 대신, "덕 타이핑(Duck Typing)" 원칙이나 클래스 구조를 통해 비슷한 패턴을 구현합니다.
 */

console.log("--- JavaScript 인터페이스 패턴 ---");

// -----------------------------------------------------------------------------
// 1. 덕 타이핑 (Duck Typing)
// -----------------------------------------------------------------------------
// "오리처럼 걷고, 오리처럼 꽥꽥거린다면, 그것은 틀림없이 오리일 것이다."
// 객체의 타입이 아니라, 객체가 가진 속성이나 메서드의 집합으로 객체를 판단하는 방식입니다.
// JavaScript는 동적 타입 언어이므로, 기본적으로 덕 타이핑에 기반하여 동작합니다.

/**
 * '소리 내기' 인터페이스를 기대하는 함수.
 * `animal` 객체가 `speak` 메서드를 가지고 있는지 여부만 중요합니다.
 * @param {{ speak: () => void }} animal - `speak` 메서드를 가진 모든 객체
 */
function makeAnimalSpeak(animal) {
  // `speak` 메서드가 존재하고, 함수 형태인지 확인하여 안정성을 높일 수 있습니다.
  if (animal && typeof animal.speak === "function") {
    animal.speak();
  } else {
    console.error("오류: 이 객체는 'speak' 메서드를 가지고 있지 않습니다.");
  }
}

class Dog {
  speak() {
    console.log("멍멍!");
  }
}

class Car {
  drive() {
    console.log("부릉부릉!");
  }
  // `speak` 메서드와 유사한 역할을 하는 `honk` 메서드
  speak() {
    console.log("빵빵!");
  }
}

const myDog = new Dog();
const myCar = new Car();
const myCat = {
  name: "나비",
  speak: () => console.log("야옹~"), // 클래스 인스턴스가 아니어도 됨
};

console.log("\n1. 덕 타이핑 예제:");
makeAnimalSpeak(myDog); // 멍멍!
makeAnimalSpeak(myCar); // 빵빵!
makeAnimalSpeak(myCat); // 야옹~
makeAnimalSpeak({ sound: "..." }); // 오류: 이 객체는 'speak' 메서드를 가지고 있지 않습니다.

// -----------------------------------------------------------------------------
// 2. 클래스를 이용한 '추상 클래스' 패턴 (Interface with Abstract Class Pattern)
// -----------------------------------------------------------------------------
// 인터페이스를 강제하는 또 다른 방법은 추상 클래스(Abstract Class) 패턴을 사용하는 것입니다.
// JavaScript에는 추상 클래스 키워드가 없지만, 특정 메서드를 구현하도록 유도할 수 있습니다.

class Shape {
  constructor() {
    // `new.target`은 `new` 키워드로 호출된 생성자를 가리킵니다.
    // Shape 클래스가 직접 인스턴스화되는 것을 방지합니다.
    if (new.target === Shape) {
      throw new Error(
        "오류: 추상 클래스 'Shape'는 직접 인스턴스화할 수 없습니다."
      );
    }
  }

  /**
   * 이 메서드는 자식 클래스에서 반드시 구현(override)해야 합니다.
   * @throws {Error} 메서드가 구현되지 않았을 경우 오류 발생
   */
  getArea() {
    throw new Error("오류: 'getArea()' 메서드가 구현되지 않았습니다.");
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  // 부모의 `getArea` 메서드를 오버라이드하여 구현
  getArea() {
    return this.width * this.height;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  // 만약 이 클래스가 getArea를 구현하지 않는다면 에러가 발생합니다.
  getArea() {
    return Math.PI * this.radius * this.radius;
  }
}

console.log("\n2. 추상 클래스 패턴 예제:");
const rect = new Rectangle(10, 5);
console.log("  - 사각형의 넓이:", rect.getArea()); // 50

const circ = new Circle(10);
console.log("  - 원의 넓이:", circ.getArea().toFixed(2));

try {
  // const abstractShape = new Shape(); // 오류 발생
  class Triangle extends Shape {
    constructor(base) {
      super();
      this.base = base;
    }
    // getArea()를 구현하지 않음
  }
  const tri = new Triangle(5);
  tri.getArea(); // 여기서 오류가 발생합니다.
} catch (error) {
  console.error("  -", error.message);
}

console.log(`\n결론: JavaScript는 정적인 인터페이스를 제공하지 않지만,
덕 타이핑과 클래스 패턴을 통해 유연하고 구조적인 코드를 작성할 수 있습니다.`);
