const User = require('../models/UserModel');

// Handle view user info
exports.transactions = function (req, res) {
    User.find({email: req.body.email}, (err, result) => {
        if (err) console.log(err);
        if (!result[0]) {
            res.json({
                message: "Not transactions"
            })
        } else {
            res.json({
                message: 'transactions finded',
                data: [
                    ...result[0].transactions
                ]
            });
        }
    });
};