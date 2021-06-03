import express from "express";

const router = express.Router()

// 메인 페이지
router.get('/', function(req, res)
{
    res.render('index')
});

// 메인 페이지 검색
router.post('/', function(req, res) {
    // query(search)
    res.json({
        message:'success'
    });
});

// 로그인 페이지
router.get('/signin', function(req, res)
{
    if (hasSession(req) == true)
    {
        res.redirect('/')
    }
    else
    {
        res.render('signin')
    }
});

router.post('/signin', function(req, res) {
    const id = req.body.id;
    const pw = req.body.pw;
    // 로그인 확인
    // check(id, pw);
    initSession(req, id);
    res.json({
        result: true,
    });
    console.log(`id : ${id}, pw : ${pw}`);
});

// 회원가입 페이지
router.get('/signup', function(req, res)
{
    if (hasSession(req) == true)
    {
        res.redirect('/');
    }
    else
    {
        res.render('signup');
    }
});

router.post('/signup', function(req, res)
{
    const id = req.body.id;
    const pw = req.body.pw;
    const name = req.body.name;
    const birth = req.body.birth;
    const phone = req.body.phone;
    const nickname = req.body.nickname;
    const email = req.body.email;

    var verified_data = false;
    /* 중복 아이디 검사 코드 */
    // 
    if (verified_data)
    {
        res.json({
            result: true,
        });
        console.log(`id : ${id}, pw : ${pw}, name : ${name}, birth : ${birth}, phone : ${phone}, nickname : ${nickname}, email : ${email}`);
    }
    else
    {
        res.json({
            result: false,
        });
        console.log('Sign up Failed');
    }
    });

router.get('/item', function(req, res)
{
    res.render('item');
});

// 회원 계정 마이 페이지
router.get('/mypage', function(req, res)
{
    if (hasSession(req) == true)
    {
        // ???
        const id = req.session.signin_id;
        res.render('mypage', {account_id: id});
    }
    else
    {
        res.redirect('/signin');
    }
});

router.post('/mypage', function(req, res)
{
    if (hasSession(req) == false)
    {
        res.redirect('/signin');
        return;
    }
    const pw = req.body.pw;
    const nickname = req.body.nickname;
    const email = req.body.email;

    // 변경된 데이터 DB 입력 코드

    res.json({
        message:'success'
    });
    console.log(`pw : ${pw}, nickname : ${nickname}, email : ${email}`);
});

router.get('/reserve/', function(req, res)
{
    res.render('reserve/index')
});

router.get('/reserve/seat', function(req, res)
{
    res.render('reserve/seat')
});

export { router };