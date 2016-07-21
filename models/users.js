var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true}
}); // end UserSchema

// Called before adding a new user to the DB. Encrypts password.
UserSchema.pre('save', function(next) {
    var user = this;
    if(!user.isModified('password')) {
      return next(); }
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) {
          return next(err); }
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) {
              return next(err); }
            user.password = hash;
            next();
        }); // end bcrypt.hash
    }); // end bcrypt.genSalt
}); // end UserSchema

// Used by login methods to compare login form password to DB password
UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) {
          return callback(err); }
        callback(null, isMatch);
    }); // end bcrypt.compare
}; // end UserSchema.methods.comparePassword

module.exports = mongoose.model('User', UserSchema);
