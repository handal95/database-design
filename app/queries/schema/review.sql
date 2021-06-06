movie_code VARCHAR(16) NOT NULL,
review_sq NUMBER(4, 0) NOT NULL
    CONSTRAINT REVIEW_SQ_CK CHECK(review_sq >= 0),

account_id VARCHAR(16) NOT NULL, 
review_title VARCHAR(64) NOT NULL,
review_detail VARCHAR(1024) NOT NULL,
score FLOAT NOT NULL
    CONSTRAINT REVIEW_SCORE_CK CHECK(score >= 0.0 && scroe <= 5),

CONSTRAINT REVIEW_PK
    PRIMARY KEY(movie_code, review_sq),

CONSTRAINT REVIEW_MOVIE_CODE_FK 
    FOREIGN KEY(movie_code) REFERENCES movie(movie_code),

CONSTRAINT REVIEW_ACCOUNT_ID_FK
    FOREIGN KEY(account_id) REFERENCES account(account_id)
