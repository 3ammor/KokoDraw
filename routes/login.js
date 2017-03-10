var express = require('express');
var router = express();
exports.models = require('../models/index');
var passwordHash = require('password-hash');

router.get('/', function(req, res) {
  res.render('login', { title: 'Hey apple!' });
});

router.post('/sign_up', function(req, res) {

    xusername = req.body.username;
    xfullname = req.body.fullname;
    xemail = req.body.email;
    opassword = req.body.password;

    if(opassword.length < 8) {
        res.session.error = 'Username already exists.';
        res.redirect('/login');
    }

    xpassword = passwordHash.generate(opassword);

    exports.models.User.create({
        name: xusername,
        fullname: xfullname,
        email: xemail,
        password: xpassword
    }).then(function (result) {
        res.json(result);
    }).catch(function(err) {
        console.log("Username already exists.");
     });

});



module.exports = router;
