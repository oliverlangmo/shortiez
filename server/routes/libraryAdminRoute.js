var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');  // require bodyparser for POST calls
var mongoose = require('mongoose');  // require mongoose for mongo db
var addStory = require('../../models/addStory.js');  // requiring the addStory model
var Page = require('../../models/addTestPage.js');

var router = express.Router();

router.get('/getStories', function (req, res) {
  addStory.find().then(function(data){
  res.send(data);
  });
});

router.get('/getPage', function (req, res) {
  page.find().then(function(data){
  res.send(data);
  });
});

router.post('/addTestPage', function(req, res) {
  console.log(req.body.page);
  var newStoryPage = new Page({
    page: req.body.page
  });
  newStoryPage.save(function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log('Page has been added');
      res.sendStatus(200);
    } // end else
  }); // end newStoryPage.save
});//end addPage

module.exports = router;
