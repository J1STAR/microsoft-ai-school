/**
 * @fileoverview JavaScript의 커링(Currying)에 대해 설명하는 예제 파일입니다.
 * 커링은 여러 개의 인자를 받는 함수를, 인자를 하나씩 받는 여러 개의 함수로 변환하는 기술입니다.
 * 이를 통해 함수를 재사용하고, 코드의 가독성과 조합성을 높이는 함수형 프로그래밍 기법입니다.
 *
 * @see https://ko.javascript.info/currying-partials
 */

console.log("--- JavaScript 커링(Currying) ---");

// -----------------------------------------------------------------------------
// 1. 커링의 기본 개념
// -----------------------------------------------------------------------------
/*
 * 커링은 f(a, b, c)처럼 여러 인자를 받는 함수를 f(a)(b)(c)와 같이 단일 인자를 받는
 * 함수들의 체인으로 바꾸는 변환 과정입니다.
 */
console.log("\n1. 커링의 기본 개념:");

// 일반적인 함수
function multiply_normal(a, b, c) {
  return a * b * c;
}
console.log("  - 일반 함수 호출:", multiply_normal(2, 3, 4));

// 커링 함수
function multiply_curried(a) {
  return function (b) {
    return function (c) {
      return a * b * c;
    };
  };
}

const curriedResult = multiply_curried(2)(3)(4);
console.log("  - 커링 함수 호출:", curriedResult);

// -----------------------------------------------------------------------------
// 2. 커링과 부분 적용 (Partial Application)
// -----------------------------------------------------------------------------
/*
 * 커링의 가장 큰 장점은 '부분 적용'을 통해 함수의 일부 인자를 미리 고정하여
 * 새로운 함수를 만드는 것입니다. 이는 코드의 재사용성을 극대화합니다.
 */
console.log("\n2. 커링과 부분 적용:");

// 화살표 함수를 이용한 커링
const add = (a) => (b) => (c) => a + b + c;

// 첫 번째 인자(10)를 미리 적용하여 'add10'이라는 새로운 함수를 생성
const add10 = add(10);
console.log("  - 부분 적용 함수 생성 (add10):", "add(10)");

// 이제 'add10' 함수를 재사용하여 다양한 연산을 수행
const result1 = add10(20)(30); // 10 + 20 + 30
console.log("  - add10(20)(30) 결과:", result1);

const result2 = add10(5)(15); // 10 + 5 + 15
console.log("  - add10(5)(15) 결과:", result2);

// -----------------------------------------------------------------------------
// 3. 실용적인 활용 사례: 로깅 함수
// -----------------------------------------------------------------------------
/*
 * 부분 적용을 활용하여 특정 기능이 미리 구성된 함수를 만드는 실용적인 예제입니다.
 */
console.log("\n3. 실용적인 활용 사례: 로깅 함수:");

const createLogger = (level) => (time) => (message) =>
  `[${level}] [${time}] ${message}`;

// 로그 레벨을 미리 적용하여 새로운 로거 함수들을 생성
const infoLogger = createLogger("INFO");
const warnLogger = createLogger("WARN");
const errorLogger = createLogger("ERROR");

console.log("  - 로그 레벨에 따라 특화된 로거 함수 생성");

// 시간을 적용하여 더 구체적인 로거 생성
const infoLoggerAtTime = infoLogger(new Date().toLocaleTimeString());
const warnLoggerAtTime = warnLogger(new Date().toLocaleTimeString());

console.log("  - 현재 시간에 특화된 로거 함수 생성");

// 최종 메시지를 전달하여 로그 출력
console.log(infoLoggerAtTime("애플리케이션이 시작되었습니다."));
console.log(warnLoggerAtTime("메모리 사용량이 임계치에 도달했습니다."));

// -----------------------------------------------------------------------------
// 4. 일반 함수를 커링 함수로 변환하기
// -----------------------------------------------------------------------------
/*
 * lodash 라이브러리의 _.curry와 같은 헬퍼 함수를 직접 구현해볼 수 있습니다.
 * 이 헬퍼 함수는 일반 함수를 받아서 커링된 함수로 반환합니다.
 */
console.log("\n4. 커링 변환 헬퍼 함수:");

function curry(func) {
  return function curried(...args) {
    /*
     * func.length는 함수가 기대하는 인자의 개수를 의미합니다.
     * 전달된 인자(...args)의 수가 기대치보다 많거나 같으면, 즉시 함수를 실행합니다.
     */
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      /*
       * 인자가 부족하면, 다음에 올 인자들과 현재 인자들을 합쳐서 다시 시도하는
       * 새로운 함수를 반환합니다. (부분 적용)
       */
      return function (...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

// 3개의 인자를 받는 일반 함수
function sum(a, b, c) {
  return a + b + c;
}

// curry 헬퍼를 사용하여 sum 함수를 커링 버전으로 변환
const curriedSum = curry(sum);

console.log("  - curry(sum)(1)(2)(3):", curriedSum(1)(2)(3));
console.log("  - curry(sum)(1, 2)(3):", curriedSum(1, 2)(3));
console.log("  - curry(sum)(1, 2, 3):", curriedSum(1, 2, 3)); 