store_code VARCHAR(16) NOT NULL,

theater_code VARCHAR(16) NOT NULL,
store_name VARCHAR(32) NOT NULL,

CONSTRAINT STORE_PK
    PRIMARY KEY(store_code)

CONSTRAINT STORE_THEATER_CODE_FK 
    FOREIGN KEY(theater_code) REFERENCES theater(theater_code)
