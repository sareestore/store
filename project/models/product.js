var db = require('../db.js');
var squel = require("squel");
var tableName = "products";
var tableColumns = ["id", "description", "price", "size"];

exports.get = function (id, done) {

};

exports.getByName = function (type, done) {

};

exports.create = function (description, price, size, color_ids, image_urls, occasion_ids, tag_ids, type_ids, done) {
    var values = [description, price, size];
    var sql = "START TRANSACTION READ WRITE;";
    sql += "INSERT INTO products(description, price, size) VALUES (?,?,?)";

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
        console.log("result of product insert is " + JSON.stringify(result));
        done(null, result.insertId);
    });
};

exports.update = function (id, type, done) {

};

exports.delete = function (id, done) {

};