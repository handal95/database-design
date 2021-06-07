export function hasSession(req) {
    // not not을 통해 bool 형으로 형변환
    return !!req.session.views;
}

export function isAccountSession(req) {
    // not not을 통해 bool 형으로 형변환
    return !!(req.session.signin_category == "account");
}

export function isCustomerSession(req) {
    // not not을 통해 bool 형으로 형변환
    return !!(req.session.signin_category == "customer");
}

export function initAccountSession(req, sign_id, nickname, email) {
    req.session.views = 1;
    req.session.signin_category = "account";
    req.session.sign_id = sign_id;
    req.session.nickname = nickname;
    req.session.email = email;
}

export function initCustomerSession(req, name, birth_date, phone) {
    req.session.views = 1;
    req.session.signin_category = "customer";
    req.session.name = name;
    req.session.birth_date = birth_date;
    req.session.phone = phone;
}

export function destorySession(req) {
    req.session.destroy();
}
