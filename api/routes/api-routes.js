let router = require('express').Router();
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

const allAccounts = require('../user/account/allAccounts');
const login = require('../user/account/login');
const newAccount = require('../user/account/newAccount');
const update = require('../user/account/update');
const deleteAccount = require('../user/account/delete');

router.route('/users')
    .get(allAccounts.index)
    .post(newAccount.new)
    .put(update.update)
    .patch(update.update)
    .delete(deleteAccount.delete);
router.route('/users/login')
    .post(login.login);

const transactions = require('../user/transactions/getTransactions');
const wallet = require('../user/transactions/wallet');
const sendMoney = require('../user/transactions/sendMoney');
const deposit = require('../user/transactions/Deposit');
const withdrawMoney = require('../user/transactions/WithdrawMoney');
const coin = require('../user/transactions/newCoin');

router.route('/users/trasactions/')
    .post(transactions.transactions)
router.route('/users/wallet/')
    .post(wallet.wallet)
router.route('/users/new-default-coin/')
    .post(coin.newCoin);
router.route('/users/withdraw-money/')
    .post(withdrawMoney.withdraw);
router.route('/users/deposit/')
    .post(deposit.deposit);
router.route('/users/sendMoney/')
    .post(sendMoney.sendMoney);

module.exports = router;