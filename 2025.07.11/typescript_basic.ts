/**
 * TypeScript 기초
 *
 * 이 파일은 신입 개발자, 주니어 개발자, 그리고 TypeScript를 처음 접하는 분들을 위해
 * TypeScript의 기본적인 개념들을 설명하고 예시 코드를 제공합니다.
 * JavaScript에 타입을 추가한 TypeScript의 주요 특징들을 학습합니다.
 * 각 개념에 대한 더 자세한 정보는 코드 내에 포함된 TypeScript 핸드북 문서 링크를 참고해 주세요.
 */

// -----------------------------------------------------------------------------
// 1. TypeScript란? (What is TypeScript?)
// -----------------------------------------------------------------------------
// TypeScript는 JavaScript의 상위 집합(superset)입니다. 즉, 모든 JavaScript 코드는 유효한 TypeScript 코드입니다.
// TypeScript는 JavaScript에 정적 타입 시스템을 추가하여 코드의 안정성과 가독성을 높여줍니다.
// 개발 단계에서 타입 오류를 미리 발견할 수 있어 대규모 애플리케이션 개발에 매우 유용합니다.
// TypeScript 코드는 컴파일 과정을 거쳐 일반적인 JavaScript 코드로 변환되어 실행됩니다.
// 공식 문서: https://www.typescriptlang.org/docs/handbook/intro.html

console.log("Hello, TypeScript!");

// -----------------------------------------------------------------------------
// 2. 기본 타입 (Basic Types)
// -----------------------------------------------------------------------------
// TypeScript는 다양한 기본 데이터 타입을 제공하여 변수의 유형을 명시적으로 지정할 수 있습니다.

// 1) Boolean (불리언)
// 참(true) 또는 거짓(false) 값을 나타냅니다.
// 문서: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
let isDone: boolean = false;
console.log("isDone:", isDone);

// 2) Number (숫자)
// JavaScript와 마찬가지로 정수 및 부동 소수점 숫자를 모두 나타냅니다.
// 문서: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
console.log("Numbers:", decimal, hex, binary, octal);

// 3) String (문자열)
// 텍스트 데이터를 나타냅니다.
// 문서: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
let color: string = "blue";
color = "red";
console.log(color);
let fullName: string = `Bob Bobbington`;
let personAge: number = 37;
let sentence: string = `Hello, my name is ${fullName}. I'll be ${
  personAge + 1
} years old next month.`;
console.log(sentence);

// 4) Array (배열)
// 두 가지 방식으로 배열 타입을 선언할 수 있습니다.
// 문서: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays
let list1: number[] = [1, 2, 3]; // 요소 타입을 사용한 방식 (권장)
let list2: Array<number> = [1, 2, 3]; // 제네릭 배열 타입을 사용한 방식
console.log("Arrays:", list1, list2);

// 5) Tuple (튜플)
// 요소의 타입과 개수가 고정된 배열을 표현합니다. 순서가 중요합니다.
// 문서: https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types
let tupleX: [string, number];
tupleX = ["hello", 10]; // 성공
// tupleX = [10, "hello"]; // 오류: 타입 순서가 맞지 않음
console.log("Tuple:", tupleX);
console.log("Tuple first element:", tupleX[0].substring(1)); // string 타입으로 추론되어 문자열 메서드 사용 가능
// console.log(tupleX[1].substring(1)); // 오류: 'number' 타입에는 'substring' 메서드가 없음

// 6) Enum (열거형)
// 숫자 값 집합에 더 친숙한 이름을 부여하는 방법입니다.
// 문서: https://www.typescriptlang.org/docs/handbook/enums.html
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green; // 1
console.log("Enum (index):", c);
let colorName: string = Color[2]; // 'Blue'
console.log("Enum (name):", colorName);

