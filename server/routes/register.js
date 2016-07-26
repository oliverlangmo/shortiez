var express = require('express');
var router = express.Router();
var passport = require('passport');
var Users = require('../../models/users');
var path = require('path');

router.post('/register', function(req, res, next) {
  var userObject = {
    username: req.body.username,
    password: req.body.password,
    auth: false,
    admin: false
  };
  Users.create(userObject, function(err, post) {
    if(err) {
      res.redirect('/#/registerFail');
    } else {
      res.redirect('/#/genericMain');
    } // end else
  }); // end Users.create
  console.log('New user registered');
}); // end /registerUser

module.exports = router;
