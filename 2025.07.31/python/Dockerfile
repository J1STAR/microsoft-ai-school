# Step 1: 공식 Python 런타임 환경을 부모 이미지로 사용합니다.
# 'slim' 버전은 경량화된 Debian 기반 이미지로, 배포에 적합합니다.
FROM python:3.11-slim

# Step 2: 컨테이너 내 작업 디렉토리를 '/app'으로 설정합니다.
# 이후의 모든 명령어(COPY, RUN, CMD)는 이 디렉토리 내에서 실행됩니다.
WORKDIR /app

# Step 3: Python 환경 변수를 설정하여 최적화합니다.
# - PYTHONDONTWRITEBYTECODE=1: .pyc 파일을 생성하지 않아 컨테이너 용량을 절약합니다.
# - PYTHONUNBUFFERED=1: Python의 출력이 버퍼링 없이 즉시 터미널로 전달되어,
#   컨테이너 로그를 실시간으로 확인할 수 있습니다.
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Step 4: Python 패키지 관리 도구인 'uv'를 설치합니다.
RUN pip install uv

# Step 5: 의존성 정의 파일들을 컨테이너에 복사합니다.
# 'pyproject.toml'과 'uv.lock' 파일을 먼저 복사하여,
# 소스 코드가 변경되더라도 의존성 설치 레이어는 캐시를 재사용할 수 있도록 합니다.
COPY pyproject.toml uv.lock ./

# Step 6: 'uv'를 사용하여 가상 환경에 의존성을 설치합니다.
# 'uv sync'는 '.venv' 디렉토리에 'uv.lock'에 명시된 패키지들을 설치합니다.
RUN uv sync --no-cache

# Step 7: 현재 디렉토리의 모든 소스 코드를 컨테이너의 작업 디렉토리('/app')로 복사합니다.
COPY . .

# Step 8: (신규) 호스트의 가상환경 폴더가 복사되었을 경우를 대비해 강제로 삭제합니다.
# 이는 Windows에서 Docker를 사용할 때 발생할 수 있는 OS간 파일 시스템 충돌을 방지합니다.
RUN rm -rf .venv

# Step 9: 컨테이너가 8000번 포트에서 수신 대기하도록 Docker 엔진에 알립니다.
EXPOSE 8000

# Step 10: 컨테이너가 시작될 때 실행할 기본 명령어를 정의합니다.
CMD ["uv", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
