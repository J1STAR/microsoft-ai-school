### 📂 GitHub에서 보기: [microsoft-ai-school/2025.07.11](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.07.11)

# 📅 2025년 7월 11일: 모던 JavaScript 핵심 개념 정복

## 📝 학습 목표

이번 학습에서는 JavaScript의 근간을 이루는 핵심 문법부터 ES6 이후에 도입된 모던 기능까지, JavaScript의 전반적인 개념을 체계적으로 이해하고 실습하는 것을 목표로 합니다. 각 주제별로 상세한 설명과 코드 예제를 담은 `.js` 스크립트 파일을 작성하고, 이를 학습용 웹 페이지(`.html`)로 정리하여 학습 자료를 완성합니다.

- **JavaScript 기본기 다지기**: 변수(`var`, `let`, `const`), 데이터 타입, 연산자, 제어문 등 프로그래밍의 기초를 복습하고 JavaScript 환경에 맞게 재정립합니다.
- **함수와 스코프 마스터하기**: 함수 선언문, 표현식, 화살표 함수 등 다양한 함수 정의 방법을 익히고, 실행 컨텍스트와 스코프 체인, 클로저의 동작 원리를 깊이 있게 학습합니다.
- **객체 지향 프로그래밍(OOP) 이해**: 프로토타입 기반의 상속 메커니즘을 이해하고, ES6 클래스(Class) 문법을 활용하여 생성자, 메서드, 상속, 캡슐화를 구현하는 방법을 배웁니다.
- **모듈 시스템 활용**: ES6 모듈(`import`/`export`)을 사용하여 코드를 여러 파일로 분리하고, 재사용성과 유지보수성을 높이는 방법을 실습합니다.
- **ES6+ 고급 개념 학습**: 유일한 식별자를 만드는 심볼(Symbol), 타입스크립트의 아이디어를 차용한 인터페이스 패턴 등 JavaScript의 고급 주제들을 다룹니다.
- **동적 웹 페이지 생성**: `highlight.js`와 같은 외부 라이브러리를 CDN으로 연동하여, 코드 예제를 보기 좋게 시각화하는 방법을 학습합니다.

---

## 🖼️ 프로젝트 개요

본 프로젝트는 JavaScript의 각 핵심 주제를 심도 있게 다루는 **학습 스크립트 시리즈**와, 이를 웹에서 편하게 확인할 수 있는 **온라인 문서**를 제작하는 것을 목표로 합니다.

1.  **JavaScript 개념별 스크립트 (`.js` 파일)**: `javascript_basic.js`, `javascript_functions.js`, `javascript_classes.js` 등 각 파일은 특정 주제에 대한 상세한 설명과 실행 가능한 코드 예제를 담고 있습니다. 각 파일은 그 자체로 하나의 완결된 학습 자료 역할을 합니다.

이 프로젝트는 순수 JavaScript 코드 작성 능력과 함께, 작성된 코드를 활용하여 유용한 학습 콘텐츠를 효율적으로 생산하는 과정을 모두 경험할 수 있도록 설계되었습니다.

---

## 📁 파일 구성 및 설명

