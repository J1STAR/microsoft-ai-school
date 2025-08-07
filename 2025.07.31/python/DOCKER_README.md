# Docker를 이용한 Django 프로젝트 실행 방법

이 문서는 Docker를 사용하여 Django 프로젝트를 실행하는 방법을 설명합니다.

## 사전 요구 사항

- [Docker](https://www.docker.com/get-started)

## 파일 설명

### `Dockerfile`

Django 애플리케이션을 위한 Docker 이미지를 빌드하는 방법을 정의합니다.

- **`FROM python:3.11-bookworm-slim`**: 가벼운 Python 3.11 이미지를 기반으로 합니다.
- **`WORKDIR /app`**: 컨테이너 내의 작업 디렉토리를 `/app`으로 설정합니다.
- **`ENV PYTHONDONTWRITEBYTECODE 1`**: Python이 `.pyc` 파일을 생성하지 않도록 설정합니다.
- **`ENV PYTHONUNBUFFERED 1`**: 로그가 버퍼링 없이 즉시 출력되도록 합니다.
- **`RUN pip install uv`**: Python 패키지 매니저인 `uv`를 설치합니다.
- **`COPY pyproject.toml uv.lock ./`**: 의존성 정의 파일을 복사합니다.
- **`RUN uv sync --no-cache`**: `uv.lock` 파일에 명시된 의존성을 설치합니다.
- **`COPY . .`**: 프로젝트의 모든 파일을 컨테이너로 복사합니다.
- **`CMD ["gunicorn", "--bind", "0.0.0.0:8000", "project.wsgi:application"]`**: Gunicorn을 사용하여 애플리케이션을 프로덕션 환경처럼 실행합니다.

### `docker-compose.yml`

Docker Compose를 사용하여 `web` 서비스를 정의합니다.

- **`build: .`**: 현재 디렉토리의 `Dockerfile`을 사용하여 이미지를 빌드합니다.
- **`ports: - "8000:8000"`**: 호스트의 8000번 포트를 컨테이너의 8000번 포트와 매핑합니다.
- **`volumes: - .:/app`**: 호스트의 현재 디렉토리를 컨테이너의 `/app` 디렉토리와 동기화하여, 코드 변경 사항이 즉시 반영되도록 합니다.
- **`command: python manage.py runserver 0.0.0.0:8000`**: 개발 목적으로 Django 내장 개발 서버를 실행합니다.

## 실행 방법

1.  프로젝트 루트 디렉토리(`2025.07.31/python`)에서 다음 명령어를 실행하여 Docker 컨테이너를 빌드하고 실행합니다.

    ```bash
    docker-compose up --build
    ```

2.  웹 브라우저에서 `http://localhost:8000`으로 접속하여 애플리케이션을 확인합니다.

## 중지 방법

터미널에서 `Ctrl + C`를 누르거나, 다음 명령어를 실행하여 컨테이너를 중지하고 제거합니다.

```bash
docker-compose down
```

