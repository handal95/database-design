export async function create_schema(conn, table, query_body){
    let query = `CREATE TABLE ${table} (${query_body})`

    let data = { response: false }
    try{
        const result = await conn.execute(query)
        console.log(`(create) Table(${table}) create ok`)
        data = { response: true }
    } catch(err) {
        if(err.errorNum == 955){
            console.log(`(error ) Table(${table}) is already exist`)
            return
        }
        console.log(`${err.errorNum} QUERY(${query}) can not excuted`);
        console.error(` - ${err.message}`)
    }

    return data
}

export async function drop_schema(conn, table){
    let query = `DROP TABLE ${table}`

    let data = { response: false }
    try{
        const result = await conn.execute(query)
        console.log(`(drop  ) Table(${table}) drop ok`)
        data = { response: true }

    } catch(err) {
        if(err.errorNum == 942){
            console.log(`(error ) Table(${table}) is not exist`)
            return
        }
        console.log(`${err.errorNum} QUERY(${query}) can not excuted`);
        console.error(` - ${err.message}`)
    }
    return data
}
