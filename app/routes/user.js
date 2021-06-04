/* 메인화면, 회원 로그인, 회원가입, 마이페이지 */

import { hasSession, initAccountSession, initCustomerSession } from "../utils/sessions.js"

import express from "express";

const router = express.Router()

// link page
const HOME = ""
const SIGNIN = "signin"
const SIGNUP = "signup"
const MYPAGE = "mypage"

// url
const URL_HOME = "/" + HOME
const URL_SIGNIN = "/" + SIGNIN
const URL_SIGNUP = "/" + SIGNUP
const URL_MYPAGE = "/" + MYPAGE

// account sign-in
router.post(URL_SIGNIN + "/account", (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;
    console.log(`request body : ${id} ${pw}`)

    // check(id, pw);

    initAccountSession(req, id, 'nickname', 'email');
    res.json({ result: true });
    console.log(`id : ${id}, pw : ${pw}`);
})

// customer sign-in
router.post(URL_SIGNIN + "/customer", (req, res) => {
    const name = req.body.name;
    const birth_date = req.body.birth_date;
    const phone = req.body.phone;

    // check(name, birth_date, phone);

    const is_found = false
    // 만약 일치하는 비회원 데이터가 없다면 새로 생성 후 로그인
    if (is_found == false)
    {
        // INSERT INTO customer VALUES(name, birth_date, phone);
        initCustomerSession(req, name, birth_date, phone);
        res.json({ result: false });
    }
    // 일치하는 데이터가 있으면 로그인
    else
    {
        initCustomerSession(req, id, 'nickname', 'email');
        res.json({ result: true });
    }
})

router.get(URL_SIGNIN, (req, res) => {
    if (hasSession(req) == true) {
        res.redirect(URL_HOME)
    } else {
        res.render(SIGNIN)
    }
})

// Sign-up
router.post(URL_SIGNUP, (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;
    const name = req.body.name;
    const birth = req.body.birth;
    const phone = req.body.phone;
    const nickname = req.body.nickname;
    const email = req.body.email;
    
    var verified_data = true;

    /* 중복 아이디 검사 코드 */
    if (verified_data)
    {
        res.json({
            result: true,
        });
        console.log(`id : ${id}, pw : ${pw}, name : ${name}, birth : ${birth}, phone : ${phone}, nickname : ${nickname}, email : ${email}`);
    }
    else
    {
        res.json({
            result: false,
        });
        console.log('Sign up Failed');
    }
});

router.get(URL_SIGNUP, (req, res) => {
    if (hasSession(req) == true) {
        res.redirect(URL_HOME);
    }
    else {
        res.render(SIGNUP);
    }
});

// MYPAGE
router.post(URL_MYPAGE, (req, res) => {
    if (hasSession(req) == false){
        res.redirect(URL_SIGNIN);
        return;
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

router.get(URL_MYPAGE, (req, res) => {
    if (hasSession(req) == true) {
        const session_account_id = req.session.signin_id;
        res.render(MYPAGE, {account_id: session_account_id});
    }
    else {
        res.redirect(URL_SIGNIN);
    }
});

const user_router = router
export { user_router };
