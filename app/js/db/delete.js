export async function delete_record(conn, table, subquery){
    let query = `DELETE FROM ${table} ${subquery}`

    let data = {
        response: false,
        values: 0,
    }

    try{
        const result = await conn.execute(query)
        data = {
            response: true,
            values: result.rowsAffected,
        }
    } catch(err) {
        console.log(`${err.errorNum} QUERY(${query}) can not excuted`);
        console.error(` - ${err.message}`)
    }

    return data
}
