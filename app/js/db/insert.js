export async function insert_record(conn, table, query_body, values){
    let query = `INSERT INTO ${table} ${query_body}`

    let data = {
        response: false
    }

    try{
        const result = await conn.execute(query, values)
        data = {
            response: true
        }
    } catch(err) {
        console.log(`${err.errorNum} QUERY(${query}) can not excuted`);
        console.error(` - ${err.message}`)
    }

    return data
}
