var express = require('express');
var router = express.Router();
var db = require('../config/database'); // include database
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const UserModel = require('../models/Users');
const UserError = require('../helpers/error/UserError');
var bcrypt = require('bcrypt');
const { emailExists } = require('../models/Users');

router.post("/register", (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let cpassword = req.body.password;
  // console.log(req.body);
  // res.send('data');

  // do server side validation
  // not done in video must do here

  UserModel.usernameExists(username)
  .then((userDoesNameExist) => {
    if(userDoesNameExist){
      throw new UserError(
              "Registration Failed: Username already exists",
              "/registration",
              200
            );

    }else{
      return UserModel.emailExists(email);
    }
  })
  .then((emailDoesExist) => {
    if(emailDoesExist){
            throw new UserError(
        "Registration Failed: Email already exists",
        "/registration",
        200
      );

    }else{
      return UserModel.create(username, password, email);
    }
  })
  .then((createdUserId) => {
    if(createdUserId < 0){
            throw new UserError(
        "Server Error, user could not be created",
        "/registration",
        500
      )

    }else{
            successPrint("User.js --> User was created!!");
      req.flash('success', 'User account has been made!');
      res.redirect('/login'); 

    }
  }).catch((err) => {
      errorPrint("user could not be made", err);
      if(err instanceof UserError){
        errorPrint(err.getMessage());
        req.flash('error', err.getMessage());
        res.status(err.getStatus());
        res.redirect(err.getRedirectURL());
      }else{
        next(err);
   
      }
    });

  /*
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
  .then(([results, fields,]) => {
    //if email and user doesn't exist, encrpt password
    if(results && results.length == 0){ //we have only 1 row
      return bcrypt.hash(password, 15); //return the hash password

    }else{
      throw new UserError(
        "Registration Failed: Email already exists",
        "/registration",
        200
      );
    }
  })

  .then((hashedPassword) => {
    //create a new user with encrpted password
      let baseSQL = 
        "INSERT INTO users (username, email, password, created) VALUES (?,?,?,now());"
      return db.execute(baseSQL, [username, email, hashedPassword])

  })
  .then(([results, fields]) => {
    if(results && results.affectedRows == 1){
      successPrint("User.js --> User was created!!");
      req.flash('success', 'User account has been made!');
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
      req.flash('error', err.getMessage());
      res.status(err.getStatus());
      res.redirect(err.getRedirectURL());
    }else{
      next(err);
 
    }
  });
  */
    
});

router.post("/login", (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  // do server side validation
  // not done in video must do here
  UserModel.authenticate(username, password)

  .then((loggedUserId) => {
    if(loggedUserId > 0){
      successPrint(`User ${username} is logged in`);
      req.session.username = username;
      req.session.userId = loggedUserId;
      res.locals.logged = true;
      req.flash('success', "You have been successfully logged in!");
      res.redirect('/');
    }else{
      throw new UserError("Invalid username and/or password!", "/login", 200);
    }
  })
  .catch((err) => {
    errorPrint("user login failed");
    if(err instanceof UserError){
      errorPrint(err.getMessage());
      req.flash('error', err.getMessage());
      res.status(err.getStatus());
      res.redirect('/login');
    }else{
      next(err);
    }
  });
});

router.post('/logout', (req, res, next) =>{
  req.session.destroy((err) => {
    if(err){
      errorPrint('session could not be destroyed');
      next(err);
    }else{
      successPrint('session was destroyed');
      res.clearCookie('csid');
      res.json({status: "OK", message:"user is logged out"});
    }
  })

});

module.exports = router;

