var express = require('express');
var router = express.Router();
var Order = require('../models/order.js');

router.get('/', function (req, res, next) {
    //console.log("get req params for get single are " + JSON.stringify(req.query));
    Order.get(req.query.id, function (err, rows) {
        if (err) {
            return next(err);
        }
        res.json({'orders': rows});
    });
});

router.post('/', function (req, res, next) {
    var users_id = null;
    var products_id = req.body["products_id"];
    var quantity = req.body["quantity"];
    var name = req.body["name"];
    var phone = req.body["phone"];
    var email = req.body["email"];
    var address = req.body["address"];
    var message = req.body["message"];

    if (req.user != null && req.user.id != null) {
        users_id = req.user.id;
    }

    //console.log("Username is " + req.user.username);
    Order.create(users_id, products_id, quantity, name, phone, email, address, message, function (err, insertId) {
        if (err) {
            return next(err);
        }
        res.json({'insertId': insertId});
    });
});

router.put('/', function (req, res, next) {
    if (req.user.username != "admin") {
        return next(new Error("user is admin"));
    }
    var id = req.body["id"];
    var users_id = req.body["products_id"];
    var products_id = req.body["products_id"];
    var quantity = req.body["quantity"];
    var name = req.body["name"];
    var phone = req.body["phone"];
    var email = req.body["email"];
    var address = req.body["address"];
    var message = req.body["message"];

    //console.log("Username is " + req.user.username);
    Order.update(id, users_id, products_id, quantity, name, phone, email, address, message, function (err, insertId) {
        if (err) {
            return next(err);
        }
        res.json({'changedRows': insertId});
    });
});


router.delete('/', function (req, res, next) {
    if (req.user.username != "admin") {
        return next(new Error("user is admin"));
    }
    var id = req.body["id"];
    Order.delete(id, function (err, result) {
        if (err) {
            return next(err);
        }
        res.json({"affectedRows": result});
    });
});

module.exports = router;