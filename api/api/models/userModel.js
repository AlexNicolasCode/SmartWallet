const mongoose = require('mongoose');
// Setup schema
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    wallet: {
        type: Number,
        required: true
    }, 
    transactions: {
        type: Object,
        required: true
    }, 
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export Contact model
const User = module.exports = mongoose.model('users', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}