movie_code VARCHAR(16) NOT NULL,
poster_sq NUMBER(4, 0) NOT NULL
    CONSTRAINT POSTER_SQ_CK CHECK(poster_sq >= 0),

poster_image BLOB,

CONSTRAINT POSTER_PK
    PRIMARY KEY(movie_code, poster_sq),

CONSTRAINT POSTER_MOVIE_CODE_FK 
    FOREIGN KEY(movie_code) REFERENCES movie(movie_code)
