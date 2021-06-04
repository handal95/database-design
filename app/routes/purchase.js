/* 영화 예매, 상품 구매 페이지*/

import express from "express";
import { hasSession } from "../utils/sessions.js";

const router = express.Router()

// 영화예매(장소, 일정 선택) 페이지
router.get('/movie/select', function(req, res)
{
    if (hasSession(req))
    {
        res.render('purchase/movie/select');
    }
    else
    {
        res.redirect('/signin');
    }
});

// 검색 항목 범위를 변경
router.post('/movie/select/set_list', function(req, res)
{
    const date = req.body.date;
    const movie = req.body.movie || null;
    const theater = req.body.theater || null;

    // query(search)
    
    /*
    theater_list -> date
    
    SELECT DISTINCT screen_code
    FROM movie_session
    WHERE session_date="date"
    AND movie_code="movie";?
    */

    /*
    movie_list ->

    SELECT DISTINCT movie_code
    FROM movie_session
    WHERE session_date="date"
    AND <screen_code로 영화관 정보 추출>;?
    */
    const theater_list = [];
    const movie_list = [];

    res.json({
        theater_list: theater_list,
        movie_list: movie_list,
    });
})

// 상영 정보 검색
router.post('/movie/select/search_session', function(req, res)
{
    const keyword = req.body.keyword;
    
    // query(search)
    
    const query_data = [{},]

    res.json({

    });
    console.log(`search : ${keyword}`);
})

// 좌석 선택창으로 가기
router.post('/movie/select/gotoseat', function(req, res)
{
    res.redirect('/movie/seat');
})

// 영화예매(좌석 선택) 페이지
router.get('/movie/seat', function(req, res)
{
    res.render('purchase/movie/seat');
});

// 영화예매 확인 페이지
router.get('/movie/check', function(req, res)
{
    res.render('purchase/movie/check');
});

// 상품 선택 페이지
router.get('/item/select', function(req, res)
{
    res.render('purchase/item/select');
});

// 상품구매 확인 페이지
router.get('/item/check', function(req, res)
{
    res.render('purchase/item/check');
});

// 결제완료 페이지
router.get('/complete', function(req, res)
{
    res.render('purchase/complete');
});

export { router };