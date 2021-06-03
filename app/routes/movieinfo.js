/* 영화, 영화인 검색 결과 페이지 */

import express from "express";

const router = express.Router()

// 영화 정보 페이지
router.get('/movie', function(req, res)
{
    res.render('movieinfo/movie');
});

router.post('/movie', function(req, res)
{
    const keyword = req.body.keyword;
    // query(search)
    res.redirect('/movieinfo/movie');
    console.log(`search : ${keyword}`);
})

// 영화인 정보 페이지
router.get('/crew', function(req, res)
{
    res.render('movieinfo/crew');
});

router.post('/crew', function(req, res)
{
    const keyword = req.body.keyword;
    // query(search)
    res.redirect('/movieinfo/crew');
    console.log(`search : ${keyword}`);
})

export { router };