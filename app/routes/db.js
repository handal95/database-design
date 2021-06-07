import { connect_test, create_table, drop_table } from "../js/process/schema.js"

import db_config from "../configs/db_config.js"
import express from "express"
import { query_schema } from "../utils/queries.js"

const router = express.Router({ mergeParams: true });
oracle.outFormat = oracle.OBJECT;
oracle.autoCommit = true;

const schema_list = [ 
    "customer", "facility_code", "movie", "crew", "payment",
    "account", "theater", "genre", "poster", "contributor",
    "payment_history",  "review", "store", "screen", "points",
    "ticket", "item",  "movie_session", "seat", "basket",
]

router.get("/", (req, res) => {
    if(!connect_test(req, res)){
        console.log("DB CONNECT FAIL")
        res.send("DB is not connected")
    }
    console.log("DB CONNECT OK")
    res.send("DB Connected")
})

router.get("/create/:table", (req, res) => {
    if(!create_table(req, res, req.params.table)){
        res.send("Query Fail")
    }
    res.send("Query Success")
})

router.get("/drop/:table", (req, res) => {
    if(!drop_table(req, res, req.params.table)){
        res.send("Query Fail")
    }
    res.send("Query Success")
})

const db_router = router

export { db_router }
