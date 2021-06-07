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

// User routes
router.route('/users')
    .get(allAccounts.index)
    .post(newAccount.new);
router.route('/users/:user_email')
    .post(login.login)
    .patch(update.update)
    .put(update.update)
    .delete(deleteAccount.delete);
router.route('/users/trasactions/:user_email')
    .get(transactions.transactions)
    .post(transactions.newTransactions);
router.route('/users/wallet/:user_email')
    .get(wallet.wallet)
    .post(wallet.newCoin);
router.route('/users/sendMoney/:user_email')
    .post(sendMoney.sendMoney);
// Export API routes
module.exports = router;