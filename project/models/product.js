var db = require('../db.js');
var squel = require("squel");
var tableName = "products";
var tableColumns = ["id", "description", "price", "size"];

exports.get = function (filtersObject, done) {
    var values = [];
    var colors = [];
    var occasions = [];
    var product_types = [];
    if (filtersObject != null) {
        if (typeof filtersObject.colors != "undefined" && filtersObject.colors.constructor === Array) {
            colors = filtersObject.colors;
        }
        if (typeof filtersObject.occasions != "undefined" && filtersObject.occasions.constructor === Array) {
            occasions = filtersObject.occasions;
        }
        if (typeof filtersObject.product_types != "undefined" && filtersObject.product_types.constructor === Array) {
            product_types = filtersObject.product_types;
        }
    }
    var sql = "SELECT products.id, products.size, products.description, products.price, " +
        "GROUP_CONCAT(DISTINCT products_colors.colors_id SEPARATOR ',') AS color_ids, " +
        "GROUP_CONCAT(DISTINCT products_images.image_url SEPARATOR ',') AS image_urls, " +
        "GROUP_CONCAT(products_images.is_default SEPARATOR ',') AS image_defaults, " +
        "GROUP_CONCAT(DISTINCT products_occasions.occasions_id SEPARATOR ',') AS occasions_ids, " +
        "GROUP_CONCAT(DISTINCT products_tags.tags_id SEPARATOR ',') AS tags_ids, " +
        "GROUP_CONCAT(DISTINCT products_types.product_types_id SEPARATOR ',') AS product_types_ids " +
        "FROM products " +
        "LEFT OUTER JOIN products_colors ON products_colors.products_id = products.id " +
        "LEFT OUTER JOIN products_tags ON products_tags.products_id = products.id " +
        "LEFT OUTER JOIN products_images ON products_images.products_id = products.id " +
        "LEFT OUTER JOIN products_occasions ON products_occasions.products_id = products.id " +
        "LEFT OUTER JOIN products_types ON products_types.products_id = products.id";
    var existsClauses = [];
    var questionMarkStrings = [];
    if (colors.length > 0) {
        for (var i = 0; i < colors.length; i++) {
            values.push(colors[i]);
            questionMarkStrings.push("?");
        }
        existsClauses.push("EXISTS (SELECT 1 FROM products_colors WHERE products_colors.colors_id IN (" + questionMarkStrings.join(",") + ") AND products.id = products_colors.products_id)");
    }
    questionMarkStrings = [];
    if (occasions.length > 0) {
        for (var i = 0; i < occasions.length; i++) {
            values.push(occasions[i]);
            questionMarkStrings.push("?");
        }
        existsClauses.push("EXISTS (SELECT 1 FROM products_occasions WHERE products_occasions.occasions_id IN (" + questionMarkStrings.join(",") + ") AND products.id = products_occasions.products_id)");
    }
    questionMarkStrings = [];
    if (product_types.length > 0) {
        for (var i = 0; i < product_types.length; i++) {
            values.push(product_types[i]);
            questionMarkStrings.push("?");
        }
        existsClauses.push("EXISTS (SELECT 1 FROM products_types WHERE products_types.product_types_id IN (" + questionMarkStrings.join(",") + ") AND products.id = products_types.products_id)");
    }
    if (existsClauses.length > 0) {
        sql += " WHERE " + existsClauses.join(" AND ");
    }
    // Add the group by clause
    sql += " GROUP BY products.id";
    sql += ";";
    //select products.id FROM products LEFT OUTER JOIN products_colors WHERE products_colors.colors_id = 1
    db.get().query(sql, values, function (err, rows) {
        if (err) return done(err);
        // console.log("result of product images fetch is " + JSON.stringify(result));
        done(null, rows);
    });
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

exports.create = function (description, price, size, color_ids, image_urls, selectedImageIndex, occasion_ids, tag_ids, type_ids, done) {
    var values = [description, price, size];
    var sql = "START TRANSACTION READ WRITE;";
    sql += "INSERT INTO products(description, price, size) VALUES (?,?,?);";

    sql += "SET @insertid = LAST_INSERT_ID();";
    for (var i = 0; i < color_ids.length; i++) {
        sql += "INSERT INTO products_colors(products_id, colors_id) VALUES (@insertid,?);";
        values.push(color_ids[i]);
    }
    for (var i = 0; i < image_urls.length; i++) {
        if (i == selectedImageIndex) {
            sql += "INSERT INTO products_images(products_id, image_url, is_default) VALUES (@insertid,?,1);";
        } else {
            sql += "INSERT INTO products_images(products_id, image_url) VALUES (@insertid,?);";
        }
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