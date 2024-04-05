# 베이스 이미지 선택 (Node.js 버전에 맞게 선택)
FROM node:20.11.1

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 종속성 설치
RUN npm install

# 프로젝트 파일 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 컨테이너 실행 시 실행될 명령어
CMD ["npm", "run", "start:prod"]