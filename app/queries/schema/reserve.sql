session_uid NUMBER(16, 0) NOT NULL,
seat_uid NUMBER(16, 0) NOT NULL,

ticket_uid NUMBER(16, 0) NOT NULL,
reserve_status VARCHAR(16) NOT NULL,

CONSTRAINT TICKET_PK
    PRIMARY KEY(ticket_uid),

CONSTRAINT SESSION_UID 
    FOREIGN KEY(session_uid) REFERENCES movie_session(session_uid),

CONSTRAINT SEAT_UID 
    FOREIGN KEY(seat_uid) REFERENCES seat(seat_uid),

CONSTRAINT TICKET_UID_FK 
    FOREIGN KEY(ticket_uid) REFERENCES ticket(ticket_uid)