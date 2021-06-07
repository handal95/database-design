import { printQueryError } from "./connect.js"

export async function create_schema(conn, table, query_body){
    let query = `CREATE TABLE ${table} (${query_body})`
    let data = { response: false }

    try{
        const result = await conn.execute(query)
        data = { response: true }

    } catch(err) {
        if(err.errorNum == 955){
            console.log(`(error ) Table(${table}) is already exist`)

            return data
        }
        printQueryError(err, query)

    }

    return data
}

export async function drop_schema(conn, table){
    let query = `DROP TABLE ${table}`
    let data = { response: false }

    try{
        const result = await conn.execute(query)
        data = { response: true }

    } catch(err) {
        if(err.errorNum == 942){
            console.log(`(error ) Table(${table}) is not exist`)

            return data
        }
        printQueryError(err, query)

    }

    return data
}
