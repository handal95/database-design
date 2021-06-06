import db_config from "../../configs/db_config.js"
import oracle from "oracledb"

async function check_uniqueness(conn, req){
    let account_id = req.body.id
    let query = (
        `SELECT 1 FROM ACCOUNT WHERE account_id = '${account_id}'`
    )

    let uniqueness = false;
    try{
        const result = await conn.execute(query)
        uniqueness = result.rows.length == 0
    } catch(err) {
        console.log(`${err.errorNum} QUERY(${query}) can not excuted`);
        console.error(` - ${err.message}`)
        uniqueness = false
    }

    return uniqueness
}

async function insert_customer(conn, req, data){
    let query = (
        "INSERT INTO CUSTOMER(customer_code, customer_name, customer_birth_date, phone)" +
        "VALUES(:customer_code, :customer_name, :customer_birth_date, :phone)"
    )
    let CUSTOMER_CODE = data
    let values = [
        CUSTOMER_CODE,  // customer_code
        req.body.name,  // customer_name
        req.body.birth, // customer_birth_date
        req.body.phone  // customer_phone
    ]

    let is_success = false
    try{
        const result = await conn.execute(query, values)
        console.log("Customer INSERT : ", result.rowsAffected)
        is_success = true
    } catch (err) {
        console.log(`${err.errorNum} QUERY(${query}) can not excuted`);
        console.error(` - ${err.message}`)
        is_success = false
    }
    
    return is_success
} 

async function insert_account(conn, req, data){
    let query = (
        "INSERT INTO ACCOUNT(account_id, customer_code, nickname, pwdkey, email)" +
        "VALUES(:account_id, :customer_code, :nickname, :pwdkey, :email)"
    )
    let CUSTOMER_CODE = data
    let values = [
        req.body.id,  // account_id
        CUSTOMER_CODE, // customer code
        req.body.nickname, // nickname
        req.body.pw,    // pwdkey
        req.body.email, // email
    ]

    let is_success = false
    try{
        const result = await conn.execute(query, values)
        console.log("Account INSERT : ", result.rowsAffected)
        is_success = true
    } catch (err) {
        console.log(`${err.errorNum} QUERY(${query}) can not excuted`);
        console.error(` - ${err.message}`)
        is_success = false
    }

    return is_success
} 

export async function signup_process(req, res) {
    let is_success = false
    
    try{
        const conn = await oracle.getConnection(db_config)

        if(!await check_uniqueness(conn, req)) {
            console.log("UNIQUNESS FAIL")
            return false
        }
        console.log("UNIQUENESS OK")
        
        const CUSTOMER_CODE = "0000000000000002"
        if(!await insert_customer(conn, req, CUSTOMER_CODE)){
            console.log("CUSTOMER FAILURE")
            return false
        }
        console.log("CUSTOMER SUCCESS")

        if(!await insert_account(conn, req, CUSTOMER_CODE)){
            console.log("ACCOUNT FAILURE")
            return false
        }
        console.log("ACCOUNT SUCCESS")

        return true
    }
    catch(err) {
        console.log("SIGNUP PROCESS ERROR, ERR")
        return false
    }
}
