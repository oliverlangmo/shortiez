var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('../strategies/user-shorties.js');
var addStory=require('../models/addStory.js');  // requiring the addStory model

// routes redirects
var login = require('./routes/login');
var logout = require('./routes/logout');
var register = require('./routes/register');
var appGenericMain = require('./routes/appGenericMain');
var createStory = require('./routes/storyCharPages');
var getLibrary = require('./routes/libraryAdminRoute');
var userStory = require('./routes/userStory');

app.listen(process.env.PORT || 9002, function(){ console.log("Running on local port 9002..."); });

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

app.use('/', login, logout, register, appGenericMain, createStory, getLibrary, userStory);

app.get('/', function(req,res){
  console.log('URL hit');
  var file = req.params[0] || 'views/index.html';
  res.sendFile(path.join(__dirname, '/public/', file));
}); // end app.get base URL
