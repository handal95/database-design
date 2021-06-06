ticket_uid NUMBER(16) NOT NULL,

payment_uid NUMBER(16) NOT NULL,
ticket_price NUMBER(8),
adult NUMBER(2),
child NUMBER(2),
ticket_status VARCHAR(16),

CONSTRAINT TICKET_PK
    PRIMARY KEY(ticket_uid),

CONSTRAINT TICKET_PAYMENT_UID_FK 
    FOREIGN KEY(payment_uid) REFERENCES payment(payment_uid)
