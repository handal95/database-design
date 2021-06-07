import { destorySession, hasSession } from "../js/process/session.js"

import { db_router } from "./db.js"
import express from "express"
import { router as movieinfo_router } from "./movieinfo.js"
<<<<<<< HEAD
import { router as review_router } from "./review.js"
import { router as purchase_movie_router } from "./purchase_movie.js"
=======
>>>>>>> 80ce53b2afc4a2a2c1b5adee0b776874e4679764
import { router as purchase_item_router } from "./purchase_item.js"
import { router as purchase_movie_router } from "./purchase_movie.js"
import { user_router } from "./user.js"

const router = express.Router({ mergeParams: true });

router.use("/db", db_router)
router.use("/movieinfo", movieinfo_router)
router.use("/purchase/movie", purchase_movie_router)
router.use("/purchase/item", purchase_item_router)
router.use("/", user_router)

// link page
const INDEX = "index"

// url
const URL_HOME = "/"

// 메인 화면
router.get(URL_HOME, (req, res) => {
    let params = { account_id: null }

    if (hasSession(req)) {
        // 접속 세션 유형
        const SESSION_CATEGORY = req.session.signin_category
        console.log(`(session) : current session is ${SESSION_CATEGORY}`)

        // 로그인 되어있는 경우
        if(SESSION_CATEGORY == "account") {
            // 회원의 경우 아이디를 전달
            params.account_id = req.session.sign_id
            
        } else if(SESSION_CATEGORY == "customer") {
            // 비회원의 경우 이름을 전달
            params.account_id = req.session.name
        }
    }

    // INDEX PAGE rendering
    res.render(INDEX, params)
})

router.get(URL_HOME + "logout", (req, res) => {
    destorySession(req);
    console.log("(session) : session is destroyed")
    
    // HOME redirecting
    res.redirect(URL_HOME);
})

// TODO : CHECK
router.post(URL_HOME, function(req, res) {
    const keyword = req.body.keyword;
    // query(search)
    res.json({
        message:'success'
    });
    console.log(`search : ${keyword}`);
});

export { router };
