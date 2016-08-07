var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var badWords = new Schema({
  badWords: []
});

var BadWord = mongoose.model('BadWord', badWords);

module.exports = BadWord;
