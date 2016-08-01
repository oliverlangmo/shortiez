var express = require('express');
var router = express.Router();
var passport = require('passport');
var Users = require('../../models/users');
var path = require('path');
var mongoose = require('mongoose');

router.post('/register', function(req, res, next) {
  var userObject = {
    username: req.body.username,
    name: req.body.name,
    grade: req.body.grade,
    email: req.body.email,
    password: req.body.password,
    timestamps: true,
    auth: false,
    admin: false
  };
  Users.create(userObject, function(err, post) {
    if(err) {
      res.redirect('/#/registerFail');
    } else {
      res.redirect('/#/genericMain');
      console.log('New user registered');
    } // end else
  }); // end Users.create

}); // end /registerUser

module.exports = router;
