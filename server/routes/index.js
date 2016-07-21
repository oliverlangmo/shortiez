var express = require('express');
var passport = require('passport');
var router = express.Router();
var path = require('path');

console.log('in index');
router.post('/index',
    passport.authenticate('local', {
        successRedirect: '/#/genericMain',
        failureRedirect: '/#/loginFail'
    }) // end passport.authenticate
); // end userLogin

module.exports = router;
