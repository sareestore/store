var express = require('express');
var router = express.Router();
var async = require('async');
var Email_Token = require('../models/email_token.js');
var Password_token = require('../models/password_change_request.js');
var User = require('../models/User_Mysql');
var Product = require('../models/Product');
var Product_type = require('../models/product_type');
var Occasion = require('../models/occasion');
var Color = require('../models/color');
var Product_Tag = require('../models/tag');

var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

router.get('/', function (req, res) {
    res.redirect('/shop');
});

router.get('/about', function (req, res) {
    res.render('about');
});

router.get('/contact', function (req, res) {
    res.render('contact');
});

router.get('/signupemailsent', function (req, res) {
    res.render('signupemailsent');
});

router.get('/home', function (req, res) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    res.render('home', {user: req.user});
});

router.get('/admin', function (req, res) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    res.render('admin', {user: req.user});
});

router.get('/shop', function (req, res, next) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    var occasions = req.query.occasions;
    if (typeof occasions == "undefined") {
        occasions = [];
    } else if (!(occasions.constructor === Array)) {
        occasions = [occasions];
    }
    var colors = req.query.colors;
    if (typeof colors == "undefined") {
        colors = [];
    } else if (!(colors.constructor === Array)) {
        colors = [colors];
    }
    var product_types = req.query.product_types;
    if (typeof product_types == "undefined") {
        product_types = [];
    } else if (!(product_types.constructor === Array)) {
        product_types = [product_types];
    }
    async.waterfall([
        function (callback) {
            var filters = {occasions: occasions, colors: colors, product_types: product_types};
            Product.get(filters, function (err, products) {
                if (err) {
                    return callback(err);
                }
                callback(null, products);
            });
        },
        function (productsIn, callback) {
            // productsIn now equals products
            Product_type.get(null, function (err, product_types) {
                if (err) {
                    return callback(err);
                }
                callback(null, productsIn, product_types);
            });
        },
        function (productsIn, product_typesIn, callback) {
            Occasion.get(null, function (err, occasions) {
                if (err) {
                    return callback(err);
                }
                callback(null, productsIn, product_typesIn, occasions);
            });
        },
        function (productsIn, product_typesIn, occasionsIn, callback) {
            Color.get(null, function (err, colors) {
                if (err) {
                    return callback(err);
                }
                callback(null, productsIn, product_typesIn, occasionsIn, colors);
            });
        }
    ], function (err, productsIn, product_typesIn, occasionsIn, colorsIn) {
        // result now equals 'done'
        if (err) {
            return next(err);
        }
        res.render('shop', {
            user: req.user,
            products: productsIn,
            product_types: product_typesIn,
            occasions: occasionsIn,
            colors: colorsIn,
            selected_colors: colors,
            selected_occasions: occasions,
            selected_product_types: product_types
        });
    });
});

router.get('/item', function (req, res, next) {
    var itemId = req.query.id;
    if (itemId == null) {
        return res.redirect('/shop');
    }
    Product.getById(itemId, function (err, products) {
        if (err) {
            return next(err);
        } else if (products.length == 0) {
            return next(new Error("No product with this id"));
        }
        var product = products[0];
        if (product.image_urls == null) {
            product.image_urls = [];
        } else {
            product.image_urls = products[0].image_urls.split(',');
        }
        if (product.image_url == null) {
            product.image_url = product.image_urls[0];
        }
        res.render('item', {
            user: req.user,
            product: product
        });
    });
});

