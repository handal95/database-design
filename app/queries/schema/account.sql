account_id VARCHAR(16) NOT NULL,

customer_code VARCHAR(16) NOT NULL,
nickname VARCHAR(16),
pwdkey VARCHAR(256),
email VARCHAR(64),
points NUMBER(8),

CONSTRAINT ACCOUNT_PK
    PRIMARY KEY(account_id),

CONSTRAINT CUSTOMER_CODE_FK 
    FOREIGN KEY(customer_code) REFERENCES customer(customer_code)
