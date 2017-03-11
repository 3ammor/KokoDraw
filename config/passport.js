var models = require('../models/index');
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, username, password, done) {

        //const saltRounds = 10;
        //var salt = bcrypt.genSaltSync(saltRounds);
        //xpassword = bcrypt.hashSync(password, salt);

        models.User.findOne({
            where: {
                name: username,
                password: password
            }
        }).then(function (user) {
            // console.log(err);
            console.log(user);
            if (user == null)
                return done(null, false, req.flash('error4', ' Username or password mismatch'));
            return done(null, user);
        }).catch(function (err) {
            console.log("no");
            return done(null, false, req.flash('error4', ' Username or password mismatch'));
        });

    }));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
        models.User.findOne({
            where: {
                id: id
            }
        }).then(function (user) {
            // console.log(err);
            console.log(user);
            if (user == null)
                return cb(null);
            return cb(null, user);
        }).catch(function (err) {
            console.log("no");
            return cb(null);
        });
});