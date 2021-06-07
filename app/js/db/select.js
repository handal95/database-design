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
    } catch(err) {
        console.log(`${err.errorNum} QUERY(${query}) can not excuted`);
        console.error(` - ${err.message}`)
    }

    return data
}


export async function select_one(conn, table, query_body, columns="*", force=true){
    let query = (
        `SELECT ${columns} FROM ${table} ${query_body}`
    )

    let data = {
        data: {},
        length: 0,
        existence : false,
        uniqueness: false,
    }
    
    try{
        const result = await conn.execute(query)
        if(result.rows.length == 0){
            throw `RESULT IS EMPTY`
        }

        if(force && result.rows.length > 1){
            throw `RESULT IS NOT ONLY ONE (${result.rows.length})`
        }

        data = {
            data: result.rows[0],
            length: result.rows.length,
            existence: result.rows.length > 0,
            uniqueness: (result.rows.length == 0)
        }

    } catch(err) {
        console.log(`${err.errorNum} QUERY(${query}) can not excuted`);
        console.log(` - ${err}, ${err.message}`)
    }

    return data
}