const User = require('../model/userModel');
const Rates = require('../../rates/ratesModel');

exports.newCoin = function (req, res) {
    User.find({email: req.body.email}, (err, result) => {
        if (err) console.log(err);

        if (!result[0]) {
            res.json({
                message: "No user found"
            })
        } else { 
            Rates.find({from: result[0].wallet.coin, to: req.body.coin}, (err, rate) => {
                if (err) console.log(err)
                const userProps = {
                    firstName: result[0].firstName,
                    lastName: result[0].lastName,
                    email: result[0].email,
                    password: result[0].password,
                    wallet: {
                        coin: req.body.coin,
                        value: parseFloat(result[0].wallet.value) * parseFloat(rate[0].rate)
                    },
                    transaction: [
                        result[0].transactions,
                    ]
                }        
                
                User.deleteOne({email: result[0].email}, function(err) { if (err) console.log(err);});
                User.create(userProps, (err, result) => {
                    if (err) throw err;
                    res.send({
                        message: 'new coin defined',
                    });
                    console.log(result)
                    console.log("saved in db")
                })
            })
        }
    });
};