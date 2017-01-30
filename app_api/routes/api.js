//Include the express module and initialize Router
var express = require('express');
var router = express.Router();

//var jwt = require('express-jwt');
var jwt = require('jsonwebtoken');

/*var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});*/

//Define the controller for the following routers
var mainCtrl = require('../controllers/main-api');
var authCtrl = require('../controllers/authentication');

var auth = function (req, res, next) {
  var authCookie = req.signedCookies['authToken'];
  if (!authCookie) {
    res.json({message : "Unauthorized Access, no token provided!"});
  }
  else {
    jwt.verify(authCookie, process.env.JWT_SECRET, function(error, decoded) {
      if (error) {
         return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
    });
  }

  next();
}

/* Public routes */
router.get('/create', authCtrl.registerUser);

//Inject middleware for secure routes
router.use(auth);

/* Private routes */
router.get('/', mainCtrl.showAllUsers);
router.get('/delete', mainCtrl.removeUsers);

router.post('/login', authCtrl.loginUser);

//Make the router accessable
module.exports = router;
