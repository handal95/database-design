/* 메인화면, 회원 로그인, 회원가입, 마이페이지 */

import { signin_account_process, signin_customer_process } from "../js/process/signin.js"

import express from "express";
import { hasSession } from "../js/process/session.js"
import { signup_process } from "../js/process/signup.js"

const router = express.Router({ mergeParams: true });

// link page
const SIGNIN = "signin"
const SIGNUP = "signup"
const MYPAGE = "mypage"

// url
const URL_HOME = "/"
const URL_SIGNIN = "/" + SIGNIN
const URL_SIGNUP = "/" + SIGNUP
const URL_MYPAGE = "/" + MYPAGE

// account sign-in
router.post(URL_SIGNIN + "/account", async (req, res) => {
    const process_result = await signin_account_process(req, res)
    console.log("SIGNIN PROCESS ", process_result)

    res.json({ result: process_result });
})

// customer sign-in
router.post(URL_SIGNIN + "/customer", async (req, res) => {
    const process_result = await signin_customer_process(req, res)
    console.log("SIGNIN PROCESS ", process_result)

    res.json({ result: process_result });
})

router.get(URL_SIGNIN, (req, res) => {
    if (hasSession(req)) {
        res.redirect(URL_HOME)
    }
    res.render(SIGNIN)
})

// Sign-up
router.post(URL_SIGNUP, (req, res) => {
    if(!signup_process(req, res)) {
        res.json({ result: false, });
        console.log('Sign up Failed');
    }
    res.json({ result: true, });
});

router.get(URL_SIGNUP, (req, res) => {
    if (hasSession(req)) {
        res.redirect(URL_HOME);
    }
    res.render(SIGNUP);
});

// MYPAGE
router.post(URL_MYPAGE, (req, res) => {
    // 로그인이 안 되어 있으면 로그인 창으로 리다이렉트
    if (!hasSession(req)){
        res.redirect(URL_SIGNIN);
    }

    const pw = req.body.pw;
    const nickname = req.body.nickname;
    const email = req.body.email;

    // 변경된 데이터 DB 입력 코드

    res.json({
        message:'success'
    });
    console.log(`pw : ${pw}, nickname : ${nickname}, email : ${email}`);
});

// 마이페이지에서 유저가 구매한 티켓 목록을 불러오는 함수
router.post(URL_MYPAGE + "/ticket", (req, res) => { 
    const account_id = req.body.account_id

    // SELECT FROM WHERE;

    const ticket_history_list = [
    {
        ticket_uid: 132,
        session_date: "2021.06.04.",
        session_datetime: "16:45",
        movie_name: "분노의 질주",
        ticket_price: 32000,
        reserve_status: "예약"
    },
    ]

    res.json({
        ticket_history_list,
    });
});

// 마이페이지에서 유저가 구매한 상품 목록을 불러오는 함수
router.post(URL_MYPAGE + "/item", (req, res) => { 
    const account_id = req.body.account_id

    // SELECT FROM WHERE;

    const basket_history_list = [
        {
            basket_uid: 65465,
            store_name: "스낵코너",
            item_name: "팝콘",
            order_quantity: 2,
            order_status: "결제완료"
        },
        {
            basket_uid: 65466,
            store_name: "스낵코너",
            item_name: "콜라",
            order_quantity: 2,
            order_status: "결제완료"
        },
        ]

    res.json({
        basket_history_list,
    });
});

// 마이페이지에서 유저의 포인트 이력을 불러오는 함수
router.post(URL_MYPAGE + "/points", (req, res) => { 
    const account_id = req.body.account_id;

    // 현재 포인트 값 -> SELECT points FROM account WHERE account_id="account_id";
    // 포인트 이력 -> SELECT points_history_sq, reward_category, change_value, detail FROM points_history WHERE account_id="cur_signin_account_id";

    const points_sum = 600;
    const points_history_list = [
    {
        points_history_sq: 1,
        reward_category: '추가',
        change_value: 300,
        detail: "포인트 적립",
    },
    {
        points_history_sq: 2,
        reward_category: '추가',
        change_value: 300,
        detail: "포인트 적립",
    },
    {
        points_history_sq: 3,
        reward_category: '사용',
        change_value: 300,
        detail: "포인트 적립",
    },
    {
        points_history_sq: 4,
        reward_category: '추가',
        change_value: 300,
        detail: "포인트 적립",
    },
    ];

    res.json({
        points_sum: points_sum,
        points_history_list: points_history_list
    });
});

router.get(URL_MYPAGE, (req, res) => {
    if (hasSession(req) == true) {
        const session_account_id = req.session.account_id;
        res.render(MYPAGE, {account_id: session_account_id});
    }
    else {
        res.redirect(URL_SIGNIN);
    }
});

const user_router = router
export { user_router };
