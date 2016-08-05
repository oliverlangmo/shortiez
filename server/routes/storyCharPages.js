var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');  // require bodyparser for POST calls
var addStory = require('../../models/addStory.js');  // requiring the addStory model
var mongoose = require('mongoose');  // require mongoose for mongo db
var router = express.Router();

router.post('/addStory', function(req, res){
  var storyToAdd = {
    story_title: req.body.story_title,
    story_description: req.body.story_description,
    story_cover: req.body.story_cover
  };
  var newStory = addStory(storyToAdd);
  newStory.save(function(err, story){
    res.send(story);
  });
  console.log('new story added');
}); // end addStory post

router.post('/addCharacter', function(req, res) {
  var charId = req.body.id;
  var characterToAdd = {
    character_name: req.body.character_name,
    character_traits: req.body.character_traits,
    character_bio: req.body.character_bio,
    character_photo: req.body.character_photo,
    // charId: req.body.charId
  };
  addStory.findOneAndUpdate({_id: charId}, {$push: {story_characters: characterToAdd}}, function(err) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
    console.log('character saved successfully');
    res.sendStatus(200);
    } // end else
  }); // end findOneAndUpdate
}); // end character post

router.post('/addPage', function(req, res) {
  console.log(req.body);
  var storyPages = {
    page_number: req.body.page_number,
    page_text_plain: req.body.page_text_plain,
    page_text_btn: req.body.page_text_btn,
    page_illustration: req.body.page_illustration,
  }; // end pageToAdd
  addStory.findOneAndUpdate({_id:req.body.id}, {$push: {'story_pages': storyPages}}, function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
    console.log('page saved successfully');
    res.sendStatus(200);
    } // end else
  }); // end findOneAndUpdate
}); // end /addPage post

router.post('/updateCharacter', function(req, res) {
  var charId = req.body.id;
  var charactersToReplace = {
    character_name: req.body.character_name,
    character_traits: req.body.character_traits,
    character_bio: req.body.character_bio,
    character_photo: req.body.character_photo,
  };
  addStory.findOneAndUpdate({_id: charId}, {'story_characters': charactersToReplace}, function(err){
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
    console.log('character updated');
    res.sendStatus(200);
    } // end else
  }); // end findOneAndUpdate
}); // end updateCharacter

router.post('/updatePage', function(req, res) {
  var charId = req.body.id;
  var pagesToReplace = {
    page_number: req.body.page_number,
    page_text_plain: req.body.page_text_plain,
    page_text_btn: req.body.page_text_btn,
    page_illustration: req.body.page_illustration,
  }; // end pageToReplace
  addStory.findOneAndUpdate({_id: charId}, {'story_pages': pagesToReplace}, function(err){
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
    console.log('page updated');
    res.sendStatus(200);
    } // end else
  }); // end findOneAndUpdate
}); // end updatePage

router.post('/updateCover', function(req, res) {
  var coverId = req.body.id;
  var storyToReplace = {
    story_title: req.body.story_title,
    story_description: req.body.story_description,
    story_cover: req.body.story_cover
  };
  addStory.findOneAndUpdate( {'_id': coverId},
    {'$set': {
      'story_title': storyToReplace.story_title,
      'story_description': storyToReplace.story_description,
      'story_cover': storyToReplace.story_cover}
    }, function(err){
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
    console.log('story info updated');
    res.sendStatus(200);
    } // end else
  }); // end findOneAndUpdate
}); // end updatePage

router.post('/storyRemove', function(req, res){
  var storyId = req.body.id;
  addStory.findOne({_id: storyId}, function(err, addStory) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      addStory.remove({_id: storyId}, function(err) {});
      console.log('Removed story');
      res.sendStatus(200);
    } // end else
  }); // AddStory.findOne
});// end post storyRemove

router.post('/charRemove', function(req, res) {
  var charId = req.body.id;
  var charactersToReplace = {
    character_name: req.body.character_name,
    character_traits: req.body.character_traits,
    character_bio: req.body.character_bio,
    character_photo: req.body.character_photo,
  };
  addStory.findOneAndUpdate({_id: charId}, {'story_characters': charactersToReplace}, function(err){
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
    console.log('character removed');
    res.sendStatus(200);
    } // end else
  }); // end findOneAndUpdate
}); // end charRemove

module.exports = router;
