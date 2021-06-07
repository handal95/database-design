1. CREW             V
2. MOVIE            V
    1. GENRE        V
    2. POSTER       V
    3. CONTRIBUTOR  V
1. THEATER      V
    1. STORE    V
        1. ITEM V
    2. SCREEN   V
        1. SEAT V
        2. MOVIE_SESSION  V
4. CUSTOMER         V
    1. ACCOUNT      V
        1. REVIEW   V
        2. POINTS   V
    2. PAYMENT      V
        1. PAYMENT_HISTORY  V 
        2. TICKET   V
            1. BASKET v
            2. RESERVE

CREW
MOVIE
FACILITY_cODE
CUSTOMER
    GENRE
    POSTER
    CONTRIBUTOR
    THEATER
    ACCOUNT
    PAYMENT
        STORE
        SCREEN
        REVIEW
        POINTS
        PAYMENT_HISTORY
        TICKET
        BASKET
            RESERVE
            ITEM
            SEAT
            MOVIE_SESSION    


# code VARCHAR(16)
# UID  VARCHAR(16)  
# CATEGORY VARCHAR(16)
# STATUS VARCHAR (16)
# ID VARCHAR(16)
# SQ NUMBER(4, 0)
# QUANTITY NUMBER(4, 0)
# ROLE VARCHAR(32)
# NAME VARCHAR(32)
# NATL VARCHAR(64)
# PRICE NUMBER (8, 0)
# ROUND NUMBER (2, 0)
# TITLE VARCHAR(64)
# RATING VARCHAR(16)
# COMPNAY VARCHAR(64)
# SYNOPSIS VARCHAR(1024)
# SCORE FLOAT
# AMOUNT NUMBER(4, 0)
# NO NUMBER(2, 0)
# ROW/COL VARCHAR(4)
# ADDRESS VARCHAR(256)

RUNNING_TIME DATE -> NEED FIX
MOVIE
    - GENRE


CUSTOMER

# DATE TYPE
    UID -> VARCHAR(16)
    CODE -> VARCHAR(16)
    CATEGORY -> VARCHAR(16) NOT NULL
    STATUS -> VARCHAR(16) NOT NULL
    MONEY/POINT -> NUMBER(8)
    QUANTITY/AMOUNT -> NUMBER(4)
    _sq -> INTEGER(4)

    CREW(sex) VARCHAR(16) -> CHAR(1)
    THEATER(theater_address) TEXT -> VARCHAR(256)
    SEAT(seat_row|col) -> VARCHAR(2) NOT NULL
    MOVIE(media_rating) -> ?? NUMBER ?? 

# 속성명
    THEATER(address) -> THEATER(theater_address)
    TICKET(adult / child) -> ??

# 기타
    상점 STORE 의 STORE_CODE 가 외래키?
    SEAT seat_uid 필수여부 체크
    MOVIE_SESSION session_date + session_datetime

    TICKET ??? 
    

# 순서
    속성 구성 순서
    PK 우선 >> FK 우선 > NOT NULL 우선 > (CATEGORY/STATUS) 우선

    기본키 구성 순서
    ITEM(item_code, store_code) -> (store_code, item_code)
    CONTRIBUTOR(crew_code, movie_code) -> (movie_code, crew_code)
    PAYMENT_HISTORY(payment_history_sq, payment_uid) -> (payment_uid, payment_history_sq)
    TICKET(session_uid, payment_uid, ..., seat_uid) -> (session_uid, seat_uid, payment_uid, ...)
    BASKET(store_code, payment_uid, item_code) -> (store_code, item_code, payment_uid, ...)

# 속성 DATE TYPE
# THEATER

# UNIQUE 대상
# DEFAULT 대상

# 0607
TICKET(reserve_status) -> (ticket_status)
REVIEW(comment) -> REVIEW(review_detail)
POINTS_HISTORY(detail) -> (points_detail)