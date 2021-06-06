import { fill_code } from "../../utils/string.js"
import { insert_record } from "../db/insert.js"
import { select_exists } from "../db/select.js"

// TEMP
export async function issue_customer_code(conn, category, raw_code, req){
    if(category != "account" && category != "customer"){
        throw `issue customer code error, invalid category(${category})`
    }

    const CUSTOMER_CODE = category[0].toUpperCase() + fill_code(raw_code)
    
    let subquery = `WHERE customer_code = '${CUSTOMER_CODE}'`
    const result = await select_exists(conn, "CUSTOMER", subquery)
    if(result.existence){
        throw "CUSTOMER CODE ISSUE FAIL"
    }
    req.body.code = CUSTOMER_CODE
}

export async function insert_customer(conn, req){
    let subquery = (
        "(customer_code, customer_name, customer_birth_date, phone)" +
        "VALUES(:customer_code, :customer_name, :customer_birth_date, :phone)"
    )
    let values = [
        req.body.code,  // customer_code
        req.body.name,  // customer_name
        req.body.birth, // customer_birth_date
        req.body.phone  // customer_phone
    ]

    const result = await insert_record(conn, "CUSTOMER", subquery, values)
    if(!result.response){
        throw "INSERT CUSTOMER FAIL"
    }
} 

export async function delete_customer(conn, req){
    let subquery = (
        `WHERE customer_code = '${req.body.code}'`
    )

    const result = await delete_record(conn, "CUSTOMER", subquery)
    if(!result.response){
        throw "DELETE CUSTOMER FAIL"
    }
}