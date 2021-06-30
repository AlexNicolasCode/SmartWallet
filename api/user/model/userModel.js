const mongoose = require('mongoose');
// Setup schema
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    }, 
    wallet: {
        coin: {
            type: String,
            required: false
        }, 
        value: {
            type: String,
            required: false
        }, 
    },
    transactions: {
        type: Object,
        required: false
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