router.get('/edit_item', function (req, res, next) {
    var itemId = req.query.id;
    if (itemId == null || typeof req.user == "undefined" || req.user == null || req.user.username != "admin") {
        return res.redirect('/shop');
    }
    async.waterfall([
        function (callback) {
            Product.getById(itemId, function (err, products) {
                if (err) {
                    return callback(err);
                }
                var product = products[0];
                if (product.image_urls == null) {
                    product.image_urls = [];
                } else {
                    product.image_urls = products[0].image_urls.split(',');
                }
                if (product.image_url == null) {
                    product.image_url = product.image_urls[0];
                }
                callback(null, product);
            });
        },
        function (productsIn, callback) {
            // productsIn now equals products
            Product_type.get(null, function (err, product_types) {
                if (err) {
                    return callback(err);
                }
                callback(null, productsIn, product_types);
            });
        },
        function (productsIn, product_typesIn, callback) {
            Occasion.get(null, function (err, occasions) {
                if (err) {
                    return callback(err);
                }
                callback(null, productsIn, product_typesIn, occasions);
            });
        },
        function (productsIn, product_typesIn, occasionsIn, callback) {
            Color.get(null, function (err, colors) {
                if (err) {
                    return callback(err);
                }
                callback(null, productsIn, product_typesIn, occasionsIn, colors);
            });
        },
        function (productsIn, product_typesIn, occasionsIn, colorsIn, callback) {
            Product_Tag.get(null, function (err, tags) {
                if (err) {
                    return callback(err);
                }
                callback(null, productsIn, product_typesIn, occasionsIn, colorsIn, tags);
            });
        }
    ], function (err, productsIn, product_typesIn, occasionsIn, colorsIn, tagsIn) {
        // result now equals 'done'
        if (err) {
            return next(err);
        }
        res.render('edit_item', {
            //stub
            user: req.user,
            product: productsIn,
            product_types: product_typesIn,
            occasions: occasionsIn,
            colors: colorsIn,
            tags: tagsIn
        });
    });
});

router.get('/frgtpass', function (req, res) {
    res.render('frgtpass');
});

router.get('/verify', function (req, res, next) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    var responseData = {user: req.user};

    var target_email_id = req.user.emailid;

    if (typeof target_email_id == 'undefined') {
        target_email_id = [];
    }

    //Now get the user token from token table
    Email_Token.getByUserId(req.user.id, function (err, tokenRows) {
        if (err) {
            return next(err);
        }

        var token = tokenRows[0].token;
        //Now token is obtained
        console.log("Token obtained for email sending is " + token);
        // api key https://sendgrid.com/docs/Classroom/Send/api_keys.html
        var options = {
            auth: {
                api_key: process.env.sendgridkey
            }
        };

        var mailer = nodemailer.createTransport(sgTransport(options));

        var email = {
            to: [target_email_id],
            from: 'info@injectsolar.com',
            subject: 'User Email Verification',
            text: 'Via Sendgrid',
            html: "Click the following link to verify the mail <br> " + "abc.com/verifytoken?token=" + token
        };

        mailer.sendMail(email, function (err, response) {
            if (err) {
                //console.log(err);
                return next(err);
            }

            //console.log(res);
            res.json({"response": response});
        });
    });


});

router.get("/verifytoken", function (req, res, next) {
    var token = req.query.token;
    // get the user by token and then if the user is present, mark the user as verified via email
    Email_Token.getByToken(token, function (err, tokenRows) {
        if (err) {
            return next(err);
        }
        // rows will be like [{"id":2,"users_id":7,"token":"e3acd91b03ec3a2223d7fe90884d236f6c87f4c1","expires_at":"2016-11-23T13:37:32.000Z","created_at":"2016-11-22T13:37:32.000Z"}]

        // get the user by users_id
        if (!(tokenRows.length > 0 && tokenRows[0].users_id != undefined)) {
            res.json({message: "user was not found by this token to verify"});
            return;
        }
        User.get(tokenRows[0].users_id, function (err, users) {
            if (err) {
                return next(err);
            }
            // rows will be like [{"id":7,"username":"sudhir","emailid":"nagasudhirpulla@gmail","password":"abc123","fname":"NA","lname":"NA","phone":"NA","address":"NA","created_at":"2016-11-22T13:37:32.000Z","updated_at":"2016-12-04T06:35:47.000Z","is_verified":0}]
            // console.log("users rows are " + JSON.stringify(users));

            if (users.length == 0) {
                res.json({message: "No user was associated with this token"});
                return;
            }
            if (users[0].is_verified == 1) {
                res.json({message: "The user is already verified via email"});
                return;
            }

            User.updateIsVerifiedValue(users[0].id, 1, function (err, result) {
                if (err) {
                    return next(err);
                }
                //console.log("result of user update verified is " + JSON.stringify(result));
                res.json({message: "The user is verified via email"});
            });
        });
    });
});

