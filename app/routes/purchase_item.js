/* 영화 예매, 상품 구매 페이지*/

import express from "express";
import { isCustomerSession, isAccountSession } from "../utils/sessions.js";

const router = express.Router({ mergeParams: true });

// 상품 선택 페이지
router.get('/select', function(req, res)
{
    //if (hasSession(req))
    //{
        res.render('purchase/item/select');
    //}
    //else
    //{
    //    res.redirect('/signin');
    //}
});

// 상품 선택 페이지 영화관 리스트 불러오기
router.post('/select/init_movie_session', function(req, res)
{
    // SELECT theater_code, theater_name FROM theater;

    const theater_list = [
        {
            theater_code: "theater_code1",
            theater_name: "theater_name1",
        },
        {
            theater_code: "theater_code2",
            theater_name: "theater_name2",
        },
    ]

    res.json({
        theater_list,
    });
});

// 상품 선택 페이지 영화관 기준 상점 필터링
router.post('/select/filter_store', function(req, res)
{
    const theater_code = req.body.theater_code;

    // 영화관 코드가 F003으로 시작할 때
    // 그 안에 있는 상점도 F003으로 시작할 것임
    // SELECT * FROM store WHERE store_code LIKE 'F003%';

    const store_list = [{
        store_code: "store_code",
        store_name: "store_name",
    }, {
        store_code: "store_code2",
        store_name: "store_name2",
    }];

    res.json({
        store_list,
    });
});

// 상품 선택 페이지 상품 필터링
router.post('/select/filter_item', function(req, res)
{
    const store_code = req.body.store_code;

    // SELECT item_code, item_name, item_category, item_price FROM item WHERE store_code='store_code';

    const item_list = [
        {
            item_code: "213231",
            item_name: "팝콘",
            item_category: "스낵",
            item_price: 4000,
        },
        {
            item_code: "213232",
            item_name: "콜라",
            item_category: "스낵",
            item_price: 1500,
        },
        {
            item_code: "213233",
            item_name: "나쵸",
            item_category: "스낵",
            item_price: 3000,
        },
    ]

    res.json({
        item_list,
    });
});

// 상품구매 확인 결제내용 불러오기
router.get('/check', function(req, res)
{
    const theater_code = req.query.theater_code;
    const theater_name = req.query.theater_name;
    const store_code = req.query.store_code;
    const store_name = req.query.store_name;
    const basket_list = JSON.parse(decodeURIComponent(req.query.basket_list));
    let payment_price = 0;

    // 각 basket의 상품과 주문수량으로 총 결제 금액을 계산 
    for (const basket of basket_list)
    {
        payment_price += basket.item_price * basket.order_quantity;
    }

    res.render('purchase/item/check', {
        theater_code,
        theater_name,
        store_code,
        store_name,
        basket_list,
        payment_price,
    });
});

// 상품구매 확인 페이지 현재 로그인 중인 세션의 유저 customer_code를 얻음
router.post('/check/customer_code', function(req, res)
{
    
    // // 회원 로그인인 경우
    // if (isAccountSession(req))
    // {
    //     const signin_type = "account";
    //     const session_account_id = req.session.account_id;
    //     /*
    //     // account의 customer_code를 검색
    //     SELECT customer_code
    //     FROM account
    //     WHERE account_id = "session_account_id";
    //     */
        const customer_code = "account_customer_code";
        res.json({customer_code,});
    // }
    // // 비회원 로그인인 경우
    // else if (isCustomerSession(req))
    // {
    //     const signin_type = "customer";
    //     const session_customer_name = req.session.name;
    //     const session_birth_date = req.session.birth_date;
    //     const session_phone = req.session.phone;
    //     /*
    //     // customer_code 얻어옴
    //     SELECT customer_code
    //     FROM customer
    //     WHERE customer_name = "session_customer_name"
    //     AND customer_birth_date = "session_birth_date"
    //     AND phone = "session_phone";
    //     */
    //     const customer_code = "customer_code";
    //     res.json({customer_code,});
    // }
    // // 세션이 없다면 null 반환
    // else
    // {
    //     res.json({customer_code: null});
    // }
});

