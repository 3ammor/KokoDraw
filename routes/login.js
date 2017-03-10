var express = require('express');
var router = express();
var bodyParser     = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { title: 'Zez' });
});

router.post('sign_in', function(req, res){
    console.log(request.body.name);
    console.log(request.body.password);
});

module.exports = router;
