var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sessions =require('express-session');
var mysqlSession = require('express-mysql-session')(sessions);
var flash = require('express-flash');

//import express handlebars
var handlebars = require('express-handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbRouter = require('./routes/dbtest');
// var loginRouter = require('./views/login'); //

var errorPrint = require('./helpers/debug/debugprinters').errorPrint;
var requestPrint = require('./helpers/debug/debugprinters').requestPrint;


var app = express();
app.engine(
    "hbs", 
    handlebars({
        layoutsDir: path.join(__dirname, "views/layouts"),
        partialsDir: path.join(__dirname, "views/partials"),
        extname: ".hbs",
        defaultLayout: "home",
        helpers: {
            // if need more helpers you can register them here
        }
    })
);


var mysqlSessionStore = new mysqlSession(
    {
        /* using default options */
    },require('./config/database')
    );

app.use(sessions({
    key: "csid",
    secret: 'this is a secret from csc317',
    store: mysqlSessionStore,
    resave: false,
    saveUninitialized: false
}));

app.use(flash());



app.set("view engine", "hbs");
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => { // call next to move to next function
    requestPrint(req.url); // print URL other request coming in 
    next();
})

app.use((req, res, next) => {
    console.log(req.session);
    if(req.session.username){
        res.locals.logged = true;
    }
    next();
})

app.use('/', indexRouter); // localhost:3000
app.use('/dbtest', dbRouter);
app.use('/users', usersRouter);

app.use((err, req, res, next) => {
    // res.status(500);
    // res.send('something went wrong with your db');
    console.log(err);
    res.render('error', {err_message: err})
}); //middleware function

//error function
// app.use((err, req, resp, next)=>{

// })


module.exports = app;
