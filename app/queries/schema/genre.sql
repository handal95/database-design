movie_code VARCHAR(16) NOT NULL,
genre_sq NUMBER(4, 0) NOT NULL
    CONSTRAINT genre_sq_ck CHECK(genre_sq > 0),

genre_name VARCHAR(32) NOT NULL,

CONSTRAINT GENRE_PK
    PRIMARY KEY(movie_code, genre_sq),

CONSTRAINT MOVIE_CODE_FK 
    FOREIGN KEY(movie_code) REFERENCES MOVIE(movie_code)