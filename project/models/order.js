var db = require('../db.js');
var squel = require("squel");
var tableName = "orders";
var tableColumns = ["id", "users_id", "products_id", "quantity", "name", "phone", "email", "address", "message"];

exports.get = function (id, done) {
    var sql = squel.select()
        .from(tableName);
    if (id != null && !isNaN(id)) {//qualifies if id != "" and id!=null and id is a number
        sql.where("id = " + id);
    }
    //console.log("sql for Approval get is " + sql);
    db.get().query(sql.toString(), function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.getByUser = function (users_id, done) {
    var sql = squel.select()
        .from(tableName);
    if (users_id != null && !isNaN(users_id)) {//qualifies if color != "" and color!=null
        sql.where("users_id = " + users_id);
    }
    //console.log("sql for Approval getByName is " + sql);
    db.get().query(sql.toString(), function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.getByProduct = function (products_id, done) {
    var sql = squel.select()
        .from(tableName);
    if (products_id != null && !isNaN(products_id)) {//qualifies if color != "" and color!=null
        sql.where("products_id = " + products_id);
    }
    //console.log("sql for Approval getByName is " + sql);
    db.get().query(sql.toString(), function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
};

exports.create = function (users_id, products_id, quantity, name, phone, email, address, message, done) {
    var insertColumns = tableColumns.slice(1, tableColumns.length);
    var values = [users_id, products_id, quantity, name, phone, email, address, message];
    var sql = squel.insert()
        .into(tableName);
    for (var i = 0; i < insertColumns.length; i++) {
        sql.set(insertColumns[i], "?", {dontQuote: true});
    }
    //console.log("The Approval update SQL query is " + sql.toString());
    db.get().query(sql.toString(), values, function (err, result) {
        if (err) return done(err);
        done(null, result.insertId);
    });
};

exports.update = function (id, users_id, products_id, quantity, name, phone, email, address, message, done) {
    var updateColumns = tableColumns.slice(1, tableColumns.length);
    var values = [users_id, products_id, quantity, name, phone, email, address, message];
    var sql = squel.update()
        .table(tableName);
    for (var i = 0; i < updateColumns.length; i++) {
        sql.set(updateColumns[i], "?", {dontQuote: true});
    }
    sql.where(tableColumns[0] + " = " + id);
    //console.log("The Approval update SQL query is " + sql.toString());
    db.get().query(sql.toString(), values, function (err, result) {
        if (err) return done(err);
        done(null, result.changedRows);
    });
};

exports.delete = function (id, done) {
    var sql = squel.delete()
        .from(tableName)
        .where(tableColumns[0] + " = " + id);
    //console.log("The Approval delete SQL query is " + sql.toString());
    db.get().query(sql.toString(), function (err, result) {
        if (err) return done(err);
        done(null, result.affectedRows);
    });
};