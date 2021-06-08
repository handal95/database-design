import { doDBRelease, getDBConnect } from "../db/connect.js"
import { get_movie_by_session_uid, get_screen_by_session_uid } from "../entities/movie_session.js"
import { get_payment_max_uid, insert_payment_process } from "../entities/payment.js"
import { get_ticket_max_uid, insert_ticket_info } from "../entities/ticket.js"

import { get_movie_title_by_code } from "../entities/movie.js"
import { get_screen_info_by_code } from "../entities/screen.js"
import { get_theater_name } from "../entities/theater.js"
import { reserve_session_seat } from "../entities/reserve.js"
import { select_customer_code } from "../entities/account.js"

export async function reserve_seat_process(req) {
    let is_success = false

    const conn = await getDBConnect()
    try{
        req.params.movie_session_uid = req.query.session_uid

        const screen_code_info = await get_screen_by_session_uid(conn, req)
        const movie_code_info = await get_movie_by_session_uid(conn, req)
        req.params.screen_code = screen_code_info[0].SCREEN_CODE
        req.params.movie_code = movie_code_info[0].MOVIE_CODE

        const screen_info = await get_screen_info_by_code(conn, req)
        const movie_title = await get_movie_title_by_code(conn, req)
        req.params.theater_code = screen_info[0].THEATER_CODE
        req.params.screen_name = screen_info[0].SCREEN_NAME
        req.params.movie_title = movie_title[0].MOVIE_TITLE

        const theater_info = await get_theater_name(conn, req)
        req.params.theater_name = theater_info[0].THEATER_NAME

        // const next_ticket_uid = await get_ticket_max_uid(conn, req)
        const customer_code_info = await select_customer_code(conn, req)
        req.session.customer_code = customer_code_info[0].CUSTOMER_CODE

        const next_payment_uid = await get_payment_max_uid(conn, req)
        req.params.payment_uid = next_payment_uid
        await insert_payment_process(conn, req)

        const next_ticket_uid = await get_ticket_max_uid(conn, req)
        req.params.ticket_uid = next_ticket_uid

        await insert_ticket_info(conn, req)

        const reserve_session_seat_list = req.query.reserved_seat_list
        for(let i = 0; i < reserve_session_seat_list.length; i++){
            let reserved_seat = reserve_session_seat_list[i]

            req.params.seat_uid = reserved_seat.seat_uid
            
            await reserve_session_seat(conn, req)
        }
    }
    catch(err) {
        console.log("(signin) : Process is failed by ", err)
    } finally {
        await doDBRelease(conn)
    }

    return is_success
}