CREATE DATABASE nwitter;

CREATE TABLE nwitter.usertbl -- 회원 테이블
( user_id  			CHAR(100) NOT NULL PRIMARY KEY, -- 사용자 아이디(PK)
  user_password		CHAR(100) NOT NULL, -- 사용자 비밀번호
  user_displayname  VARCHAR(100) -- 이름
);

select * from usertbl;

CREATE TABLE nwitter.nweettbl( -- 트윗 테이블
  nweet_num		INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nweet_text	CHAR(100), -- 트윗 내용
  user_id		CHAR(100), -- 작성자 아이디
  user_displayname	CHAR(100), -- 작성자 닉네임
  created_at	DATETIME, -- 작성시간
  attachment_url CHAR(100), -- 첨부파일 주소
  like_it	INT -- 좋아요
);

drop table usertbl;
select * from usertbl;