router.post('/forgot', function (req, res, next) {
    var target_email_id = req.body.email;
    console.log("email for forgot password is " + target_email_id);
    if (typeof target_email_id == 'undefined' || target_email_id == null) {
        res.render('frgtpass.ejs', {message: "No emailId received at the server"});
        return;
    }

    // Get the user by email id
    User.getByEmail(target_email_id, function (err, users) {
        if (err) {
            return next(err);
        }

        if (users.length == 0) {
            res.render('frgtpass.ejs', {message: "No user exists with this email Id"});
            return;
        }

        var user_id = users[0].id;

        // Create an entry in password_change_requests table
        Password_token.create(user_id, function (err, tokenRowId, token) {
            console.log("Token obtained for password reset email sending is " + token);
            var options = {
                auth: {
                    api_key: process.env.sendgridkey
                }
            };
            var mailer = nodemailer.createTransport(sgTransport(options));

            var email = {
                to: [target_email_id],
                from: 'info@injectsolar.com',
                subject: 'Password Reset Request',
                text: 'Via Sendgrid',
                html: "Click the following link to reset your password <br> " + "abc.com/resetpassword?token=" + token
            };
            //stub
            mailer.sendMail(email, function (err, response) {
                if (err) {
                    //console.log(err);
                    return next(err);
                }
                res.render('frgtpass.ejs', {"message": JSON.stringify(response)});
            });
        });
    });
});

router.get('/resetpassword', function (req, res) {
    res.render('emailpassreset', {token: req.query.token});
});

router.post("/resetpassword", function (req, res, next) {
    var token = req.body.token;
    var newPassword = req.body.newpassword;
    if (newPassword != req.body.newpasswordconfirm) {
        res.json({message: "password and confirm password fields do not match"});
        return;
    }
    // get the user by token and then if the user is present, then show them the password reset screen
    Password_token.getByToken(token, function (err, tokenRows) {
        if (err) {
            return next(err);
        }
        // rows will be like [{"users_id":7,"token":"e3acd91b03ec3a2223d7fe90884d236f6c87f4c1","time":"2016-11-23T13:37:32.000Z"}]

        // get the user by users_id
        if (!(tokenRows.length > 0 && tokenRows[0].users_id != undefined)) {
            res.json({message: "No user found by this token to reset the password"});
            return;
        }
        // checking the token expiration
        var dateDiff = (new Date()).getTime() - (new Date(tokenRows[0].time)).getTime();
        if (dateDiff > 0) {
            res.json({message: "This password reset link was expired " + Math.round(dateDiff / (10 * 3600 * 24)) / 100 + " days ago..."});
            return;
        }
        User.get(tokenRows[0].users_id, function (err, users) {
            if (err) {
                return next(err);
            }
            // rows will be like [{"id":7,"username":"sudhir","emailid":"nagasudhirpulla@gmail","password":"abc123","fname":"NA","lname":"NA","phone":"NA","address":"NA","created_at":"2016-11-22T13:37:32.000Z","updated_at":"2016-12-04T06:35:47.000Z","is_verified":0}]
            // console.log("users rows are " + JSON.stringify(users));
            if (users.length == 0) {
                res.json({message: "The user does not exist. So password reset cannot be done"});
                return;
            }
            if (users[0].password == newPassword) {
                res.json({message: "You chose to continue with your previous password"});
                return;
            }

            User.updatePassword(users[0].id, newPassword, function (err, result) {
                if (err) {
                    return next(err);
                }
                //console.log("result of user update verified is " + JSON.stringify(result));
                res.json({message: "The password is updated successfully..."});
            });
        });
    });
});

module.exports = router;