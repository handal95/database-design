import { check_duplicate_account, insert_account } from "../entities/account.js"
import { delete_customer, insert_customer, issue_customer_code } from "../entities/customer.js"
import { doDBRelease, getDBConnect } from "../db/connect.js"

export async function signup_process(req) {
    let is_success = false
    
    const conn = await getDBConnect()
    try{
        // 중복 아이디 확인
        await check_duplicate_account(conn, req)
        console.log("(signup) : UNIQUE CHECK OK")
        
        // 고객 정보 등록
        console.log(">> SUBPROCESS")
        const raw_code = req.body.id
        const result = await signup_process_customer(req, raw_code)
        if(!result){
            await delete_customer(conn, req)
            throw "SIGNUP PROCESS CUSTOMER"
        }
            
        console.log("<< SUBPROCESS")

        // 계정 정보 등록
        await insert_account(conn, req)
        console.log("(signup) : INSERT ACCOUNT INFO OK")
        
        console.log("(signup) : ALL SIGN UP PROCESS IS OK")
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

export async function signup_process_customer(req, raw_code) {
    let is_success = false

    const conn = await getDBConnect()
    try {
        // 고객 코드 발급
        await issue_customer_code(conn, "customer", raw_code, req)
        console.log("(signup) : CODE ISSUE OK")

        // 고객 정보 등록
        await insert_customer(conn, req)
        console.log("(signup) : INSERT CUSTOMER INFO OK")    

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