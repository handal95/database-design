movie_code VARCHAR(16) NOT NULL,

movie_title VARCHAR(64) NOT NULL,
production_status VARCHAR(16) NOT NULL,
movie_title_eng VARCHAR(64),
production_country VARCHAR(64),
running_time DATE,
release_date DATE,
media_rating NUMBER,
productor VARCHAR(64),
distributor VARCHAR(64),
synopsis VARCHAR(1024),
avg_score FLOAT NULL,

CONSTRAINT MOVIE_PK
    PRIMARY KEY(movide_code)