| 파일명                                                                                            | 설명                                                                                                           | 공식 문서 |
| :------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------- | :--- |
| [`javascript_basic.js`](./javascript_basic.js) / [`html`](./javascript_basic.html)                | 변수, 데이터 타입, 연산자, 제어문 등 JavaScript의 가장 기본적인 문법을 정리합니다.                             | [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide) |
| [`javascript_functions.js`](./javascript_functions.js) / [`html`](./javascript_functions.html)    | 함수 선언문, 표현식, 화살표 함수, 콜백, IIFE 등 다양한 함수 선언 방식과 활용법을 다룹니다.                     | [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Functions) |
| [`javascript_classes.js`](./javascript_classes.js) / [`html`](./javascript_classes.html)          | ES6 클래스 문법, 생성자, 상속, getter/setter, 정적 멤버, private 필드 등을 설명합니다.                         | [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes) |
| [`javascript_prototypes.js`](./javascript_prototypes.js) / [`html`](./javascript_prototypes.html) | 생성자 함수, 프로토타입 체인, `__proto__`와 `prototype`의 관계 등 프로토타입 상속을 심도 있게 다룹니다.        | [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) |
| [`javascript_scopes.js`](./javascript_scopes.js) / [`html`](./javascript_scopes.html)             | 전역, 함수, 블록 스코프의 차이점과 호이스팅, 렉시컬 스코핑, 클로저의 개념을 설명합니다.                        | [MDN](https://developer.mozilla.org/ko/docs/Glossary/Scope) |
| [`javascript_hoisting.js`](./javascript_hoisting.js) / [`html`](./javascript_hoisting.html)       | 변수 및 함수 선언이 스코프 상단으로 끌어올려지는 호이스팅의 동작 원리와 TDZ를 설명합니다.                  | [MDN](https://developer.mozilla.org/ko/docs/Glossary/Hoisting) |
| [`javascript_modules.js`](./javascript_modules.js) / [`html`](./javascript_modules.html)          | ES6 모듈 시스템인 `import`와 `export`를 사용하여 코드를 구성하는 방법을 예시로 보여줍니다.                     | [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules) |
| [`javascript_interfaces.js`](./javascript_interfaces.js) / [`html`](./javascript_interfaces.html) | JavaScript에서 덕 타이핑(Duck Typing)과 클래스를 활용하여 인터페이스와 유사한 패턴을 구현하는 방법을 다룹니다. | [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Working_with_Objects) |
| [`javascript_symbols.js`](./javascript_symbols.js) / [`html`](./javascript_symbols.html)          | ES6에 추가된 원시 타입인 Symbol의 개념과 고유한 프로퍼티 키로서의 활용법을 설명합니다.                         | [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Symbol) |
| [`typescript_basic.ts`](./typescript_basic.ts) / [`html`](./typescript_basic.html)                | TypeScript의 기본 타입, 인터페이스, 클래스, 제네릭 등 핵심 문법을 정리합니다.                  | [TS 핸드북](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) |
| [`typescript_generics.ts`](./typescript_generics.ts) / [`html`](./typescript_generics.html)      | TypeScript의 제네릭(Generics)에 대해 심도 있게 다루며, 제약 조건과 활용 사례를 설명합니다.                 | [TS 핸드북](https://www.typescriptlang.org/docs/handbook/2/generics.html) |
| [`typescript_interfaces.ts`](./typescript_interfaces.ts) / [`html`](./typescript_interfaces.html) | TypeScript 인터페이스의 다양한 활용법(객체, 함수, 클래스, 확장)을 상세히 다룹니다. | [TS 핸드북](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces) |
| `package.json`, `yarn.lock`                                                                       | 프로젝트에서 사용된 패키지(typescript, ts-node) 정보와 의존성을 관리하는 파일입니다.                           | - |
| `README.md`                                                                                       | 본 학습 내용에 대한 정리 문서입니다.                                                                           | - |

---

## 🚀 주요 학습 내용 및 결과

### 1. JavaScript 핵심 개념 스크립트 작성

각 `.js` 파일은 특정 주제에 대해 깊이 있는 설명과 다양한 예제 코드를 포함하고 있습니다. 예를 들어, `javascript_prototypes.js` 파일은 JavaScript 객체 모델의 근간이 되는 프로토타입 체인의 동작 원리를 단계별로 설명합니다.

```javascript
// javascript_prototypes.js의 일부
// -----------------------------------------------------------------------------
// 3. 프로토타입 체인 (Prototype Chain)
// -----------------------------------------------------------------------------
// 객체에서 속성이나 메서드를 찾을 때, 해당 객체에 없다면 __proto__를 통해
// 연결된 부모 프로토타입 객체로 거슬러 올라가며 순차적으로 찾습니다.
// 이 연결 구조를 프로토타입 체인이라고 합니다.

function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Person의 프로토타입에 메서드 추가
Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name}`);
};

const john = new Person("John", 30);

// john 객체에는 hasOwnProperty 메서드가 없지만,
// 프로토타입 체인을 따라 Object.prototype에서 찾아 실행합니다.
// john -> Person.prototype -> Object.prototype -> null
console.log("\n3. 프로토타입 체인:");
console.log("  - john.hasOwnProperty('name'):", john.hasOwnProperty("name")); // true
console.log("  - john.hasOwnProperty('greet'):", john.hasOwnProperty("greet")); // false
```

### 2. 학습 페이지 자동 생성 및 시각화

작성된 `.js` 파일의 코드와 주석을 기반으로, 각 주제를 설명하는 HTML 페이지를 생성했습니다. 이 페이지들은 통일된 스타일과 구조를 가지며, 코드 가독성을 높이기 위해 `highlight.js` 라이브러리를 적용하여 구문 강조(Syntax Highlighting) 기능을 구현했습니다.

이 과정을 통해, 잘 구조화된 소스 코드가 어떻게 그 자체로 훌륭한 문서가 될 수 있는지, 그리고 자동화 도구를 활용하여 어떻게 효율적으로 콘텐츠를 재생산할 수 있는지를 실습했습니다.

![javascript_classes.html 실행 결과](./results/javascript_classes.png)
_(결과물 예시 화면)_

```html
<!-- javascript_classes.html의 일부 -->
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>JavaScript - 클래스 (Classes)</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-light.min.css"
    />
    <style>
      /* ... CSS 스타일 ... */
    </style>
  </head>
  <body>
    <div class="container">
      <h1>JavaScript 클래스 (Classes)</h1>
      <!-- ... 본문 내용 ... -->
      <h2>2. 클래스 상속 (Inheritance)</h2>
      <p>
        <code>extends</code> 키워드를 사용하여 다른 클래스의 기능을 상속받을 수
        있습니다. 자식 클래스는 부모 클래스의 생성자를 호출하기 위해
        <code>super()</code>를 사용해야 합니다.
      </p>
      <pre><code class="language-javascript">class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // 부모 클래스의 생성자 호출
        this.breed = breed;
    }

    speak() {
        // 부모의 메서드를 호출하고, 기능을 확장할 수 있습니다.
        super.speak();
        console.log(`${this.name} barks.`);
    }
}

