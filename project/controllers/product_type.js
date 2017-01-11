var express = require('express');
var router = express.Router();
var Product_type = require('../models/product_type');

router.get('/', function (req, res, next) {
    //console.log("get req params for get single are " + JSON.stringify(req.query));
    Product_type.get(req.query.id, function (err, rows) {
        if (err) {
            return next(err);
        }
        res.json({'product_types': rows});
    });
});


router.post('/', function (req, res, next) {
    if (req.user.username != "admin") {
        return next(new Error("user is not admin"));
    }
    var product_type = req.body["product_type"];

    //console.log("Username is " + req.user.username);
    Product_type.create(product_type, function (err, insertId) {
        if (err) {
            return next(err);
        }
        res.json({'insertId': insertId});
    });
});

router.put('/', function (req, res, next) {
    if (req.user.username != "admin") {
        return next(new Error("user is not admin"));
    }
    var id = req.body["id"];
    var product_type = req.body["product_type"];

    Product_type.update(id, product_type, function (err, result) {
        if (err) {
            return next(err);
        }
        res.json({"changedRows": result});
    });
});

router.delete('/', function (req, res, next) {
    if (req.user.username != "admin") {
        return next(new Error("user is admin"));
    }
    var id = req.body["id"];
    Product_type.delete(id, function (err, result) {
        if (err) {
            return next(err);
        }
        res.json({"affectedRows":result});
    });
});


module.exports = router;