// 7) Unknown (알 수 없는 타입)
// 타입을 미리 알 수 없을 때 사용하는 타입입니다. 'any'보다 타입-안전합니다.
// 'unknown' 타입의 변수는 다른 타입의 변수에 바로 할당할 수 없으며, 타입 검사를 통해 타입을 좁혀야 합니다.
// 문서: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#unknown
let notSure: unknown = 4;
notSure = "maybe a string instead";
notSure = false;
// let num: number = notSure; // 오류: 'unknown'은 'number'에 할당할 수 없음
if (typeof notSure === "boolean") {
  let aBoolean: boolean = notSure; // 타입 가드를 통해 안전하게 할당 가능
  console.log("Unknown as boolean:", aBoolean);
}

// 8) Any (모든 타입)
// 타입 검사를 비활성화하고 싶을 때 사용합니다. 컴파일 시 타입 체크를 하지 않으므로 사용을 최소화해야 합니다.
// 문서: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any
let looselyTyped: any = 4;
looselyTyped.ifItExists(); // 런타임에 오류가 발생할 수 있음
looselyTyped = "hello";
let anyNum: number = looselyTyped; // 타입 검사 없이 할당 가능하여 위험
console.log("Any type:", anyNum);

// 9) Void (빈 타입)
// 보통 함수에서 반환 값이 없을 때 사용됩니다.
// 문서: https://www.typescriptlang.org/docs/handbook/2/functions.html#void
function warnUser(): void {
  console.log("This is my warning message");
}
warnUser();

// 10) Null and Undefined
// 각각 null과 undefined 값을 가집니다. --strictNullChecks 옵션에 따라 다른 타입에 할당 가능 여부가 결정됩니다.
// 문서: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined
let u: undefined = undefined;
let n: null = null;
console.log("Null and Undefined:", u, n);

// 11) Never
// 절대 발생하지 않는 값의 타입을 나타냅니다. 예를 들어, 항상 오류를 발생시키거나 절대 반환하지 않는 함수의 반환 타입입니다.
// 문서: https://www.typescriptlang.org/docs/handbook/2/functions.html#never
function error(message: string): never {
  throw new Error(message);
}

// -----------------------------------------------------------------------------
// 3. 인터페이스 (Interfaces)
// -----------------------------------------------------------------------------
// 객체의 구조를 정의하는 방법입니다. 코드 내의 계약(contract)을 정의하는 강력한 방법입니다.
// 문서: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces

interface LabeledValue {
  label: string;
}

function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

// 선택적 속성 (Optional Properties)
interface SquareConfig {
  color?: string; // '?'는 이 속성이 선택적임을 의미
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}
console.log("Square:", createSquare({ color: "black" }));

