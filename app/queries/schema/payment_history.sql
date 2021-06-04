payment_uid NUMBER(16) NOT NULL,
payment_history_sq INTEGER(4) NOT NULL,

payment_status VARCHAR(16) NOT NULL,

CONSTRAINT PAYMENT_HISTORY_PK
    PRIMARY KEY(payment_uid, payment_history_sq)

CONSTRAINT PAYMENT_UID_FK 
    FOREIGN KEY(payment_uid) REFERENCES payment(payment_uid)
