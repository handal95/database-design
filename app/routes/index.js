import { db_router } from "./db.js"
import express from "express"
import { user_router } from "./user.js"
import { router as movieinfo_router } from "./movieinfo.js"
import { router as purchase_router } from "./purchase.js"

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
    res.render(INDEX)
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
