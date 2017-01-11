var express = require('express');
var router = express.Router();
var Occasion = require('../models/occasion.js');

router.get('/', function (req, res, next) {
    //console.log("get req params for get single are " + JSON.stringify(req.query));
    Occasion.get(req.query.id, function (err, rows) {
        if (err) {
            return next(err);
        }
        res.json({'occasions': rows});
    });
});


router.post('/', function (req, res, next) {
    if (req.user.username != "admin") {
        return next(new Error("user is not admin"));
    }
    var occasion = req.body["occasion"];

    //console.log("Username is " + req.user.username);
    Occasion.create(occasion, function (err, insertId) {
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
    var occasion = req.body["occasion"];

    Occasion.update(id, occasion, function (err, result) {
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
    Occasion.delete(id, function (err, result) {
        if (err) {
            return next(err);
        }
        res.json({"affectedRows":result});
    });
});


module.exports = router;