import { doRelease, query_schema } from "../queries/connect.js"

import db_config from "../configs/db.js";
import express from "express";
import oracle from "oracledb";

const router = express.Router()
oracle.outFormat = oracle.OBJECT;
oracle.autoCommit = true;

const crew_schema = (
    '(' +
    '    crew_code varchar(16) PRIMARY KEY, ' +
    '    crew_name varchar(32) NOT NULL,' +
    '    nationality varchar(64) NULL,' +
    '    crew_birth_date date NULL,' +       // DATETIME ?
    '    crew_name_eng varchar(32) NULL,' +
    '    sex varchar(16) NULL,' +
    '    profile_image BLOB NULL ' +         // IMAGE ? 
    ')'
)

router.get("/", (req, res) => {
    oracle.getConnection(db_config, (err, conn) => {
        if(err) throw err
        res.send("connect test success")
    })
})

router.get("/create/:table", (req, res) => {
    let table = req.params.table
    oracle.getConnection(db_config, (err, conn) => {
        if(err){
            console.log(err.message)
            return
        }
        
        query_schema(conn, "CREATE", table, crew_schema)
        res.send(`create table (${table})`)
    })
})

router.get("/drop/:table", (req, res) => {
    let table = req.params.table
    oracle.getConnection(db_config, (err, conn) => {
        if(err){
            console.log(err.message)
            return
        }
        
        query_schema(conn, "DROP", table)
        res.send(`drop table (${table})`)
    })
})

const db_router = router

export { db_router };
