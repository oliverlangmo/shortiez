var express = require('express');
var passport = require('passport');
var router = express.Router();
var path = require('path');

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/#/genericMain',
        failureRedirect: '/#/loginFail'
    }) // end passport.authenticate
); // end userLogin

module.exports = router;
