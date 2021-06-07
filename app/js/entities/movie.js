import { select_query } from "../db/select.js"

export async function get_movie_title_by_code(conn, req){
    let query = `SELECT movie_title FROM movie WHERE movie_code = '${req.params.movie_code}'`

    let result = await select_query(conn, query)
    let data = result.data

    return data
}