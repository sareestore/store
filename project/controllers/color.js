var express = require('express');
var router = express.Router();
var Color = require('../models/color.js');

router.get('/', function (req, res, next) {
    //console.log("get req params for get single are " + JSON.stringify(req.query));
    Color.get(req.query.id, function (err, rows) {
        if (err) {
            return next(err);
        }
        res.json({'colors': rows});
    });
});


router.post('/', function (req, res, next) {
    if (req.user.username != "admin") {
        return next(new Error("user is not admin"));
    }
    var color = req.body["color"];

    //console.log("Username is " + req.user.username);
    Color.create(color, function (err, insertId) {
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
    var color = req.body["color"];

    Color.update(id, color, function (err, result) {
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
    Color.delete(id, function (err, result) {
        if (err) {
            return next(err);
        }
        res.json({"affectedRows":result});
    });
});


module.exports = router;