import { doDBRelease, getDBConnect } from "../db/connect.js"

import { insert_payment_process } from "../entities/payment.js"

export async function input_payment_process(req) {
    let is_success = false

    const conn = await getDBConnect()
    try {
        
        const next_ticket_uid = await get_payment_max_uid(conn, req)
        req.params.payment_uid = next_ticket_uid
        await insert_payment_process(conn, req)

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