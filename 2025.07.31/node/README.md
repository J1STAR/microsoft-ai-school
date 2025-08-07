### 📂 GitHub에서 보기: [microsoft-ai-school/2025.07.31/node/news-app](https://github.com/J1STAR/microsoft-ai-school/tree/main/2025.07.31/node/news-app)

# 📅 2025년 7월 31일 - 8월 7일: React Native & Expo 기반 뉴스 애플리케이션

## 🖥️ 화면 예시

<img src="./results/news_page.png" alt="뉴스 페이지 스크린샷"/>

---

## 🛠️ 개발 환경 설정 및 실행

본 프로젝트는 `mise`, `Node.js`, `Yarn`을 사용한 개발 환경을 권장합니다.

### 1. 사전 준비: 개발 도구

-   **`mise`**: 다양한 프로그래밍 언어와 개발 도구의 버전을 프로젝트별로 손쉽게 관리해주는 도구입니다. 이 프로젝트에서는 `mise.toml` 파일을 통해 `node`의 버전을 명시하여, 모든 팀원이 동일한 Node.js 환경에서 개발을 진행하도록 보장합니다.
    -   **설치 가이드**: [공식 설치 문서](https://mise.jdx.dev/getting-started.html)를 참고하여 `mise`를 설치하세요.

-   **`Node.js`**: JavaScript 런타임 환경입니다. 이 프로젝트는 `24.4.1` 버전 사용을 기준으로 합니다. `mise`가 설치되어 있다면, 프로젝트 디렉토리 진입 시 자동으로 해당 버전이 활성화됩니다.
    -   **버전 확인**: `node -v`

-   **`Yarn`**: `npm`보다 빠르고 효율적인 의존성 관리를 제공하는 패키지 매니저입니다.
    -   **설치 가이드**: `npm install -g yarn` 또는 [공식 설치 문서](https://yarnpkg.com/getting-started/install)를 참고하세요.

### 2. 프로젝트 실행 단계

1.  **개발 환경 활성화**:
    프로젝트 루트 디렉토리에서 아래 명령어를 실행하면 `mise.toml`에 정의된 Node.js `24.4.1` 버전이 자동으로 활성화됩니다.
    ```bash
    mise use node@24.4.1
    ```

2.  **환경 변수 설정**:
    프로젝트 루트 디렉토리에 `.env` 파일을 생성하고, 백엔드 서버의 주소를 다음과 같이 입력합니다.
    ```
    EXPO_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
    ```

3.  **의존성 설치**:
    프로젝트 루트 디렉토리에서 `yarn`을 사용하여 `package.json`에 정의된 모든 패키지를 설치합니다.
    ```bash
    yarn install
    ```

4.  **Expo 서버 실행**:
    ```bash
    yarn start
    ```

5.  **앱 실행**:
    -   터미널에 QR 코드가 나타나면, Expo Go 앱(iOS) 또는 카메라(Android)로 스캔하여 디바이스에서 앱을 실행합니다.
    -   또는 터미널에서 `a`를 눌러 Android 에뮬레이터에서, `i`를 눌러 iOS 시뮬레이터에서 앱을 실행할 수 있습니다.
    -   `w`를 누르면 웹 브라우저에서 앱을 실행합니다.

> **⚠️ 주의:** 이 앱은 로컬 백엔드 서버와 통신하도록 설정되어 있습니다. 정상적인 데이터 조회를 위해서는 [Python 백엔드 프로젝트](../python)를 먼저 실행해야 합니다.

---

## 📝 프로젝트 목표

이번 프로젝트는 React Native와 Expo 프레임워크를 사용하여 Django 백엔드 서버와 통신하는 크로스 플랫폼(iOS, Android, Web) 뉴스 애플리케이션을 개발하는 것을 목표로 합니다. 최신 모바일 앱 개발 트렌드에 맞춰, 파일 기반 라우팅, 전역 상태 관리를 통한 인증 처리, 컴포넌트 기반 아키텍처 등 핵심 개념을 실습합니다.

- **Expo 프레임워크 활용**: Expo가 제공하는 다양한 도구와 서비스를 활용하여 네이티브 코드 작성 없이 JavaScript/TypeScript만으로 빠르게 모바일 앱을 개발하고 배포하는 과정을 익힙니다.
- **파일 기반 라우팅 이해**: `expo-router`를 사용하여, 파일 시스템 구조가 그대로 앱의 네비게이션 구조가 되는 직관적인 라우팅 방식을 학습합니다.
- **전역 상태 관리**: React Context API를 사용하여 앱 전체의 사용자 인증 상태를 일관되게 관리하고, 컴포넌트 간의 상태 공유 문제를 효율적으로 해결하는 방법을 실습합니다.
- **API 통신 및 데이터 관리**: 백엔드 REST API를 호출하여 데이터를 주고받으며, `fetch`와 React 훅을 사용하여 비동기 데이터를 컴포넌트의 상태와 동기화합니다.
- **컴포넌트 기반 UI 개발**: 재사용 가능한 UI 컴포넌트를 제작하고, Tamagui와 같은 UI 라이브러리를 활용하여 일관되고 반응성이 뛰어난 사용자 인터페이스를 효율적으로 구축합니다.

---

## 🏛️ 시스템 아키텍처

이 애플리케이션은 전형적인 클라이언트-서버 모델에서 클라이언트 역할을 수행하며, `AuthProvider`를 통해 전역적으로 사용자 인증 상태를 관리합니다.

1.  **앱 실행 및 세션 확인**: 앱이 실행되면, `AuthProvider`가 백엔드 서버(`.../api/v1/users/me`)로 요청을 보내 현재 유효한 세션이 있는지 확인하고 `isSignedIn` 상태를 설정합니다.
2.  **조건부 라우팅**: `useEffect` 훅이 `isSignedIn` 상태를 감지하여, 로그인 상태이면 메인 화면으로, 비로그인 상태이면 로그인/회원가입 화면으로 자동 리디렉션합니다.
3.  **사용자 인증**: 사용자가 로그인/회원가입 폼을 제출하면, `AuthProvider`의 `signIn` 또는 `signUp` 함수가 백엔드 API와 통신하여 인증을 처리하고, 성공 시 `isSignedIn` 상태를 `true`로 변경합니다.
4.  **인증 기반 데이터 요청**: 로그인된 사용자가 특정 페이지(예: 게시글 목록)에 접근하면, 앱은 CSRF 토큰과 함께 백엔드에 데이터(`.../api/v1/posts`)를 요청합니다.
5.  **UI 렌더링**: API로부터 받은 데이터를 컴포넌트의 상태에 저장하고, 변경된 상태에 따라 UI를 리렌더링합니다.

```
+-------------------------------------------+      +------------------------------+
|           📱 React Native App             |      |       🌐 Django Backend     |
+-------------------------------------------+      +------------------------------+
|                                           |      |                              |
| [1. Navigate to News Tab]                 |      |                              |
|           |                               |      |                              |
|           v                               |      |                              |
| [2. Render Screen & useEffect]            |      |                              |
|           |                               |      |   [ API Server ]             |
|           v                               |      |                              |
| [3. fetch('/api/v1/news')] ----------------------->  [4. GET /api/v1/news]      |
|                                           |      |           |                  |
|                                           |      |           v                  |
|           +----------------------------------------- [5. Respond with JSON]     |
|           v                               |      |                              |
| [6. Receive Response & Parse]             |      |                              |
|           |                               |      |                              |
|           v                               |      |                              |
| [7. setState(newsList)]                   |      |                              |
|           |                               |      |                              |
|           v                               |      |                              |
| [8. Re-render UI with News]               |      |                              |
|                                           |      |                              |
+-------------------------------------------+      +------------------------------+
```

---

## 📁 파일 구성 및 설명

| 경로 | 파일명/디렉토리 | 설명 |
| :--- | :--- | :--- |
| `app/` | | `expo-router`의 파일 기반 라우팅을 위한 핵심 디렉토리입니다. 파일 구조가 URL 경로가 됩니다. |
| | [`_layout.tsx`](https://github.com/J1STAR/microsoft-ai-school/blob/main/2025.07.31/node/news-app/app/_layout.tsx) | 앱 전체의 최상위 레이아웃입니다. `AuthProvider` 등 전역 컨텍스트 프로바이더와 스택 네비게이션을 설정합니다. |
| | [`sign-in.tsx`](https://github.com/J1STAR/microsoft-ai-school/blob/main/2025.07.31/node/news-app/app/sign-in.tsx) | 로그인 화면 컴포넌트입니다. |
| | [`sign-up.tsx`](https://github.com/J1STAR/microsoft-ai-school/blob/main/2025.07.31/node/news-app/app/sign-up.tsx) | 회원가입 화면 컴포넌트입니다. |
| `providers/` | | React Context API를 사용한 전역 상태 관리 로직이 위치합니다. |
| | [`auth.tsx`](https://github.com/J1STAR/microsoft-ai-school/blob/main/2025.07.31/node/news-app/providers/auth.tsx) | 사용자 인증 상태(`isSignedIn`, `csrfToken`)와 관련 함수(`signIn`, `signUp`, `signOut`)를 제공하는 `AuthProvider`를 정의합니다. |
| `hooks/` | | `useColorScheme`, `useAuth` 등 재사용 가능한 커스텀 React 훅을 정의합니다. |
| `components/` | | 앱 전반에서 재사용되는 커스텀 컴포넌트들을 모아둔 디렉토리입니다. |
| `constants/` | | 색상, 스타일 등 앱 전체에서 공유되는 상수 값들을 정의합니다. |
| `assets/` | | 이미지, 폰트 등 정적 에셋 파일들을 관리합니다. |
| `.env` | | `EXPO_PUBLIC_API_BASE_URL`과 같은 환경 변수를 정의하는 파일입니다. |
| [`package.json`](https://github.com/J1STAR/microsoft-ai-school/blob/main/2025.07.31/node/news-app/package.json) | | 프로젝트의 메타데이터와 의존성, 실행 스크립트를 정의합니다. |

---

## 📅 2025년 8월 4일: 백엔드 API 엔드포인트 변경 대응

### API 호출 URL 수정

백엔드 서버의 API 엔드포인트가 `/api` 접두사를 포함하도록 변경됨에 따라, 클라이언트 앱의 API 호출 URL도 수정되었습니다.

-   **기존**: `http://127.0.0.1:8000/v1/news`
-   **변경**: `http://127.0.0.1:8000/api/v1/news`

[**`app/news.tsx` (변경 후)**](https://github.com/J1STAR/microsoft-ai-school/blob/main/2025.07.31/node/news-app/app/news.tsx)
```tsx
useEffect(() => {
    // 백엔드 API에 GET 요청을 보내 뉴스 데이터를 가져옵니다.
    fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/v1/news`)
        .then((res) => res.json())
        .then((responseJson) => {
            // 가져온 데이터로 newsList 상태를 업데이트합니다.
            setNewsList(responseJson.data);
        })
        .catch((error) => {
            console.error("Failed to fetch news:", error);
        });
}, []);
```
-   **환경 변수 도입**: 하드코딩된 API 기본 URL (`http://127.0.0.1:8000`) 대신 `.env` 파일에 `EXPO_PUBLIC_API_BASE_URL`을 정의하고, 코드 내에서는 `process.env.EXPO_PUBLIC_API_BASE_URL`을 사용하여 이를 참조합니다. 이를 통해 개발, 스테이징, 프로덕션 등 다양한 환경에 따라 API 서버 주소를 유연하게 변경할 수 있습니다.
-   **계층적 URL 경로 적용**: 백엔드의 모든 API 경로에 `/api` 접두사가 추가됨에 따라, `AuthProvider` 및 각 화면에서 `fetch` 요청 URL을 `/api/v1/...` 형식으로 업데이트했습니다.

---

## 📅 2025년 8월 4일 ~ 8월 5일: 사용자 인증 및 회원가입 기능 구현 / Post 목록, 작성 페이지 구현

### 1. 전역 상태 관리를 통한 인증 아키텍처 구축

`React Context API`를 사용하여 앱 전반의 사용자 인증 상태를 관리하는 아키텍처를 구현했습니다. 이를 통해 여러 컴포넌트에서 인증 상태를 공유하고 관련 로직을 일관되게 처리할 수 있습니다.

-   **`AuthProvider` 및 `AuthContext`** ([`providers/auth.tsx`](https://github.com/J1STAR/microsoft-ai-school/blob/main/2025.07.31/node/news-app/providers/auth.tsx)):
    -   `AuthContext`는 `signIn`, `signUp`, `signOut` 함수와 `isSignedIn`, `isLoading` 상태 값을 포함하는 컨텍스트 객체를 생성합니다.
    -   `AuthProvider`는 이 컨텍스트의 `Provider` 컴포넌트로서, 실제 함수 로직과 상태 관리를 담당합니다.
        -   `useEffect` 훅을 사용하여 컴포넌트가 마운트될 때, 백엔드의 `/api/v1/users/me` 엔드포인트를 호출하여 서버에 저장된 세션을 기반으로 사용자의 로그인 상태를 확인하고 `isSignedIn` 상태를 초기화합니다.
        -   `signIn`, `signUp` 함수는 각각 백엔드의 로그인, 회원가입 API를 호출하고, 성공 시 `isSignedIn` 상태가 `true`로 설정합니다.

-   **`useAuth` 커스텀 훅** ([`hooks/useAuth.tsx`](https://github.com/J1STAR/microsoft-ai-school/blob/main/2025.07.31/node/news-app/hooks/useAuth.tsx)):
    -   `useContext(AuthContext)`를 직접 사용하는 대신 `useAuth` 훅을 만들어 한 단계 추상화했습니다. 컴포넌트에서는 이 훅을 호출하여 간결하게 `AuthContext`의 값들에 접근할 수 있습니다.

-   **전역 적용** ([`app/_layout.tsx`](https://github.com/J1STAR/microsoft-ai-school/blob/main/2025.07.31/node/news-app/app/_layout.tsx)):
    -   앱의 최상위 레이아웃 컴포넌트에서 `AuthProvider`로 전체 앱을 감싸줍니다. 이를 통해 앱 내의 모든 화면과 컴포넌트가 `useAuth` 훅을 통해 동일한 인증 컨텍스트를 공유하게 됩니다.

### 2. 로그인 및 회원가입 페이지 구현

백엔드 인증 API와 연동하여 사용자가 계정을 생성하고 로그인할 수 있는 화면들을 구현했습니다.

-   **로그인 페이지** ([`app/sign-in.tsx`](https://github.com/J1STAR/microsoft-ai-school/blob/main/2025.07.31/node/news-app/app/sign-in.tsx)):
    -   이메일과 비밀번호 입력을 위한 `Input` 컴포넌트와 `signIn` 함수를 호출하는 `Button` 컴포넌트로 구성됩니다.
    -   `useEffect` 훅을 사용하여 `useAuth`의 `isSignedIn` 상태를 구독하고, 이 값이 `true`로 변경되면 `expo-router`의 `router.replace('/')`를 호출하여 사용자를 메인 화면으로 이동시킵니다.

-   **회원가입 페이지** ([`app/sign-up.tsx`](https://github.com/J1STAR/microsoft-ai-school/blob/main/2025.07.31/node/news-app/app/sign-up.tsx)):
    -   **단계별 폼 렌더링**: 각 입력 필드(`name`, `email`, `password`, `confirmPassword`)의 유효성 상태(`isNameValid` 등)를 `useState`로 관리합니다. 이전 단계의 필드가 유효할 때만(`isNameValid &&`, `isNameValid && isEmailValid && ...`) 다음 단계의 입력 필드 컴포넌트가 조건부로 렌더링됩니다.
    -   **실시간 유효성 검사**: `useEffect` 훅을 사용하여 각 입력 값이 변경될 때마다 정해진 유효성 검사 함수(예: `validateEmail`)를 실행하고, 그 결과를 유효성 상태에 반영합니다. 유효하지 않을 경우, 입력 필드 하단에 에러 메시지를 조건부로 표시합니다.
    -   **회원가입 처리 및 자동 로그인**: 모든 필드의 유효성 검사가 통과되면 'Sign Up' 버튼이 활성화됩니다. 버튼 클릭 시 `useAuth`의 `signUp` 함수를 호출하며, `signUp` 함수 내부 로직에 의해 회원가입 성공 후 `isSignedIn` 상태가 `true`로 설정되어 자동 로그인 및 메인 화면 이동이 처리됩니다.

### 3. 게시글(Post) 기능 구현

인증된 사용자를 위한 게시글 조회 및 작성 기능을 구현했습니다.

-   **게시글 목록 화면** ([`app/posts.tsx`](https://github.com/J1STAR/microsoft-ai-school/blob/main/2025.07.31/node/news-app/app/posts.tsx)):
    -   `useAuth` 훅을 통해 `isSignedIn` 상태를 확인하고, `useEffect` 훅 내에서 이 값이 `true`일 때만 백엔드의 `/api/v1/posts` API를 `fetch`를 통해 호출합니다.
    -   API 응답으로 받은 게시글 목록 데이터를 `useState`로 관리되는 `posts` 상태 변수에 저장하고, `map` 함수를 사용하여 각 게시글을 화면에 렌더링합니다.
    -   'Write Post' 버튼 클릭 시, `expo-router`의 `router.push('/posts/write')`를 호출하여 게시글 작성 화면으로 이동합니다.

-   **게시글 작성 화면** ([`app/posts/write.tsx`](https://github.com/J1STAR/microsoft-ai-school/blob/main/2025.07.31/node/news-app/app/posts/write.tsx)):
    -   `title`과 `content`를 입력받기 위한 `Input` 컴포넌트들로 구성됩니다. 각 `Input`의 `value`와 `onChangeText`는 `useState`로 관리되는 `title`, `content` 상태와 바인딩됩니다.
    -   '작성 완료' 버튼 클릭 시, `handleCreatePost` 함수가 실행됩니다. 이 함수는 `fetch`를 사용하여 `/api/v1/posts/` 엔드포인트에 `POST` 요청을 보냅니다.
    -   요청 본문에는 `JSON.stringify`를 통해 `title`과 `content` 상태 값을 담고, `X-CSRFToken` 헤더를 포함하여 CSRF 공격을 방지합니다.
    -   API 요청이 성공하면 `router.push('/posts')`를 통해 사용자를 다시 게시글 목록 화면으로 이동시킵니다.

---

## 📅 2025년 8월 6일: 게시글 상세 조회 및 수정 기능 구현

백엔드에 게시글 상세 API가 추가됨에 따라, 프론트엔드에서도 관련 기능을 구현하여 사용자 경험을 개선했습니다.

### 1. 동적 라우팅을 이용한 상세 및 수정 페이지 구현

`expo-router`의 동적 라우팅(dynamic routing) 기능을 활용하여, 각 게시글에 대한 고유한 상세 페이지와 수정 페이지를 생성했습니다.

-   **파일 구조**:
    -   `app/posts/[id].tsx`: 게시글 목록에서 특정 게시글을 선택했을 때, 해당 게시글의 `id`를 URL 파라미터로 받아 상세 내용을 보여주는 페이지입니다.
    -   `app/posts/[id]/edit.tsx`: 상세 페이지에서 '수정' 버튼을 눌렀을 때, 동일한 `id`를 받아 해당 게시글의 내용을 수정하는 폼을 제공하는 페이지입니다.

-   **라우팅 및 파라미터 전달**:
    -   게시글 목록 화면에서 각 게시글 컴포넌트를 누르면(`onPress`), `expo-router`의 `router.push` 함수가 다음과 같이 호출됩니다.
    -   URL 경로에 동적으로 `id`를 포함시켜, 사용자를 해당 게시글의 상세 페이지로 이동시킵니다.

    [**`app/posts.tsx`**](https://github.com/J1STAR/microsoft-ai-school/blob/main/2025.07.31/node/news-app/app/posts.tsx)
    
    ```tsx
    <YStack
      onPress={() =>
        router.push({
          pathname: "/posts/[id]",
          params: { id: post.id },
        })
      }
    >
      {/* ... */}
    </YStack>
    ```

### 2. 게시글 상세 정보 조회 기능

[**`app/posts/[id].tsx`**](https://github.com/J1STAR/microsoft-ai-school/blob/main/2025.07.31/node/news-app/app/posts/[id].tsx)

상세 페이지에서는 `useLocalSearchParams` 훅을 사용하여 URL로부터 `id` 값을 추출하고, 이를 이용해 백엔드 API를 호출하여 게시글의 전체 데이터를 가져옵니다.

-   **API 호출**: `useEffect` 훅 내부에서 `fetch`를 사용하여 `GET /api/v1/posts/${id}`를 호출하고, 응답 데이터를 `post` 상태에 저장합니다.
-   **작성자 정보 표시**: 백엔드로부터 받은 데이터에 `created_at`(작성일)과 `updated_at`(수정일)이 포함되어, 이를 `toLocaleString()` 메소드를 사용해 사용자 친화적인 형식으로 변환하여 화면에 표시합니다.
-   **조건부 UI 렌더링 (권한 확인)**:
    -   `useAuth()` 훅을 통해 현재 로그인된 사용자 정보(`currentUser`)를 가져옵니다.
    -   `isAuthor` 변수에 `currentUser.id === post.author_id` 비교 결과를 저장합니다.
    -   이 `isAuthor` 값이 `true`일 경우에만, 즉 현재 사용자가 게시글 작성자일 때만 '수정' 버튼이 화면에 보이도록 조건부로 렌더링(`{isAuthor && <Button>...`}`)하여 인가되지 않은 수정을 방지합니다.

```tsx
export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const { currentUser } = useAuth();
  
  // ... useEffect post fetch ...

  const isAuthor = currentUser && post && currentUser.id === post.author_id;

  return (
    <YStack>
      {/* ... post content ... */}
      <Text>작성일자: {new Date(post.created_at).toLocaleString()}</Text>
      <Text>수정일자: {new Date(post.updated_at).toLocaleString()}</Text>
      
      <XStack>
        <Button>목록으로</Button>
        {isAuthor && <Button onPress={handleEdit}>수정</Button>}
      </XStack>
    </YStack>
  );
}
```

### 3. 게시글 수정 기능 및 권한 검증

[**`app/posts/[id]/edit.tsx`**](https://github.com/J1STAR/microsoft-ai-school/blob/main/2025.07.31/node/news-app/app/posts/[id]/edit.tsx)

수정 페이지는 상세 페이지와 유사하게 `id`를 기반으로 기존 데이터를 불러오지만, 데이터를 '수정'하여 서버에 다시 보내는 데 초점을 맞춥니다.

-   **데이터 로딩 및 권한 검증**:
    -   페이지가 로드될 때 `useEffect`를 통해 게시글 데이터를 가져온 후, `useState`로 관리되는 `title`과 `content` 상태를 API 응답값으로 초기화하여 입력 필드에 기존 내용을 채워줍니다.
    -   **데이터를 불러온 직후, 프론트엔드 단에서 한 번 더 사용자 권한을 검증**합니다. 만약 현재 로그인한 사용자의 ID(`currentUser.id`)와 게시글 작성자의 ID(`data.data.author_id`)가 일치하지 않으면, 사용자에게 "수정할 권한이 없습니다."라는 경고를 표시하고 즉시 이전 페이지로 돌려보냅니다. 이는 URL을 직접 입력하여 수정 페이지에 접근하는 경우를 방지하는 중요한 보안 장치입니다.

-   **데이터 업데이트**:
    -   '수정 완료' 버튼을 누르면 `handleUpdatePost` 함수가 실행됩니다.
    -   이 함수는 `fetch`를 사용하여 `PUT /api/v1/posts/${id}/` 엔드포인트에 `PUT` 요청을 보냅니다. `body`에는 수정된 `title`과 `content`를, `headers`에는 `X-CSRFToken`을 포함하여 안전하게 데이터를 전송합니다.
    -   업데이트가 성공하면, `router.push`를 통해 수정된 내용이 반영된 해당 게시글의 상세 페이지로 사용자를 이동시킵니다.

```tsx
export default function EditPostScreen() {
  // ...
  useEffect(() => {
    const fetchPost = async () => {
      // ...
      if (response.ok) {
        const data = await response.json();
        // 프론트엔드에서 2차 권한 검증
        if (currentUser && data.data.author_id !== currentUser.id) {
          alert("수정할 권한이 없습니다.");
          router.replace("/posts");
        }
        // ...
      }
    };
    fetchPost();
  }, [id, isSignedIn, currentUser]);

  const handleUpdatePost = async () => {
    // ...
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/v1/posts/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({ title, content }),
      }
    );
    // ...
  };
  // ...
}
```

---

### 📅 2025년 8월 7일: JWT 인증 도입 및 상태 관리 시스템 개편

기존의 세션 기반 인증 방식에서 벗어나, 모바일 환경에 더 적합하고 확장성이 뛰어난 JWT(JSON Web Token) 기반 인증 시스템으로 전면 개편했습니다. 이를 위해 상태 관리 라이브러리 `Zustand`와 보안 스토리지 `expo-secure-store`를 도입하여 앱의 아키텍처를 크게 개선했습니다.

#### 1. 새로운 시스템 아키텍처

JWT 인증 도입으로 클라이언트의 아키텍처가 다음과 같이 변경되었습니다. 더 이상 서버 세션에 의존하지 않고, 클라이언트가 자체적으로 토큰을 관리하고 API 요청 시 첨부합니다.

1.  **로그인 및 토큰 저장**: 사용자가 로그인하면, 서버로부터 `access_token`과 `refresh_token`을 발급받습니다. 클라이언트는 이 토큰들을 `Zustand` 스토어에 저장하고, `expo-secure-store`를 통해 디바이스의 안전한 공간에 영속적으로 보관합니다.
2.  **API 요청 시 토큰 첨부**: 인증이 필요한 API를 호출할 때, `api` 유틸리티 함수가 `Zustand` 스토어에서 `access_token`을 자동으로 가져와 `Authorization: Bearer <token>` 헤더에 담아 요청을 보냅니다.
3.  **토큰 기반 상태 관리**: `useAuth` 훅은 이제 `Zustand` 스토어의 토큰 존재 여부를 기반으로 사용자의 로그인 상태를 판단합니다.

#### 2. 주요 파일 구성 변경

| 경로 | 파일명/디렉토리 | 설명 |
| :--- | :--- | :--- |
| `store/` | `session.ts` | **(신규)** `Zustand`를 사용하여 JWT 토큰과 사용자 정보를 관리하는 전역 세션 스토어입니다. `persist` 미들웨어를 통해 `expo-secure-store`와 연동됩니다. |
| `utils/` | `api.ts` | **(신규)** 모든 `fetch` 요청을 감싸는 래퍼 함수입니다. API 요청 시 자동으로 `Authorization` 헤더에 Access Token을 추가하는 역할을 담당합니다. |
| `providers/` | `auth.tsx` | **(수정)** 내부 로직이 세션 기반에서 `Zustand` 스토어를 사용하는 방식으로 변경되었습니다. `signIn` 함수는 토큰을 스토어에 저장하고, `signOut`은 스토어를 비우는 역할을 합니다. |
| `app/` | `index.tsx` | **(수정)** `useAuth` 훅에서 가져온 `session.user` 정보의 유무에 따라 로그인/로그아웃 상태의 UI를 동적으로 렌더링하도록 수정되었습니다. |


#### 3. 핵심 코드 변경 사항

-   **안전한 토큰 저장을 위한 스토어 구현 (`store/session.ts`)**:
    `Zustand`의 `persist` 미들웨어와 `expo-secure-store`를 결합하여, 플랫폼(Web/Mobile)에 따라 적절한 스토리지에 토큰을 안전하게 저장하는 로직을 구현했습니다.

    ```typescript
    const storage: StateStorage = {
      setItem: (name, value) => {
        if (Platform.OS === 'web') {
          return localStorage.setItem(name, value);
        }
        return SecureStore.setItemAsync(name, value);
      },
      // ... getItem, removeItem 구현
    };

    const useSessionStore = create<SessionState>()(
      persist(
        (set) => ({ /* ... state and actions ... */ }),
        {
          name: 'session-storage',
          storage: createJSONStorage(() => storage),
        },
      ),
    );
    ```

-   **API 요청 자동화 (`utils/api.ts`)**:
    `fetch`를 감싸는 `api` 함수를 만들어, 모든 요청에 `Authorization` 헤더를 자동으로 추가함으로써 코드 중복을 제거하고 유지보수성을 높였습니다.

    ```typescript
    const api = async (url: string, options: RequestInit = {}): Promise<Response> => {
      const { accessToken } = useSessionStore.getState();
      // ... 헤더 추가 로직 ...
      const response = await fetch(url, { ...options, headers });
      return response;
    };
    ```

-   **로그인 상태에 따른 UI 분기 처리 (`app/index.tsx`)**:
    메인 화면에서 `useAuth` 훅을 통해 `session` 객체를 가져와, `user` 정보의 존재 여부로 로그인 상태를 판단하고 그에 맞는 UI를 보여줍니다.

    ```tsx
    const { session, signOut } = useAuth();
    const { user } = session;

    // ...
    {user ? (
      <YStack>
        <H1>Welcome, {user.name}!</H1>
        <Text>Email: {user.email}</Text>
        <Button onPress={() => signOut()}>Logout</Button>
      </YStack>
    ) : (
      <Paragraph>Please log in</Paragraph>
    )}
    ```

#### 4. 🖥️ 화면 결과 (2025년 8월 7일)

**로그인 및 메인 화면**

-   **로그인 전 메인페이지**: 앱 실행 시 처음으로 보게 되는 화면입니다. 로그인/회원가입 버튼이 표시됩니다.
    <img src="./results/2025-08-07/1_메인페이지_로그인전.png" alt="로그인 전 메인페이지" width="400"/>
-   **로그인 페이지**: 이메일과 비밀번호를 입력하여 로그인을 시도하는 화면입니다.
    <img src="./results/2025-08-07/2_로그인페이지.png" alt="로그인 페이지" width="400"/>
-   **로그인 후 메인페이지**: 로그인에 성공하면 사용자 이름과 정보가 표시되며, 'Posts' 메뉴와 'Logout' 버튼이 활성화됩니다.
    <img src="./results/2025-08-07/3_메인페이지_로그인후.png" alt="로그인 후 메인페이지" width="400"/>

**뉴스 및 게시글 기능 화면**

-   **뉴스 목록 페이지**: 외부 RSS 피드에서 가져온 뉴스 목록을 보여주는 화면입니다.
    <img src="./results/2025-08-07/4_뉴스목록페이지.png" alt="뉴스 목록 페이지" width="400"/>
-   **게시글 목록 페이지**: 사용자들이 작성한 게시글 목록을 최신순으로 보여주는 화면입니다.
    <img src="./results/2025-08-07/5_글목록페이지.png" alt="글 목록 페이지" width="400"/>

**게시글 CRUD 기능 화면**

-   **글 작성 페이지**: 새로운 게시글의 제목과 내용을 입력하여 서버에 등록하는 화면입니다.
    <img src="./results/2025-08-07/6_글작성페이지.png" alt="글 작성 페이지" width="400"/>
-   **글 상세보기 페이지**: 특정 게시글의 전체 내용과 작성일, 수정일을 보여주는 화면입니다. 작성자일 경우 '수정' 버튼이 보입니다.
    <img src="./results/2025-08-07/7_글상세보기페이지.png" alt="글 상세보기 페이지" width="400"/>
-   **글 수정 페이지**: 기존 게시글의 제목과 내용을 수정하여 서버에 업데이트하는 화면입니다.
    <img src="./results/2025-08-07/8_글수정페이지.png" alt="글 수정 페이지" width="400"/>

---

## 💡 학습 정리

이번 프로젝트를 통해 React Native와 Expo를 사용하여 현대적인 모바일 애플리케이션을 구축하는 핵심적인 과정을 경험했습니다. 컴포넌트 기반 아키텍처, 선언적인 라우팅, 비동기 데이터 처리, 그리고 일관된 디자인 시스템 적용 등, 실제 프로덕션 앱 개발에 필수적인 기술과 개념들을 종합적으로 학습할 수 있었습니다. 특히 백엔드 API와 연동하여 동적인 데이터를 화면에 표시하는 과정을 통해 풀스택 개발의 전체적인 흐름을 이해하는 계기가 되었습니다.

---

## 👨‍💻 About Me

**HanByeol Jang (장한별)**

<a href="https://github.com/J1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/hanbyeol-jang-44174a199/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

## Contact
<a href="mailto:j.1star.0726@gmail.com" style="display:flex; align-items:center; gap:8px"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>j.1star.0726@gmail.com</a>
