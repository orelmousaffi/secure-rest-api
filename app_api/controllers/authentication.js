//Include all required modules
var mongoose = require('mongoose');
var passport = require('passport');

//Include the Users data model
var Users = mongoose.model('Users');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
}

var createDefaultUser = function(res) {
  var user = new Users();

  user.email = "orel60@gmail.com";
  user.setPassword("test123");
  user.save(function(error) {
    if (error) {
      sendJSONresponse(res, 404, error);
    }

    var token = user.generateJWT();
    sendJSONresponse(res, 200, {
      token : token
    });
  });
}

module.exports.registerUser = function(req, res) {
  createDefaultUser(res);
}

module.exports.loginUser = function(req, res) {
  passport.authenticate('local', function(error, user, result) {
    if (error) {
      sendJSONresponse(res, 404, error);
    }

    if (user) {
      var token = user.generateJWT();
      sendJSONresponse(res, 200, {
        token: token
      });
    }
    else {
      sendJSONresponse(res, 401, result);
    }
  }) (req, res);
}
