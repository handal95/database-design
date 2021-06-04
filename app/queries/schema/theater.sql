theater_code VARCHAR(16) NOT NULL,

theater_name VARCHAR(32) UNIQUE NOT NULL,
theater_address VARCHAR(256) NULL,
opening_date DATE NULL,

CONSTRAINT THEATER_PK
    PRIMARY KEY(theater_code)
