import { select_exists, select_one } from "../db/select.js"

import { delete_record } from "../db/delete.js"
import { fill_code } from "../../utils/string.js"
import { insert_record } from "../db/insert.js"

// TEMP
export async function issue_customer_code(conn, category, raw_code, req){
    if(category != "account" && category != "customer"){
        throw `issue customer code error, invalid category(${category})`
    }

    const CUSTOMER_CODE = category[0].toUpperCase() + fill_code(raw_code)
    
    let query_body = `WHERE customer_code = '${CUSTOMER_CODE}'`
    const result = await select_exists(conn, "CUSTOMER", query_body)
    if(result.existence){
        throw "CUSTOMER CODE ISSUE FAIL"
    }
    req.body.code = CUSTOMER_CODE
}

export async function insert_customer(conn, req){
    let query_body = (
        "(customer_code, customer_name, customer_birth_date, phone) " +
        "VALUES (:customer_code, :customer_name, :customer_birth_date, :phone)"
    )

    let values = [
        req.body.code,       // customer_code
        req.body.name,       // customer_name
        req.body.birth_date, // customer_birth_date
        req.body.phone       // customer_phone
    ]

    const result = await insert_record(conn, "CUSTOMER", query_body, values)
    if(!result.response){
        throw "INSERT CUSTOMER FAIL"
    }
} 

export async function delete_customer(conn, req){
    let query_body = (
        `WHERE customer_code = '${req.body.code}'`
    )

    const result = await delete_record(conn, "CUSTOMER", query_body)
    if(!result.response){
        throw "DELETE CUSTOMER FAIL"
    }
}

export async function get_customer_info(conn, req){
    let query_body = (
        `WHERE customer_name = '${req.body.name}' ` +
            `AND customer_birth_date = '${req.body.birth_date}' ` +
            `AND phone = '${req.body.phone}'`

    )
    let columns = "customer_name, customer_birth_date, phone"

    let result = await select_one(conn, "CUSTOMER", query_body, columns)
    if(!result.existence){
        throw `CUSTOMER is not exist`
    }

    let data = {
        account_id: result.data.ACCOUNT_ID,
        nickname: result.data.NICKNAME,
        email: result.data.EMAIL
    }
    
    return data
}