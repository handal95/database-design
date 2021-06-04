session_uid VARCHAR(16) NOT NULL,

screen_code VARCHAR(16) NOT NULL,
movie_code VARCHAR(16) NOT NULL,
subtitle_category VARCHAR(16) NOT NULL,
session_date DATE,
session_round NUMBER(2),
session_datetime DATE,

CONSTRAINT MOVIE_SESSION_PK
    PRIMARY KEY(session_uid),

CONSTRAINT SCREEN_CODE_FK 
    FOREIGN KEY(screen_code) REFERENCES screen(screen_code),

CONSTRAINT MOVIE_CODE_FK
    FOREIGN KEY(movie_code) REFERENCES movie(movie_code),

CONSTRAINT TICKET_UID_FK 
    FOREIGN KEY(ticket_uid) REFERENCES ticket(ticket_uid)

