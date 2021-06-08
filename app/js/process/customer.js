import { doDBRelease, getDBConnect } from "../db/connect.js"

import { select_customer_code_by_info } from "../entities/customer.js"

export async function fetch_customer_code_by_info(req) {
    let is_success = false

    const conn = await getDBConnect()
    try {
        // 고객 코드 발급
        const customer_code_info = await select_customer_code_by_info(conn, req)
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