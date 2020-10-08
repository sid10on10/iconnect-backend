var express = require('express');
var router = express.Router();
const {authenticate} = require('../common/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Iconnect Backend' });
});

/* Get dashboard*/
router.get('/dashboard', authenticate, function(req, res, next) {
  res.send("You are now logged in to View Dashboard");
});

// to check for valid tokens
router.get('/checkToken', authenticate, function(req, res) {
  res.sendStatus(200);
});

module.exports = router;
