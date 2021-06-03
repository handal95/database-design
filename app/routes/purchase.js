/* 영화 예매, 상품 구매 페이지*/

import express from "express";

const router = express.Router()

// 영화예매(장소, 일정 선택) 페이지
router.get('/movie/index', function(req, res)
{
    res.render('purchase/movie/index');
});

router.post('/movie/index', function(req, res)
{
    /*
    const keyword = req.body.keyword;
    // query(search)
    res.redirect('/movieinfo/movie');
    console.log(`search : ${keyword}`);
    */
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
router.get('/item/index', function(req, res)
{
    res.render('purchase/item/index');
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