import { select_data } from "../db/select.js"
import { select_query } from "../db/select.js"

export async function get_seat_amount(conn, req){
    let query_body = ''
    let columns = "screen_code, seat_amount, screen_business_status"

    let result = await select_data(conn, "SCREEN", query_body, columns)
    let data = result.data

    return data
}



export async function get_screen_info_by_code(conn, req){
    let query = `SELECT theater_code, screen_name FROM screen WHERE screen_code = '${req.params.screen_code}'`

    let result = await select_query(conn, query)
    let data = result.data

    return data
}