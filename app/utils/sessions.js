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

export async function initAccountSession(req, data) {
    req.session.views = 1;
    req.session.signin_category = "account";
    req.session.account_id = data.account_id;
    req.session.nickname = data.nickname;
    req.session.email = data.email;

    console.log("INIT SESSION OLD ACCOUNT")
}

export async function initCustomerSession(req, data) {
    req.session.views = 1;
    req.session.signin_category = "customer";
    req.session.name = data.name;
    req.session.birth_date = data.birth_date;
    req.session.phone = data.phone;

    console.log("INIT SESSION OLD CUSTOMER")
}

export function destorySession(req) {
    req.session.destroy();
}
