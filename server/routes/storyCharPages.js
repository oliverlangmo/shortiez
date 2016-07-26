var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');  // require bodyparser for POST calls
var addStory=require('../../models/addStory.js');  // requiring the addStory model
var mongoose = require('mongoose');  // require mongoose for mongo db

// var appGenericMain = require('../../models/appGenericMain');

var router = express.Router();

router.post( '/addStory', function( req, res ){  // POST call
  var storyToAdd={  // adds record from input
    story_title: req.body.story_title,
    story_cover: req.body.story_cover
  };
  console.log(storyToAdd, "storyToAdd");

  var newStory=addStory( storyToAdd );  // saves record to database
  newStory.save();
}); //end addStory post

router.post( '/addCharacter', function( req, res ){  // POST call
  var characterToAdd={  // adds record from input
    character_name: req.body.character_name,
    character_traits: req.body.character_traits,
    character_photo: req.body.character_photo
  };

  addStory.findOneAndUpdate({_id:"579287d62c2e099585a2503f"}, {$push: { story_characters:  characterToAdd  }}, function(err, issueResult){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
    // console.log(req.body.id, " found.", req.body.pages, "available")
    console.log("success, check DB");
    res.sendStatus(200);
    }
  }); //end findOneAndUpdate
}); //end character post

router.post( '/addPage', function( req, res ){  // POST call
  var pageToAdd={  // adds record from input
    page_number: req.body.page_number,
    page_text: req.body.page_text,
    page_illustration: req.body.page_illustration
    };

  addStory.findOneAndUpdate({_id:"579287d62c2e099585a2503f"}, {$push: { story_pages:  pageToAdd  }}, function(err, issueResult){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
    // console.log(req.body.id, " found.", req.body.pages, "available")
    console.log("success, check DB");
    res.sendStatus(200);
    }
  }); //end findOneAndUpdate
}); //end page post



module.exports = router;
