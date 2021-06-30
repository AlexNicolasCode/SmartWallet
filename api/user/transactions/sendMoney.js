const User = require('../model/userModel');
// Handle view user info
exports.sendMoney = function (req, res) {
    User.find({email: req.params.user_email}, (err, result) => {
        if (err) console.log(err);

        if (!result[0]) {
            res.json({
                message: "Not transactions"
            })
        } else {
            const transaction = {
                from: req.params.user_email,
                to: req.body.targetUser,
                date: new Date,
                value: req.body.value
            }

            const fromUser = {
                firstName: result[0].firstName,
                lastName: result[0].lastName,
                email: result[0].email,
                password: result[0].password,
                wallet: parseInt(result[0].wallet) - parseInt(req.body.value),
                transaction: [
                    result[0].transactions,
                    transaction
                ]
            }     

            User.create(user, (err, result) => {
                if (err) {
                    console.log(err)
                    throw err;
                } else {
                    res.json({
                        message: 'new transaction',
                    });
                    console.log(result)
                    console.log("saved in db")
                }
            })

            User.find({email: req.body.targetUser}, (err, result) => {
                if (err) console.log(err);

                if (!result[0]) {
                    res.json({
                        message: "Not transactions"
                    })
                } else {
                    const targetUser = {
                        firstName: result[0].firstName,
                        lastName: result[0].lastName,
                        email: result[0].email,
                        password: result[0].password,
                        wallet: parseInt(result[0].wallet) + parseInt(req.body.value),
                        transaction: [
                            result[0].transactions,
                            transaction
                        ]
                    }        

                    User.create(targetUser, (err, result) => {
                        if (err) {
                            console.log(err)
                            throw err;
                        } else {
                            res.json({
                                message: 'new transaction',
                            });
                            console.log(result)
                            console.log("saved in db")
                        }
                    })
        
                    res.json({
                        message: 'transactions finded',
                        data: result[0].transactions
                    });
                }
            })

        }
    });
};