const mongoose = require('mongoose');
// Setup schema
const ratesModel = mongoose.Schema({
    from: {
        type: String,
        required: false
    },
    to: {
        type: String,
        required: false
    },
    rate: {
        type: String,
        required: false
    },
});

// Export Contact model
const Rate = module.exports = mongoose.model('rates', ratesModel);
module.exports.get = function (callback, limit) {
    Rate.find(callback).limit(limit);
}