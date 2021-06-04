crew_code VARCHAR(16) NOT NULL,

crew_name VARCHAR(32) NOT NULL,
crew_name_eng VARCHAR(32),
crew_birth_date DATE,
nationality VARCHAR(64),
sex CHAR(1),
profile_image BLOB,

CONSTRAINT CREW_PK
    PRIMARY KEY(crew_code)
