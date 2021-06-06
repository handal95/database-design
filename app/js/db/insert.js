export async function insert_record(conn, table, subquery, values){
    let query = `INSERT INTO ${table} ${subquery}`

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
