import { doDBRelease, getDBConnect } from "../db/connect.js"

import { get_sessioning_movie_info } from "../entities/movie_session.js"
import { get_sessioning_theaters } from "../entities/movie_session.js"

export async function fetch_sessioning_theater(req) {
    let is_success = false

    const conn = await getDBConnect()
    let theater_data = []
    let movie_data = []
    try{
        // 계정 정보 호출
        const theaters = await get_sessioning_theaters(conn, req)
        for(let i = 0; i < theaters.length; i++){
            theater_data.push({
                theater_code: theaters[i].THEATER_CODE,
                theater_name: theaters[i].THEATER_NAME,
            })
        }
        const movies = await get_sessioning_movie_info(conn, req)
        for(let i = 0; i < movies.length; i++){
            movie_data.push({
                movie_code: movies[i].MOVIE_CODE,
                movie_title: movies[i].MOVIE_TITLE,
            })
        }

        req.params.theaters = theater_data
        req.params.movies = movie_data
        console.log(movie_data)
        is_success = true
    }
    catch(err) {
        console.log("(ticket) : Process is failed by ", err)
    } finally {
        await doDBRelease(conn)
    }

    return is_success
}
