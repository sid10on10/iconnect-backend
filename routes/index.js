var express = require('express');
var router = express.Router();
const {authenticate} = require('../common/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Iconnect Backend' });
});

/* Get dashboard*/
router.get('/dashboard', authenticate, function(req, res, next) {
  res.send("Protected Route");
});

module.exports = router;
