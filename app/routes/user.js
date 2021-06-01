import { hasSession, initSession } from "../utils/sessions.js"

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

// Sign-in
router.post(URL_SIGNIN, (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;
    console.log(`request body : ${id} ${pw}`)

    // check(id, pw);
    initSession(req, id, 'nickname', 'email');
    res.json({ result: true });
    console.log(`id : ${id}, pw : ${pw}`);
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
    const nickname = req.body.nickname;
    const email = req.body.email;
    // check(id, pw);
    res.json({
        result: true,
    });
    console.log(`id : ${id}, pw : ${pw}, nickname : ${nickname}, email : ${email}`);
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
    // check(id, pw);
    res.json({
        message:'success'
    });
    console.log(`pw : ${pw}, nickname : ${nickname}, email : ${email}`);
});

router.get(URL_MYPAGE, (req, res) => {
    if (hasSession(req) == true) {
        res.render(MYPAGE, {account_id: 'abcd'});
    }
    else {
        res.redirect(URL_SIGNIN);
    }
});


const user_router = router
export { user_router };