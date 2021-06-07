import db_config from "../configs/db_config.js";
import express from "express";
import fs from "fs"
import oracle from "oracledb";
import path from 'path';
import { query_schema } from "../utils/queries.js"

const router = express.Router({ mergeParams: true });
oracle.outFormat = oracle.OBJECT;
oracle.autoCommit = true;

const BASE_SCHEMA = "./queries/schema/"

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
            console.log("CONNECT ERR", err.message)
            return
        }

        let table_schema = `${BASE_SCHEMA}${table}.sql`
        let query = fs.readFileSync(table_schema).toString();
        query_schema(conn, "CREATE", table, query)
        
        res.redirect("/")
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

router.get("/show/", (req, res) => {
    oracle.getConnection(db_config, (err, conn) => {
        if(err){
            console.log(err.message)
            return
        }
        
        query_schema(conn, "SHOW", db_config.user)
        res.send(`drop table (${table})`)
    })
})

const db_router = router

export { db_router };
