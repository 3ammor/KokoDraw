var express = require('express');
var router = express();
var bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res) {
    res.render('join', { title: '' });
});

module.exports = router;
