1. CREW
2. MOVIE    
    1. GENRE
    2. POSTER
    3. CONTRIBUTOR
3. FACILITY_CODE
    1. THEATER
        1. STORE
        2. ITEM
    2. SCREEN
        1. SEAT
        2. MOVIE_SESSION
4. CUSTOMER
    1. ACCOUNT 
        1. REVIEW
        2. POINTS
    2. PAYMENT
        1. PAYMENT_HISTORY
        2. TICKET
        3. BASKET


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