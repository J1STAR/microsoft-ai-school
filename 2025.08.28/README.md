### 📂 GitHub에서 보기: [project-ares-interview/ares-frontend](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.08.28/ares-frontend)

### 📂 Project 보기: [project-ares-interview/ares-frontend](https://github.com/project-ares-interview/ares-frontend)

# 📅 2025년 8월 28일: `ares-frontend` 프로젝트 기반 설계 및 환경 구축

## 📝 프로젝트 목표와 비전

본 프로젝트는 `ares-backend`와 함께 동작하는 **크로스플랫폼 모바일 애플리케이션**을 구축하는 것을 목표로 합니다. React Native와 Expo를 기반으로, iOS, Android, 그리고 Web에서 일관된 사용자 경험을 제공하는 것을 핵심 비전으로 삼고 있습니다.

단순히 화면을 구현하는 것을 넘어, 장기적인 관점에서 **유지보수가 용이하고 확장 가능한 아키텍처**를 설계하는 데 중점을 둡니다. 이를 위해 초기 단계에서는 개발 환경을 표준화하여 팀의 생산성을 극대화하고, 재사용 가능한 컴포넌트와 명확한 상태 관리 전략을 통해 견고한 기술적 기반을 마련하는 것을 최우선 과제로 삼았습니다.

---

## 🛠️ 개발 환경 전략: "모두가 동일한 출발선에서"

> "제 컴퓨터에서는 잘 돌아가는데, 왜 다른 팀원 PC에서는 오류가 날까요?"

이러한 문제를 원천적으로 방지하고, 새로운 팀원이 프로젝트에 합류했을 때 단 몇 분 안에 개발을 시작할 수 있도록, 우리는 개발 환경 표준화에 많은 노력을 기울였습니다.

### 1. 핵심 도구: `mise` 와 `yarn`

- **`mise` (런타임 및 도구 버전 관리자)**:
  - **선택 이유**: 팀원마다 다른 Node.js 버전은 예기치 않은 버그의 주된 원인입니다. `mise`는 `mise.toml` 설정 파일 하나로 "이 프로젝트는 반드시 Node.js 24.7.0 버전을 사용한다"고 명시하고 강제합니다. 이를 통해 모든 팀원이 100% 동일한 환경에서 개발을 시작하도록 보장하여, 환경 차이로 인한 문제를 사전에 완벽하게 차단합니다.

- **`Yarn` (JavaScript 패키지 관리자)**:
  - **선택 이유**: `Yarn`은 `yarn.lock` 파일을 통해 프로젝트가 의존하는 모든 라이브러리(패키지)의 버전을 정확하게 고정합니다. 이를 통해 모든 개발자가 동일한 버전의 라이브러리를 사용하게 되어, "내 컴퓨터에서만 되는" 상황을 방지하고 의존성 관리에 일관성을 부여합니다.

### 2. 프로젝트 설정 단계

1. **프로젝트 소스 코드 복제**:

    ```bash
    git clone https://github.com/project-ares-interview/ares-frontend.git
    cd ares-frontend
    ```

2. **개발 도구 자동 설치**:
    프로젝트 폴더에 들어서는 순간, `mise`가 `mise.toml` 파일을 감지하고 필요한 Node.js와 Yarn을 자동으로 설치하거나 해당 버전으로 전환합니다.

    ```bash
    mise install 
    ```

3. **의존성 설치**:
    `Yarn`을 사용하여 프로젝트에 필요한 모든 라이브러리를 설치합니다. 이 명령어는 `yarn.lock` 파일을 참고하여 모든 팀원이 동일한 버전의 패키지를 설치하도록 보장합니다.

    ```bash
    yarn install
    ```

---

## 🏛️ 아키텍처 설계: 지속 가능한 구조 만들기

효율적인 협업과 장기적인 유지보수를 위해 프로젝트의 구조를 신중하게 설계했습니다.

### 1. Expo Router 기반의 파일 시스템 라우팅

- **설계 의도**: 기존 React Native의 복잡한 내비게이션 설정을 단순화하고 웹 개발 경험과 유사하게 만들기 위해 Expo Router를 도입했습니다. `app` 디렉토리 안에 파일을 생성하면, 그 파일 경로가 곧바로 앱의 화면 주소(URL)가 됩니다. (예: `app/example.tsx` -> `/example` 화면)
- **기대 효과**: 이 직관적인 방식은 새로운 화면을 추가하거나 기존 구조를 파악하는 시간을 극단적으로 단축시켜 생산성을 높입니다.

