const User = require('../models/UserModel');
// Handle view user info
exports.wallet = function (req, res) {
    User.find({email: req.body.email}, (err, result) => {
        if (err) console.log(err);
        if (!result[0]) {
            res.json({
                message: "user not found"
            })
        } else { 
            res.json({
                coin: result[0].wallet.coin,
                wallet: result[0].wallet.value
            })
        }
    });
};