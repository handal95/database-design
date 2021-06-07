import { create_schema, drop_schema } from "../db/schema.js"
import { doDBRelease, getDBConnect } from "../db/connect.js"

import fs from "fs"

const BASE_PATH = "./queries/schema/"
const SCHEMA_LIST = [ 
    "customer", "movie", "crew", "payment", "account",
    "theater", "genre", "poster", "contributor", "payment_history",
    "review", "store", "screen", "points", "ticket",
    "item",  "movie_session", "seat", "basket", "reserve"
]

export async function connect_test(req) {
    let is_success = false
    
    // DB 연결
    const conn = await getDBConnect()
    try{
        is_success = true
    }
    catch(err){
        console.log("(connect) : Process is failed by ", err)
        is_success = false
    } finally {
        await doDBRelease(conn)
    }
    
    return is_success
}

export async function create_table(req) {
    let is_success = false
    let table = (req.params.table == "all") ? SCHEMA_LIST : [ req.params.table ]
    // DB 연결
    const conn = await getDBConnect()
    try{
        // 스키마 불러오기
        for(let i = 0; i < table.length; i++){
            let schema_path = `${BASE_PATH}${table[i]}.sql`
            let query_body = fs.readFileSync(schema_path).toString();
            console.log(`(create) schema file(${table[i]}) load ok`)
            
            // 스키마 생성
            await create_schema(conn, table[i], query_body)
        }
        
        is_success = true
    }
    catch(err){
        console.log("(create) : Process is failed by ", err)
        is_success = false
    } finally {
        await doDBRelease(conn)
    }
    
    return is_success
}


export async function drop_table(req) {
    let is_success = false
    let table = (req.params.table == "all") ? SCHEMA_LIST : [ req.params.table ]

    // DB 연결
    const conn = await getDBConnect()
    try{
        for(let i = table.length - 1; i >= 0; i--){
            // 스키마 제거
            await drop_schema(conn, table[i])
        }
        
        is_success = true
    }
    catch(err){
        console.log("(drop  ) : Process is failed by ", err)
        is_success = false
    } finally {
        await doDBRelease(conn)
    }
    
    return is_success
}