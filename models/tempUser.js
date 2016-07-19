var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tempUserSchema = new Schema({
  name: String
});

var TempUser = mongoose.model('TempUser', tempUserSchema);

module.exports = TempUser;
