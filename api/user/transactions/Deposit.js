const User = require('../model/userModel');
const Transaction = require('./TransactionModel');

exports.deposit = function (req, res) {
    User.find({ email: req.body.email }, async (err, result) => {
        if (err) console.log(err);
        if (!result[0]) {
            res.json({
                message: "User Not Found"
            })
        } else {
            const transaction = {
                user: result[0].email,
                starterValue: parseFloat(result[0].wallet.value),
                depositValue: parseFloat(req.body.value),
                coin: result[0].wallet.coin, 
                value: parseFloat(result[0].wallet.value) + parseFloat(req.body.value),
                date: new Date
            }

            const userProps  = {
                firstName: result[0].firstName,
                lastName: result[0].lastName,
                email: req.body.email,
                password: result[0].password,
                wallet: {
                    coin: result[0].wallet.coin,
                    value: parseFloat(result[0].wallet.value) + parseFloat(req.body.value),
                },
                transactions: [
                    ...result[0].transactions,
                    transaction
                ]
            }

            const saveData = await User.findOne({ email: req.body.email });

            saveData.overwrite(userProps);
            await saveData.save();

            Transaction.create(transaction, (err) => {
                if (err) throw err;
                res.send({
                    message: `${result[0].wallet.coin} ${req.body.value} was been deposit in your wallet`,
                });
                console.log("saved in db")
            })
        }
    });
};