var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');  // require bodyparser for POST calls
var addStory = require('../../models/addStory.js');  // requiring the addStory model
var mongoose = require('mongoose');  // require mongoose for mongo db

// var appGenericMain = require('../../models/appGenericMain');

var router = express.Router();

router.post('/addStory', function(req, res){
  var storyToAdd = {
    story_title: req.body.story_title,
    story_description: req.body.story_description,
    story_cover: req.body.story_cover
  };
  var newStory = addStory(storyToAdd);
  newStory.save();
}); // end addStory post

router.post('/addCharacter', function(req, res) {
  var characterToAdd = {
    character_name: req.body.character_name,
    character_traits: req.body.character_traits,
    character_bio: req.body.character_bio,
    character_photo: req.body.character_photo,
    id: req.body.id
  };
  addStory.findOneAndUpdate({_id:req.body.id}, {$push: {story_characters:  characterToAdd}}, function(err, issueResult){
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
    console.log('character saved successfully');
    res.sendStatus(200);
    } // end else
  }); // end findOneAndUpdate
}); // end character post

router.post('/addPage', function(req, res) {
  var pageToAdd = {
    page_number: req.body.page_number,
    page_text_plain: req.body.page_text_plain,
    page_text_btn: req.body.page_text_btn,
    page_illustration: req.body.page_illustration,
    id: req.body.id
  }; // end pageToAdd
  console.log(req.body.id);
  addStory.findOneAndUpdate({_id:req.body.id}, {$push: { story_pages:  pageToAdd }}, function(err, issueResult){
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
    console.log('page saved successfully');
    res.sendStatus(200);
  } // end else
  }); // end findOneAndUpdate
}); // end /addPage post


module.exports = router;
