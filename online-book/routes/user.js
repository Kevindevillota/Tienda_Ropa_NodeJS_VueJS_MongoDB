var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');


/* GET SINGLE User BY ID */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* REGISTRATION USER */
router.post('/register', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* LOGIN USER */
router.post('/login', function(req, res, next) {
  User.findOne({
    username: req.body.username,
    password: req.body.password
  },function (err,user){
    if(err) throw err;
    if(!user) {
      res.status(401).send({success: false, msg: 'Felhasznalo vagy Jelszo hiba'});
    } else { res.json({success: true, msg: 'Sikeres bejelentkezes'})
    }
  })
});

/* UPDATE USER */
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
