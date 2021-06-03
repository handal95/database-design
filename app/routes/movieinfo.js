/* 영화, 영화인 검색 결과 페이지 */

import express from "express";

const router = express.Router()

// link page
const MOVIEINFO = "movieinfo"
const MOVIE = "movie"
const CREW = "crew"

// url
const URL_SEARCH_MOVIE = "/" + MOVIEINFO + "/" + MOVIE + "/"
const URL_SEARCH_CREW = "/" + MOVIEINFO + "/" + CREW + "/"

// 영화 정보 페이지
router.get(URL_SEARCH_MOVIE, function(req, res)
{
    res.render(URL_SEARCH_MOVIE);
});

router.post(URL_SEARCH_MOVIE, function(req, res)
{
    const keyword = req.body.keyword;
    // query(search)
    res.redirect('/movie');
    console.log(`search : ${keyword}`);
})

// 영화인 정보 페이지
router.get(URL_SEARCH_CREW, function(req, res)
{
    res.render(URL_SEARCH_CREW);
});

router.post(URL_SEARCH_CREW, function(req, res)
{
    const keyword = req.body.keyword;
    // query(search)
    res.redirect('/movie');
    console.log(`search : ${keyword}`);
})

export { router };