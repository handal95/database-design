/* 영화 예매, 상품 구매 페이지*/

import { fetch_grand_process, update_payment_process } from "../js/process/payment.js"
import { isAccountSession, isCustomerSession } from "../utils/sessions.js"

import express from "express";
import { fetch_account_points } from "../js/process/account.js"
import { fetch_customer_code_by_account } from "../js/process/account.js"
import { fetch_customer_code_by_info } from "../js/process/customer.js"
import { fetch_filter_movie_session } from "../js/process/movie_session.js"
import { fetch_seats_process } from "../js/process/seat.js"
import { fetch_sessioning_theater } from "../js/process/theater.js"
import { reserve_seat_process } from "../js/process/reserve.js"
import { update_points_process } from "../js/process/account.js"

const router = express.Router({ mergeParams: true });
const URL_SELECT = "/select"

// 인당 티켓 가격
const ticket_adult_price = 8000;
const ticket_child_price = 5000;
// 결제금액에 대한 포인트 적립 비율 값
const points_ratio = 0.1;

// 영화예매(장소, 일정 선택) 페이지
router.get(URL_SELECT, (req, res) => {
    // 로그인 되어있지 않다면 로그인 페이지로 이동
    //if (!hasSession(req)) {
    //   res.redirect('/signin');
    //} else {
        res.render('purchase/movie/select');
    //}
});


// 상영일정 선택 페이지 영화관 리스트 초기화
router.post(`${URL_SELECT}/init_movie_session`, async (req, res) => {
    await fetch_sessioning_theater(req)
    res.json({
        theaters: req.params.theaters,
        movies: req.params.movies
    });
});

// 상영일정 선택 페이지 상영일정 필터링
// INIT_MOVIE_SESSION 과 동일함
router.post(`${URL_SELECT}/filter_session`, async (req, res) => {
    // do something
    await fetch_filter_movie_session(req)

    res.json({
        sessions: req.params.movie_sessions,
    })
});


// 영화예매(좌석 선택) 페이지
router.get('/seat', async (req, res) => {
    req.params.movie_session_uid = req.query.session_uid;
    req.body.movie_session_uid = req.query.session_uid;
    await fetch_seats_process(req)

    const session_uid = req.body.movie_session_uid 
    const screen_code = req.params.screen_code 
    const seat_amount = req.params.seat_amount
    const max_row_num = (seat_amount % 9 == 0) ? 9 : 5
    const max_col_num = seat_amount / max_row_num
    const seat_list = req.params.seat_list

    res.render('purchase/movie/seat', {
        session_uid,
        screen_code,
        max_row_num,
        max_col_num,
        seat_list,
    });
});

// 영화예매 확인 페이지
router.get('/check', async (req, res) => {
    
    const session_uid = req.query.session_uid;
    const adult_no = req.query.adult_no;
    const child_no = req.query.child_no;
    const reserved_seat_list = JSON.parse(decodeURIComponent(req.query.reserved_seat_list));
    req.query.reserved_seat_list = reserved_seat_list
    await reserve_seat_process(req)

    // 티켓 가격 계산
    const payment_price = req.params.ticket_price;
    const theater_name = req.params.theater_name;
    const screen_name = req.params.screen_name;
    const movie_title = req.params.movie_title;

    res.render('purchase/movie/check', {
        theater_name,
        screen_name,
        movie_title,
        reserved_seat_list,
        adult_no,
        child_no,
        payment_price,
    });
});

// 영화예매 확인 페이지 현재 로그인 중인 세션의 유저 customer_code를 얻음
router.post('/check/customer_code', async (req, res) => {
    // 회원 로그인인 경우
    if (isAccountSession(req)) {
        const customer_code = await fetch_customer_code_by_account(req);
        console.log("CUSTOMER_CODE", customer_code)
        res.json({customer_code,});
    }
    // 비회원 로그인인 경우
    else if (isCustomerSession(req)) {
        // customer_code 얻어옴
        const customer_code = await fetch_customer_code_by_info(req);
        console.log("CUSTOMER CODE", customer_code)
        res.json({customer_code,});
    }
    // 세션이 없다면 null 반환
    else {
        res.json({customer_code: null});
    }
});

