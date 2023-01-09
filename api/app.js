const express = require('express');
const expressSanitizer = require('express-sanitizer');

// fs and https 모듈 가져오기
const https = require('https');
const fs = require('fs');

// certificate와 private key 가져오기
// ------------------- STEP 2
const options = {
  key: fs.readFileSync('./config/key.pem'),
  cert: fs.readFileSync('./config/cert.pem'),
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use('/', express.static('public'));

const PORT = 8084;

// http 서버는 8000번 포트로 실행
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// https 의존성으로 certificate와 private key로 새로운 서버를 시작
https.createServer(options, app).listen(8084, () => {
  console.log(`HTTPS server started on port 8084`);
});
