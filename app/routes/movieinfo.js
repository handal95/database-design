/* 영화, 영화인 검색 결과 페이지 */

import express from "express";
import { hasSession, isAccountSession } from "../utils/sessions.js";

const router = express.Router({ mergeParams: true });

/*
SELECT review_sq, account_id, review_title, score FROM review WHERE movie_code="search_movie_code";
*/

// 영화 정보 페이지
router.get('/movie', function(req, res)
{
    const movie_code = req.query.movie_code;

    /*
    // 영화 정보 검색
    SELECT *
    FROM movie
    WHERE movie_code="movie_code";

    // 영화 포스터 검색
    SELECT poster_image
    FROM poster
    WHERE movie_code="movie_code"
    AND poster_sq = 1;


    // 영화 장르 검색
    SELECT genre_name
    FROM genre
    WHERE movie_code="movie_code";
    */

    const movie = {
        movie_code: "1234",
        movie_title: "분노의 질주",
        movie_title_eng: "Fast & Furious 9 THE FAST SAGA",
        production_country: "미국",
        running_time: 143,
        synopsis: `기다림은 끝났다!
전 세계가 기다려온 단 하나의 액션블록버스터!
 
도미닉(빈 디젤)은 자신과 가장 가까웠던 형제 제이콥(존 시나)이 사이퍼(샤를리즈 테론)와 연합해
전 세계를 위기로 빠트릴 위험천만한 계획을 세운다는 사실을 알게 되고,
이를 막기 위해 다시 한 번 패밀리들을 소환한다.

가장 가까운 자가 한순간, 가장 위험한 적이 된 상황
도미닉과 패밀리들은 이에 반격할 놀라운 컴백과 작전을 세우고
지상도, 상공도, 국경도 경계가 없는 불가능한 대결이 시작되는데…,`,
        release_date: "2021.05.19",
        media_rating: "12세 이상",
        productor: "유니버설 스튜디오",
        distributor: "유니버설 스튜디오",
        production_status: "개봉",
        avg_score: "8.8",
        poster: "path",
        genre: ["액션", "범죄"],
    }

    /*
    // 영화 참여자 검색
    SELECT crew_code, main_role, sub_role
    FROM contributor
    WHERE movie_code="movie_code";
    */
    const contributor_list = [
        {
            crew_code: "저스틴 린",
            main_role: "감독",
            sub_role: "총감독",
        },
        {
            crew_code: "빈 디젤",
            main_role: "배우",
            sub_role: "주연",
        },
        {
            crew_code: "존 시나",
            main_role: "배우",
            sub_role: "주연",
        },
        {
            crew_code: "성 강",
            main_role: "배우",
            sub_role: "조연",
        },
    ]

    /*
    // 영화 리뷰 정보 검색
    SELECT review_sq, account_id, review_title, score
    FROM review
    WHERE movie_code = "movie_code";
    */

    const review_list = [
        {
            review_sq: 1,
            account_id: "hihi",
            review_title: "재밌다",
            score: 9.0,
        },
        {
            review_sq: 2,
            account_id: "hello",
            review_title: "넘넘 벅진감넘치는… 달리고 싶드아~~!!",
            score: 8.0,
        },
        {
            review_sq: 3,
            account_id: "hihi",
            review_title: "역시 굿!!! 말이 필요없다 ",
            score: 8.8,
        },
        {
            review_sq: 4,
            account_id: "죠르디",
            review_title: "역시 분노의질주 진짜 스케일 끝장난다 분노의질주 보니까 도쿄가고싶다",
            score: 9.0,
        },
    ]

    res.render('movieinfo/movie', {movie, contributor_list, review_list});
});

// 영화인 정보 페이지
router.get('/crew', function(req, res)
{
    const crew_code = req.query.crew_code;

    /*
    // 영화인 정보 검색
    SELECT *
    FROM crew
    WHERE crew_code = "crew_code";

    // 필모그래피 정보 검색
    SELECT M.movie_code, M.movie_title, C.main_role, C.sub_role
    FROM movie M, contributor C
    WHERE M.movie_code = C.movie_code
    AND crew_code="crew_code";
    */
    
    const crew = {
        crew_code: "2342",
        crew_name: "존 시나",
        crew_name_eng: "John Cena",
        nationality: "미국",
        crew_birth_date: "1977.04.23",
        sex: "남",
        profile_image: "image_path",
    };

    const filmography_list = [
        {
            movie_code: "4654",
            movie_title: "분노의 질주",
            main_role: "배우",
            sub_role: "주연",
        },
        {
            movie_code: "96857",
            movie_title: "범블비",
            main_role: "배우",
            sub_role: "주연",
        },
    ]

    res.render('movieinfo/crew', {
        crew,
        filmography_list
    });
});

// 영화 정보 검색
router.post('/movie/search', function(req, res)
{
    const keyword = req.body.keyword;
    
    /*
        SELECT movie_title
        FROM movie
        WHERE movie_title LIKE "(keyword)%"
        OR movie_title_eng LIKE "(keyword)%"
    */

    const search_list = [
        {
            movie_title: "movie1",
        },
        {
            movie_title: "movie2",
        },
    ]

    res.json({
        search_list,
    });
});




// 영화인 정보 검색
router.post('/crew/search', function(req, res)
{
    const keyword = req.body.keyword;
    
    /*
        SELECT crew_name, nationality, crew_birth_date
        FROM crew
        WHERE crew_name LIKE "(keyword)%"
        OR crew_name_eng LIKE "(keyword)%"
    */

    const search_list = [
        {
            movie_title: "movie1",
        },
        {
            movie_title: "movie2",
        },
    ]

    res.json({
        search_list,
    });
})





export { router };
