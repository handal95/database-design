export function doRelease(conn){
    conn.release((err)=>{
        if(err) {
            console.log("RELEASE FAIL : ", err.message)
        }
    })
}

function execute(conn, query){
    conn.execute(query, [], (err, result) => {
        if (err) {
            console.error("ERR1", err.message);
            console.error("ERR2", err.errorNum);
            doRelease(conn);
            return;
        }
        console.log(result.metaData);  //테이블 스키마
        doRelease(conn);
    });
}

export function query_schema(conn, command, table, schema){
    switch(command){
        case "CREATE":
            execute(conn, `CREATE TABLE ${table} ${schema}`)
            console.log("TABLE CREATED")
            break

        case "DROP":
            execute(conn, `DROP TABLE ${table}`)
            console.log("TABLE DROPPED")
            break
    }
}