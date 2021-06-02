import express from "express";

const router = express.Router()

// 영화정보 페이지
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

export { router };