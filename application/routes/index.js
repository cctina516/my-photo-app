var express = require('express');
var router = express.Router();

/* GET home page. */
//localhost:3000
router.get('/', function(req, res, next) {
  res.render('index', {name: "Chuting Yan"});
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/registration', function(req, res, next) {
  res.render('registration');
});

// router.post('/', (req, res, next) => {
//   res.redirect('/login');
// })

module.exports = router;
