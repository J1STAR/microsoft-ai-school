/**
 * @fileoverview JavaScript의 프로토타입(Prototype)에 대해 설명하는 예제 파일입니다.
 * JavaScript는 프로토타입 기반 언어입니다. 모든 객체는 다른 객체를 가리키는
 * 내부 링크인 [[Prototype]] (일반적으로 __proto__로 접근 가능)을 가집니다.
 * 이 프로토타입 객체 또한 자신만의 프로토타입을 가질 수 있으며, 이것이 연쇄적으로
 * 이어지는 것을 '프로토타입 체인'이라고 부릅니다.
 */

console.log("--- JavaScript 프로토타입 ---");

// -----------------------------------------------------------------------------
// 1. 생성자 함수와 프로토타입
// -----------------------------------------------------------------------------
// 생성자 함수는 'new' 키워드와 함께 사용되어 객체 인스턴스를 만듭니다.
// 모든 함수는 생성될 때 'prototype'이라는 특별한 속성을 가집니다.

function Animal(name) {
  this.name = name; // 인스턴스 속성 (각 인스턴스가 고유하게 가짐)
}

// 'prototype' 속성에 메서드를 추가합니다.
// 이렇게 추가된 메서드는 모든 Animal 인스턴스가 공유하게 되어 메모리를 절약할 수 있습니다.
Animal.prototype.speak = function () {
  console.log(`${this.name}이(가) 소리를 냅니다.`);
};

Animal.prototype.species = "동물"; // 프로토타입 속성 (모든 인스턴스가 공유)

const dog = new Animal("멍멍이");
const cat = new Animal("야옹이");

console.log("\n1. 생성자 함수와 프로토타입 예제:");
dog.speak(); // "멍멍이이(가) 소리를 냅니다."
cat.speak(); // "야옹이이(가) 소리를 냅니다."

// dog와 cat 인스턴스는 'speak' 메서드를 직접 가지고 있지 않습니다.
// 대신 프로토타입 체인을 통해 Animal.prototype의 'speak' 메서드를 찾아 실행합니다.
console.log("  - dog가 speak를 직접 가졌는가?", dog.hasOwnProperty("speak")); // false
console.log(
  "  - Animal.prototype이 speak를 가졌는가?",
  Animal.prototype.hasOwnProperty("speak")
); // true
console.log("  - dog의 종:", dog.species); // "동물"
console.log("  - cat의 종:", cat.species); // "동물"

// -----------------------------------------------------------------------------
// 2. 프로토타입 체인 (Prototype Chain)
// -----------------------------------------------------------------------------
// 객체의 속성이나 메서드에 접근할 때, 해당 객체에 그 멤버가 없다면
// JavaScript는 프로토타입 체인을 따라 올라가며 멤버를 찾습니다.
// 체인의 가장 위에는 `Object.prototype`이 있으며, 여기에는 `toString`, `hasOwnProperty` 등의
// 기본 메서드들이 포함되어 있습니다.

// `dog` -> `Animal.prototype` -> `Object.prototype` -> `null`
console.log("\n2. 프로토타입 체인 확인:");
console.log("  - dog의 프로토타입:", Object.getPrototypeOf(dog)); // Animal.prototype과 동일
console.log(
  "  - dog의 프로토타입 === Animal.prototype?",
  Object.getPrototypeOf(dog) === Animal.prototype
); // true
console.log(
  "  - Animal.prototype의 프로토타입:",
  Object.getPrototypeOf(Animal.prototype)
); // Object.prototype과 동일
console.log(
  "  - Object.prototype의 프로토타입:",
  Object.getPrototypeOf(Object.prototype)
); // null

// `toString`은 `dog`나 `Animal.prototype`에 없지만, `Object.prototype`에서 찾을 수 있습니다.
console.log("  - dog.toString():", dog.toString()); // "[object Object]"

// -----------------------------------------------------------------------------
// 3. 프로토타입 기반 상속 (Prototypal Inheritance)
// -----------------------------------------------------------------------------
// `Object.create()`를 사용하여 특정 객체를 프로토타입으로 하는 새 객체를 만들 수 있습니다.

function Lion(name) {
  // Animal 생성자를 호출하여 'name' 속성을 설정합니다 (생성자 빌려쓰기).
  Animal.call(this, name);
}

// Lion.prototype의 프로토타입을 Animal.prototype으로 설정합니다.
Lion.prototype = Object.create(Animal.prototype);

// `constructor` 속성이 여전히 Animal을 가리키므로, 올바르게 Lion으로 재설정해줍니다.
Lion.prototype.constructor = Lion;

// Lion만의 메서드 추가
Lion.prototype.roar = function () {
  console.log(`${this.name}이(가) "어흥"하고 포효합니다.`);
};

const simba = new Lion("심바");

console.log("\n3. 프로토타입 기반 상속 예제:");
simba.speak(); // "심바이(가) 소리를 냅니다." (Animal.prototype에서 상속)
simba.roar(); // "심바이(가) "어흥"하고 포효합니다." (Lion.prototype 고유 메서드)

console.log("  - simba는 Lion의 인스턴스인가?", simba instanceof Lion); // true
console.log("  - simba는 Animal의 인스턴스인가?", simba instanceof Animal); // true

// -----------------------------------------------------------------------------
// 4. 클래스와 프로토타입 (Class as Syntactic Sugar)
// -----------------------------------------------------------------------------
// ES6의 `class` 문법은 사실 이러한 프로토타입 기반 상속을 더 쉽게 사용할 수 있도록 만든
// '문법적 설탕(Syntactic Sugar)'입니다. 내부적으로는 여전히 프로토타입을 사용합니다.

class Bird {
  constructor(name) {
    this.name = name;
  }
  fly() {
    console.log(`${this.name}이(가) 납니다.`);
  }
}

// 클래스의 메서드는 프로토타입에 추가됩니다.
console.log("\n4. 클래스와 프로토타입의 관계:");
console.log(
  "  - Bird.prototype에 fly가 있는가?",
  Bird.prototype.hasOwnProperty("fly")
); // true

const eagle = new Bird("독수리");
console.log(
  "  - eagle의 프로토타입 === Bird.prototype?",
  Object.getPrototypeOf(eagle) === Bird.prototype
); // true
