import { doDBRelease, getDBConnect } from "../db/connect.js"

import { get_movie_session_info } from "../entities/movie_session.js"

export async function fetch_movie_session_info(req) {
    let is_success = false

    const conn = await getDBConnect()
    try{
        // 계정 정보 호출
        req.params.movie_sessions = await get_movie_session_info(conn, req)
        console.log("(session) : THEATER CHECK")
        
        is_success = true
    }
    catch(err) {
        console.log("(session) : Process is failed by ", err)
    } finally {
        await doDBRelease(conn)
    }

    return is_success
}
