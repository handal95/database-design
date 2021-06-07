import { doDBRelease, getDBConnect } from "../db/connect.js"

import { get_account_info } from "../entities/account.js"
import { get_customer_info } from "../entities/customer.js"
import { initSession } from "../process/session.js"
import { signup_process_customer } from "./signup.js"

export async function signin_account_process(req) {
    let is_success = false

    const conn = await getDBConnect()
    try{
        // 계정 정보 호출
        const data = await get_account_info(conn, req)
        console.log("(signin) : VALID ACCOUNT CHECK")
        
        // 계정 세션 등록
        await initSession(req, "account", data);
        console.log("(signin) : ACCOUNT SESSION ON")

        console.log("(signin) : ACCOUNT SIGN IN PROCESS IS OK")
        is_success = true
    }
    catch(err) {
        console.log("(signin) : Process is failed by ", err)
    } finally {
        await doDBRelease(conn)
    }

    return is_success
}


export async function signin_customer_process(req) {
    let is_success = false

    const conn = getDBConnect()
    let data = {}
    try{
        try{
            // 계정 정보 호출
            data = await get_customer_info(conn, req)
            console.log("(signin) : VALID CUSTOMER CHECK")
        } catch (err) {
            console.log("(signin) : customer info is not exists -> do subprocess")
            // 비회원 계정 등록 절차 진행
            await signup_process_customer(req)
            console.log("(signin) : CREATE CUSTOMER INFO")
            await get_customer_info(conn, req)
            console.log("(signin) : VALID CUSTOMER CHECK")
        }

        // 계정 세션 등록
        await initSession(req, "customer", data);
        console.log("(signin) : CUSTOMER SESSION ON")

        console.log("(signin) : CUSTOMER SIGN IN PROCESS IS OK")
        is_success = true
    }
    catch(err) {
        console.log("(signin) : Process is failed by ", err)
        is_success = false
    } finally {
        await doDBRelease(conn)
    }

    return is_success
}
