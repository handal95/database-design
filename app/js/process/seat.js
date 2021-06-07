import { doDBRelease, getDBConnect } from "../db/connect.js"

import { get_screen_by_session_uid, } from "../entities/movie_session.js"
import { get_seat_amount_by_screen_code } from "../entities/screen.js"
import { get_seats_by_screen_code } from "../entities/seat.js"

export async function fetch_seats_process(req) {
    let is_success = false
    
    const conn = await getDBConnect()
    let data = []
    try{
        console.log(req.params)
        req.params.movie_session_uid = req.body.movie_session_uid
        // 상영중인 영화 정보 호출
        const screen_code = await get_screen_by_session_uid(conn, req)
        req.params.screen_code = screen_code[0].SCREEN_CODE 
        
        const screen_info = await get_seat_amount_by_screen_code(conn, req)
        req.params.seat_amount = screen_info[0].SEAT_AMOUNT 
        
        const seat_info = await get_seats_by_screen_code(conn, req)

        req.params.seats = seat_info

        is_success = true
    }
    catch(err) {
        console.log("(movie_session) : Process is failed by ", err)
    } finally {
        await doDBRelease(conn)
    }

    return is_success
}