### 2. 관심사 분리 (Separation of Concerns)

- `app/`: 앱의 각 화면(Screen)을 정의하는 라우팅의 중심입니다.
- `components/`: 버튼, 카드 등 앱 전역에서 재사용되는 UI 컴포넌트를 모아두는 곳입니다.
- `constants/`: 색상, 글꼴 크기 등 앱 전체에서 공유되는 상수 값을 관리합니다.
- `hooks/`: 여러 컴포넌트에서 공유될 수 있는 로직(예: API 호출)을 담는 커스텀 훅을 관리합니다.
- `i18n/`: 다국어 지원을 위한 설정과 번역 파일을 관리합니다.

이러한 명확한 역할 분리는 코드의 응집도를 높이고 다른 부분에 미치는 영향을 최소화하여, 유지보수와 기능 확장을 용이하게 만듭니다.

### 3. 일관된 UI/UX를 위한 `React Native Elements`
[React Native Elements](https://reactnativeelements.com/)

- **선택 이유**: 모든 버튼, 카드, 아이콘을 처음부터 만드는 것은 비효율적입니다. `React Native Elements`(@rneui)는 미리 디자인된 다양한 UI 컴포넌트들을 제공하여, 개발자가 디자인보다 비즈니스 로직에 집중할 수 있게 해줍니다.
- **기대 효과**: 앱 전체에 걸쳐 통일성 있는 디자인을 쉽게 적용할 수 있으며, 개발 속도를 크게 향상시킵니다.

### 4. 글로벌 사용자를 위한 다국어 지원 (i18n)

- **구현 전략**: `i18next`, `expo-localization`, `react-i18next`, `i18next`, `@react-native-async-storage/async-storage` 라이브러리를 사용하여 한국어와 영어를 기본으로 지원하는 다국어 시스템을 구축했습니다.
- **동작 방식**:
    1. 앱이 처음 실행되면 `expo-localization`을 통해 사용자의 기기 언어를 감지하여 자동으로 해당 언어로 UI를 보여줍니다.
    2. 사용자가 헤더의 버튼을 통해 직접 언어를 변경하면, 그 선택은 `AsyncStorage`에 저장되어 다음 실행 시에도 유지됩니다.
- **의의**: 초기 단계부터 다국어를 염두에 둔 설계는, 향후 글로벌 서비스로 확장할 수 있는 가능성을 열어두는 중요한 기술적 투자입니다.

### 심층 분석: 다국어 지원 시스템의 동작 원리

다국어 시스템은 단순히 텍스트를 번역하는 것을 넘어, 사용자의 언어 설정을 감지하고, 선택을 저장하며, 앱 전체에 일관되게 적용하는 유기적인 프로세스입니다. 우리 프로젝트의 시스템은 다음 세 가지 핵심 요소의 상호작용으로 이루어집니다.

#### 1. 설정의 중심: `i18n/index.ts`

이 파일은 다국어 기능의 '두뇌' 역할을 합니다. `i18next` 라이브러리를 설정하고, 언어를 감지하는 커스텀 로직을 정의합니다.

- **언어 리소스 정의**: 먼저, 앱이 지원할 언어와 각 언어별 번역 파일의 경로를 지정합니다.

    ```typescript
    // i18n/index.ts
    import translationEn from "./locales/en-US/translations.json";
    import translationKo from "./locales/ko-KR/translations.json";

    const resources = {
      en: { translation: translationEn },
      ko: { translation: translationKo },
    };
    ```

- **지능적인 언어 감지 (`languageDetector`)**: 이 커스텀 모듈은 앱이 시작될 때 어떤 언어를 보여줄지 결정하는 핵심 로직을 담고 있습니다.

    1. **사용자 선택 우선**: `AsyncStorage`에 사용자가 직접 선택한 언어(`@app_language`)가 저장되어 있는지 확인하고, 있다면 그 언어를 최우선으로 적용합니다.
    2. **기기 설정 존중**: 저장된 선택이 없다면, `expo-localization`을 통해 사용자의 스마트폰 기기 자체의 언어 설정을 가져옵니다.
    3. **기본값 설정**: 두 경우 모두 해당하지 않을 경우, 기본 언어인 한국어('ko')로 설정됩니다.

    ```typescript
    // i18n/index.ts
    const languageDetector: LanguageDetectorAsyncModule = {
      type: "languageDetector",
      async: true,
      detect: (callback: (lang: string) => void) => {
        AsyncStorage.getItem(LANGUAGE_KEY) // 1. 사용자 선택 확인
          .then((savedLanguage) => {
            if (savedLanguage) {
              callback(savedLanguage);
              return;
            }

            const deviceLocale = Localization.getLocales()[0]?.languageTag; // 2. 기기 설정 확인
            const languageCode = deviceLocale.split("-")[0];

            if (languageCode in resources) {
              callback(languageCode);
            } else {
              callback("ko"); // 3. 기본값 설정
            }
          })
      },
      // ...
    };
    ```

- **`i18next` 초기화 및 설정**: `languageDetector`가 완성된 후, `i18next` 인스턴스를 최종적으로 설정하고 초기화합니다. 이 과정은 여러 조각을 하나로 묶어 실제 동작하는 다국어 엔진을 만드는 과정입니다.

    ```typescript
    // i18n/index.ts
    i18n
      .use(languageDetector) // 1. 커스텀 언어 감지 모듈 탑재
      .use(initReactI18next) // 2. React/React Native 와의 연동
      .init({ // 3. 최종 설정
        resources,
        fallbackLng: { // 4. 예비 언어 설정
          "en-*": ["en"],
          "ko-*": ["ko"],
          default: ["ko"],
        },
        interpolation: {
          escapeValue: false, // 5. XSS 방지 기능 비활성화
        },
        react: {
          useSuspense: true, // 6. 로딩 처리 간소화
        },
      });
    ```

    1. **`.use(languageDetector)`**: 우리가 직접 만든 `languageDetector`를 `i18next`의 플러그인으로 사용하겠다고 선언합니다.
    2. **`.use(initReactI18next)`**: `i18next`를 React 환경(Hooks 등)에서 사용할 수 있도록 연결해주는 필수적인 과정입니다.
    3. **`.init({...})`**: 실제 설정을 적용하는 메소드입니다.
    4. **`fallbackLng`**: 만약 현재 언어의 번역 파일에 특정 `key`가 존재하지 않을 경우, 어떤 언어의 번역을 대신 보여줄지 정의합니다. 예를 들어, 영문 번역 파일에 "new_feature" 라는 키가 누락되었을 때, 한국어 번역이라도 보여주도록 설정할 수 있습니다. 이는 앱의 안정성을 높여줍니다.
    5. **`interpolation: { escapeValue: false }`**: React/React Native는 기본적으로 자체적인 XSS(Cross-Site Scripting) 방어 메커니즘을 가지고 있으므로, `i18next`의 중복 방지 기능을 비활성화합니다.
    6. **`react: { useSuspense: true }`**: 번역 파일이 로드되는 동안 잠시 로딩 상태를 보여줄 수 있도록 React Suspense와 연동하는 옵션입니다. 이는 더 나은 사용자 경험을 제공합니다.

#### 2. 사용자 인터페이스: `app/_layout.tsx`

이 파일은 사용자가 직접 언어를 변경하는 UI(버튼)와 그에 따른 로직을 구현합니다.

- **언어 변경 함수**: `changeLanguage` 함수는 사용자가 버튼을 클릭했을 때 호출됩니다. 이 함수는 두 가지 중요한 역할을 수행합니다.
    1. `i18n.changeLanguage(language)`: `i18next`의 상태를 변경하여 앱의 모든 텍스트를 선택된 언어로 즉시 다시 렌더링하도록 합니다.
    2. `AsyncStorage.setItem(...)`: 사용자의 선택을 기기에 저장하여, 다음 앱 실행 시에도 동일한 언어 설정이 유지되도록 합니다.

    ```tsx
    // app/_layout.tsx
    import AsyncStorage from "@react-native-async-storage/async-storage";
    import { useTranslation } from "react-i18next";

    export default function RootLayout() {
      const { i18n } = useTranslation();

      const changeLanguage = async (language: "en" | "ko") => {
        i18n.changeLanguage(language); // 1. 앱 언어 실시간 변경
        await AsyncStorage.setItem("@app_language", language); // 2. 사용자 선택 저장
      };

      // ... Header와 ButtonGroup UI 렌더링
    }
    ```

#### 3. 실제 적용: `app/index.tsx` (및 기타 화면)

실제 화면에서는 `react-i18next`가 제공하는 `useTranslation` 훅을 사용하여 번역된 텍스트를 손쉽게 가져올 수 있습니다.

- **`useTranslation` 훅**: 이 훅은 `t` 함수를 반환합니다.
- **`t` 함수**: `translations.json` 파일에 정의된 `key` 값(예: "welcome")을 인자로 받아, 현재 설정된 언어에 맞는 실제 텍스트(예: "환영합니다" 또는 "Welcome")를 반환합니다.

    ```tsx
    // app/index.tsx
    import { useTranslation } from "react-i18next";

    export default function Index() {
      const { t } = useTranslation(); // 훅 사용

      return (
        <View>
          {/* t 함수를 통해 번역된 텍스트 렌더링 */}
          <Text>{t("welcome")}</Text>
        </View>
      );
    }
    ```

---

## 🚀 초기 기능 구현: 아키텍처 검증하기

설계한 아키텍처가 실제로 어떻게 동작하는지 보여주고, 앞으로의 개발 방향에 대한 구체적인 예시를 제시하기 위해 몇 가지 핵심 화면을 구현했습니다.

### 1. `app/_layout.tsx`: 앱의 전체적인 틀

- **역할**: 앱의 모든 화면을 감싸는 최상위 레이아웃입니다. 모바일 기기의 상단 노치나 하단 바 영역을 침범하지 않도록 `SafeAreaProvider`를 사용하여 안전 영역을 확보합니다.
- **핵심 기능**:
  - 모든 화면에 공통적으로 표시되는 헤더(Header)를 구현했습니다.
  - 헤더 우측에는 앱의 언어를 동적으로 변경할 수 있는 언어 선택 버튼 그룹을 배치하여, 다국어 지원 기능이 어떻게 동작하는지 직관적으로 보여줍니다.

### 2. `app/index.tsx`: 앱의 첫인상, 홈 화면

- **역할**: 사용자가 앱을 실행했을 때 가장 먼저 마주하는 화면입니다.
- **구현 내용**: `i18next`를 통해 현재 설정된 언어에 맞춰 "환영합니다" 또는 "Welcome" 메시지를 표시합니다. 또한, Expo Router의 `Link` 컴포넌트를 사용하여 다른 화면(`Example` 페이지)으로 이동하는 내비게이션 기능을 구현했습니다.

### 3. `app/example.tsx`: UI 컴포넌트 쇼케이스

- **역할**: 이 화면은 단순한 예제 페이지를 넘어, 프로젝트의 '살아있는 디자인 시스템' 또는 '컴포넌트 카탈로그' 역할을 합니다.
- **구현 내용**: `React Native Elements`가 제공하는 다양한 카드(Card), 텍스트(Text), 버튼(Button), 이미지(Image) 컴포넌트들을 실제로 어떻게 조합하여 사용하는지 보여줍니다. 새로운 팀원은 이 페이지를 통해 프로젝트의 UI 스타일과 컴포넌트 사용법을 빠르게 학습할 수 있습니다.

---

## 💡 결과 및 요약 (Results & Summary)

`ares-frontend` 프로젝트의 초기 단계는 단순히 화면 몇 개를 만드는 것을 넘어, 장기적인 성공을 위한 기술적 토대를 마련하는 데 집중했습니다.

**주요 성과:**

1. **재현 가능한 개발 환경 구축:**
    - `mise`와 `yarn.lock`을 통해 모든 팀원이 OS나 개인 설정에 관계없이 100% 동일한 환경에서 개발을 시작할 수 있는 표준을 확립했습니다. 이는 협업의 효율성을 극대화하고 잠재적인 오류를 원천 차단합니다.

2. **확장성을 고려한 모던 아키텍처 설계:**
    - **파일 시스템 기반 라우팅:** Expo Router를 채택하여 라우팅 구조를 직관적이고 이해하기 쉽게 만들었습니다.
    - **관심사 분리:** 화면, 재사용 컴포넌트, 로직 등을 명확히 분리하여 코드의 유지보수성을 높이고, 향후 기능 추가 시 발생할 수 있는 부작용을 최소화했습니다.
    - **글로벌 스탠다드:** 초기 단계부터 다국어 지원(i18n) 시스템을 완벽하게 통합하여, 서비스의 글로벌 확장 가능성을 확보했습니다.

3. **설계 검증 및 실용적인 가이드라인 제시:**
    - 구현된 초기 화면들은 설계된 아키텍처가 실제로 잘 동작함을 증명하는 프로토타입입니다.
    - 특히 `example` 화면은 새로운 기능 개발 시 참고할 수 있는 '코드로 작성된 컨벤션' 역할을 하며, 프로젝트 전체의 코드 일관성을 유지하는 데 기여할 것입니다.

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact

<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items:center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>j.1star.0726@gmail.com</a>
