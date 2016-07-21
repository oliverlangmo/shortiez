var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/users');

passport.serializeUser(function(user, done) {
  done(null, user.id);
}); // end serializeUser

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if(err) { done(err); }
    done(null, user);
  }); // end User.findById
}); // end deserializeUser

passport.use('local', new localStrategy({
  passReqToCallback: true,
  usernameField: 'username'
  }, function(req, username, password, done) {
    User.findOne({username: username}, function(err, user) {
      if(err) { throw err; }
      if(!user) {
        return done(null, false, {message: 'Username does not exist'});
      } else {
        user.comparePassword(password, function(err, isMatch) {
          if(err) { throw err; }
          if(isMatch) {
            return(done(null, user));
          } else {
            done(null, false, {message: 'Wrong password'});
          } // end else line 29
        }); // end user.comparePassword
      } // end else line 24
    }); // end User.findOne
  } // end callback function line 19
)); // end passport.use

module.exports = passport;
