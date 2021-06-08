/* 영화 리뷰 페이지 */

import express from "express";

const router = express.Router({ mergeParams: true });

router.post('/', function(req, res)
{
    const keyword = req.body.keyword;
    console.log(keyword)
    res.redirect(`?keyword=${keyword}`);
})

// 검색 페이지 로드
router.get('/', function(req, res)
{
    const keyword = req.query.keyword;

    /*
        // 영화 검색
        SELECT M.movie_code, M.movie_title, P.poster
        FROM movie M, poster P
        WHERE movie_title LIKE "(keyword)%"
        OR movie_title_eng LIKE "(keyword)%"

        // 영화인 검색
        SELECT crew_name, nationality, crew_birth_date
        FROM crew
        WHERE crew_name LIKE "(keyword)%"
        OR crew_name_eng LIKE "(keyword)%"
    */

    const movie_search_list = [
        {
            movie_code: "movie_code1",
            movie_title: "movie1",
            movie_title_eng: "movie1_eng",
            poster_image: "image1",
            avg_score: 8.8,
        },
        {
            movie_code: "movie_code2",
            movie_title: "movie2",
            movie_title_eng: "movie2_eng",
            poster_image: "image2",
            avg_score: 5.5,
        },
    ]

    const crew_search_list = [
        {
            crew_code: "crew_code1",
            crew_name: "crew_name1",
            crew_name_eng: "crew_name1_eng",
            profile_image: "image1",
        },
        {
            crew_code: "crew_code2",
            crew_name: "crew_name2",
            crew_name_eng: "crew_name2_eng",
            profile_image: "image2",
        },
    ]

    res.render('search', {
        keyword,
        movie_search_list,
        crew_search_list,
    });
});

export { router };
