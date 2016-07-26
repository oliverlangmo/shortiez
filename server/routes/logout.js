var express = require('express');
var passport = require('passport');
var router = express.Router();
var path = require('path');

router.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/#/login');
});

module.exports = router;
