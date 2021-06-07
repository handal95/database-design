import { select_data } from "../db/select.js"
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
    console.log('FETCH MOVIE SESSION', req.body)

    let query = (
        `SELECT session_uid, theater_code,  FROM MOVIE_SESSION ` +
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

export async function get_sessioning_theater(conn, req){
    let query = (
        `SELECT T.theater_code, T.theater_name FROM theater T ` +
        `WHERE T.theater_code IN (SELECT DISTINCT S.theater_code FROM screen S ` + 
            `WHERE S.screen_code IN (SELECT DISTINCT MS.screen_code FROM movie_session MS ` + 
                `WHERE TO_CHAR(session_datetime, 'YYYY-MM-DD') = '${req.body.session_date}') ` + 
                    query_filter('theater_code', req.body.theater_code) +
                    query_filter('movie_code', req.body.movie_code) +
            `)`
    )

    let result = await select_query(conn, query)
    let data = result.data

    return data
}

export async function get_sessioning_movie(conn, req){
    let query = (
        `SELECT DISTINCT M.movie_code, M.movie_title FROM movie M ` + 
            `WHERE M.movie_code IN (SELECT DISTINCT MS.movie_code FROM movie_session MS ` + 
                `WHERE TO_CHAR(session_datetime, 'YYYY-MM-DD') = '${req.body.session_date}' `+
                    query_filter('theater_code', req.body.theater_code) +
                    query_filter('movie_code', req.body.movie_code) +
            `)`
    )

    let result = await select_query(conn, query)
    let data = result.data

    return data
}