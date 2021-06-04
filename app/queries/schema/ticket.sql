ticket_uid VARCHAR(16) NOT NULL,

payment_uid VARCHAR(16) NOT NULL,
ticket_price NUMBER(8),
adult NUMBER(2),
child NUMBER(2),
reserver_status VARCHAR(16),

CONSTRAINT TICKET_PK
    PRIMARY KEY(ticket_uid)
