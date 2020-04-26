# NOMAD hackaton 출품작
목표: 한국 버전의 “GoodReads 클론” 만들기  
👉🏻 자세히 보기: https://hackathon.nomadcoders.co/ 

## 사이트주소  
http://ec2-15-165-203-193.ap-northeast-2.compute.amazonaws.com/

## 기능정리
![function](./doc/function.png)

## 기술스택
* Infra : EC2(ubuntu) STORAGE: AWS S3
* 개발 언어 : Nodejs
* Backend : Expressjs
* Frontend : Reacjs
* DBMS : mongoDB atlas


## 이외의 기술
* prettier를 통한 코드스타일 정리 (default 값으로 정리)
* Google 애널리틱스를 통한 접속자 수 확인
* ec2 우분투 인스턴스 사용 ftp는 filezila ssh는 윈도우10의 오픈ssh 사용


## How to Run
1) git clone this repository
2) npm install with "node": "12.13.1","npm": "6.13.4" (my env)
3) cd client & npm install
4) cd .. & make dev.js
5) make config/dev.js -> write google, awsS3 key
6) npm run dev

## 설계시 참고 사이트
1) 백엔드 설계 - https://velog.io/@city7310/%EB%B0%B1%EC%97%94%EB%93%9C%EA%B0%80-%EC%9D%B4%EC%A0%95%EB%8F%84%EB%8A%94-%ED%95%B4%EC%A4%98%EC%95%BC-%ED%95%A8-1.-%EC%BB%A8%ED%85%90%EC%B8%A0%EC%9D%98-%EB%8F%99%EA%B8%B0%EC%99%80-%EA%B0%9C%EC%9A%94

## Collaborators
[강은현](https://github.com/kangeunhyeon)

## 문의
Email : solone313@naver.com
