/**
 * @fileoverview TypeScript의 제네릭(Generics)에 대해 상세히 설명하는 예제 파일입니다.
 * 제네릭은 컴포넌트(함수, 클래스 등)가 다양한 타입을 처리할 수 있도록 하면서도
 * 타입 안정성을 잃지 않게 해주는 강력한 기능입니다.
 * 코드의 재사용성을 극대화하는 데 핵심적인 역할을 합니다.
 *
 * @see https://www.typescriptlang.org/docs/handbook/2/generics.html
 */

console.log("--- TypeScript 제네릭(Generics) ---");

// -----------------------------------------------------------------------------
// 1. 제네릭의 기본: Identity 함수
// -----------------------------------------------------------------------------
// 제네릭이 없다면, 다양한 타입을 처리하기 위해 any를 사용하거나 여러 함수를 만들어야 합니다.
function identityAny(arg: any): any {
    return arg; // any를 사용하면 타입 정보를 잃게 됨
}

// 제네릭을 사용하면, 함수가 호출될 때 전달된 인자의 타입을 그대로 반환 타입으로 지정할 수 있습니다.
// T는 타입 변수(type variable)로, 함수를 사용하는 시점에 결정됩니다.
function identity<T>(arg: T): T {
    return arg;
}

console.log("\n1. 제네릭 Identity 함수:");
// 사용 방법 1: 타입 인수를 명시적으로 전달
let genericOutput1 = identity<string>("myString");
console.log("  - 명시적 타입:", genericOutput1);

// 사용 방법 2: 타입 추론(type argument inference)
// 컴파일러가 인자를 보고 T의 타입을 자동으로 유추합니다.
let genericOutput2 = identity(123);
console.log("  - 타입 추론:", genericOutput2);


// -----------------------------------------------------------------------------
// 2. 제네릭 타입 변수 활용
// -----------------------------------------------------------------------------
// 제네릭을 사용하여 타입의 일부 정보를 활용할 수도 있습니다.
// 예를 들어, 제네릭 타입의 배열을 인자로 받을 수 있습니다.
function loggingIdentity<T>(arg: T[]): T[] {
    console.log("  - 배열 길이:", arg.length); // T가 배열이므로 .length 프로퍼티를 안전하게 사용 가능
    return arg;
}
loggingIdentity([1, 2, 3]);


// -----------------------------------------------------------------------------
// 3. 제네릭 인터페이스 (Generic Interfaces)
// -----------------------------------------------------------------------------
// 인터페이스에도 제네릭을 적용하여 재사용성을 높일 수 있습니다.
interface GenericIdentityFn<T> {
    (arg: T): T;
}

let myIdentity: GenericIdentityFn<number> = identity;
console.log("\n3. 제네릭 인터페이스:");
console.log("  - myIdentity(100):", myIdentity(100));


// -----------------------------------------------------------------------------
// 4. 제네릭 클래스 (Generic Classes)
// -----------------------------------------------------------------------------
// 클래스 역시 제네릭을 통해 다양한 타입을 다룰 수 있습니다.
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

// 숫자 타입으로 사용하는 경우
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

console.log("\n4. 제네릭 클래스:");
console.log("  - 숫자 더하기:", myGenericNumber.add(5, 10));

// 문자열 타입으로 사용하는 경우
let myGenericString = new GenericNumber<string>();
myGenericString.zeroValue = "";
myGenericString.add = function(x, y) { return x + y; };
console.log("  - 문자열 연결:", myGenericString.add("Hello, ", "World!"));


// -----------------------------------------------------------------------------
// 5. 제네릭 제약 조건 (Generic Constraints)
// -----------------------------------------------------------------------------
// 때로는 제네릭 타입이 특정 프로퍼티나 구조를 가지고 있다고 보장해야 할 때가 있습니다.
// 이럴 때 '제약 조건'을 사용합니다.
interface Lengthwise {
    length: number;
}

// T는 length 프로퍼티를 가진 타입이어야만 한다는 제약을 추가합니다.
function loggingIdentityWithConstraint<T extends Lengthwise>(arg: T): T {
    console.log("  - 제약 조건 길이:", arg.length); // 이제 .length가 항상 존재함을 보장
    return arg;
}

console.log("\n5. 제네릭 제약 조건:");
loggingIdentityWithConstraint({ length: 10, value: 3 }); // 성공
loggingIdentityWithConstraint("Hello"); // 성공 (string은 length 프로퍼티가 있음)
// loggingIdentityWithConstraint(123); // 오류: number는 length 프로퍼티가 없음


// -----------------------------------------------------------------------------
// 6. 제네릭 제약 조건에서 타입 매개변수 사용
// -----------------------------------------------------------------------------
// 한 타입 매개변수가 다른 타입 매개변수의 키를 포함하도록 제약할 수 있습니다.
// 객체에서 특정 키에 해당하는 프로퍼티를 안전하게 가져오는 함수 예제
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let vehicle = {
    brand: "Toyota",
    model: "Camry",
    year: 2022
};

console.log("\n6. 제네릭 제약에서 타입 매개변수 사용:");
console.log("  - brand:", getProperty(vehicle, "brand"));
console.log("  - year:", getProperty(vehicle, "year"));
// console.log(getProperty(vehicle, "color")); // 오류: "color"는 vehicle 객체의 키가 아님 