import { db_router } from "./db.js";
import express from "express";
import { user_router } from "./user.js";

const router = express.Router()

router.use("/db", db_router)
router.use("/", user_router)

router.get("/", (req, res) => {
    res.render('index')
    console.log("Connected: Hello, world! ")
})

// TODO : CHECK
router.post('/', function(req, res) {
    const search_keyword = req.body.search_keyword;
    // query(search)
    res.json({
        message:'success'
    });
    console.log(`search : ${search_keyword}`);
});

export { router };
