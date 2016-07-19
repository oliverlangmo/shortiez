var express = require('express');
var path = require('path');

var router = express.Router();

var TempUser = require('../../models/tempUser');

router.get('/getUsers', function(req, res){
  console.log('in /getUsers');
  TempUser.find().then(function(data){
  res.send(data);
  }); // end TempUser.find
}); //end getTempUser

router.post('/addTempUser', function(req, res) {
  console.log('in /addTempUser');
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
  console.log('in /removeTempUser');
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
  console.log('in /updateTempUser');
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

module.exports = router;
