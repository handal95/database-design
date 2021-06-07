import { fill_code } from "../../utils/string.js"
import { insert_seed } from "../db/insert.js"
import { select_data } from "../db/select.js"

export async function get_seats(conn, req){
    let query_body = ''
    let columns = "seat_amount"

    let result = await select_data(conn, "SEAT", query_body, columns)
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

export async function insert_screen_seat(conn, screen_info) {
    const SCREEN_CODE = screen_info.SCREEN_CODE
    // 좌석을 정사각 배열로
    const rows_length = (screen_info.SEAT_AMOUNT % 9 == 0) ? 9 : 5
    const cols_length = screen_info.SEAT_AMOUNT / rows_length

    // 좌석의 유형은 위치에 의해서만 결정된다.
    // ECONOMY(앞에서 1~2번 줄) STANDARD(기본) PRIME(양 끝이 아닌 뒤에서 1~2번 줄) 
    // 초기 생성시, 상영관이 현재 영업중이라면 이용 가능, 그 외 이용 불가
    const SEAT_STATUS = (screen_info == "OPENED") ? "AVAILABLE" : "UNAVAILABLE"
    for(let r = 1; r <= rows_length; r++){
        let seat_category = "STANDARD"
        if( r <= 2 ) {
            seat_category = "ECONOMY"
        } else if ( r > rows_length - 2 ){
            seat_category = "PRIME"
        }
        
        for (let c = 1; c <= cols_length; c++){
            const row_code = fill_code(r.toString(), '0', 3)
            const col_code = fill_code(c.toString(), '0', 3)
            const seat_uid = `${SCREEN_CODE}_${row_code}${col_code}`

            if(seat_category == "PRIME"){
                if( c <= 2 || c > cols_length - 2){
                    seat_category = "STANDARD"
                }
            }

            let query_body = (
                `'${seat_uid}', '${SCREEN_CODE}', '${seat_category}', '${SEAT_STATUS}', ${r}, ${c}`
            )
            await insert_seed(conn, "SEAT", query_body)

        }
    }
}