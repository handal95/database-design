ticket_uid NUMBER(16, 0) NOT NULL
    CONSTRAINT TICKET_UID_CK CHECK(ticket_uid >= 0),

payment_uid NUMBER(16, 0) NOT NULL,
ticket_price NUMBER(8, 0) NOT NULL
    CONSTRAINT TICKET_PRICE_CK CHECK(ticket_price >= 0),
adult_no NUMBER(2, 0) DEFAULT 0 NOT NULL
    CONSTRAINT TICKET_ADULT_NO_CK CHECK(adult_no >= 0),
child_no NUMBER(2, 0) DEFAULT 0 NOT NULL 
    CONSTRAINT TICKET_CHILD_NO_CK CHECK(child_no >= 0),
ticket_status VARCHAR(16) NOT NULL,

CONSTRAINT TICKET_PK
    PRIMARY KEY(ticket_uid),

CONSTRAINT TICKET_PAYMENT_UID_FK 
    FOREIGN KEY(payment_uid) REFERENCES payment(payment_uid)