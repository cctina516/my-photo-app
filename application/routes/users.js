var express = require('express');
var router = express.Router();
var db = require('../config/database'); // include database

/* GET users listing. */
//localhost:3000/users
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res, next) => {
  console.log(req);
  res.send('data');
})

module.exports = router;