const myDog = new Dog("Buddy", "Golden Retriever");
myDog.speak();
// Buddy makes a noise.
// Buddy barks.
</code></pre>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <script>
      hljs.highlightAll();
    </script>
  </body>
</html>
```

---

## 💡 학습 정리

이번 세션을 통해 모던 JavaScript의 핵심적인 개념들을 체계적으로 정리하고 문서화하는 경험을 했습니다.

- **개념의 명확화**: 각 주제를 `.js` 파일로 분리하고 상세한 주석을 작성하는 과정에서, 막연하게 알고 있던 개념들을 명확하고 구조적으로 재정립할 수 있었습니다.
- **프로토타입과 클래스의 연결고리**: JavaScript의 프로토타입 기반 상속이 어떻게 ES6 클래스라는 '문법적 설탕(Syntactic Sugar)'으로 발전했는지, 그 내부 동작 원리를 함께 이해할 수 있었습니다.
- **콘텐츠 재사용성**: 잘 작성된 소스 코드(`*.js`)는 단순히 프로그램을 실행하는 것을 넘어, 그 자체로 훌륭한 학습 자료가 될 수 있으며, 약간의 자동화(`*.html` 생성)를 통해 다양한 형태로 재가공될 수 있음을 확인했습니다.

결론적으로, JavaScript의 동작 원리를 깊이 있게 파고들면서 동시에, 지식을 효과적으로 정리하고 전달하는 문서화의 중요성을 함께 학습하는 유익한 시간이었습니다.

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact

<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items:center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>j.1star.0726@gmail.com</a>
