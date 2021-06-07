import { printQueryError } from "./connect.js"

export async function insert_record(conn, table, query_body, values){
    let query = `INSERT INTO ${table} ${query_body}`
    let data = { response: false }

    try{
        const result = await conn.execute(query, values)
        data = { response: true }

    } catch(err) { printQueryError(err, query) }

    return data
}

export async function insert_seed(conn, table, query_body){
    let query = `INSERT INTO ${table} VALUES(${query_body})`
    let data = { response: false }

    try{
        const result = await conn.execute(query)
        data = { response: true }

    } catch(err) { printQueryError(err, query) }

    return data
}
