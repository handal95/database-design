import { select_exists, select_one } from "../db/select.js"

import { delete_customer } from "./customer.js"
import { insert_record } from "../db/insert.js"

export async function get_account_info(conn, req){
    let subquery = `WHERE ACCOUNT_ID = '${req.body.id}' AND PWDKEY = '${req.body.pw}'`
    let columns = "account_id, nickname, email"

    const result = await select_one(conn, "ACCOUNT", subquery, columns)
    if(!result.existence){
        throw `ACCOUNT ID(${req.body.id}) is invalid`
    }
    
    let data = {
        account_id: result.values.ACCOUNT_ID,
        nickname: result.values.NICKNAME,
        email: result.values.EMAIL
    }
    return data
}

export async function check_duplicate_account(conn, req){
    let subquery = `WHERE account_id = '${req.body.id}'`

    const result = await select_exists(conn, "ACCOUNT", subquery)
    if(!result.uniqueness){
        throw `ACCOUNT ID(${req.body.id}) is already existence`
    }
}

export async function check_account_customer(conn, req){
    let subquery = `WHERE customer_code = '${req.body.code}'`

    const result = await select_exists(conn, "ACCOUNT", subquery)
    if(!result.existence){
        delete_customer(conn, req)
    }
}

export async function insert_account(conn, req){
    let subquery = (
        "(account_id, customer_code, nickname, pwdkey, email)" +
        "VALUES(:account_id, :customer_code, :nickname, :pwdkey, :email)"
    )
    let values = [
        req.body.id,        // account_id
        req.body.code,      // customer code
        req.body.nickname,  // nickname
        req.body.pw,        // pwdkey
        req.body.email,     // email
    ]

    const result = await insert_record(conn, "ACCOUNT", subquery, values)
    if(!result.response){
        delete_customer(conn, req)
        throw "INSERT ACCOUNT FAIL"
    }
} 