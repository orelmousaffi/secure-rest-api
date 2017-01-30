//Include the express module and initialize Router
var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

//Define the controller for the following routers
var mainCtrl = require('../controllers/main-api');
var authCtrl = require('../controllers/authentication');

/* GET requestes */
router.get('/', mainCtrl.showAllUsers);
router.get('/create', authCtrl.registerUser);
router.get('/delete', auth, mainCtrl.removeUsers);

/* POST requests */
router.post('/login', authCtrl.loginUser);

//Make the router accessable
module.exports = router;
