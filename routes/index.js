var express = require('express');
var router = express.Router();
const {authenticate} = require('../common/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Iconnect Backend' });
});

/* Get dashboard*/ // Protected Component in React work in POSTMAN but in browser cookie not working
router.get('/dashboard', authenticate, function(req, res, next) {
  res.send("You are now logged in to View Dashboard");
});

// to check for valid tokens in React for protected Components
router.get('/checkToken', authenticate, function(req, res) {
  res.status(200).json({
    message:"valid token"
  });
});

module.exports = router;
