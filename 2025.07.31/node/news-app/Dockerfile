# 1. 기반 이미지 설정
FROM node:24

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 의존성 파일 복사 및 설치
# 소스코드보다 의존성을 먼저 설치하여 Docker 빌드 캐시를 효율적으로 활용합니다.
COPY package.json yarn.lock ./
RUN yarn install

# 4. 소스코드 복사
COPY . .

# 5. 포트 노출
# Expo web의 기본 포트인 8081을 노출합니다.
EXPOSE 8081

# 6. 애플리케이션 실행
# 프로젝트에 내장된 Expo CLI를 사용하여 앱을 시작합니다.
CMD ["yarn", "start", "--web"]
