var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var paper = require('paper');
var session = require('express-session');


var app = express();
//creating server and connecting socket with server
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//===============EXPRESS================
// Configure Engines

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

//===============EXPRESS================
// Configure Express

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(flash());
app.use(cookieParser());
app.use(session({ secret: 'cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('view engine', 'ejs');

//===============EXPRESS================
// Configure links to routes

var login = require('./routes/login');
var join = require('./routes/join');
var rooms = require('./routes/room');

app.use('/', login);
app.use('/login', login);
app.use('/join', join);
app.use('/rooms', rooms);

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// server listen
server.listen(3000);


module.exports = app;
