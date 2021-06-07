import { doDBRelease, getDBConnect } from "../db/connect.js"

import { get_reserved_info_by_pk } from "../entities/reserve.js"
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
        
        const seats_info = await get_seats_by_screen_code(conn, req)

        const reserve_info = await get_reserved_info_by_pk(conn, req)
        
        
        let data = []
        for(let i = 0; i < seats_info.length; i++){
            let seat_info = {
                'seat_uid': seats_info[i].SEAT_UID,
                'screen_code': seats_info[i].SCREEN_CODE,
                'seat_category': seats_info[i].SEAT_CATEGORY,
                'seat_status': seats_info[i].SEAT_STATUS,
                'reserve_status': "AVAILABLE",
                'seat_row': seats_info[i].SEAT_ROW,
                'seat_col': seats_info[i].SEAT_COL
            } 

            for(let j = 0; j < reserve_info.length; j++){
                if(reserve_info[j].SEAT_UID == seats_info[i]){
                    seat_info.reserve_status = reserve_info[j].RESERVE_STATUS
                    break
                }
            }

            data.push(seat_info)
        }
        
        req.params.seat_list = data

        is_success = true
    }
    catch(err) {
        console.log("(movie_session) : Process is failed by ", err)
    } finally {
        await doDBRelease(conn)
    }

    return is_success
}
