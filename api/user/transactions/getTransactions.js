const User = require('../model/userModel');

// Handle view user info
exports.transactions = function (req, res) {
    User.find({email: req.body.email}, (err, result) => {
        if (err) console.log(err);
        res.json({
            ...result[0].transactions[0] ? { data: [...result[0].transactions] } : { data: "Not Transactions Found" },
        });
    });
};