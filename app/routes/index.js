import { db_router } from "./db.js"
import express from "express"
import { user_router } from "./user.js"
import { router as movieinfo_router } from "./movieinfo.js"
import { router as purchase_router } from "./purchase.js"

import { hasSession, destorySession } from "../utils/sessions.js"

const router = express.Router()

router.use("/db", db_router)
router.use("/movieinfo", movieinfo_router)
router.use("/purchase", purchase_router)
router.use("/", user_router)

// link page
const HOME = ""
const INDEX = "index"

// url
const URL_HOME = "/" + HOME

// 메인 화면
router.get(URL_HOME, (req, res) => {
    if (hasSession(req) == true)
    {
        // 회원 로그인 중인 경우
        if (req.session.signin_category == "account")
        {
            const session_account_id = req.session.sign_id;
            res.render(INDEX, {account_id: session_account_id});
        }
        // 비회원 로그인 중인 경우
        else
        {
            const session_customer_name = req.session.name;
            res.render(INDEX, {account_id: session_customer_name});
        }
    }
    else
    {
        res.render(INDEX, {account_id: null});
    }
})

router.get(URL_HOME + "logout", (req, res) => {
    destorySession(req);
    res.redirect("/");
})

// TODO : CHECK
router.post(URL_HOME, function(req, res) {
    const search_keyword = req.body.search_keyword;
    // query(search)
    res.json({
        message:'success'
    });
    console.log(`search : ${search_keyword}`);
});

export { router };
