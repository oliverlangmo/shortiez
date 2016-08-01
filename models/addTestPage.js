var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addPageSchema = new Schema({
  page: [{}]
});

var Page = mongoose.model( 'Page', addPageSchema );

module.exports = Page;
