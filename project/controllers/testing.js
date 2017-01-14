var express = require('express');
var router = express.Router();
var User = require('../models/User_Mysql');
var Product = require('../models/product');

var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

router.get('/showusers', function (req, res, next) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    User.get(7, function (err, users) {
        if (err) {
            return done(err);
        }
        res.json({users: users});
    });

});

router.get('/deleteimages', function (req, res, next) {
    var path = require('path');
    Product.deleteNonDBImages(path.normalize(__dirname + '/..') + '/assets/images/products', function (err) {
        if (err) {
            return next(err);
        }
        else {
            res.json({"message": "removed all non db images"});
        }
    });
});

module.exports = router;
