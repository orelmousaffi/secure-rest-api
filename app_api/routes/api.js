//Include the express module and initialize Router
var express = require('express');
var router = express.Router();

//Define the controller for the following routers
var mainCtrl = require('../controllers/main-api');

/* GET requestes */
router.get('/', mainCtrl.showAllUsers);

//Make the router accessable
module.exports = router;
