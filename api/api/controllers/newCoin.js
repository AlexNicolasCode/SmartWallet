const User = require('../models/UserModel');
const Rates = require('../models/ratesModel');

// Handle view user info
exports.newCoin = function (req, res) {
    console.log(req.body.email)
    User.find({email: req.body.email}, (err, result) => {
        if (err) console.log(err);

        if (!result[0]) {
            res.json({
                message: "No user found"
            })
        } else { 
            if (req.body.coin == "EUR" || req.body.coin == "USD" || req.body.coin == "BRL") {
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
                    
                    User.deleteOne({email: result[0].email}, function(err, result) {
                        if (err) console.log(err);
                      });
                    User.create(userProps, (err, result) => {
                        if (err) {
                            console.log(err)
                            throw err;
                        } else {
                            res.send({
                                message: 'new coin defined',
                            });
                            console.log(result)
                            console.log("saved in db")
                        }
                    })
                })
            }
        }
    });
};