// 영화예매 확인 페이지 결제 가능 여부 확인
router.post('/check/check_payment', async (req, res) => {
    const payment_price = req.body.payment_price;
    const payment_method = req.body.payment_method;

    // 결제방법으로 결제 가능 여부 확인
    switch (payment_method){
    case "신용카드":
    case "무통장입금":
    case "카카오페이":
        // 위 3가지 경우 현재는 결제되었다고 가정
        // 회원, 비회원 로그인 모두 true
        res.json({result: true});
        break;
    case "포인트":
        // 회원 로그인일 경우
        if (isAccountSession(req)){
            // 현재 계정의 포인트 값을 확인
            // SELECT points FROM account WHERE account_id;
            const cur_points = await fetch_account_points(req);
            // 현재 포인트 값보다 결제금액이 크거나 같으면 true
            if (payment_price <= cur_points) {        
                res.json({result: true});
            } else {        
                res.json({result: false});
            }
        }
        // 비회원 로그인의 경우 포인트 결제 불가능
        else {        
            res.json({result: false});
        }
        break;
    default:
        res.json({result: false});
    }
});

// 영화예매 확인 페이지 결제 진행
router.post('/check/process_payment', async (req, res) => {
    const customer_code = req.body.customer_code;
    const payment_price = req.body.payment_price;   // ticket_price와 동일
    const payment_method = req.body.payment_method;
    const ticket_price = req.body.payment_price;    // payment_price와 동일
    const adult_no = req.body.adult_no;
    const child_no = req.body.child_no;
    const reserve_status = req.body.reserve_status;   
    
    let payment_uid = req.params.payment_uid;
    await update_payment_process(req)
    
    // 최후의 작업....
    await fetch_grand_process(req)
    console.log("FINAL.... ", req.params)
    payment_uid = req.params.payment_uid;
    const ticket_uid = req.params.ticket_uid
    const session_uid = req.params.session_uid

    // 회원 로그인 중이라면 포인트 데이터 생성
    if (isAccountSession(req)) {
        // 포인트로 결제했다면 포인트 사용
        if (payment_method == "포인트") {
            const session_account_id = req.session.account_id;
            req.params.points_value = payment_price / 20;
            await update_points_process(req)
            /*
            INSERT INTO account_points VALUES(
                "session_account_id",
                "points_sq..?",
                "사용",
                points_value,
                "영화 티켓 예약 결제"
            );
            */
        }
        // 포인트 이외의 방법으로 결제했다면 포인트 적립
        else
        {
        const session_account_id = req.session.account_id;
        const points_value = payment_price * points_ratio;
            /*
            INSERT INTO account_points VALUES(
                "session_account_id",
                "points_sq..?",
                "적립",
                points_value,
                "영화 티켓 예약 결제"
            );
            */
        }
    }
    res.json({
        payment_uid,
        ticket_uid,
        session_uid,
        result: true
    });
});

router.post('/complete', (req, res) => {
    const payment_uid = req.body.payment_uid;
    const ticket_uid = req.body.ticket_uid;      
    const session_uid = req.body.session_uid;
    
    console.log("PLEASE....")
    console.log(req.body)
    /*
    // 영화관 이름, 상영관 이름, 상영날짜, 상영시각, 상영영화제목
    SELECT T.theater_name, S.screen_name, M.session_date, M.session_datetime, M.movie_title
    FROM theater T, screen S, movie_session M 
    WHERE T.theater_code = S.theater_code
    AND S.screen_code = M.screen_code
    AND session_uid = "session_uid";
    */
    const theater_name = "theater_name";
    const screen_name = "screen_name";
    const movie_title = "movie_title";
    const session_date = "session_date";
    const session_datetime = "session_datetime";

    /*
    // 예약 좌석
    SELECT S.seat_row, S.seat_col
    FROM S.seat, R.reserve
    WHERE S.seat_uid = R.seat_uid
    AND session_uid = "session_uid"
    AND ticket_uid = "ticket_uid";
    */
    const seat_list = [{
        seat_row: "row_val1",
        seat_col: "col_val1",
        seat_category: "prime"
    },
    {
        seat_row: "row_val2",
        seat_col: "col_val2",
        seat_category: "prime"
    }];
    /*
    // 결제금액, 결제방법
    SELECT payment_price, payment_method
    FROM payment
    WHERE payment_uid = "payment_uid";
    */

    const payment_price = "payment_price";
    const payment_method = "payment_method";

    res.render('purchase/movie/complete', {
        theater_name,
        screen_name,
        session_date,
        session_datetime,
        movie_title,
        seat_list,
        payment_price,
        payment_method
    });
});

router.get('/complete', function(req, res)
{
    res.render('purchase/movie/complete');
});

export { router };
