var mongoose = require('mongoose');  // require mongoose for mongo db
var Schema = mongoose.Schema;

var addBadWord = new Schema({
  badWordList: []
});

var AddBadWord = mongoose.model( 'AddBadWord', addBadWord );  // sets schema to model var

module.exports = AddBadWord;
