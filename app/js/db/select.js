import { printQueryError } from "./connect.js"

export async function select_exists(conn, table, query_body){
    let query = `SELECT 1 FROM ${table} ${query_body}`

    let data = {
        data: {},
        values: 0,
        existence : false,
        uniqueness: false,
    }

    try{
        const result = await conn.execute(query)
        data = {
            values: result.rows.length,
            existence: result.rows.length > 0,
            uniqueness: (result.rows.length == 0)
        }
    } catch(err) { printQueryError(err, query) }

    return data
}


export async function select_data(conn, table, query_body, columns="*", force=true){
    let query = (
        `SELECT ${columns} FROM ${table} ${query_body}`
    )

    let data = {
        response : false,
        data: {},
        length: 0,
        existence : false,
        uniqueness: false,
    }
    
    try{
        const result = await conn.execute(query)
        // 결과가 한 개도 없을 때
        if(result.rows.length == 0){
            console.log(`Query(${query}) RESULT IS EMPTY`)
            
            return data
        }

        data = {
            data: result.rows,
            length: result.rows.length,
            existence: result.rows.length > 0,
            uniqueness: (result.rows.length == 0)
        }

    } catch(err) { printQueryError(err, query) }

    return data
}

export async function select_one(conn, table, query_body, columns="*", force=true){
    let query = (
        `SELECT ${columns} FROM ${table} ${query_body}`
    )

    let data = {
        response : false,
        data: {},
        length: 0,
        existence : false,
        uniqueness: false,
    }
    
    try{
        const result = await conn.execute(query)
        // 결과가 한 개도 없을 때
        if(result.rows.length == 0){
            console.log(`Query(${query}) RESULT IS EMPTY`)
            
            return data
        }
        
        // 결과가 여러 개 있을 때
        if(force && result.rows.length > 1){
            console.log(`Query(${query}) RESULT IS NOT ONLY ONE`)

            return data
        }

        data = {
            data: result.rows[0],
            length: result.rows.length,
            existence: result.rows.length > 0,
            uniqueness: (result.rows.length == 0)
        }

    } catch(err) { printQueryError(err, query) }

    return data
}

export async function select_query(conn, query){
    let data = {
        response : false,
        data: {},
        length: 0,
        existence : false,
        uniqueness: false,
    }
    
    try{
        const result = await conn.execute(query)
        // 결과가 한 개도 없을 때
        if(result.rows.length == 0){
            console.log(`Query(${query}) RESULT IS EMPTY`)
            
            return data
        }
        
        data = {
            data: result.rows,
            length: result.rows.length,
            existence: result.rows.length > 0,
            uniqueness: (result.rows.length == 0)
        }

    } catch(err) { printQueryError(err, query) }

    return data
}