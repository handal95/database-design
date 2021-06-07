import { doDBRelease, getDBConnect } from "../db/connect.js"
import { insert_customer, issue_customer_code } from "../entities/customer.js"

import { get_account_info } from "../entities/account.js"
import { initAccountSession } from "../../utils/sessions.js"

export async function signin_account_process(req, res) {
    let is_success = false

    const conn = await getDBConnect()
    try{
        // 계정 정보 호출
        const data = await get_account_info(conn, req)
        console.log("(signin) : VALID ACCOUNT CHECK")
        
        // 계정 세션 등록
        initAccountSession(req, data);
        console.log("(signin) : ACCOUNT SESSION ON")

        console.log("(signup) : ALL SIGN IN PROCESS IS OK")
        is_success = true
    }
    catch(err) {
        console.log("(SIGNIN) : Process is failed by ", err)
        is_success = false
    } finally {
        await doDBRelease(conn)
    }

    return is_success
}


export async function signin_customer_process(req, res) {
    let is_success = false

    const conn = getDBConnect()
    try{

        // 고객 코드 발급
        await issue_customer_code(conn, "customer", req.body.phone, req)
        console.log("(signin) : CODE ISSUE OK")

        // 고객 정보 등록
        await insert_customer(conn, req)
        console.log("(signup) : INSERT CUSTOMER INFO OK")        

        // 계정 세션 등록
        initCustomerSession(req, data);
        console.log("(signin) : ACCOUNT SESSION ON")

        console.log("(signup) : ALL SIGN IN PROCESS IS OK")
        is_success = true
    }
    catch(err) {
        console.log("(SIGNIN) : Process is failed by ", err)
        is_success = false
    } finally {
        await doDBRelease(conn)
    }

    return is_success
}
