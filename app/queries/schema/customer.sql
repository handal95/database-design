customer_code VARCHAR(16) NOT NULL,

customer_name VARCHAR(32) NOT NULL,
customer_birth_date DATE NOT NULL,
phone VARCHAR(16) NOT NULL,

CONSTRAINT CUSTOMER_PK
    PRIMARY KEY(customer_code)