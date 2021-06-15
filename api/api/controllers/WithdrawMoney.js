const User = require('../models/UserModel');
const Transaction = require('../models/TransactionModel');

// Handle view user info
exports.withdraw = function (req, res) {
    User.find({email: req.body.email}, (err, result) => {
        if (err) console.log(err);

        if (!result[0]) {
            res.json({
                message: "User Not Found"
            })
        } else {
            const transaction = {
                user: result[0].email,
                starterValue: result[0].wallet.value,
                withdrawValue: parseFloat(req.body.value),
                coin: result[0].wallet.coin, 
                value: parseFloat(result[0].wallet.value) - parseFloat(req.body.value),
                date: new Date
            }

            const user = {
                firstName: result[0].firstName,
                lastName: result[0].lastName,
                email: result[0].email,
                password: result[0].password,
                wallet: {
                    coin: result[0].wallet.coin, 
                    value: parseFloat(result[0].wallet.value) - parseFloat(req.body.value), 
                },
                transactions: [
                    ...result[0].transactions,
                    transaction
                ]
            }

            User.create(user, (err, result) => {
                if (err) {
                    console.log(err)
                    throw err;
                } else {
                    console.log(result)
                    console.log("saved in db")
                }
            })
            User.deleteOne({email: req.body.email}, () => {});

            Transaction.create(transaction, (err) => {
                if (err) {
                    console.log(err)
                    throw err;
                } else {
                    res.send({
                        message: `${result[0].wallet.coin} ${req.body.value} was been withdraw money`,
                    });
                    console.log("saved in db")
                }
            })
        }
    });
};