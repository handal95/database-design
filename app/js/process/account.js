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