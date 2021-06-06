account_id VARCHAR(16) NOT NULL,
points_sq NUMBER(4) NOT NULL,

reward_category VARCHAR(16) NOT NULL,
change_value NUMBER(8),
points_detail VARCHAR(1024),

CONSTRAINT POINTS_PK
    PRIMARY KEY(account_id, points_sq),

CONSTRAINT POINTS_ACCOUNT_ID_FK
    FOREIGN KEY(account_id) REFERENCES account(account_id)
