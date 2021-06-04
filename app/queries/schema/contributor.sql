movie_code VARCHAR(16) NOT NULL,
crew_code VARCHAR(16) NOT NULL,

main_role VARCHAR(32),
sub_role VARCHAR(32),

CONSTRAINT CONTRIBUTOR_PK 
    PRIMARY KEY(crew_code, movie_code),

CONSTRAINT MOVIE_CODE_FK 
    FOREIGN KEY(movie_code) REFERENCES movie(movie_code),

CONSTRAINT CREW_CODE_FK 
    FOREIGN KEY(crew_code) REFERENCES movie(crew_code)
