var express = require('express');
var router = express.Router();
var Product = require('../models/product.js');
var multer = require('multer');
var path = require('path');

router.post('/', function (req, res, next) {
    if (req.user.username != "admin") {
        return next(new Error("user is not admin"));
    }

    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, path.normalize(__dirname + '/..') + '/assets/images/products');
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now());
        }
    });
    var upload = multer({storage: storage}).array('product_images', 100);

    upload(req, res, function (err) {
        console.log(req.body);
        console.log(req.files);
        var description = req.body.description;
        var price = req.body.price;
        var size = req.body.size;
        var color_ids = req.body.colors;
        var occasion_ids = req.body.occasions;
        var tag_ids = req.body.tags;
        var product_types = req.body.product_type_ids;
        var image_urls = [];
        for (var i = 0; i < req.files.length; i++) {
            image_urls.push(req.files[i].filename);
        }
        // todo handle undefined or single or array of types, occasions, tags, colors
        var warning_messages = [];

        // there should be at least one product type
        //todo

        // there should be at least one image file
        //todo

        // throw error if constraints are not satisfied
        if (warning_messages.length > 0) {
            return next(new Error(warning_messages.join("  |  ")));
        }

        if (err) {
            return next(err);
        }
        // files uploaded successfully
        res.json({'message': "testing the file upload..."});
        /*
         Product.create(description, price, size, color_ids, image_urls, occasion_ids, tag_ids, product_type_ids, function (err, insertId) {
         if (err) {
         return next(err);
         }
         res.json({'insertId': insertId});
         });
         */
    });
});

module.exports = router;