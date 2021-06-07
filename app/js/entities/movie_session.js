import { select_query } from "../db/select.js"

function query_filter(column_name, value, default_value=null){
    if(value != null) {
        return `AND ${column_name} = '${value}'`
    }
    else if(default_value != null){
        return `AND ${column_name} = '${default_value}'`
    }
    return ``
}

export async function get_movie_session_info(conn, req){
    let query = (
        `SELECT FROM MOVIE_SESSION ` +
        `WHERE session_datetime = '${req.body.session_date}' ` +
        query_filter('theater_code', req.body.theater_code) +
        query_filter('movie_code', req.body.movie_code) 
    )
    console.log(query)

    let columns = "session_uid, theater_name, screen_name, movie_title, session_datetime"
    let result = await select_query(conn, query)
    console.log(result)

    let data = []
    for(let i = 0; i < result.length; i++){
        let info = result.data[i]
        data.push({
            session_uid: info.SESSION_UID,
            theater_name: info.THEATER_NAME,
            screen_name: info.SCREEN_NAME,
            movie_title: info.MOVIE_TITLE,
            session_datetime: info.SESSION_DATETIME,
        })
    }

    return data
}