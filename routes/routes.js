module.exports = function (app, passport) {
    require('../config/passport');
    var bcrypt = require('bcrypt');
    var models = require('../models/index');
    var passwordHash = require('password-hash');
    var operations = require('../db/operations');

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function (req, res) {
        res.render('login', {
            error1: req.flash('error1'),
            error2: req.flash('error2'),
            error3: req.flash('error3'),
            error4: req.flash('error4'),
            signup_success: req.flash('signup_success')
        });
    });

    // PROFILE SECTION =========================
    app.get('/join', isLoggedIn, function (req, res) {
        operations.getRoomsForUser(req.user.id, function (rooms) {
                res.render('join', {rooms: rooms, error5: req.flash('error5')});
        });
    });

    app.post('/selectroom', isLoggedIn, function (req, res) {
        operations.getUsername(req.user.id, function (username) {
            res.render('room', {userid: req.user.id, username: username, token: req.body.btn});
        });
    });

    app.post('/joinroom', isLoggedIn, function (req, res) {
        if (req.body.token != null) {
            req.session['token'] = req.body.token;
            res.redirect('/rooms');
        }
    });

    // LOGOUT ==============================
    app.post('/rooms/logout', isLoggedIn, function (req, res) {
        req.logout();
        req.session['token'] = null;
        res.redirect('/');
    });

    app.post('/logout', isLoggedIn, function (req, res) {
        req.logout();
        req.session['token'] = null;
        res.redirect('/');
    });

    app.post('/rooms/leaveroom', isLoggedIn, function (req, res) {

    });

    // Create and join ================================================================
    app.post('/create', isLoggedIn, function (req, res) {
        var now = new Date();
        req.session['token'] = req.body.token2;
        operations.checkExistence(req.body.token2, function (checker) {
            if (checker) {
                console.log("create ok");
                req.flash('error5', 'A room with the same name already exists.');
                res.redirect('/join');
                return;
            }
            else {
                console.log("create not ok");
                res.redirect('/rooms/');
            }
        });
    });
    // Room =====================================
    app.get('/rooms', isLoggedIn, function (req, res) {
        if (req.session['token'] != null) {
            operations.getUsername(req.user.id, function (username) {
                res.render('room', {userid: req.user.id, username: username, token: req.session['token']});
            });
        }
        else res.redirect('/join');
    });


// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // process the login form
    app.post('/sign_in', passport.authenticate('local-login', {
        successRedirect: '/join', // redirect to the secure profile section
        failureRedirect: '/', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // SIGNUP =================================
    app.post('/sign_up', function (req, res) {

        xusername = req.body.username;
        xfullname = req.body.fullname;
        xemail = req.body.email;
        opassword = req.body.password;

        var english = /^[A-Za-z ']*$/;
        if (!english.test(xfullname)) {
            req.flash('error3', 'Name must contain only english letters.');
            res.redirect('/');
            return;
        }

        if (opassword.length < 8) {
            req.flash('error2', 'Password must be at least 8 characters long.');
            res.redirect('/');
            return;
        }

        //const saltRounds = 10;
        //var salt = bcrypt.genSaltSync(saltRounds);
        //xpassword = bcrypt.hashSync(opassword, salt);

        models.User.create({
            name: xusername,
            fullname: xfullname,
            email: xemail,
            password: opassword
        }).then(function (result) {
            req.flash('signup_success', 'Account created successfully. You can sign in now.');
            res.redirect('/');
        }).catch(function (err) {
            req.flash('error1', 'Username or Email already exists.');
            res.redirect('/');
        });

    });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}