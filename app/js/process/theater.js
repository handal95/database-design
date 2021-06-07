import { doDBRelease, getDBConnect } from "../db/connect.js"

import { get_theater_info } from "../entities/theater.js"

export async function fetch_theater_process(req) {
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

export async function fetch_init_theater_process(req) {
    let is_success = false

    const conn = await getDBConnect()
    let data = []
    try{
        // 상영중인 영화관 정보 호출
        const theaters = await get_sessioning_theater(conn, req)
        console.log("(movie_session) : DISTINCT THEATER CHECK")
        console.log(theaters)
        
        // 상영중인 영화 정보 호출
        const movie_sessions = await get_movie_session(conn, req)
        console.log("(movie_session) : DISTINCT MOVIE CHECK")
        
        data = []
        for(let i = 0; i < movie_sessions.length; i++){
            let session = {
                theater_code: movie_sessions.theater_code,
                theater_name: movie_sessions.therater_name,
                screen_name: movie_sessions.screen_name,
                movie_title: movie_sessions.movies_name,
                session_datetime : movie_sessions.session_datetime
            }
            data.push(session)
        }

        req.params.movie_sessions = data

        is_success = true
    }
    catch(err) {
        console.log("(movie_session) : Process is failed by ", err)
    } finally {
        await doDBRelease(conn)
    }

    return is_success
}
