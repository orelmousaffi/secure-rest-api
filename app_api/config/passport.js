var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');
var User = mongoose.model('Users');

passport.use(new LocalStrategy({
  usernameField: 'email'
},
  function(username, password, done) {
    User.findOne({ email: username }, function(error, user) {
      if (error) {
        return done(error);
      }

      if (!user) {
        return done(error, false, {
          message: 'A user with email: ' + username + ' does not exist!'
        });
      }

      if (!user.validatePassword(password)) {
        return done(error, false, {
          message: 'Incorrect password!'
        });
      }

      return done(null, user);
    })
  }
))
