import { doDBRelease, getDBConnect } from "../db/connect.js"

import { get_theater_info } from "../entities/theater.js"

export async function theater_fetch_process(req) {
    let is_success = false

    const conn = await getDBConnect()
    try{
        // 계정 정보 호출
        req.params.theaters = await get_theater_info(conn, req)
        console.log("(ticket) : THEATER CHECK")
        
        is_success = true
    }
    catch(err) {
        console.log("(ticket) : Process is failed by ", err)
    } finally {
        await doDBRelease(conn)
    }

    return is_success
}
