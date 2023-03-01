const mongoose = require('mongoose');

const withdrawalRequestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'declined'],
        default: 'pending'
    }
}, { timestamps: true });

const WithdrawalRequest = mongoose.model('WithdrawalRequest', withdrawalRequestSchema);
module.exports = WithdrawalRequest;