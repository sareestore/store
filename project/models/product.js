var db = require('../db.js');
var squel = require("squel");
var tableName = "products";
var tableColumns = ["id", "description", "price", "size"];

exports.get = function (id, done) {

};

exports.getProductImages = function (done) {
    var sql = "SELECT * FROM products_images";
    db.get().query(sql, [], function (err, rows) {
        if (err) return done(err);
        // console.log("result of product images fetch is " + JSON.stringify(result));
        done(null, rows);
    });
};

exports.getByName = function (type, done) {

};

exports.create = function (description, price, size, color_ids, image_urls, occasion_ids, tag_ids, type_ids, done) {
    var values = [description, price, size];
    var sql = "START TRANSACTION READ WRITE;";
    sql += "INSERT INTO products(description, price, size) VALUES (?,?,?);";

    sql += "SET @insertid = LAST_INSERT_ID();";
    for (var i = 0; i < color_ids.length; i++) {
        sql += "INSERT INTO products_colors(products_id, colors_id) VALUES (@insertid,?);";
        values.push(color_ids[i]);
    }
    for (var i = 0; i < image_urls.length; i++) {
        sql += "INSERT INTO products_images(products_id, image_url) VALUES (@insertid,?);";
        values.push(image_urls[i]);
    }
    for (var i = 0; i < occasion_ids.length; i++) {
        sql += "INSERT INTO products_occasions(products_id, occasions_id) VALUES (@insertid,?);";
        values.push(occasion_ids[i]);
    }
    for (var i = 0; i < tag_ids.length; i++) {
        sql += "INSERT INTO products_tags(products_id, tags_id) VALUES (@insertid,?);";
        values.push(tag_ids[i]);
    }
    for (var i = 0; i < type_ids.length; i++) {
        sql += "INSERT INTO products_types(products_id, product_types_id) VALUES (@insertid,?);";
        values.push(type_ids[i]);
    }
    sql += "COMMIT;SELECT @insertid AS product_id";
    //console.log("The Approval update SQL query is " + sql.toString());
    db.get().query(sql, values, function (err, result) {
        if (err) return done(err);
        //console.log("result of product insert is " + JSON.stringify(result));
        done(null, result[result.length - 1][0].product_id);
    });
};

exports.update = function (id, description, price, size, color_ids, image_urls, occasion_ids, tag_ids, type_ids, done) {
    var values = [id, description, price, size];
    var sql = "START TRANSACTION READ WRITE;";
    sql += "INSERT INTO products(id, description, price, size) VALUES (?,?,?) ON DUPLICATE KEY UPDATE description=VALUES(description),price=VALUES(price),size=VALUES(size);";
    for (var i = 0; i < color_ids.length; i++) {
        sql += "INSERT INTO products_colors(products_id, colors_id) VALUES (?,?) ON DUPLICATE KEY UPDATE colors_id=VALUES(colors_id);";
        values.push(id, color_ids[i]);
    }
    for (var i = 0; i < image_urls.length; i++) {
        sql += "INSERT INTO products_images(products_id, image_url) VALUES (?,?) ON DUPLICATE KEY UPDATE image_url=VALUES(image_url);";
        values.push(id, image_urls[i]);
    }
    for (var i = 0; i < occasion_ids.length; i++) {
        sql += "INSERT INTO products_occasions(products_id, occasions_id) VALUES (?,?) ON DUPLICATE KEY UPDATE occasions_id=VALUES(occasions_id);";
        values.push(id, occasion_ids[i]);
    }
    for (var i = 0; i < tag_ids.length; i++) {
        sql += "INSERT INTO products_tags(products_id, tags_id) VALUES (?,?) ON DUPLICATE KEY UPDATE tags_id=VALUES(tags_id);";
        values.push(id, tag_ids[i]);
    }
    for (var i = 0; i < type_ids.length; i++) {
        sql += "INSERT INTO products_types(products_id, product_types_id) VALUES (?,?) ON DUPLICATE KEY UPDATE product_types_id=VALUES(product_types_id);";
        values.push(id, type_ids[i]);
    }
    sql += "COMMIT;";
    db.get().query(sql, values, function (err, result) {
        if (err) return done(err);
        //console.log("result of product update is " + JSON.stringify(result));
        done(null, result);
    });
};

exports.delete = function (id, done) {
    var values = [id];
    var sql = "";
    sql += "DELETE FROM products WHERE id = ?;";
    //stub
    db.get().query(sql, values, function (err, result) {
        if (err) return done(err);
        //console.log("result of product delete is " + JSON.stringify(result));
        done(null, result.affectedRows);
    });
};

exports.deleteNonDBImages = function (folderpath, done) {
    exports.getProductImages(function (err, imageUrlRows) {
        if (err) return done(err);
        var imageUrls = [];
        for (var i = 0; i < imageUrlRows.length; i++) {
            imageUrls.push(imageUrlRows[i].image_url)
        }
        var fs = require('fs');
        fs.readdir(folderpath, function (err, files) {
            if (err) return done(err);
            files.forEach(function (file) {
                if (!fs.statSync(folderpath + '/' + file).isDirectory()) {
                    // this file is not a folder
                    // check if the filename is in the list
                    console.log(file);
                    if (imageUrls.indexOf(file) == -1) {
                        //delete the file
                        fs.unlink(folderpath + '/' + file);
                    }
                }
            });
            done(null);
        });
    });
};