/**
 * @fileoverview TypeScript의 인터페이스(Interfaces)에 대해 상세히 설명하는 예제 파일입니다.
 * 인터페이스는 객체의 구조(shape)를 정의하고, 코드 내에서 해당 구조를 따르도록 강제하는
 * 핵심적인 역할을 합니다. 이를 통해 코드의 일관성과 안정성을 크게 향상시킬 수 있습니다.
 *
 * @see https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces
 */

console.log("--- TypeScript 인터페이스(Interfaces) ---");

// -----------------------------------------------------------------------------
// 1. 인터페이스의 기본: 객체의 구조 정의
// -----------------------------------------------------------------------------
// 인터페이스는 객체가 가져야 할 프로퍼티와 그 타입을 정의합니다.
interface LabeledValue {
  label: string;
}

function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

let myInterfaceObj = { size: 10, label: "Size 10 Object" };
// myObj는 LabeledValue 인터페이스에 필요한 'label' 프로퍼티를 가지고 있으므로
// 타입 검사를 통과합니다. (덕 타이핑, Duck Typing)
printLabel(myInterfaceObj);

// -----------------------------------------------------------------------------
// 2. 선택적 프로퍼티 (Optional Properties)
// -----------------------------------------------------------------------------
// 프로퍼티 이름 뒤에 `?`를 붙여 해당 프로퍼티가 있어도 되고 없어도 됨을 나타냅니다.
interface SquareConfig {
  color?: string;
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

console.log("\n2. 선택적 프로퍼티:");
console.log("  -", createSquare({ color: "black" }));

// -----------------------------------------------------------------------------
// 3. 읽기 전용 프로퍼티 (Readonly Properties)
// -----------------------------------------------------------------------------
// `readonly` 키워드를 사용하여 객체가 처음 생성될 때만 값을 할당할 수 있도록 합니다.
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1_interface: Point = { x: 10, y: 20 };
// p1_interface.x = 5; // 오류: 'x' is a read-only property.

// `ReadonlyArray<T>` 타입을 사용하면 배열의 모든 요소를 읽기 전용으로 만들 수 있습니다.
let a_interface: number[] = [1, 2, 3, 4];
let ro_interface: ReadonlyArray<number> = a_interface;
// ro_interface[0] = 12; // 오류
// ro_interface.push(5); // 오류
// a_interface = ro_interface; // 오류: ReadonlyArray를 일반 배열에 할당할 수 없음
a_interface = ro_interface as number[]; // 타입 단언을 통해 할당은 가능

// -----------------------------------------------------------------------------
// 4. 함수 타입 (Function Types)
// -----------------------------------------------------------------------------
// 인터페이스는 함수의 시그니처(매개변수 타입, 반환 타입)를 정의하는 데에도 사용됩니다.
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
};
console.log("\n4. 함수 타입 인터페이스:", mySearch("hello world", "world"));

// -----------------------------------------------------------------------------
// 5. 인덱서블 타입 (Indexable Types)
// -----------------------------------------------------------------------------
// 객체의 인덱스 타입을 정의할 수 있습니다. (예: 배열, 딕셔너리)
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];
let myStr: string = myArray[0];
console.log("\n5. 인덱서블 타입:", myStr);

// -----------------------------------------------------------------------------
// 6. 클래스 타입 (Class Types)
// -----------------------------------------------------------------------------
// `implements` 키워드를 사용하여 클래스가 특정 인터페이스를 따르도록 강제할 수 있습니다.
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}

// -----------------------------------------------------------------------------
// 7. 인터페이스 확장 (Extending Interfaces)
// -----------------------------------------------------------------------------
// 인터페이스는 다른 인터페이스를 `extends`하여 확장할 수 있습니다.
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
console.log("\n7. 확장된 인터페이스:", square);

// -----------------------------------------------------------------------------
// 8. 하이브리드 타입 (Hybrid Types)
// -----------------------------------------------------------------------------
// 인터페이스는 함수이면서 동시에 추가적인 프로퍼티를 가지는 객체를 정의할 수 있습니다.
interface Counter {
  (start: number): string; // 함수 시그니처
  interval: number; // 프로퍼티
  reset(): void; // 메서드
}

function getCounter(): Counter {
  let counter = ((start: number) => {
    return `Started at ${start}`;
  }) as Counter;
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}

let counterInstance = getCounter();
counterInstance(10);
counterInstance.reset();
counterInstance.interval = 5.0;
