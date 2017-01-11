var express = require('express');
var router = express.Router();
var Tag = require('../models/tag.js');

router.get('/', function (req, res, next) {
    //console.log("get req params for get single are " + JSON.stringify(req.query));
    Tag.get(req.query.id, function (err, rows) {
        if (err) {
            return next(err);
        }
        res.json({'tags': rows});
    });
});


router.post('/', function (req, res, next) {
    if (req.user.username != "admin") {
        return next(new Error("user is not admin"));
    }
    var tag = req.body["tag"];

    //console.log("Username is " + req.user.username);
    Tag.create(tag, function (err, insertId) {
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
    var tag = req.body["tag"];

    Tag.update(id, tag, function (err, result) {
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
    Tag.delete(id, function (err, result) {
        if (err) {
            return next(err);
        }
        res.json({"affectedRows":result});
    });
});


module.exports = router;