// 상품구매 확인 페이지 결제 가능 여부 확인(purchase_movie.js에서 동일한 내용 존재)
router.post('/check/check_payment', function(req, res)
{
    const payment_price = req.body.payment_price;
    const payment_method = req.body.payment_method;

    // 결제방법으로 결제 가능 여부 확인
    switch (payment_method)
    {
    case "신용카드":
    case "무통장입금":
    case "카카오페이":
        // 위 3가지 경우 현재는 결제되었다고 가정
        // 회원, 비회원 로그인 모두 true
        res.json({result: true});
        break;
    case "포인트":
        // 회원 로그인일 경우
        if (isAccountSession(req))
        {
            // 현재 계정의 포인트 값을 확인
            // SELECT points FROM account WHERE account_id;
            const cur_points = 300;
            // 현재 포인트 값보다 결제금액이 크거나 같으면 true
            if (payment_price <= cur_points)
            {        
                res.json({result: true});
            }
            else
            {        
                res.json({result: false});
            }
        }
        // 비회원 로그인의 경우 포인트 결제 불가능
        else
        {        
            res.json({result: false});
        }
        break;
    default:
        res.json({result: false});
    }
});


// 상품구매 확인 페이지 결제 진행
router.post('/check/process_payment', function(req, res)
{
    const customer_code = req.body.customer_code;
    const theater_code = req.body.theater_code;
    const store_code = req.body.store_code;
    const basket_list = req.body.basket_list;
    const payment_price = req.body.payment_price;
    const payment_method = req.body.payment_method;
    const order_status = req.body.order_status;    

    /*
    // payment 데이터 생성
    INSERT INTO payment VALUES(
        "customer_code", 
        "payment_price",
        "payment_method"
    );
    */

    // payment_uid 받아서 저장
    const payment_uid = "payment_uid";
    
    /*
    // basket 갯수만큼 데이터 생성
    for (const basket of basket_list)
    {
        INSERT INTO basket VALUES(
            "basket_uid",
            "store_code",
            "payment_uid",
            "basket.item_code",
            "basket.order_quantity",
            "주문" // order_status
        );
    }

    */
    const basket_uid_list = ["basket_uid1", "basket_uid2",];
    /*
    // payment_history 데이터 생성
    SELECT payment_uid
    FROM payment
    WHERE customer_code;
    INSERT INTO payment_history VALUES(
        "payment_history_sq", 
        "payment_uid",
        "결제" // payment_status
    );
    */

    // 회원 로그인 중이라면 포인트 데이터 생성
    if (isAccountSession(req))
    {
        // 포인트로 결제했다면 포인트 사용
        if (payment_method == "포인트")
        {
        const session_account_id = req.session.account_id;
        const points_value = payment_price;
        /*
        INSERT INTO account_points VALUES(
            "session_account_id",
            "points_sq..?",
            "사용",
            points_value,
            "(store_name)에서 (item_name) 주문에 사용"
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
            "(store_name)에서 (item_name) 주문의 보상"
        );
        */
        }
    }
    res.json({
        payment_uid,
        result: true
    });
});

router.get('/complete', function(req, res)
{
    res.render('purchase/item/complete');
});

// 상품 결제완료 페이지
router.post('/complete', function(req, res)
{
    const payment_uid = req.body.payment_uid;

    /*
    장바구니 내용(영화관, 상점, 상품, 상품가격, 주문수량)
    SELECT B.basket_uid, S.store_name, I.item_name, I.item_price, B.order_quantity
    FROM basket B, store S, item I
    WHERE S.store_code = B.store_code
    AND S.store_code = I.store_code
    AND I.item_code = B.item_code
    AND B.payment_uid = "payment_uid";

    결제 내용(결제금액, 결제방법)
    SELECT payment_price, payment_method
    FROM payment
    WHERE payment_uid="payment_uid";
    */
    const theater_name = "영화관33";
    const store_name = "스낵코너"
    const basket_list = [{
        basket_uid: "6546",
        item_name: "팝콘",
        item_price: 5000,
        order_quantity: 3
        },
    ];
    const payment_data = {
        payment_price: 15000,
        payment_method: "신용카드",
    };

    res.json({
        theater_name,
        store_name,
        basket_list,
        payment_data,
    });
});

export { router };