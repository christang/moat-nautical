var express = require('express');
var router = express.Router();

var csv = require('csv');
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