// 읽기 전용 속성 (Readonly Properties)
interface Point {
  readonly x: number;
  readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // 오류! x는 읽기 전용 속성입니다.

// -----------------------------------------------------------------------------
// 4. 함수 (Functions)
// -----------------------------------------------------------------------------
// TypeScript는 함수의 매개변수와 반환 값에 타입을 추가할 수 있습니다.
// 문서: https://www.typescriptlang.org/docs/handbook/2/functions.html

// JavaScript와 TypeScript에서는 함수를 여러 가지 방법으로 선언할 수 있습니다.

// 1) 함수 선언문 (Function Declaration)
// 가장 기본적인 방식으로, 'function' 키워드로 함수를 정의합니다. 호이스팅(hoisting)의 대상이 됩니다.
function addTs(x: number, y: number): number {
  return x + y;
}
console.log("1) 함수 선언문:", addTs(1, 2));

// 2) 함수 표현식 (Function Expression)
// 변수에 익명 함수를 할당하는 방식입니다. 호이스팅되지 않습니다 (변수 선언 자체는 호이스팅되지만, 할당은 런타임에 이루어집니다).
let myAddTs = function (x: number, y: number): number {
  return x + y;
};
console.log("2) 함수 표현식:", myAddTs(5, 3));

// 3) 화살표 함수 (Arrow Function)
// ES6에서 도입된 간결한 문법입니다. 'this'가 바인딩되는 방식이 다릅니다.
const multiplyTs = (x: number, y: number): number => x * y;
console.log("3) 화살표 함수:", multiplyTs(3, 4));

// 4) 이름 있는 함수 표현식 (Named Function Expression)
// 함수 표현식에 이름을 붙일 수 있습니다. 이 이름은 함수 내부에서만 접근 가능하며, 디버깅에 유용합니다.
const factorialTs = function fact(n: number): number {
  if (n <= 1) {
    return 1;
  }
  return n * fact(n - 1); // 재귀 호출 시 함수 이름 사용
};
console.log("4) 이름 있는 함수 표현식:", factorialTs(5));

// 5) 즉시 실행 함수 표현식 (Immediately Invoked Function Expression - IIFE)
// 함수를 정의함과 동시에 바로 실행하는 방식입니다. 전역 스코프를 오염시키지 않고 변수를 캡슐화할 때 유용합니다.
((name: string): void => {
  console.log(`5) IIFE: Hello, ${name}!`);
})("TypeScript");

// 6) 제너레이터 함수 (Generator Function)
// 'function*' 키워드로 선언하며, 여러 개의 값을 순차적으로 반환할 수 있는 함수입니다.
// 'yield' 키워드를 사용하여 값을 하나씩 반환합니다.
function* numberGeneratorTs(): Generator<number, void, unknown> {
  yield 1;
  yield 2;
  yield 3;
}
const genTs = numberGeneratorTs();
console.log(
  `6) 제너레이터 함수: ${genTs.next().value}, ${genTs.next().value}, ${
    genTs.next().value
  }`
);

// 선택적 매개변수 (Optional Parameters)
// '?'를 사용하여 매개변수를 선택적으로 만들 수 있습니다.
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + " " + lastName;
  } else {
    return firstName;
  }
}
let result1 = buildName("Bob");
// let result2 = buildName("Bob", "Adams", "Sr."); // 오류, 너무 많은 매개변수
let result3 = buildName("Bob", "Adams");
console.log("BuildName results:", result1, result3);

