const express = require('express');
const router = express.Router();
const db = require('../conf/database'); //getting the pool from db class

router.get('/getAllUsers', (req, res, next) => {
    db.query('SELECT * from users;', (err, results, fields) => {
        if(err){
            next(err); //pass err to next in asynchronous func
        }
        console.log(results);
        res.send(results);

    })
});

router.get('/getAllPosts', (req, res, next) => {
    db.query('SELECT * from posts;', (err, results, fields) => {
        if(err){
            next(err); //pass err to next in asynchronous func
        }
        console.log(results);
        res.send(results);

    })
}); 

{/* <form action="dbtest/createUser" method="POST"
enctype="x-www-form-urlencoded">
    <input id="password" name="password" />
    <input id="username" name="username" />
    <input id="email" name="email" />
    <input id="button" type="submit" />
</form> */}

router.post('/createUser', (req, res, next) => {
    console.log(req.body);
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    //calidate data, if bad send back response
    //res.redirect('/registration');

    let baseSQL = 'INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now())';
    db.query(baseSQL, [username, email, password])
    .then(([results, fields]) => {
        if(results && results.affectedRows) {
            res.send('user was made');
        }else{
            res.send('user was not made for some reason');
        }
    })
    .catch((err) => {
        next(err);
    })
    
})
module.exports = router;
