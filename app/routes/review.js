/* 영화 리뷰 페이지 */

import express from "express";
import { hasSession, isAccountSession } from "../utils/sessions.js";

const router = express.Router({ mergeParams: true });

// 리뷰 상세내용 페이지
router.get('/read', function(req, res)
{
    const movie_code = req.query.movie_code;
    const movie_title = req.query.movie_title;
    const review_sq = req.query.review_sq;

    /*
    SELECT account_id, review_title, comment, score
    FROM review
    WHERE movie_code = "movie_code"
    AND review_sq = "review_sq";
    */

    const review = {
            movie_code,
            movie_title,
            review_sq,
            account_id: "account_id",
            review_title: "review_title",
            comment: "commment",
            score: 8.0,
        }

    res.render('movieinfo/review/read', {
        review,
    });
})

// 영화 리뷰 작성 페이지
router.get('/write', function(req, res)
{
    /*
    // 회원 로그인한 상태에서만 리뷰 작성 가능
    if (!isAccountSession(req))
    {
        res.redirect('/signin');
        return;
    }
    */
    const movie_code = req.query.movie_code;
    const movie_title = req.query.movie_title;

    res.render('movieinfo/review/write', {movie_code, movie_title});
})

// 리뷰 작성 페이지 게시
router.post('/write/register', function(req, res)
{
    /*
    if (!isAccountSession(req))
    {
        res.redirect('/signin');
        return;
    }
    */
    //const account_id = req.session.account_id;
    const movie_code = req.body.movie_code;
    const review_title = req.body.review_title;
    const comment = req.body.comment;
    const score = req.body.score;
    
    /*
    // 후기 작성
    INSERT INTO review VALUES(
        "movie_code",
        "review_sq",
        "account_id",
        "review_title",
        "comment",
        "score"
    );
    */

    // 리뷰가 등록이 됐다면 true, 실패했다면 false 
    let is_register_success = true;
    if (is_register_success)
    {
        res.json({
            result: true
        });
    }
    else
    {
        res.json({
            result: false
        });
    }
})

// 개별 리뷰 페이지
router.get('/', function(req, res)
{
    res.render('movieinfo/review');
});

export { router };
