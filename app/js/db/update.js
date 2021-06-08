import { printQueryError } from "./connect.js"

export async function update_query(conn, query){
    let data = { response: false }

    try{
        const result = await conn.execute(query)
        data = { response: true }

    } catch(err) { printQueryError(err, query) }

    return data
}