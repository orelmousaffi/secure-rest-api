var jwt = require('jsonwebtoken');

function generateJWT() {
  return jwt.sign({
    exp: 300
  }, 'ThisIsSecret');
}

module.exports.showAllUsers = function(req, res) {
  res.render('allUsers', { title: "All users", token: generateJWT() });
}
