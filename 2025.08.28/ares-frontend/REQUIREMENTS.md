# Project Requirements & Setup Guide

이 문서는 `ares-frontend` 프로젝트의 개발 환경을 설정하고 실행하는 전체 과정을 안내합니다. 개발을 처음 시작하는 분들도 쉽게 따라 하실 수 있도록 각 단계에 대한 상세한 설명을 포함하고 있습니다.

## 0. 프로젝트 복제 (Clone)

가장 먼저, GitHub에 있는 프로젝트 소스 코드를 여러분의 컴퓨터로 복제(Clone)해야 합니다. 터미널(Terminal)을 열고 원하는 디렉토리로 이동한 후, 아래 명령어를 실행하세요.

```bash
git clone https://github.com/project-ares-interview/ares-frontend.git
```

명령어가 성공적으로 실행되면 `ares-frontend`라는 이름의 디렉토리가 생성됩니다. 이 디렉토리로 이동하여 다음 단계들을 진행합니다.

```bash
cd ares-frontend
```

## 1. 개요

본 프로젝트는 `React Native (Expo)`와 `TypeScript`를 기반으로 하는 크로스 플랫폼 모바일 애플리케이션입니다.

프로젝트의 목표는 모든 개발자가 동일하고 안정적인 환경에서 효율적으로 작업하는 것입니다. 이를 위해 특정 버전의 프로그래밍 언어와 도구를 사용하며, `mise`와 `yarn` 같은 도구를 통해 개발 환경을 일관되게 관리합니다.

---

## 2. 필수 도구 설치

프로젝트를 시작하기 위해 먼저 `mise`를 설치해야 합니다.

### 2.1. `mise` (런타임 매니저)

#### `mise`란 무엇인가요?

`mise`는 여러 프로젝트에서 사용하는 다양한 버전의 프로그래밍 언어(예: Node.js 24, Java 17)나 개발 도구를 관리해 주는 도구입니다. 이 도구를 사용하면 "제 컴퓨터에서는 잘 됐는데..."와 같은 문제를 방지하고 모든 팀원이 동일한 버전의 도구를 사용하도록 보장할 수 있습니다.

#### 플랫폼별 설치 방법

- **macOS / Linux (Homebrew 사용 시)**

    ```bash
    brew install mise
    ```

- **Linux / macOS (Shell 스크립트 사용 시)**

    ```bash
    curl https://mise.run | sh
    ```

    설치 후, 셸 설정 파일(`.zshrc`, `.bashrc` 등)에 `mise`를 활성화하는 라인을 추가하라는 안내가 나올 수 있습니다. 안내에 따라 설정해주세요.

- **Windows (PowerShell 사용 시)**

    ```bash
    # 셋 중 하나의 명령어를 사용하여 설치
    winget install jdx.mise

    scoop install mise

    choco install mise
    ```

    *참고: Windows에서는 `mise`가 아직 실험적인 기능일 수 있습니다. 문제가 발생하면 [공식 문서](https://mise.jdx.dev/getting-started.html)를 참고하세요.*

#### Windows PowerShell 설정 (필수)

`mise`를 설치한 후, PowerShell을 열 때마다 `mise`가 자동으로 실행되도록 설정해야 합니다.
이 설정을 통해 `mise`가 관리하는 도구(Node.js, yarn 등)들을 PowerShell에서 직접 사용할 수 있게 됩니다.

1. **사용자 환경 변수 작성**:
    PowerShell을 열고 아래 명령어를 입력하여 프로필 파일을 메모장으로 엽니다. 프로필 파일이 없다면 새로 만들어집니다.

    ```powershell
    $shimPath = "$env:USERPROFILE\AppData\Local\mise\shims"
    $currentPath = [Environment]::GetEnvironmentVariable('Path', 'User')
    $newPath = $currentPath + ";" + $shimPath
    [Environment]::SetEnvironmentVariable('Path', $newPath, 'User')
    ```

2. **PowerShell 재시작**:
    설정을 적용하기 위해 열려있는 모든 PowerShell 창을 닫고 새로 엽니다. 이제 `mise`가 관리하는 `node`나 `yarn` 같은 명령어를 터미널에서 바로 사용할 수 있습니다.

### 2.2. `yarn` (JavaScript 패키지 매니저)

#### `yarn`이란 무엇인가요?

`yarn`은 `Node.js` 프로젝트의 의존성(라이브러리, 패키지)을 관리하는 도구입니다. `package.json` 파일에 정의된 패키지들을 빠르고 안정적으로 설치해 줍니다.

#### 설치 방법

`yarn`은 `mise`를 통해 설치하고 관리합니다. 프로젝트 루트 디렉토리의 `mise.toml` 파일에 다음과 같이 `yarn`이 명시되어 있습니다.

```toml
[tools]
node = "24.7.0"
yarn = "latest"
```

따라서 별도의 설치 명령어는 필요하지 않으며, 다음 "3. 프로젝트 설정" 단계에서 `mise install` 명령어를 실행하면 `mise`가 `node`와 `yarn`을 자동으로 감지하여 명시된 버전을 설치해 줍니다.

---

## 3. 프로젝트 설정

필수 도구를 모두 설치했다면, 이제 프로젝트 코드를 실행할 준비를 합니다.

### 3.1. 런타임 및 도구 활성화

프로젝트 루트 디렉토리에서 아래 명령어를 실행하면, `mise`가 `mise.toml` 파일을 읽어 이 프로젝트에 필요한 정확한 버전의 `Node.js`와 `yarn`을 자동으로 설치하고 설정해 줍니다.

```bash
mise install
```

> 💡 **Tip**: `mise`를 셸과 통합(`mise activate zsh` 등)하면, 디렉토리 이동 시 자동으로 필요한 도구들을 활성화해주어 `mise install` 명령어를 매번 실행할 필요가 없습니다.

**버전 확인**

설정이 완료되었는지 확인하기 위해 각 도구의 버전을 출력해봅니다.

```bash
node -v
# 예상 출력: v24.7.0

yarn -v
# 예상 출력: (설치된 yarn 버전)
```

### 3.2. 의존성 설치

`yarn`을 사용하여 프로젝트 실행에 필요한 모든 라이브러리(`react-native`, `expo` 등)를 설치합니다. `yarn install` 명령어는 `package.json` 파일에 정의된 모든 라이브러리를 `node_modules` 디렉토리에 설치합니다.

```bash
yarn install
```

---

## 4. 애플리케이션 실행

모든 설정이 완료되었다면, 다음 명령어로 개발 서버를 실행할 수 있습니다.

```bash
yarn run start
```

### 실행 확인

서버가 성공적으로 실행되면, 터미널에 QR 코드가 나타납니다.

- **iOS 시뮬레이터**: 터미널에서 `i` 키를 누릅니다.
- **Android 에뮬레이터**: 터미널에서 `a` 키를 누릅니다.
- **실제 기기**: Expo Go 앱을 설치하고 터미널의 QR 코드를 스캔합니다.

시뮬레이터나 기기에서 앱이 성공적으로 실행되면, 개발 환경 설정이 완료된 것입니다!
