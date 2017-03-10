var express = require('express');
var router = express();

//Here we are configuring express to use body-parser as middle-ware.
/* GET home page. */
exports.models = require('../models/index');

router.get('/', function(req, res) {
  res.render('login', { title: 'Hey apple!' });
});

router.post('/sign_in', function(req, res) {
    models.User.create({
        name: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password
    });
});



module.exports = router;
