import db_config from "../../configs/db_config.js"
import oracle from "oracledb"

export async function getDBConnect(){
    try { 
        const DB_CONNECT = await oracle.getConnection(db_config)
        return DB_CONNECT
    } catch (err) {
        console.error("DB CONNECTION ERROR")
        doDBRelease(DB_CONNECT)
        throw err
    }
}

export async function doDBRelease(conn){
    try { 
        conn.release()
    } catch(err) {
        console.log("Release fail")
    }
}