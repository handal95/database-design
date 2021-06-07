import { select_data } from "../db/select.js"

export async function get_seat_amount(conn, req){
    let query_body = ''
    let columns = "screen_code, seat_amount, screen_business_status"

    let result = await select_data(conn, "SCREEN", query_body, columns)
    let data = result.data

    return data
}