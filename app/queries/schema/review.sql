movie_code VARCHAR(16) NOT NULL,
review_sq INTEGER(4) NOT NULL,

account_id VARCHAR(16) NOT NULL, 
review_title VARCHAR(64),
comment VARCHAR(1024),
score FLOAT,

CONSTRAINT REVIEW_PK
    PRIMARY KEY(movie_code, review_sq),

CONSTRAINT MOVIE_CODE_FK 
    FOREIGN KEY(movie_code) REFERENCES movie(movie_code),

CONSTRAINT ACCOUNT_ID_FK
    FOREIGN KEY(account_id) REFERENCES account(account_id)
