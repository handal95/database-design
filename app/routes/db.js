import { connect_test, create_table, drop_table } from "../js/process/schema.js"

import express from "express"
import { seed_data } from "../js/process/seeder.js"

const router = express.Router({ mergeParams: true });


router.get("/", (req, res) => {
    if(!connect_test(req)){
        res.send("DB is not connected")
    } else {
        res.send("DB Connected")
    }
})

router.get("/create/:table", (req, res) => {
    if(!create_table(req)){
        res.send("Query Fail")
    } else {
        res.send("Query Success")
    }
})

router.get("/drop/:table", (req, res) => {
    if(!drop_table(req)){
        res.send("Query Fail")
    } else {
        res.send("Query Success")
    }
})

router.get("/seed/:table", (req, res) => {
    if(!seed_data(req)) {
        res.send("Query Fail")
    } else {
        res.send("Query Success")
    }
   
    // "920920", "UOS 정기관", "서울시 동대문구", "OPEN", "2021-06-08"
    // "001016", "UOS 강변", "서울시 광진구", "OPEN", "1998-04-04"
    // "001194", "UOS 강릉", "강원도 강릉시", "OPEN", "2012-06-14"
    // "003046", "UOS 원주", "강원도 원주시", "OPEN", "2012-09-06"
    // "015043", "UOS 인천연수", "인천시 연수구", "OPEN", "2012-10-05"
    // "004045", "UOS 청주터미널", "충청북도 청주시", "OPEN", "2019-02-01"
})

const db_router = router

export { db_router }
