var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');  // require bodyparser for POST calls
var addStory=require('../../models/addStory.js');  // requiring the addStory model
var mongoose = require('mongoose');  // require mongoose for mongo db

// var appGenericMain = require('../../models/appGenericMain');

var router = express.Router();

console.log("hit route");

router.post( '/addStory', function( req, res ){  // POST call
  var storyToAdd={  // adds record from input
    story_title: req.body.story_title,
    story_cover: req.body.story_cover
  };
  console.log(storyToAdd, "storyToAdd");

  var newStory=addStory( storyToAdd );  // saves record to database
  newStory.save();
});

module.exports = router;