// -----------------------------------------------------------------------------
// 5. 클래스 (Classes)
// -----------------------------------------------------------------------------
// TypeScript는 ES6 클래스에 기반한 객체 지향 프로그래밍을 지원하며, 접근 제한자(access modifier)와 같은 기능을 추가합니다.
// 문서: https://www.typescriptlang.org/docs/handbook/2/classes.html
class Greeter {
  greeting: string; // 속성 (property)

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    // 메서드 (method)
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");
console.log(greeter.greet());
// 상속 (Inheritance)
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
sam.move();

// 접근 제한자 (Access Modifiers)
// - public: (기본값) 어디서든 접근 가능
// - private: 해당 클래스 내부에서만 접근 가능
// - protected: 해당 클래스와 하위 클래스에서만 접근 가능
class Person {
  private name: string;
  public constructor(name: string) {
    this.name = name;
  }
  public getName(): string {
    return this.name;
  }
}
const tsPerson = new Person("John");
console.log(tsPerson.getName());
// console.log(tsPerson.name); // 오류: 'name'은 private 속성입니다.

// -----------------------------------------------------------------------------
// 6. 제네릭 (Generics)
// -----------------------------------------------------------------------------
// 제네릭은 다양한 타입에서 작동하는 재사용 가능한 컴포넌트를 만드는 방법입니다.
// 단일 타입에 국한되지 않고, 여러 타입에 걸쳐 컴포넌트가 동작할 수 있도록 합니다.
// 문서: https://www.typescriptlang.org/docs/handbook/2/generics.html
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("myString");
let output2 = identity<number>(100);
// 타입 추론을 통해 컴파일러가 타입을 결정할 수도 있습니다.
let output3 = identity("myString");

console.log("Generics:", output1, output2, output3);

// -----------------------------------------------------------------------------
// 7. 타입 별칭 & 유니언 타입 (Type Aliases & Union Types)
// -----------------------------------------------------------------------------

// 타입 별칭 (Type Aliases)
// 새로운 이름을 타입에 부여합니다. 원시 값, 유니언 타입, 튜플 등 모든 타입에 사용할 수 있습니다.
// 문서: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
type StringOrNumber = string | number;

// 유니언 타입 (Union Types)
// 변수가 여러 타입 중 하나일 수 있음을 나타냅니다.
// 문서: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types
function printId(id: StringOrNumber) {
  if (typeof id === "string") {
    console.log("Your ID is (string): " + id.toUpperCase());
  } else {
    console.log("Your ID is (number): " + id);
  }
}
printId(101);
printId("202");
// printId({ myID: 22342 }); // 오류

// -----------------------------------------------------------------------------
// 8. 타입 단언 (Type Assertions)
// -----------------------------------------------------------------------------
// 때로는 개발자가 TypeScript보다 값의 타입에 대해 더 잘 알고 있을 수 있습니다.
// 이 경우 타입 단언을 사용하여 컴파일러에게 "이 값을 특정 타입으로 취급해"라고 말할 수 있습니다.
// 이는 다른 언어의 타입 캐스팅과 유사하지만, 특별한 검사를 하거나 데이터를 재구성하지는 않습니다.
// 단지 컴파일 시에만 영향을 주며, 런타임에는 아무런 영향을 미치지 않습니다.
// 'as' 문법 또는 'angle-bracket'(<>) 문법을 사용할 수 있습니다. (JSX에서는 'as'만 허용)
// 문서: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions

let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;
console.log("Type Assertion length:", strLength);

let anotherValue: any = "this is another string";
let anotherStrLength: number = (<string>anotherValue).length;
console.log("Angle-bracket assertion length:", anotherStrLength);

// -----------------------------------------------------------------------------
// 9. 리터럴 타입 (Literal Types)
// -----------------------------------------------------------------------------
// 유니언 타입과 결합하여 특정 문자열이나 숫자 값만 허용하는 타입을 만들 수 있습니다.
// 이를 통해 변수가 가질 수 있는 값을 정확하게 제한할 수 있습니다.
// 문서: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types

type Direction = "left" | "right" | "up" | "down";

function move(direction: Direction): void {
  console.log(`Moving ${direction}`);
}

move("up");
// move("north"); // 오류: '"north"' 타입의 인수는 '"left" | "right" | "up" | "down"' 타입의 매개변수에 할당될 수 없습니다.

type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
let myRoll: DiceRoll = 3;
console.log(`My dice roll: ${myRoll}`);
// myRoll = 7; // 오류: 7 형식은 DiceRoll 형식에 할당할 수 없습니다.

// -----------------------------------------------------------------------------
// 10. 모듈 (Modules)
// -----------------------------------------------------------------------------
// TypeScript는 JavaScript와 마찬가지로 모듈을 지원하여 코드를 구성하고 재사용할 수 있게 합니다.
// 'export' 키워드를 사용하여 변수, 함수, 클래스, 인터페이스 등을 다른 파일에서 사용할 수 있도록 내보낼 수 있습니다.
// 'import' 키워드를 사용하여 다른 모듈에서 내보낸 항목을 가져올 수 있습니다.
// 각 파일은 자체적인 스코프를 가진 모듈입니다.
// 문서: https://www.typescriptlang.org/docs/handbook/2/modules.html

/*
// --- math.ts ---
export const PI = 3.14;
export function add(x: number, y: number): number {
    return x + y;
}

// --- app.ts ---
import { PI, add } from './math';
console.log(PI);
console.log(add(2, 3));
*/

console.log(
  "모듈에 대한 설명은 주석 처리된 예제 코드를 참고하세요. 실제 프로젝트에서는 여러 파일에 걸쳐 코드를 작성하게 됩니다."
);
