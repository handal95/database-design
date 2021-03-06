basket_uid NUMBER(16, 0) NOT NULL
    CONSTRAINT BASKET_UID_CK CHECK(basket_uid >= 0),

store_code VARCHAR(16) NOT NULL,
item_code VARCHAR(16) NOT NULL,
payment_uid NUMBER(16, 0) NOT NULL,
order_quantity NUMBER(4, 0) DEFAULT 1 NOT NULL
    CONSTRAINT BASKET_ORDER_QUANTITY_CK CHECK(order_quantity >= 1),
order_status VARCHAR(16) NOT NULL,

CONSTRAINT BASKET_PK
    PRIMARY KEY(basket_uid),

CONSTRAINT BASKET_STORE_CODE_FK 
    FOREIGN KEY(store_code) REFERENCES store(store_code),

CONSTRAINT BASKET_ITEM_CODE_FK 
    FOREIGN KEY(store_code, item_code) REFERENCES item(store_code, item_code),

CONSTRAINT BASKET_PAYMENT_UID_FK 
    FOREIGN KEY(payment_uid) REFERENCES payment(payment_uid)