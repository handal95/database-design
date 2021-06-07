import { doDBRelease, getDBConnect } from "../db/connect.js"
import { get_sessioning_movie, get_sessioning_theater } from "../entities/movie_session.js"

export async function fetch_disticnt_theater_info(req) {
    let is_success = false

    const conn = await getDBConnect()
    try{
        // 영화 상영 정보 호출
        await get_distinct_theater_info(conn, req)
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


export async function fetch_movie_session_info(req) {
    let is_success = false

    const conn = await getDBConnect()
    try{
        // 상영중인 영화관 정보 호출
        const theaters = await get_sessioning_theater(conn, req)
        console.log("(movie_session) : DISTINCT THEATER CHECK")
        
        // 상영중인 영화 정보 호출
        const movies = await get_sessioning_movie(conn, req)
        console.log("(movie_session) : DISTINCT MOVIE CHECK")
        
        req.params = {
            theaters: theaters,
            movies: movies,
        }

        is_success = true
    }
    catch(err) {
        console.log("(movie_session) : Process is failed by ", err)
    } finally {
        await doDBRelease(conn)
    }

    return is_success
}
