var mongoose = require('mongoose');  // require mongoose for mongo db
var Schema = mongoose.Schema;

var addStorySchema = new Schema({  // set up new mongoose schema
  story_title: String,
  story_cover: String,
  story_characters: [{}],
  story_pages: [{}]

});


var addStory = mongoose.model( 'addStory', addStorySchema );  // sets schema to model var

module.exports=addStory;
