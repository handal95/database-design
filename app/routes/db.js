import { connect_test, create_table, drop_table } from "../js/process/schema.js"
import { delete_data, seed_data, seed_seat } from "../js/process/seeder.js"

import express from "express"

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

router.get("/seed/seat", (req, res) => {
    if(!seed_seat(req)) {
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
})

router.get("/delete/:table", (req, res) => {
    if(!delete_data(req)) {
        res.send("Query Fail")
    } else {
        res.send("Query Success")
    }
})

const db_router = router

export { db_router }
