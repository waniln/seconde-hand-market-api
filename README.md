# seconde-hand-market-api
중고거래 플랫폼의 백엔드 REST API 서버입니다.

## 🛠 Tech Stack 
- **Runtime**:Node.js
- **Framework**:Express.js
- **Database**:MariaDB
- **Storage**: AWS S3(이미지 업로드)
- **Auth**: JWT

## 📌 주요 기능 
- 회원가입/ 로그인 (JWT 인증)
- 상품 등록/ 조회/ 수정/ 삭제
- 이미지 업로드 (AWS S3)
- 채팅 (구매자 ↔ 판매자)
- 찜하기 / 거래 상태 관리

## 📁 프로젝트 구조
   ```
   src/
   ├── config/         # DB, S3 설정
   ├── controllers/    # 요청/응답 처리
   ├── middlewares/    # 인증, 유효성 검사, 파일 업로드
   ├── models/         # DB 쿼리
   ├── routes/         # API 라우팅
   └── types/          # TypeScript 타입 선언
   ```

## 🚀 실행 방법
   
### 1. 패키지 설치
```bash
npm install
```

### 2. 환경변수 설정
`.env` 파일 생성 후 아래 내용 입력:
```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=seconde_hand_market
JWT_SECRET=_your_jwt_secret
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_kry
AWS_REGION=ap-southeast-2
AWS_BUCKET_NAME=your_bucket_name
```

### 3. 서버 실행
```bash
npm run dev
```

## 📋 API 명세

| Method | URL | 설명 | 인증 |
|--------|-----|------|------|
| POST | /users/register | 회원가입 | ❌ |
| POST | /users/login | 로그인 | ❌ |
| POST | /products | 상품 등록 | ✅ |
| GET | /products | 상품 목록 조회 | ❌ |
| GET | /products/:id | 상품 상세 조회 | ❌ |
| PUT | /products/:id | 상품 수정 | ✅ |
| DELETE | /products/:id | 상품 삭제 | ✅ |
| POST | /wishes/:productId | 찜하기/취소 | ✅ |
| GET | /wishes | 내 찜 목록 | ✅ |
| GET | /categories | 카테고리 목록 | ❌ |
| POST | /categories | 카테고리 추가 | ✅ |
| POST | /chats/:productId | 채팅방 생성 | ✅ |
| GET | /chats | 내 채팅방 목록 | ✅ |
| POST | /chats/:chatId/messages | 메시지 전송 | ✅ |
| GET | /chats/:chatId/messages | 메시지 조회 | ✅ |
| POST | /upload | 이미지 업로드 | ✅ |