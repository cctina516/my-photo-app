var express = require('express');
var router = express.Router();
var db = require('../config/database'); // include database
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const UserError = require('../helpers/error/UserError');

/* GET users listing. */
//localhost:3000/users
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let cpassword = req.body.cpassword;
  // console.log(req.body);
  // res.send('data');

  // do server side validation
  // not done in video must do here

  db.execute("SELECT * FROM users WHERE username=?", [username])
  .then(([results, fields]) => {
    if(results && results.length == 0){ //we have only 1 row
      //if username doesn't exsit, check the email
      return db.execute("SELECT * FROM users WHERE email=?", [email]) 
    }else{
      throw new UserError(
        "Registration Failed: Username already exists",
        "/registration",
        200
      );
    }
  })
  //check the email
  .then(([results, fields]) => {
    //if email doesn't exist, create the user
    if(results && results.length == 0){ //we have only 1 row
      let baseSQL = "INSERT INTO users (username, email, password, created) VALUES (?,?,?,now());"
      return db.execute(baseSQL, [username, email, password])
    }else{
      throw new UserError(
        "Registration Failed: Email already exists",
        "/registration",
        200
      );
    }
  })
  .then(([results, fields]) => {
    if(results && results.affectedRows == 1){
      successPrint("User.js --> User was created!!");
      res.redirect('/login'); 
    }else{
      throw new UserError(
        "Server Error, user could not be created",
        "/registration",
        500
      )
    }
  })
  .catch((err) => {
    errorPrint("user could not be made", err);
    if(err instanceof UserError){
      errorPrint(err.getMessage());
      res.status(err.getStatus());
      res.redirect(err.getRedirectURL());
    }else{
      next(err);
 
    }
  })
    
});

router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  // do server side validation
  // not done in video must do here

  let baseSQL = "SELECT username, password FROM users WHERE username=? AND password=?;"
  db.execute(baseSQL, [username, password])
  .then(([results, fields]) => {
    if(results && results.length == 1){
      successPrint(`User ${username} is logged in`);
      res.locals.logged = true;
      res.render('index');

    }else{
      throw new UserError("Invalid username and/or password!", "/login", 200);
    }
  })
  .catch((err) => {
    errorPrint("user login failed");
    if(err instanceof UserError){
      errorPrint(err.getMessage());
      res.status(err.getStatus());
      res.redirect('/login');
    }else{
      next(err);
    }
  })
})

module.exports = router;
