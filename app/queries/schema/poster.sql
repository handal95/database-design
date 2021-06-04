movie_code VARCHAR(16) NOT NULL,
poster_sq INTEGER(4) NOT NULL,

poster_image BLOB,

CONSTRAINT POSTER_PK
    PRIMARY KEY(movie_code, poster_sq),

CONSTRAINT MOVIE_CODE_FK 
    FOREIGN KEY(movie_code) REFERENCES movie(movie_code)
