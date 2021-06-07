import { select_data } from "../db/select.js"

export async function get_theater_info(conn, req){
    let query_body = ''
    let columns = "theater_code, theater_name"

    let result = await select_data(conn, "THEATER", query_body, columns)
    if(!result.existence){
        throw `THEATER is not exist`
    }

    let data = []
    for(let i = 0; i < result.length; i++){
        let info = result.data[i]
        data.push({
            theater_code: info.THEATER_CODE,
            theater_name: info.THEATER_NAME,
        })
    }

    return data
}


export async function get_theater_name(conn, req){
    let query_body = `WHERE theater_code = '${req.params.theater_code}'`
    let columns = "theater_name"

    let result = await select_data(conn, "THEATER", query_body, columns)
    let data = result.data

    return data
}
