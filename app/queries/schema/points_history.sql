account_id NUMBER(16) NOT NULL,
points_history_sq INTEGER(4) NOT NULL,

reward_category VARCHAR(16) NOT NULL,
change_value NUMBER(8),
detail VARCHAR(1024),

CONSTRAINT POINTS_HISTORY_PK
    PRIMARY KEY(account_id, points_history_sq),

CONSTRAINT ACCOUNT_ID_FK 
    FOREIGN KEY(account_id) REFERENCES account(account_id)
