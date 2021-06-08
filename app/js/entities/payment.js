import { select_query } from "../db/select.js"

export async function get_payment_max_uid(conn, req){
    let query = `SELECT MAX(payment_uid) AS CUR_UID FROM payment`

    let result = await select_query(conn, query)
    let data = result.data[0].CUR_UID

    data = (data == null) ? 0 : data + 1

    return data
}


export async function insert_payment_process(conn, req){
    let query = (
        `INSERT INTO payment VALUES ` + 
        `('${req.params.payment_uid}', '${req.session.customer_code}', '${req.body.payment_price}', '${req.body.payment_method})`
    ) 

    let result = await select_query(conn, query)
    let data = result.data

    return data
}