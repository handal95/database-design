export function hasSession(req) {
    console.log("HAS SESSION :", (req.session.views))
    console.log("HAS SESSION :", (!!req.session.views))
    // not not을 통해 bool 형으로 형변환
    return !!req.session.views
}

export function isSession(req, session_category) {
    // not not을 통해 bool 형으로 형변환
    return !!(req.session.signin_category == session_category)
}

export async function initSession(req, session_category, params) {
    req.session.views = 1
    req.session.signin_category = session_category

    if(session_category == "account"){
        req.session.account_id = params.account_id
        req.session.nickname = params.nickname
        req.session.email = params.email
        

    } else if (session_category == "customer") {
        req.session.name = params.name
        req.session.birth_date = params.birth_date
        req.session.phone = params.phone
    }

    console.log(req.session)
    console.log("INIT SESSION NEW")
}

export function destorySession(req) {
    req.session.destroy()
}
