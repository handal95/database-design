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
    const review = req.body.data;
    
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

// 개별 리뷰 페이지 ???? 라우팅 왜 안 돼
router.get('/review', function(req, res)
{
    res.render('movieinfo/review');
});

export { router };
