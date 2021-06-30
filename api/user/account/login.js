const crypto = require('crypto');
const User = require('../model/userModel');
// Handle view user info
exports.login = function (req, res) {
    User.find({email: req.body.email}, (err, result) => {
        if (err) console.log(err);
        if (!result[0]) {
            res.json({
                message: "Not found"
            })
        } else {
            const password_hash = crypto.createHash('sha512').update(req.body.password).digest("hex")
            const dataUser = {
                email: result[0].email,
                password: result[0].password
            }        
            if (password_hash == result[0].password && req.body.email == result[0].email) {
                res.json({
                    auth: true,
                    data: dataUser
                });
            } else {
                res.send({
                    auth: false
                })
            }
        }
    });
};