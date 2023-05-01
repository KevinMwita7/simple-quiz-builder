function requireAuth(req, res, next) {
    if(req.session.user) return next();
    return res.status(403).send("Forbidden");
}

module.exports = requireAuth;