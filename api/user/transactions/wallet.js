const User = require('../model/userModel');

exports.wallet = function (req, res) {
    User.find({email: req.body.email}, (err, result) => {
        if (err) console.log(err); 
        res.json({
            mensage: !result[0] ? "user not found" : `Do have you ${result[0].wallet.coin} ${result[0].wallet.value}`
        })
    });
};