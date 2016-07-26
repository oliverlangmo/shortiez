var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');  // require bodyparser for POST calls
var mongoose = require('mongoose');  // require mongoose for mongo db
var addStory=require('../../models/addStory.js');  // requiring the addStory model

var router = express.Router();

router.get('/getStories', function (req, res) {
  console.log('in /getStories');
  addStory.find().then(function(data){
  res.send(data);
  });
});
module.exports = router;
