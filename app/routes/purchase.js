/* 영화 예매, 상품 구매 페이지*/

import express from "express";

const router = express.Router()

// link page
const INDEX = ""
const PURCHASE = "purchase"
const MOVIE = "movie"
const SEAT = "seat"
const ITEM = "item"
const CHECK = "check"
const COMPLETE = "complete"

// url
const URL_SELECT_MOVIE = "/" + PURCHASE + "/" + MOVIE + "/" + INDEX
const URL_SELECT_MOVIE_SEAT = "/" + PURCHASE + "/" + MOVIE + "/" + SEAT
const URL_CHECK_MOVIE = "/" + PURCHASE + "/" + MOVIE + "/" + CHECK
const URL_SELECT_ITEM = "/" + PURCHASE + "/" + ITEM + "/" + INDEX
const URL_CHECK_ITEM = "/" + PURCHASE + "/" + ITEM + "/" + CHECK
const URL_COMPLETE = "/" + PURCHASE + "/" + COMPLETE



// 영화예매(장소, 일정 선택) 페이지
router.get(URL_SELECT_MOVIE, function(req, res)
{
    res.render(URL_SELECT_MOVIE);
});

router.post(URL_SELECT_MOVIE, function(req, res)
{
    /*
    const keyword = req.body.keyword;
    // query(search)
    res.redirect('/movieinfo/movie');
    console.log(`search : ${keyword}`);
    */
})

// 영화예매(좌석 선택) 페이지
router.get(URL_SELECT_MOVIE_SEAT, function(req, res)
{
    res.render(URL_SELECT_MOVIE_SEAT);
});

// 영화예매 확인 페이지
router.get(URL_CHECK_MOVIE, function(req, res)
{
    res.render(URL_CHECK_MOVIE);
});

// 상품 선택 페이지
router.get(URL_SELECT_ITEM, function(req, res)
{
    res.render(URL_SELECT_ITEM);
});

// 상품구매 확인 페이지
router.get(URL_CHECK_ITEM, function(req, res)
{
    res.render(URL_CHECK_ITEM);
});

// 결제완료 페이지
router.get(URL_COMPLETE, function(req, res)
{
    res.render(URL_COMPLETE);
});

export { router };