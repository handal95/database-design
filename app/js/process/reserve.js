import { doDBRelease, getDBConnect } from "../db/connect.js"
import { get_ticket_max_uid, insert_ticket_info } from "../entities/ticket.js"

import { reserve_session_seat } from "../entities/reserve.js"

export async function reserve_seat_process(req) {
    let is_success = false

    const conn = await getDBConnect()
    try{
        req.params.movie_session_uid = req.query.session_uid
        const next_ticket_uid = await get_ticket_max_uid(conn, req)
        req.params.ticket_uid = next_ticket_uid

        await insert_ticket_info(conn, req)

        const reserve_session_seat_list = req.query.reserved_seat_list
        for(let i = 0; i < reserve_session_seat_list.length; i++){
            let xxxxx = reserve_session_seat_list[i]

            console.log("reserved_seat", xxxxx)
            // req.params.seat_uid = reserved_seat.seat_uid
            
            // await reserve_session_seat(conn, req)
        }
        //     req.params.seat_row = reserved_seat.seat_uid
        //     req.params.seat_col = reserved_seat.seat_col
        //     req.params.seat_category = reserved_seat.seat_category

        //     await reserve_session_seat(conn, req)
        // }
        // console.log(req.query.)
        // // 계정 정보 호출
        // console.log("(signin) : VALID ACCOUNT CHECK")
        
        // // 계정 세션 등록
        // await initSession(req, "account", data);
        // console.log("(signin) : ACCOUNT SESSION ON")

        // console.log("(signin) : ACCOUNT SIGN IN PROCESS IS OK")
        // is_success = true
    }
    catch(err) {
        console.log("(signin) : Process is failed by ", err)
    } finally {
        await doDBRelease(conn)
    }

    return is_success
}