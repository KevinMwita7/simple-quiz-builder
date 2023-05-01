var express = require('express');
var router = express.Router();
const debug = require('debug')('quizzer:users');

/* GET user logged in status. */
router.get('/logged-in', function(req, res, next) {
    debug(req.session.user);
    return res.json({ isLoggedIn: !!req.session.user });
});

module.exports = router;
