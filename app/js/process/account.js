import { check_duplicate_account, insert_account } from "../entities/account.js"
import { doDBRelease, getDBConnect } from "../db/connect.js"

import { fetch_points } from "../entities/account.js"

export async function fetch_account_points(req) {
    let is_success = false

    const conn = await getDBConnect()
    try {
        // 고객 코드 발급
        await fetch_points(conn, req)
        console.log("(signup) : CODE ISSUE OK")

        is_success = true
    }
    catch(err) {
        console.log("(SIGNUP) : Process is failed by ", err)
        is_success = false
    } finally {
        await doDBRelease(conn)
    }

    return is_success
}

export async function fetch_customer_code_by_account(req) {
    let is_success = false

    const conn = await getDBConnect()
    let data = []
    try {
        // 고객 코드 발급
        const customer_code_info = await select_customer_code(conn, req)
        req.params.customer_code = customer_code_info[0].CUSTOMER_CODE

        is_success = true
    }
    catch(err) {
        console.log("(SIGNUP) : Process is failed by ", err)
        is_success = false
    } finally {
        await doDBRelease(conn)
    }

    return is_success
}