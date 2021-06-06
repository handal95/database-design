export function signup_process(req, res) {
        // 사용자로부터 입력을 받는 부분
        const id = req.body.id;
        const pw = req.body.pw;
        const name = req.body.name;
        const birth = req.body.birth;
        const phone = req.body.phone;
        const nickname = req.body.nickname;
        const email = req.body.email;
         
        // query : 중복 아이디 있는지 확인
        oracle.getConnection(db_config, (err, conn) => {
            if(err) throw err
            
            for(let i = 0; i <schema_list.length; i++){
                query_schema(conn, "CREATE", schema_list[i])
            }
        })
    
        // if 중복이라면 False
        
        // 생성이 가능한지 확인을 하고
        var verified_data = true;
    
        // result : true 회원가입이 성공한 것
        // false : 실패한 것
    
        /* 중복 아이디 검사 코드 */


        return verified_data
}