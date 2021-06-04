require('dotenv').config();
const crypto = require('crypto');
const mongoose = require('mongoose');
const uri = process.env.URI;
const express = require('express');

mongoose.connect(uri, {  useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Import user model
const User = require('../models/UserModel');
// Handle index actions
exports.index = (req, res) => {
    User.get((err, result) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: result
        });
    });
};
// Handle create user actions
exports.new = function (req, res) {
    User.find({email: req.body.email}, (err, result) => {
        if (err) console.log(err);
        const password_hash = crypto.createHash('sha512').update(req.body.password).digest("hex");
        if (!result[0]) {         
            const dataUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: password_hash
            }
        
            User.create(dataUser, (err, result) => {
                if (err) {
                    console.log(err)
                    throw err;
                } else {
                    res.json({
                        message: 'New user created!',
                        data: dataUser
                    });
                    console.log(result)
                    console.log("saved in db")
                }
            })
        } else {
            res.send({
                message: "this email already been used"
            })
        }
    });
};
// Handle view user info
exports.view = function (req, res) {
    User.find({email: req.params.user_email}, (err, result) => {
        if (err) console.log(err);

        if (!result[0]) {
            res.json({
                message: "Not found"
            })
        } else {
            let password_hash = crypto.createHash('sha512').update(req.body.password).digest("hex")
            const dataUser = {
                email: result[0].email,
                password: result[0].password
            }            
            if (password_hash == result[0].password && req.body.email == result[0].email) {
                res.json({
                    message: 'user authenticated',
                    data: dataUser
                });
            } else {
                res.send({
                    message: "user invalid"
                })
            }
        }
    });
};
// Handle update user info
exports.update = function (req, res) {
    User.find({email: req.params.user_email}, function (err, result) {
        if (err) res.send(err);
        if (!result[0]) {
            res.json({
                message: "Not found"
            })
        } else {
            let password_hash = crypto.createHash('sha512').update(req.body.password).digest("hex")
            const dataUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: password_hash
            }
            // save the user and check for errors
            User.create(dataUser, (err) => {
                    if (err)
                        res.json(err);
                    res.json({
                        message: 'User Info updated',
                        data: dataUser
                    });
                });
            }
            User.deleteOne({email: req.params.user_email}, () => {});
    });
};
// Handle delete user
exports.delete = function (req, res) {
    User.find({email: req.params.user_email}, function (err, result) {
        let password_hash = crypto.createHash('sha512').update(req.body.password).digest("hex")
        if (err) res.send(err);
        if (!result[0]) {
            res.json({
                message: "Not found"
            })
        } else if (password_hash == result[0].password && req.body.email == result[0].email) {
            User.deleteOne({email: req.params.user_email}, () => {
                res.json({
                status: "success",
                message: 'User deleted'
                });
            });
        }
    });
};