import { hasSession, initSession } from "../utils/sessions.js"

import express from "express";

const router = express.Router()

// Sign-in
router.get('/signin', (req, res) => {
    if (hasSession(req) == true) {
        res.redirect('/')
    } else {
        res.render('signin')
    }
})

router.post("/signin", (req, res) => {
    const id = req.body.id;
    const pw = req.body.pw;

    // check(id, pw);
    initSession(req, id);
    res.json({
        result: true,
    });
    console.log(`id : ${id}, pw : ${pw}`);
})

// Sign-up
router.get('/signup', (req, res) => {
    if (hasSession(req) == true) {
        res.redirect('/');
    }
    else {
        res.render('signup');
    }
});

router.post('/signup', function(req, res){
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

// MYPAGE
router.get('/mypage', (req, res) => {
    if (hasSession(req) == true) {
        res.render('mypage', {account_id: 'abcd'});
    }
    else {
        res.redirect('/signin');
    }
});

router.post('/mypage', (req, res) => {
    if (hasSession(req) == false){
        res.redirect('/signin');
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

const user_router = router
export { user_router };