import { doDBRelease, getDBConnect } from "../db/connect.js"

import { get_sessioning_theaters } from "../entities/movie_session.js"

export async function fetch_sessioning_theater(req) {
    let is_success = false

    const conn = await getDBConnect()
    let data = []
    try{
        // 계정 정보 호출
        const theaters = await get_sessioning_theaters(conn, req)

        for(let i = 0; i < theaters.length; i++){
            data.push({
                theater_code: theaters[i].THEATER_CODE,
                theater_name: theaters[i].THEATER_NAME,
            })
        }

        req.params.theaters = data
    
        is_success = true
    }
    catch(err) {
        console.log("(ticket) : Process is failed by ", err)
    } finally {
        await doDBRelease(conn)
    }

    return is_success
}
