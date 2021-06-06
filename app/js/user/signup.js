import db_config from "../../configs/db_config.js"
import oracle from "oracledb"

function check_uniqueness(conn, req){
    let account_id = req.body.id
    let query = (
        `SELECT 1 FROM ACCOUNT WHERE account_id = '${account_id}'`
    )
        
    let uniqueness = async () => {
        return new Promise((resolve, reject) => {
            conn.execute(query, (err, result) => {
                if(err){
                    console.log(`${err.errorNum} QUERY(${query}) can not excuted`);
                    console.error(` - ${err.message}`)
                    resolve(false)
                }
                resolve(result.rows.length == 0)
            })
        })
    }
    console.log("log1 ", uniqueness)
    console.log("log2 ", uniqueness())
    console.log("log3 ", uniqueness().resolve)
    return uniqueness
}

function insert_customer(conn, req, data){
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

    conn.execute(query, values, (err, result)=>{
        if(err) {
            console.log(`${err.errorNum} QUERY(${query}) can not excuted`);
            console.error(` - ${err.message}`)
            return false
        }
        console.log("Customer INSERT : ", result.rowsAffected)
        return true
    })
    return false
} 

function insert_account(conn, req, data){
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

    conn.execute(query, values, (err, result)=>{
        if(err) {
            console.log(`${err.errorNum} QUERY(${query}) can not excuted`);
            console.error(` - ${err.message}`)
            return false
        }
        console.log("Account INSERT : ", result.rowsAffected)
        return true
    })

    return false
} 

export function signup_process(req, res) {
    let is_success = false
    oracle.getConnection(db_config, (err, conn) => {
        if(err){
            console.log("===> duplicate check error")
            throw err
        }
        let is_uniqueness = check_uniqueness(conn, req)

        console.log("PROCESS UNIQUENESS : " , is_uniqueness)
        if(!is_uniqueness){
            console.log("UNIQUNESS FAIL")
            return false
        } else {
            console.log("uniqueness ok")
        }
        
        // let CUSTOMER_CODE = "1234567890123459"
        // let is_success_customer = insert_customer(conn, req, CUSTOMER_CODE)

        // if(!is_success_customer){
        //     console.log("INSERT CUSTOMER FAIL")
        //     return false
        // }

        // let is_success_account = insert_account(conn, req, CUSTOMER_CODE)
        // if(!is_success_account){
        //     console.log("INSERT ACCOUNT FAIL")
        //     return false
        // }
        // is_success = true
    })
    return is_success
}
