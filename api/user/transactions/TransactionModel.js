const mongoose = require('mongoose');
// Setup schema
const transactionSchema = mongoose.Schema({
    user: {
        type: String,
        required: false
    },
    fromUser: {
        type: String,
        required: false
    },
    targetUser: {
        type: String,
        required: false
    },
    starterValue: {
        type: Number,
        required: false
    }, 
    withdrawValue: {
        type: Number,
        required: false
    }, 
    depositValue: {
        type: Number,
        required: false
    }, 
    coin: {
        type: String,
        required: false    
    },
    value: {
        type: Number,
        required: false        
    },
    create_date: {
        type: Date,
        default: Date.now
    },
});

// Export Contact model
const Transaction = module.exports = mongoose.model('transactions', transactionSchema);
module.exports.get = function (callback, limit) {
    Transaction.find(callback).limit(limit);
}