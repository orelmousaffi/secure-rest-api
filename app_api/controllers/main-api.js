//Include all required modules
var mongoose = require('mongoose');

//Include the Users data model
var Users = mongoose.model('Users');

function showAllUsers(res) {
  Users.find({}).exec(function(error, users) {
    if (error) {
      throw error;
    }

    res.render('allUsers', {
      title: "All Users",
      users: users
    });
  });
}


module.exports.showAllUsers = function(req, res) {
    showAllUsers(res);
}

module.exports.removeUsers = function(req, res) {
  Users.remove({}, function(error) {
    if (error) {
      throw error;
    }

    if (req.signedCookies['authToken'] !== undefined) {
      res.clearCookie('authToken');
    }

    showAllUsers(res);
  });
}
