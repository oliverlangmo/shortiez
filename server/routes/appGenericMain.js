var express = require('express');
var path = require('path');
///BadWord Filter. Use filter.clean() to activate.
// var Filter = require('bad-words'),
//   filter = new Filter();

var router = express.Router();

var User = require('../../models/users');

router.get('/checkUser', function(req, res){
  User.find().then(function(data){
  res.send(data);
  }); // end User.find
}); //end checkUser

router.post('/getUserCheck', function(req, res){
  var findUser = req.body.username;
  User.findOne({username: findUser}, function(err, data) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(data);
    } // end else
  }); // User.findOne
}); // end getUserCheck

router.get('/getUsers', function(req, res){
  // console.log('hit user get route');
  User.find().then(function(data){
  res.send(data);
  }); // end TempUser.find
}); //end getTempUser

router.post('/addTempUser', function(req, res) {
console.log(filter.clean("Don't be an ash0le"));
  var newTempUser = new TempUser({
    name: req.body.name
  }); // end newTempUser object
  newTempUser.save(function(err) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else {
      console.log('User has been added to database');
      res.sendStatus(200);
    } // end else
  }); // end addTempUser.save
});//end addTempUser

router.post('/removeTempUser', function(req, res){
  var tempUserId = req.body.id;
  TempUser.findOne({_id: tempUserId}, function(err, TempUser) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      TempUser.remove({_id: tempUserId}, function(err) {});
      console.log('Removed user');
      res.sendStatus(200);
    } // end else
  }); // TempUser.findOne
});// end addTempUser

router.post('/updateTempUser', function(req, res){
  var tempUserId = req.body.id;
  TempUser.findOne({_id: tempUserId}, function(err, TempUser) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      TempUser.update({
        name: req.body.name
      },
      function(err) {}); console.log('TempUser has been updated');
      res.sendStatus(200);
    } // end else
  }); // TempUser.findOne
}); // end updateTempUser
router.put('/userUpdate', function(req,res){
  console.log(req.body);
  console.log('in update route');
  var query = {_id: req.body.id};
  User.findOneAndUpdate(query,{name:req.body.name, username: req.body.username, email: req.body.email, grade: req.body.grade, admin: req.body.admin, birthday: req.body.birthday }, function(err){
});
});
router.delete('/deleteUserInfo', function(req, res){
  console.log('delete route with', req.body);
  var query = {_id: req.body.id};
  User.findOne({_id: req.body.id}, function(err, userResult) {
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else{
        User.remove({_id: userResult._id}, function(err) {});
        res.sendStatus(200);
      }
    });
});

module.exports = router;
