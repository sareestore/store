var express = require('express');
var router = express.Router();
var Product = require('../models/product.js');
var multer = require('multer');
var path = require('path');
var fs = require('fs');

router.get('/', function (req, res, next) {
    Product.get(function (err, products) {
        if (err) {
            return next(err);
        }
        res.json({"products": products});
    })
});

router.post('/', function (req, res, next) {
    if (req.user == null || req.user == undefined || req.user.username != "admin") {
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
        var product_type_ids = req.body.product_types;
        var selectedImageIndex = req.body.default_image_index;
        if (typeof selectedImageIndex == "undefined" || selectedImageIndex == null || selectedImageIndex < 0) {
            selectedImageIndex = 0;
        }
        var image_urls = [];
        if (color_ids === undefined || color_ids == null) {
            color_ids = []
        }
        if (color_ids.constructor != Array) {
            color_ids = [color_ids];
        }

        if (occasion_ids === undefined || occasion_ids == null) {
            occasion_ids = []
        }
        if (occasion_ids.constructor != Array) {
            occasion_ids = [occasion_ids];
        }

        if (tag_ids === undefined || tag_ids == null) {
            tag_ids = []
        }
        if (tag_ids.constructor != Array) {
            tag_ids = [tag_ids];
        }

        if (product_type_ids === undefined || product_type_ids == null) {
            product_type_ids = []
        }
        if (product_type_ids.constructor != Array) {
            product_type_ids = [product_type_ids];
        }

        //todo check if all the files are of image type and delete all the non image files
        //store the file names of the saved files
        for (var i = 0; i < req.files.length; i++) {
            image_urls.push(req.files[i].filename);
        }

        var warning_messages = [];

        // there should be at least one product type
        if (product_type_ids.length <= 0) {
            warning_messages.push("There should be at least one product type");
        }

        // there should be at least one image file
        if (image_urls.length <= 0) {
            warning_messages.push("There should be at least one image");
        }

        // throw error if constraints are not satisfied
        if (warning_messages.length > 0) {
            return next(new Error(warning_messages.join("  |  ")));
        }

        if (err) {
            return next(err);
        }

        Product.create(description, price, size, color_ids, image_urls, selectedImageIndex, occasion_ids, tag_ids, product_type_ids, function (err, insertId) {
            if (err) {
                //delete all the files in the file system
                image_urls.forEach(function (filename) {
                    fs.unlink(path.normalize(__dirname + '/..') + '/assets/images/products/' + filename);
                });
                return next(err);
            }
            res.json({'insertId': insertId});
        });
    });
});

router.put('/', function (req, res, next) {
    if (req.user == null || req.user == undefined || req.user.username != "admin") {
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
        console.log("Request body of product update " + req.body);
        //console.log(req.files);

        var id = req.body.id;
        var description = req.body.description;
        var price = req.body.price;
        var size = req.body.size;
        var color_ids = req.body.colors;
        var occasion_ids = req.body.occasions;
        var tag_ids = req.body.tags;
        var product_type_ids = req.body.product_types;
        var image_urls = [];
        if (color_ids === undefined || color_ids == null) {
            color_ids = []
        }
        if (color_ids.constructor != Array) {
            color_ids = [color_ids];
        }

        if (occasion_ids === undefined || occasion_ids == null) {
            occasion_ids = []
        }
        if (occasion_ids.constructor != Array) {
            occasion_ids = [occasion_ids];
        }

        if (tag_ids === undefined || tag_ids == null) {
            tag_ids = []
        }
        if (tag_ids.constructor != Array) {
            tag_ids = [tag_ids];
        }

        if (product_type_ids === undefined || product_type_ids == null) {
            product_type_ids = []
        }
        if (product_type_ids.constructor != Array) {
            product_type_ids = [product_type_ids];
        }

        //todo check if all the files are of image type and delete all the non image files
        //store the file names of the saved files
        for (var i = 0; i < req.files.length; i++) {
            image_urls.push(req.files[i].filename);
        }

        var warning_messages = [];

        // there should be at least one product type
        if (product_type_ids.length <= 0) {
            warning_messages.push("There should be at least one product type");
        }

        // there should be at least one image file
        if (image_urls.length <= 0) {
            warning_messages.push("There should be at least one image");
        }

        // throw error if constraints are not satisfied
        if (warning_messages.length > 0) {
            return next(new Error(warning_messages.join("  |  ")));
        }

        if (err) {
            return next(err);
        }

        Product.update(description, price, size, color_ids, image_urls, occasion_ids, tag_ids, product_type_ids, function (err, result) {
            if (err) {
                //delete all the files in the file system
                image_urls.forEach(function (filename) {
                    fs.unlink(path.normalize(__dirname + '/..') + '/assets/images/products/' + filename);
                });
                return next(err);
            }
            res.json({'result': result});
        });
    });
});

router.get('/deleteimages', function (req, res, next) {

    if (req.user == null || req.user == undefined || req.user.username != "admin") {
        return next(new Error("user is not admin"));
    }

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

router.delete("/", function (req, res, next) {
    if (req.user == null || req.user == undefined || req.user.username != "admin") {
        return next(new Error("user is not admin"));
    }

    var id = req.query.id;
    Product.delete(id, function (err, affectedRows) {
        if (err) {
            return next(err);
        }
        else {
            res.json({"message": "Number of products deleted is " + affectedRows});
        }
    });
});

module.exports = router;