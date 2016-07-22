var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('../strategies/user-shorties.js');

// var passport = require('passport');
var index = require('./routes/index');
var register = require('./routes/register');
var appGenericMain = require('./routes/appGenericMain');
var createStory=require('./routes/storyCharPages');

app.listen(process.env.PORT || 9002, function(){ console.log("IT'S OVER 9000!!!"); });

app.use(express.static('public'));

var mongodbUri = 'mongodb://mondoShorties:shorties1@ds023495.mlab.com:23495/shorties';
mongoose.connect(mongodbUri);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
})); // end session
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index, register, appGenericMain, createStory);

app.get('/', function(req,res){
  console.log('You Are in L');
  var file = req.params[0] || 'views/index.html';
  res.sendFile(path.join(__dirname, '/public/', file));
}); // end app.get base URL
