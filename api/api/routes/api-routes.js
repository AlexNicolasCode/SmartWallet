// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// All Accounts
const allAccounts = require('../controllers/allAccounts');
// CRUD
const login = require('../controllers/login');
const newAccount = require('../controllers/newAccount');
const update = require('../controllers/update');
const deleteAccount = require('../controllers/delete');
// transactions
const transactions = require('../controllers/transactions');
// wallet
const wallet = require('../controllers/wallet');
// to send money
const sendMoney = require('../controllers/sendMoney');
// to send money
const deposit = require('../controllers/Deposit');
// to send money
const withdrawMoney = require('../controllers/WithdrawMoney');
// to send money
const coin = require('../controllers/newCoin');

// User routes
router.route('/users')
    .get(allAccounts.index)
    .post(newAccount.new);
router.route('/users/login')
    .post(login.login)
    .patch(update.update)
    .put(update.update)
    .delete(deleteAccount.delete);
router.route('/users/trasactions/')
    .get(transactions.transactions)
router.route('/users/wallet/')
    .get(wallet.wallet)
    .post(coin.newCoin);
router.route('/users/withdraw-money/')
    .post(withdrawMoney.withdraw);
router.route('/users/deposit/')
    .post(deposit.deposit);
router.route('/users/sendMoney/')
    .post(sendMoney.sendMoney);
// Export API routes
module.exports = router;