var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var paper = require('paper');
var passport = require('passport');
var session = require('express-session');
var db =require("./db/operations.js")
var app = express();
//creating server and connecting socket with server
var server = require('http').createServer(app);
var io = require('socket.io')(server);

require('./config/passport'); // pass passport for configuration

//===============EXPRESS================
// Configure Engines
app.set('views', path.join(__dirname, 'views'));

//===============EXPRESS================
// Configure Express

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('view engine', 'ejs');

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


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

var double_p = require('./routes/double_p.js');
var draw = require('./routes/draw.js');

io.sockets.on('connection', function (socket) {
    console.log('tezy');
    socket.on('disconnect', function () {
        console.log("disconnecting");
    });


    socket.on('path_request', function (room, id, point, color) {
        console.log('es7a ya mo2men');
        io.in(room).emit('path_request_u', id, point, color);
        draw.draw(room, point, id, color);
    });


    socket.on('path_point', function (room, id, point) {
        io.in(room).emit('path_point_u', id, point);
        draw.add_point(room, point, id);
    });

    socket.on('path_end', function (room, id) {
        io.in(room).emit('path_end_u', id);
        draw.draw_end(room, id);
    });

    socket.on('rect', function (room, id, pos, size, color) {
        io.in(room).emit('rect_u', pos, size, color);
        draw.draw_rect(room, pos, size, color);
    });
    socket.on('circle', function (room, id, pos, size, color) {
        io.in(room).emit('circle_u', pos, size, color);
        draw.draw_circle(room, pos, size, color);
    });
    socket.on('msg', function (room, id, msg) {
        io.in(room).emit('msg_u', id, msg);
    });
    socket.on('join', function (room,id) {
        console.log("joining");
        joinn(socket, room,id);
    });


});


function joinn(socket, room,id) {
    console.log("joininggggggggggggg");
    socket.join(room);
    paths = double_p.paths;
    projects = double_p.projects;
    var project = double_p.projects[room];
    if (!project) {


         if (! db.checkExistence(room))
         {
            console.log("el project el kos");

            paths = double_p.paths;
            projects = double_p.projects;
            paths[room] = {};
            projects[room] = new paper.Project();
            console.log(room);
             db.roomCreateUpdate(id,room,projects[room].exportJSON())

         }

       else {
        project_json= db.getJSON(room)
        projects[room] = new paper.Project();
        projects[room].importJSON(project_json);
        io.in(room).emit('join:load_page', project_json);
             }

    }
    else {
        console.log('bitch better have my json');
        var project_json = projects[room].exportJSON();
        io.in(room).emit('join:load_page', project_json);

    }
    io.in(room).emit('join:end');
}

module.exports = app;
