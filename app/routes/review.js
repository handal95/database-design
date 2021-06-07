/* 영화, 영화인 검색 결과 페이지 */

import express from "express";

const router = express.Router({ mergeParams: true });

/*
후기 작성 : 
INSERT INTO review VALUES(
    "movie_code",
    "review_sq",
    "account_id",
    "new_review_title",
    "new_comment",
    "score"
);
*/

router.get('/movie/review/read', function(req, res)
{
    const movie_title = req.query.movie_title;
    const review_sq = req.query.review_sq;

    res.render('movieinfo/movie/review/write', {movie_title, review_sq});
})

router.get('/movie/write', function(req, res)
{
    const movie_title = req.query.movie_title;

    res.render('movieinfo/movie/review/write', {movie_title,});
})

// 리뷰 작성 페이지
router.post('/movie/review/write', function(req, res)
{
    const review = req.body.data;
    

    if (hasSession(req) == true) {
        const session_account_id = req.session.signin_id;
        res.render(MYPAGE, {account_id: session_account_id});
    }
    else {
        res.redirect('/signin');
    }

    res.redirect('/movieinfo/movie');
    console.log(`search : ${keyword}`);
})

// 개별 리뷰 페이지
router.get('/review', function(req, res)
{
    res.render('movieinfo/review');
});

export { router };
