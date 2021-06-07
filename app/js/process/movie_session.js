import { doDBRelease, getDBConnect } from "../db/connect.js"

import { get_movie_title_by_code } from "../entities/movie.js"
import { get_screen_info_by_code } from "../entities/screen.js"
import { get_sessioning_movies } from "../entities/movie_session.js"
import { get_theater_name } from "../entities/theater.js"

export async function fetch_filter_movie_session(req) {
    let is_success = false
    
    const conn = await getDBConnect()
    let data = []
    try{
        req.params.theater_code = req.body.theater_code
        // 상영중인 영화 정보 호출
        let movie_sessions = await get_sessioning_movies(conn, req)
        console.log("(movie_session) : DISTINCT MOVIE CHECK")

        data = []
        for(let i = 0; i < movie_sessions.length; i++){
            req.params.session_uid = movie_sessions[i].SESSION_UID
            req.params.screen_code = movie_sessions[i].SCREEN_CODE
            req.params.movie_code = movie_sessions[i].MOVIE_CODE
            req.params.session_datetime = movie_sessions[i].SESSION_DATETIME
            const screen_info = await get_screen_info_by_code(conn, req)
            req.params.theater_code = screen_info[0].THEATER_CODE
            req.params.screen_name = screen_info[0].SCREEN_NAME
            const theater_info = await get_theater_name(conn, req)
            req.params.theater_name = theater_info[0].THEATER_NAME
            const movie_info = await get_movie_title_by_code(conn, req)
            req.params.movie_title = movie_info[0].MOVIE_TITLE
            
            let session = {
                session_uid: req.params.session_uid,
                theater_code: req.params.theater_code,
                theater_name: req.params.theater_name,
                screen_name: req.params.screen_name,
                movie_title: req.params.movie_title,
                session_datetime : req.params.session_datetime // < by direct
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
