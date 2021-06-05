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

// 상영일정 선택 페이지 영화관 리스트 초기화
router.post('/movie/select/init_theater', function(req, res)
{
    /*
    쿼리문 우예 짜지;
    SELECT T.theater_code, T.theater_name
    FROM movie_session MS, session S, theater T 
    WHERE S.session LIKE T.theater_code ;
    */
    const theater_list = [
        {
            theater_code: "theater_code",
            theater_name: "theater_name",
        },
        {
            theater_code: "theater_code1",
            theater_name: "theater_name2",
        },
    ]

    res.json({
        theater_list,
    });
});

// 상영일정 선택 페이지 영화 리스트 초기화
router.post('/movie/select/init_movie', function(req, res)
{
    /*
    SELECT S.movie_code, M.movie_title
    FROM session S, movie M;
    WHERE S.movie_code = M.movie_code;
    */

    const movie_list = [
        {
            movie_code: "movie_code",
            movie_title: "movie_title",
        },
        {
            movie_code: "movie_code1",
            movie_title: "movie_title1",
        },
        {
            movie_code: "movie_code2",
            movie_title: "movie_title2",
        },
    ]

    res.json({
        movie_list,
    });
});

// 상영일정 선택 페이지 영화를 기준으로 영화관 목록 바꾸기
router.post('/movie/select/filter_theater', function(req, res)
{
    const date = req.body.session_date;
    const movie_code = req.body.movie_code;

    /*
    쿼리문 망할
        SELECT theater_code FROM theater_code WHERE 
        SELECT screen_code FROM screen WHERE screen_code = (
            SELECT screen_code FROM movie_session WHERE movie_code = "movie_code";
    )
    */ 

    const theater_list = [
        {
            theater_code: "theater_code",
            theater_name: "theater_name",
        },
        {
            theater_code: "theater_code1",
            theater_name: "theater_name2",
        },
    ]

    res.json({
        theater_list,
    });
});

// 상영일정 선택 페이지 영화를 기준으로 영화관 목록 바꾸기
router.post('/movie/select/filter_movie', function(req, res)
{
    const date = req.body.session_date;
    const theater_code = req.body.movie_code;

    /*
    쿼리문 망할
        SELECT theater_code FROM theater_code WHERE 
        SELECT screen_code FROM screen WHERE screen_code = (
            SELECT screen_code FROM movie_session WHERE movie_code = "movie_code";
    )
    */ 

    const movie_list = [
        {
            movie_code: "movie_code",
            movie_title: "movie_title",
        },
        {
            movie_code: "movie_code1",
            movie_title: "movie_title1",
        },
    ]

    res.json({
        movie_list,
    });
});

// 상영일정 선택 페이지 날짜 변경
router.post('/movie/select/change_date', function(req, res)
{
    const session_date = req.body.session_date;

    /*
        SELECT M.movie_title, S.movie_code
        FROM movie M, movie_session S
        WHERE M.movie_code = S.movie_code
        AND session_date = "session_date";
    */

    const movie_list = [
        {
            movie_code: "movie_code",
            movie_title: "movie_title",
        },
        {
            movie_code: "movie_code1",
            movie_title: "movie_title1",
        },
    ]
    const theater_list = [
        {
            theater_code: "theater_code",
            theater_name: "theater_name",
        },
        {
            theater_code: "theater_code1",
            theater_name: "theater_name2",
        },
    ]

    res.json({
        movie_list: movie_list,
        theater_list: theater_list,
    });
});

// 상영일정 선택 페이지 상영일정 필터링
router.post('/movie/select/filter_session', function(req, res)
{
    const session_date = req.body.session_date || null;
    const theater_code = req.body.theater_code || null;
    const movie_code = req.body.movie_code || null;

    const session_list = [
        {
            theater_name: "청량리 롯데시네마",
            screen_name: "session1",
            movie_title: "분노의 질주",
            session_datetime: "12:35",
            subtitle_category: null
        },
        {
            theater_name: "청량리 롯데시네마",
            screen_name: "session2",
            movie_title: "귀멸의 칼날",
            session_datetime: "14:50",
            subtitle_category: "eng"
        }
    ]

    res.json({
        session_list,
    });
});

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

// 상품 선택 페이지 영화관 리스트 불러오기
router.post('/item/select/init_theater', function(req, res)
{
    // SELECT theater_code, theater_name FROM theater;

    const theater_list = [
        {
            theater_code: "theater_code",
            theater_name: "theater_name",
        },
        {
            theater_code: "theater_code1",
            theater_name: "theater_name2",
        },
    ]

    res.json({
        theater_list,
    });
});

// 상품 선택 페이지 영화관 기준 상점 필터링
router.post('/item/select/filter_store', function(req, res)
{
    const theater_code = req.body.theater_code;

    // 영화관 코드가 F003으로 시작할 때
    // 그 안에 있는 상점도 F003으로 시작할 것임
    // SELECT * FROM store WHERE store_code LIKE 'F003%';

    const store_list = [{
        store_code: "store_code",
        store_name: "store_name",
    }, {
        store_code: "store_code2",
        store_name: "store_name2",
    }];

    res.json({
        store_list,
    });
});

// 상품 선택 페이지 상품 필터링
router.post('/item/select/filter_item', function(req, res)
{
    const store_code = req.body.store_code;

    // SELECT item_code, item_name, item_category, item_price FROM item WHERE store_code='store_code';

    const item_list = [
        {
            item_code: "213231",
            item_name: "팝콘",
            item_category: "스낵",
            item_price: 4000,
        },
        {
            item_code: "213232",
            item_name: "콜라",
            item_category: "스낵",
            item_price: Math.random(),
        },
        {
            item_code: "213233",
            item_name: "나쵸",
            item_category: "스낵",
            item_price: 3000,
        },
    ]

    res.json({
        item_list,
    });
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