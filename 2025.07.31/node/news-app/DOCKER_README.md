# Docker를 이용한 Expo (React Native for Web) 프로젝트 실행 방법

이 문서는 Docker를 사용하여 Expo 프로젝트의 웹 버전을 실행하는 방법을 설명합니다.

## 사전 요구 사항

- [Docker](https://www.docker.com/get-started)

## 파일 설명

### `Dockerfile`

Expo 웹 애플리케이션을 위한 Docker 이미지를 빌드하는 방법을 정의합니다.

- **`FROM node:24`**: Node.js 24 버전을 기반으로 합니다.
- **`WORKDIR /app`**: 컨테이너 내의 작업 디렉토리를 `/app`으로 설정합니다.
- **`COPY package.json yarn.lock ./`**: 의존성 정의 파일을 복사합니다.
- **`RUN yarn install`**: `yarn.lock` 파일에 명시된 의존성을 설치합니다.
- **`COPY . .`**: 프로젝트의 모든 파일을 컨테이너로 복사합니다.
- **`RUN npm install -g expo-cli`**: Expo CLI를 전역으로 설치합니다.
- **`EXPOSE 8081`**: Expo 웹 개발 서버가 사용하는 8081 포트를 노출합니다.
- **`CMD ["expo", "start", "--web"]`**: Expo 개발 서버를 웹 모드로 시작합니다.

### `docker-compose.yml`

Docker Compose를 사용하여 `web` 서비스를 정의합니다.

- **`build: .`**: 현재 디렉토리의 `Dockerfile`을 사용하여 이미지를 빌드합니다.
- **`ports: - "8081:8081"`**: 호스트의 8081번 포트를 컨테이너의 8081번 포트와 매핑합니다.
- **`volumes: - .:/app - /app/node_modules`**: 호스트의 현재 디렉토리를 컨테이너의 `/app`과 동기화하여 코드 변경 사항을 반영합니다. `node_modules`는 호스트와 동기화하지 않고, 컨테이너 내부에 설치된 버전을 사용하도록 설정합니다.
- **`environment: - EXPO_DEV_SERVER_ORIGIN=http://localhost:8081`**: Expo 개발 서버의 주소를 설정합니다.

## 실행 방법

1.  프로젝트 루트 디렉토리(`2025.07.31/node/news-app`)에서 다음 명령어를 실행하여 Docker 컨테이너를 빌드하고 실행합니다.

    ```bash
    docker-compose up --build
    ```

2.  웹 브라우저에서 `http://localhost:8081`으로 접속하여 애플리케이션을 확인합니다.

## 중지 방법

터미널에서 `Ctrl + C`를 누르거나, 다음 명령어를 실행하여 컨테이너를 중지하고 제거합니다.

```bash
docker-compose down
```

