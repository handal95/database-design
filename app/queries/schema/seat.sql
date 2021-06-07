seat_uid NUMBER(16, 0) NOT NULL
    CONSTRAINT SEAT_UID_CK CHECK(seat_uid >= 0),

screen_code VARCHAR(16) NOT NULL,
seat_category VARCHAR(16),
seat_status VARCHAR(16) NOT NULL,
seat_row NUMBER(4) NOT NULL
    CONSTRAINT SEAT_ROW_CK CHECK(seat_row >= 1),
seat_col NUMBER(4) NOT NULL
    CONSTRAINT SEAT_COL_CK CHECK(seat_col >= 1),

CONSTRAINT SEAT_PK
    PRIMARY KEY(seat_uid),

CONSTRAINT SEAT_SCREEN_CODE_FK 
    FOREIGN KEY(screen_code) REFERENCES screen(screen_code)