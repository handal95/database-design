payment_uid NUMBER(16) NOT NULL,

customer_code VARCHAR(16),
payment_price NUMBER(8),
payment_method VARCHAR(16),

CONSTRAINT PAYMENT_PK
    PRIMARY KEY(payment_uid),

CONSTRAINT CUSTOMER_CODE_FK 
    FOREIGN KEY(customer_code) REFERENCES customer(customer_code)
