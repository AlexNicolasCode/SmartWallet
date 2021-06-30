const crypto = require('crypto');
const User = require('../model/userModel');
// Handle delete user
exports.delete = function (req, res) {
    User.find({email: req.body.email}, function (err, result) {
        let password_hash = crypto.createHash('sha512').update(req.body.password).digest("hex")
        if (err) res.send(err);
        if (!result[0]) {
            res.json({
                message: "Not found"
            })
        } else if (password_hash == result[0].password && req.body.email == result[0].email) {
            User.deleteOne({email: req.body.email}, () => {
                res.json({
                    status: "success",
                    message: 'User deleted'
                });
            });
        }
    });
};