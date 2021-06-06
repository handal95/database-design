import db_config from "../configs/db_config.js"
import express from "express"
import oracle from "oracledb"
import { query_schema } from "../utils/queries.js"

const router = express.Router()
oracle.outFormat = oracle.OBJECT
oracle.autoCommit = true

const schema_list = [
    "crew",  "movie", "facility_code", "customer", "genre",
    "poster", "contributor", "theater", "account", "payment",
    "screen", "store", "review", "points", "ticket",
    "payment_history", "item", "seat", "movie_session", "basket",
]

router.get("/", (req, res) => {
    oracle.getConnection(db_config, (err, conn) => {
        if(err) throw err
        res.send("connect test success")
    })
})

router.get("/create/all", (req, res) => {
    oracle.getConnection(db_config, (err, conn) => {
        if(err) throw err
        
        for(let i = 0; i <schema_list.length; i++){
            query_schema(conn, "CREATE", schema_list[i])
        }
    })
    res.send("DONE")
})

router.get("/create/:table", (req, res) => {
    let table = req.params.table
    oracle.getConnection(db_config, (err, conn) => {
        if(err) throw err

        if(query_schema(conn, "CREATE", table)){
            res.send("Query Success")
        } else {
            res.send("Query Fail")
        }
    })
})

router.get("/drop/all", (req, res) => {
    oracle.getConnection(db_config, (err, conn) => {
        if(err) throw err

        for(let i = schema_list.length - 1; i >= 0; i--){
            query_schema(conn, "DROP", schema_list[i])
        }
        
        res.send("DONE")
    })
})

router.get("/drop/:table", (req, res) => {
    let table = req.params.table
    oracle.getConnection(db_config, (err, conn) => {
        if(err) throw err
        
        if(query_schema(conn, "DROP", table)){
            res.send("Query Success")
        } else {
            res.send("Query Fail")
        }
    })
})

router.get("/show/", (req, res) => {
    oracle.getConnection(db_config, (err, conn) => {
        if(err) throw err
        
        query_schema(conn, "SHOW", db_config.user)
        res.send(`drop table (${table})`)
    })
})

const db_router = router

export { db_router }
