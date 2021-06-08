import { doDBRelease, getDBConnect } from "../db/connect.js"
import { get_payment_max_uid, insert_payment_process, update_payment_method } from "../entities/payment.js"

import { get_all_reserved_seat } from "../entities/reserve.js"
import { get_payment_uid } from "../entities/payment.js"
import { get_seats_by_seat_id } from "../entities/seat.js"
import { get_ticket_info } from "../entities/ticket.js"
import { select_customer_code } from "../entities/account.js"
import session from "express-session"
import { update_reserved_seat_status } from "../entities/reserve.js"

export async function input_payment_process(req) {
    let is_success = false

    const conn = await getDBConnect()
    try {
        
        const customer_code_info = await select_customer_code(conn, req)
        req.session.customer_code = customer_code_info[0].CUSTOMER_CODE

        const next_ticket_uid = await get_payment_max_uid(conn, req)
        req.params.payment_uid = next_ticket_uid
        await insert_payment_process(conn, req)

        is_success = true
    }
    catch(err) {
        console.log("(SIGNUP) : Process is failed by ", err)
        is_success = false
    } finally {
        await doDBRelease(conn)
    }

    return is_success
}

export async function update_payment_process(req) {
    let is_success = false

    const conn = await getDBConnect()
    try {
        
        await update_payment_method(conn, req)
        const result = await get_payment_uid(conn, req)
        req.params.payment_uid = result[0].PAYMENT_UID

        console.log("payment uid ", req.params.payment_uid)

        is_success = true
    }
    catch(err) {
        console.log("(SIGNUP) : Process is failed by ", err)
        is_success = false
    } finally {
        await doDBRelease(conn)
    }

    return is_success
}


export async function fetch_grand_process(req) {
    let is_success = false

    const conn = await getDBConnect()
    try {
        let ticket_info = await get_ticket_info(conn, req)
        req.params.ticket_uid = ticket_info[0].TICKET_UID
        
        await update_payment_method(conn, req)
        let payment_info = await get_payment_uid(conn, req)
        req.params.payment_uid = payment_info[0].PAYMENT_UID

        let result_list = await get_all_reserved_seat(conn, req)
        req.params.session_uid = result_list[0].SESSION_UID

        // let data = []
        // for(let i = 0; i < result_list.length; i++ ){
        //     let session_uid = result_list[i].SESSION_UID
        //     let seat_uid = result_list[i].SEAT_UID

        //     req.params.session_uid = session_uid
        //     req.params.seat_uid = seat_uid
        //     await update_reserved_seat_status(conn, req)

        //     let seat_info = await get_seats_by_seat_id(conn, req)
        //     req.params.seat_row = seat_info[0].SEAT_ROW
        //     req.params.seat_col = seat_info[0].SEAT_COL
        //     req.params.seat_status = seat_info[0].SEAT_STATUS

        //     data.push({
        //         ticket_uid: req.params.ticket_uid,
        //         payment_uid: req.params.payment_uid,
        //         session_uid: req.params.session_uid,
        //         seat_uid: req.params.seat_uid,
        //         seat_row: req.params.seat_row,
        //         seat_col: req.params.seat_col,
        //         seat_status: req.params.seat_status,
        //     })
        // }

        req.params.data = {
            payment_uid : req.params.payment_uid,
            ticket_uid : req.params.ticket_uid,
            session_uid : req.params.session_uid,
        }
        is_success = true
    }
    catch(err) {
        console.log("(SIGNUP) : Process is failed by ", err)
        is_success = false
    } finally {
        await doDBRelease(conn)
    }

    return is_success
}

