var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;

/* GET home page. */
//localhost:3000
router.get('/', function(req, res, next) {
  res.render('index', {title: "Photo App"});
});

router.get('/login', function(req, res, next) {
  res.render('login', {title:"Log In"});
});

router.get('/registration', function(req, res, next) {
  res.render('registration', {title:"Register"});
});

router.use('/postimage', isLoggedIn);

router.get('/postimage', function(req, res, next) {
  res.render('postimage', {title:"Post an Image"});
});


module.exports = router;
