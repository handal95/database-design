session_uid VARCHAR(16) NOT NULL,

screen_code VARCHAR(16) NOT NULL,
movie_code VARCHAR(16) NOT NULL,
session_date DATE,
session_round NUMBER(2, 0),
session_datetime DATE,

CONSTRAINT MOVIE_SESSION_PK
    PRIMARY KEY(session_uid),

CONSTRAINT MOVIE_SESSION_SCREEN_CODE_FK 
    FOREIGN KEY(screen_code) REFERENCES screen(screen_code),

CONSTRAINT MOVIE_SESSION_MOVIE_CODE_FK
    FOREIGN KEY(movie_code) REFERENCES movie(movie_code)
