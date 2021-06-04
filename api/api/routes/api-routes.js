// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import contact controller
var controler = require('../controllers/Controller');
// Contact routes
router.route('/users')
    .get(controler.index)
    .post(controler.new);
router.route('/users/:user_id')
    .get(controler.view)
    .patch(controler.update)
    .put(controler.update)
    .delete(controler.delete);
// Export API routes
module.exports = router;