screen_code VARCHAR(16) NOT NULL,

theater_code VARCHAR(16) NOT NULL,
screen_name VARCHAR(32),
screen_category VARCHAR(16),
seat_amount NUMBER(4, 0)
    CONSTRAINT SCREEN_SEAT_AMOUNT_CK CHECK(seat_amount >= 0),

CONSTRAINT SCREEN_PK
    PRIMARY KEY(screen_code)

CONSTRAINT SCREEN_THEATER_CODE_FK 
    FOREIGN KEY(theater_code) REFERENCES theater(theater_code)
