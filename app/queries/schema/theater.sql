theater_code VARCHAR(16) NOT NULL,

theater_name VARCHAR(32) NOT NULL,
theater_address VARCHAR(256),
theater_business_status VARCHAR(16) NOT NULL,
opening_date DATE,

CONSTRAINT THEATER_PK
    PRIMARY KEY(theater_code)