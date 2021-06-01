export function hasSession(req) {
    // not not을 통해 bool 형으로 형변환
    return !!req.session.views;
}

export function initSession(req, id, nickname, email) {
    req.session.views = 1;
    req.session.id = id;
    req.session.nickname = nickname;
    req.session.email = email;
}

export function destorySession(req) {
    req.session.destroy();
}

