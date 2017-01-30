//Include Mongoose and other required modules
var mongoose = require('mongoose');
var crypto  = require('crypto');
var jwt = require('jsonwebtoken');

//Define the user Schema
var userSchema = mongoose.Schema({
    email : {
      type : String,
      required : true
    },
    passwordHash : {
      type : String,
      required : true
    },
    passwordSalt : {
      type : String,
      required : true
    }

});

userSchema.methods.setPassword = function(passwordStr) {
  this.passwordSalt = crypto.randomBytes(32).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(
    passwordStr,
    this.passwordSalt,
    1000,
    64
  ).toString('hex');
}

userSchema.methods.validatePassword = function(passwordStr) {
  var hash = crypto.pbkdf2Sync(
    passwordStr,
    this.passwordSalt,
    1000,
    64
  ).toString('hex');

  return this.passwordHash === hash;
}

userSchema.methods.generateJWT = function() {
  var token = jwt.sign(this, process.env.JWT_SECRET, {
    expiresIn: "24h"
  });

  return token;
}

//Compile the users Schema model
mongoose.model('Users', userSchema);
