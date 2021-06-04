seat_uid VARCHAR(16) NOT NULL,

screen_code VARCHAR(16) NOT NULL,
seat_category VARCHAR(16) NOT NULL,
seat_status VARCHAR(16) NOT NULL,
seat_row VARCHAR(2) NOT NULL,
seat_col VARCHAR(2) NOT NULL,

CONSTRAINT SEAT_PK
    PRIMARY KEY(seat_uid),

CONSTRAINT SCREEN_CODE_FK 
    FOREIGN KEY(screen_code) REFERENCES screen(screen_code)

