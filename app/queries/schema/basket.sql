basket_uid VARCHAR(16) NOT NULL,

store_code VARCHAR(16) NOT NULL,
item_code VARCHAR(16) NOT NULL,
payment_uid VARCHAR(16) NOT NULL,
reserve_status VARCHAR(16) NOT NULL,
ticket_price NUMBER(8) NOT NULL,

CONSTRAINT BASKET_PK
    PRIMARY KEY(basket_uid),

CONSTRAINT STORE_CODE_FK 
    FOREIGN KEY(store_code) REFERENCES store(store_code),

CONSTRAINT ITEM_CODE_FK 
    FOREIGN KEY(item_code) REFERENCES item(item_code),

CONSTRAINT PAYMENT_UID_FK 
    FOREIGN KEY(payment_uid) REFERENCES payment(payment_uid)
