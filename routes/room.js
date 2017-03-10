/**
 * Created by Omar on Mar/10/17.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('room', { title: 'Express' });
});

module.exports = router;
