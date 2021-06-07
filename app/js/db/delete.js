import { printQueryError } from "./connect.js"

export async function delete_record(conn, table, query_body){
    let query = `DELETE FROM ${table} ${query_body}`
    let data = {
        response: false,
        values: 0
    }

    try{
        const result = await conn.execute(query)
        data = {
            response: true,
            values: result.rowsAffected
        }

    } catch(err) { printQueryError(err, query) }

    return data
}
