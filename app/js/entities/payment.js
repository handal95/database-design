import { insert_query } from "../db/insert.js"
import { select_query } from "../db/select.js"
import { update_query } from "../db/update.js"

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
        `('${req.params.payment_uid}', '${req.session.customer_code}', '', '')`
    )
    console.log(query)

    let result = await insert_query(conn, query)
    let data = result.data

    return data
}

export async function update_payment_method(conn, req){
    // 말도 안되는 방식의 코드지만..... 시간상...
    let query = (
        `UPDATE payment SET payment_method = '${req.params.payment_method}', payment_price = '${req.body.payment_price}' WHERE customer_code = '${req.session.customer_code}'`
    )

    let result = await update_query(conn, query)
    let data = result.data

    return data
}


export async function get_payment_uid(conn, req){
    // 시간상...
    let query = (
        `SELECT payment_uid FROM payment ` + 
        `WHERE payment_method = '${req.params.payment_method}' AND payment_price = '${req.body.payment_price}' AND customer_code = '${req.session.customer_code}'`
    )

    let result = await select_query(conn, query)
    let data = result.data

    return data
}

export async function select_payment_info(conn, req){
    // 시간상...
    let query = (
        `SELECT * FROM payment WHERE payment_uid = '${req.params.payment_uid}`
    )

    let result = await select_query(conn, query)
    let data = result.data

    return data
}