store_code VARCHAR(16) NOT NULL,
item_code VARCHAR(16) NOT NULL,

item_name VARCHAR(32) NOT NULL,
item_price NUMBER(8) NOT NULL,
item_category VARCHAR(16),
remain_quantity NUMBER(4),

CONSTRAINT ITEM_PK
    PRIMARY KEY(store_code, item_code),

CONSTRAINT ITEM_STORE_CODE_FK 
    FOREIGN KEY(store_code) REFERENCES store(store_code)
