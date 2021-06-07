session_uid NUMBER(16, 0) NOT NULL,
seat_uid NUMBER(16, 0) NOT NULL,

ticket_uid NUMBER(16, 0) NOT NULL,
reserve_status VARCHAR(16) NOT NULL,

CONSTRAINT RESERVE_PK
    PRIMARY KEY(session_uid, seat_uid),

CONSTRAINT RESERVE_SESSION_UID_FK
    FOREIGN KEY(session_uid) REFERENCES movie_session(session_uid),

CONSTRAINT RESERVE_SEAT_UID_FK
    FOREIGN KEY(seat_uid) REFERENCES seat(seat_uid),

CONSTRAINT RESERVE_TICKET_UID_FK 
    FOREIGN KEY(ticket_uid) REFERENCES ticket(ticket_uid)