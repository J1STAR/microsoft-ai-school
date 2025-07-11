/**
 * @fileoverview JavaScript의 심볼(Symbol) 타입에 대해 설명하는 예제 파일입니다.
 * 심볼은 ES6(ECMAScript 2015)에서 도입된 7번째 데이터 타입으로,
 * 유일하고 변경 불가능한(immutable) 원시(primitive) 값입니다.
 * 주로 객체 속성의 충돌을 방지하기 위한 고유한 키(key)를 만드는 데 사용됩니다.
 */

console.log("--- JavaScript 심볼(Symbol) ---");

// -----------------------------------------------------------------------------
// 1. 심볼 생성 및 기본 특징
// -----------------------------------------------------------------------------
// `Symbol()` 함수를 호출하여 심볼을 생성합니다. `new` 연산자는 사용하지 않습니다.
const sym1 = Symbol();
const sym2 = Symbol("description"); // 디버깅을 위한 설명(description)을 추가할 수 있습니다.

console.log("\n1. 심볼 생성 및 기본 특징:");
console.log("  - 심볼 1:", sym1);
console.log("  - 심볼 2:", sym2);
console.log("  - 타입:", typeof sym1); // "symbol"

// 심볼은 항상 고유한 값을 가집니다. 설명이 같더라도 두 심볼은 다릅니다.
const sym3 = Symbol("description");
console.log("  - sym2 === sym3 ?", sym2 === sym3); // false

// -----------------------------------------------------------------------------
// 2. 고유한 객체 프로퍼티 키로 사용
// -----------------------------------------------------------------------------
// 심볼을 객체의 프로퍼티 키로 사용하면, 다른 어떤 문자열 키와도 충돌하지 않는 것을 보장할 수 있습니다.
// 외부 라이브러리나 다른 코드에 의해 의도치 않게 프로퍼티가 덮어쓰여지는 것을 방지할 때 유용합니다.
const idSymbol = Symbol("id");

const user = {
  name: "홍길동",
  age: 30,
  [idSymbol]: "user-12345", // 계산된 프로퍼티 이름 문법을 사용
};

console.log("\n2. 고유한 객체 프로퍼티 키:");
console.log("  - 사용자 객체:", user);
console.log("  - 이름:", user.name);
console.log("  - 고유 ID:", user[idSymbol]); // 심볼 키로 프로퍼티에 접근

// 심볼로 된 키는 일반적인 열거(enumeration)에서 제외됩니다.
console.log("  - for...in 루프:", Object.keys(user)); // ['name', 'age'] (심볼 키 제외)
console.log("  - JSON.stringify:", JSON.stringify(user)); // {"name":"홍길동","age":30} (심볼 키 제외)

// 심볼 키를 포함한 프로퍼티를 얻으려면 다음 메서드를 사용합니다.
console.log(
  "  - Object.getOwnPropertySymbols:",
  Object.getOwnPropertySymbols(user)
);
console.log("  - Reflect.ownKeys:", Reflect.ownKeys(user)); // 문자열과 심볼 키 모두 반환

// -----------------------------------------------------------------------------
// 3. 전역 심볼 레지스트리 (Global Symbol Registry)
// -----------------------------------------------------------------------------
// `Symbol.for(key)`는 전역 심볼 레지스트리를 사용하여 심볼을 생성하거나 가져옵니다.
// 동일한 키에 대해서는 항상 동일한 심볼을 반환하므로, 여러 파일이나 다른 영역(realm)에서
// 같은 심볼을 공유해야 할 때 유용합니다.

const globalSym1 = Symbol.for("shared_symbol");
const globalSym2 = Symbol.for("shared_symbol");

console.log("\n3. 전역 심볼 레지스트리:");
console.log("  - globalSym1 === globalSym2 ?", globalSym1 === globalSym2); // true

// `Symbol.keyFor(symbol)`을 사용하여 전역 심볼의 키를 얻을 수 있습니다.
console.log("  - globalSym1의 키:", Symbol.keyFor(globalSym1)); // "shared_symbol"

// -----------------------------------------------------------------------------
// 4. 잘 알려진 심볼 (Well-known Symbols)
// -----------------------------------------------------------------------------
// JavaScript는 내부 알고리즘에 사용되는 '잘 알려진 심볼(Well-known Symbols)'들을
// `Symbol` 객체의 정적 프로퍼티로 제공합니다.
// 개발자는 이 심볼들을 사용하여 객체의 기본 동작을 재정의할 수 있습니다.

// 예: Symbol.iterator
// 이 심볼을 사용하여 객체를 이터러블(iterable)하게 만들 수 있습니다.
const myIterable = {
  data: [10, 20, 30],
  // `for...of` 루프가 이 메서드를 호출하여 이터레이터 객체를 얻습니다.
  [Symbol.iterator]: function* () {
    for (const item of this.data) {
      yield item;
    }
  },
};

console.log("\n4. 잘 알려진 심볼 (Symbol.iterator):");
const results = [];
for (const value of myIterable) {
  results.push(value);
}
console.log("  - for...of 결과:", results); // [10, 20, 30]

// 다른 잘 알려진 심볼들:
// - Symbol.hasInstance: `instanceof` 연산자의 동작을 재정의
// - Symbol.toStringTag: `Object.prototype.toString.call()`의 반환값을 커스터마이징
// - Symbol.toPrimitive: 객체가 원시 값으로 변환될 때의 동작을 제어
// - 등등...
class CustomNumber {
  static [Symbol.hasInstance](instance) {
    return typeof instance === "number";
  }
}
console.log("  - 123 instanceof CustomNumber?", 123 instanceof CustomNumber); // true
