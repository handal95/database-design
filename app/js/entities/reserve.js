import { select_query } from "../db/select.js"

export async function get_reserved_info_by_pk(conn, req){
    let query = `SELECT seat_uid, reserve_status FROM reserve WHERE session_uid = '${req.params.movie_session_uid}' `
    let result = await select_query(conn, query)
    let data = result.data

    return data
}
