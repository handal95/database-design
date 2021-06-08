import { insert_query } from "../db/insert.js"
import { select_query } from "../db/select.js"

const ADULT_PRICE = 8000;
const CHILD_PRICE = 5000;

export async function get_ticket_max_uid(conn, req){
    let query = `SELECT MAX(ticket_uid) AS CUR_UID FROM ticket`

    let result = await select_query(conn, query)
    let data = result.data[0].CUR_UID

    data = (data == null) ? 0 : data + 1

    return data
}

export async function insert_ticket_info(conn, req){
    let ticket_price = (ADULT_PRICE * req.query.adult_no) + (ADULT_PRICE * req.query.child_no)
    req.params.ticket_price = ticket_price
    let query = `INSERT INTO TICKET VALUES(${req.params.ticket_uid}, '', ${ticket_price}, ${req.query.adult_no}, ${req.query.child_no}, 'PROCESSING')`

    let result = await insert_query(conn, query)
    let data = result.data

    return data
}