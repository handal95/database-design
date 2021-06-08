import { insert_query } from "../db/insert.js"
import { select_query } from "../db/select.js"

export async function get_reserved_info_by_pk(conn, req){
    let query = `SELECT seat_uid, reserve_status FROM reserve WHERE session_uid = '${req.params.movie_session_uid}' `
    let result = await select_query(conn, query)
    let data = result.data

    return data
}

export async function reserve_session_seat(conn, req){
    let query = `INSERT INTO reserve VALUES('${req.params.movie_session_uid}', '${req.params.seat_uid}', '${req.params.ticket_uid}', 'PROCESSING')`
    let result = await insert_query(conn, query)
    let data = result.data

    return data
}
