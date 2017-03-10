var express = require('express');
var router = express();
exports.models = require('../models/index');
var passwordHash = require('password-hash');

router.get('/', function (req, res) {
    res.render('login',{ error1: req.flash('error1'), error2: req.flash('error2'), error3: req.flash('error3') });
});

router.post('/sign_up', function (req, res) {

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

    xpassword = passwordHash.generate(opassword);

    exports.models.User.create({
        name: xusername,
        fullname: xfullname,
        email: xemail,
        password: xpassword
    }).then(function (result) {
        res.json(result);
    }).catch(function (err) {
        req.flash('error1', 'Username already exists.');
        res.redirect('/');
    });

});


module.exports = router;
