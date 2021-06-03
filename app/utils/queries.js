export function doRelease(conn){
    conn.release((err)=>{
        if(err) {
            console.log("RELEASE FAIL : ", err.message)
        }
    })
}

function execute(conn, query){
    var result = conn.execute(query, [], (err, result) => {
        if (err) {
            console.log(`${err.errorNum} QUERY can not excuted`);
            console.error(` - ${err.message}`)
            doRelease(conn);
        } else {
            console.log(`${query} is SUCCESS`)
        }
        doRelease(conn);
    });
    console.log(result)
}

export function query_schema(conn, command, table, schema){
    switch(command){
        case "CREATE":
            execute(conn, `CREATE TABLE ${table} (${schema})`)
            break

        case "DROP":
            execute(conn, `DROP TABLE ${table}`)
            break
            
        case "SHOW":
            execute(conn, `SELECT TABLE_NAME FROM ALL_TABLES WHERE OWNER='${table}'`)
            break
    }
}
