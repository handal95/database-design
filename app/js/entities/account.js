import { select_exists, select_one } from "../db/select.js"

import { delete_customer } from "./customer.js"
import { insert_record } from "../db/insert.js"
import { select_query } from "../db/select.js"
import { update_query } from "../db/update.js"

export async function get_account_info(conn, req){
    let query_body = `WHERE account_id = '${req.body.account_id}' AND PWDKEY = '${req.body.pwdkey}'`
    let columns = "account_id, nickname, email"

    let result = await select_one(conn, "ACCOUNT", query_body, columns)
    if(!result.existence){
        throw `ACCOUNT ID(${req.body.account_id}) is invalid`
    }

    let data = {
        account_id: result.data.ACCOUNT_ID,
        nickname: result.data.NICKNAME,
        email: result.data.EMAIL
    }
    
    return data
}

export async function check_duplicate_account(conn, req){
    let query_body = `WHERE account_id = '${req.body.account_id}'`

    const result = await select_exists(conn, "ACCOUNT", query_body)
    if(!result.uniqueness){
        throw `ACCOUNT ID(${req.body.account_id}) is already existence`
    }
}

export async function check_account_customer(conn, req){
    let query_body = `WHERE customer_code = '${req.body.code}'`

    const result = await select_exists(conn, "ACCOUNT", query_body)
    if(!result.existence){
        delete_customer(conn, req)
    }
}

export async function insert_account(conn, req){
    let query_body = (
        "(account_id, customer_code, nickname, pwdkey, email)" +
        "VALUES(:account_id, :customer_code, :nickname, :pwdkey, :email)"
    )
    let values = [
        req.body.account_id,        // account_id
        req.body.code,      // customer code
        req.body.nickname,  // nickname
        req.body.pwdkey,        // pwdkey
        req.body.email,     // email
    ]

    const result = await insert_record(conn, "ACCOUNT", query_body, values)
    if(!result.response){
        delete_customer(conn, req)
        throw "INSERT ACCOUNT FAIL"
    }
}


export async function update_pwdkey(conn, req){
    let query = (
        `UPDATE ACCOUNT SET PWDKEY = ${req.params.pwdkey} WHERE account_id = '${req.params.account_id}'`
    )

    const result = await update_query(conn, query)
    if(!result.response){
        throw "UPDATE PWDKEY FAIL"
    }
} 

export async function update_nickname(conn, req){
    let query = (
        `UPDATE ACCOUNT SET NICKNAME = ${req.params.nickname} WHERE account_id = '${req.params.account_id}'`
    )

    const result = await update_query(conn, query)
    if(!result.response){
        throw "UPDATE PWDKEY FAIL"
    }
} 

export async function update_email(conn, req){
    let query = (
        `UPDATE ACCOUNT SET EMAIL = ${req.params.email} WHERE account_id = '${req.params.account_id}'`
    )

    const result = await update_query(conn, query)
    if(!result.response){
        delete_customer(conn, req)
        throw "UPDATE PWDKEY FAIL"
    }
} 

export async function fetch_points(conn, req){
    let query = (
        `SELECT ACCOUNT_POINTS FROM ACCOUNT WHERE account_id = '${req.session.account_id}'`
    )

    const result = await select_query(conn, query)
    let data = result.data

    return data
}

export async function select_customer_code(conn, req){
    let query = `SELECT customer_code FROM account WHERE account_id = '${req.session.account_id}'`

    let result = await select_query(conn, query)
    let data = result.data

    return data
}


export async function update_points(conn, req){
    
    let update_points = current_points + req.params.points_value
    let query = (
        `UPDATE ACCOUNT SET points = ${req.params.update_points} WHERE account_id = '${req.params.account_id}'`
    )

    let result = await select_query(conn, query)
    let data = result.data

    return data
}