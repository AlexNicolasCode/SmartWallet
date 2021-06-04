const crypto = require('crypto');
const mongoose = require('mongoose');
const uri = "mongodb-server";
const express = require('express');
const app = express();

mongoose.connect(uri, {  useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

    
// Import contact model
const User = require('../models/UserModel');
const userProp = new User();
// Handle index actions
exports.index = function (req, res) {
    User.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: contacts
        });
    });
};
// Handle create contact actions
exports.new = function (req, res) {
    const password_hash = crypto.createHash('sha512').update(req.body.password).digest("hex")
    userProp.firstName = req.body.firstName;
    userProp.lastName = req.body.lastName;
    userProp.email = req.body.email;
    userProp.password = password_hash;
    
    userProp.create((err, result) => {
        if (err) {
            console.log(err)
            throw err;
        } else {
            res.json({
                message: 'New user created!',
                data: userProp
            });
            console.log(result.ops)
            console.log("saved in db")
        }
    })
};
// Handle view contact info
exports.view = function (req, res) {
    User.findById(req.params.user_id, (err, result) => {
        if (err) console.log(err);
        console.log(result)
        res.json({
            message: 'Contact details loading..',
            data: result
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
let password_hash = crypto.createHash('md5').update(req.body.password).digest("hex")
    User.findById(req.params.user_id, function (err, contact) {
        if (err)
            res.send(err);
        userProp.firstName = req.body.firstName ? req.body.firstName : contact.firstName;
        userProp.lastName = req.body.lastName;
        userProp.email = req.body.email;
        userProp.password = password_hash;
        userProp.wallet = req.body.wallet;
        // save the contact and check for errors
        userProp.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: userProp
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    User.deleteOne({
        _id: req.params.user_id
    }, function (err, contact) {
        if (err)
            res.send(err);
            res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};