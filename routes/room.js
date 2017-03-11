/**
 * Created by Omar on Mar/10/17.
 */

var express = require('express');
var router = express();

router.get('/', function(req, res) {
    res.render('room', { title: 'Express' });
});

// router.get('/chat', function(req, res) {
//     res.render('chat_test');
// });

module.exports = router;
