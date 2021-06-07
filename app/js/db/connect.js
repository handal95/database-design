import db_config from "../../configs/db_config.js"
import oracle from "oracledb"

export async function getDBConnect(){
    var DB_CONNECT

    try { 
        DB_CONNECT = await oracle.getConnection(db_config)

        return DB_CONNECT

    } catch (err) {
        console.error("DB CONNECTION ERROR")
        doDBRelease(DB_CONNECT)

    }
}

export function printQueryError(err, query, print=true){
    if(print){
        if(err.errorNum != undefined){
            console.error(
                `    ${err.errorNum} QUERY(${query}) can not excuted \n` +
                `     - ${err.message}`
            )
            throw err
        } else {
            console.error(err)
        }
    }
}

export async function doDBRelease(conn){
    try { 
        conn.release()

    } catch(err) {
        console.log("Release fail")

    }
}