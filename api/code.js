var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Code = require('../models/Code.js');

/* GET ALL CODES */
router.get('/',  function(req, res, next) {
  console.log(req.user.user.username)
  var user = req.user.user.username;
  Code.find({ username: user }, function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* SAVE CODE */
router.post('/', function(req, res, next) {
  Code.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
