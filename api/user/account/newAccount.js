const crypto = require('crypto');
const User = require('../model/userModel');
// Handle create user actions
exports.new = function (req, res) {
    User.find({email: req.body.email}, (err, result) => {
        if (err) console.log(err);
        if (!result[0]) {         
            const password_hash = crypto.createHash('sha512').update(req.body.password).digest("hex");
            const dataUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: password_hash,
                wallet: {
                    coin: "USD",
                    value: req.body.wallet
                },
                transactions: {},
                date: new Date
            }
        
            User.create(dataUser, (err, result) => {
                if (err) {
                    console.log(err)
                    throw err;
                } else {
                    res.json({
                        auth: true,
                        data: dataUser
                    });
                    console.log(result)
                    console.log("saved in db")
                }
            })
        } else {
            res.send({
                auth: false
            })
        }
    });
};