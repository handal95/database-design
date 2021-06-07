import { select_data } from "../db/select.js"
import { select_query } from "../db/select.js"

function query_filter(column_name, value, alias='', default_value=null){
    if(value != null || value != {}) {
        return `AND ${alias}${column_name} = '${value}'`
    }
    else if(default_value != null){
        return `AND ${alias}${column_name} = '${default_value}'`
    }
    return ``
}

export async function get_sessioning_screen(conn, req){
    let query = (
        `SELECT DISTINCT S.theater_code FROM screen S ` +
            `WHERE S.screen_code IN (SELECT DISINCT MS.)`
    )
}

export async function get_sessioning_theater(conn, req){
    let query = (
        `SELECT T.theater_code, T.theater_name, S.theater_code FROM theater T ` +
        `WHERE T.theater_code IN (SELECT DISTINCT S.theater_code FROM screen S ` + 
            `WHERE S.screen_code IN (SELECT DISTINCT MS.screen_code FROM movie_session MS ` + 
                `WHERE TO_CHAR(session_datetime, 'YYYY-MM-DD') = '${req.body.session_date}') ` + 
                    query_filter('theater_code', req.body.theater_code) +
            `)`
    )

    let result = await select_query(conn, query)
    console.log(result)
    // let data = result.data

    return data
}

export async function get_sessioning_movie(conn, req){
    let subquery = ''
    if(req.body.theater_code) {
        subquery = `AND MS.screen_code IN (SELECT S.screen_code FROM screen S WHERE S.theater_code = '${req.body.theater_code}')`
    }
    let query = (
        `SELECT M.movie_code, M.movie_title FROM movie M ` +
        `WHERE M.movie_code IN (SELECT DISTINCT MS.movie_code FROM movie_session MS ` + 
            `WHERE TO_CHAR(session_datetime, 'YYYY-MM-DD') = '${req.body.session_date}' ` +
            subquery +
        `)` 
    )

    let result = await select_query(conn, query)
    let data = result.data

    // console.log(data)
    return data
}