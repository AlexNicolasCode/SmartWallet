const crypto = require('crypto');
const User = require('../model/userModel');
// Handle update user info
exports.update = function (req, res) {
    User.find({email: req.body.email}, function (err, result) {
        if (err) res.send(err);
        if (!result[0]) {
            res.json({
                message: "Not found"
            })
        } else {
            let password_hash = crypto.createHash('sha512').update(req.body.password).digest("hex")
            const dataUser = {
                firstName: req.body.firstName ?? result[0].firstName,
                lastName: req.body.lastName ?? result[0].firstName,
                email: req.body.email ?? result[0].firstName,
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
            User.deleteOne({email: req.body.email}, () => {});
        }
    });
};