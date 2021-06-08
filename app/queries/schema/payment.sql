payment_uid NUMBER(16, 0) NOT NULL
    CONSTRAINT PAYMENT_UID_CK CHECK(payment_uid >= 0),

customer_code VARCHAR(16) NOT NULL,
payment_price NUMBER(8, 0) NOT NULL,
payment_method VARCHAR(16),

CONSTRAINT PAYMENT_PK
    PRIMARY KEY(payment_uid),

CONSTRAINT PAYMENT_CUSTOMER_CODE_FK 
    FOREIGN KEY(customer_code) REFERENCES customer(customer_code)