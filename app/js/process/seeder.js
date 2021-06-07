import { doDBRelease, getDBConnect } from "../db/connect.js"

import { delete_record } from "../db/delete.js"
import fs from "fs"
import { insert_seed } from "../db/insert.js"

const BASE_PATH = "./queries/seeder/"
const SCHEMA_LIST = [ 
    "customer", "movie", "crew", "payment", "account",
    "theater", "genre", "poster", "contributor", "payment_history",
    "review", "store", "screen", "points", "ticket",
    "item",  "movie_session", "seat", "basket", "reserve"
]

export async function seed_data(req) {
    let is_success = false
    let table = (req.params.table == "all") ? SCHEMA_LIST : [ req.params.table ]

    // DB 연결
    const conn = await getDBConnect()
    try {
        // 스키마 불러오기
        for(let i = 0; i < table.length; i++){
            let schema_path = `${BASE_PATH}${table[i]}.txt`
            let query_bodies = fs.readFileSync(schema_path).toString().split("\r\n");

            for(let j = 0; j < query_bodies.length; j++){
                // 데이터 주입
                await insert_seed(conn, table[i], query_bodies[j])
            }
        }
        
        is_success = true

    } catch (err) {
        console.log("(create) : Process is failed by ", err)
        is_success = false

    } finally {
        await doDBRelease(conn)
    }
    
    return is_success
} 

export async function delete_data(req) {
    let is_success = false
    let table = (req.params.table == "all") ? SCHEMA_LIST : [ req.params.table ]

    // DB 연결
    const conn = await getDBConnect()
    try {
        // 스키마 불러오기
        const query_body = ''
        for(let i = 0; i < table.length; i++){
            await delete_record(conn, table[i], query_body)
        }
        
        is_success = true

    } catch (err) {
        console.log("(create) : Process is failed by ", err)
        is_success = false

    } finally {
        await doDBRelease(conn)
    }
    
    return is_success
} 
