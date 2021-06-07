import { select_data } from "../db/select.js"
import { select_query } from "../db/select.js"

function query_filter(column_name, value, alias='', default_value=null){
    if(value != null && value != {}) {
        return `AND ${alias}${column_name} = '${value}'`
    }
    else if(default_value != null){
        return `AND ${alias}${column_name} = '${default_value}'`
    }
    return ``
}


export async function get_sessioning_theaters(conn, req){
    let query = (
        `SELECT T.theater_code, T.theater_name FROM theater T ` +
        `WHERE T.theater_code IN (SELECT DISTINCT S.theater_code FROM screen S ` + 
            `WHERE S.screen_code IN (SELECT DISTINCT MS.screen_code FROM movie_session MS ` + 
                `WHERE TO_CHAR(session_datetime, 'YYYY-MM-DD') = '${req.body.session_date}') ` + 
                    query_filter('theater_code', req.body.theater_code, "T.") +
            `)`
    )

    let result = await select_query(conn, query)

    let data = result.data

    return data
}

export async function get_sessioning_movies(conn, req){
    let subquery = ''
    if(req.params.theater_code != null){
        subquery = `AND MS.screen_code IN (SELECT S.screen_code FROM screen S WHERE S.theater_code = '${req.params.theater_code}')`
    }
    
    let query = (
        `SELECT MS.session_uid, MS.screen_code, MS.movie_code, MS.session_datetime FROM movie_session MS ` +
            `WHERE TO_CHAR(session_datetime, 'YYYY-MM-DD') = '${req.body.session_date}' ${subquery}`
    )
    let result = await select_query(conn, query)
    let data = result.data

    return data        
}

export async function get_screen_by_session_uid(conn, req){
    let query = (
        `SELECT screen_code FROM movie_session WHERE session_uid = '${req.params.movie_session_uid}'`
    )

    let result = await select_query(conn, query)
    let data = result.data

    return data
}
