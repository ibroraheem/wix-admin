const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    otp: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    },
    access: {
        type: Boolean,
        default: true
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        default: 'passenger'
    },
    averageRating: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    home: {
        type: String,
        default: ''
    },
    favouritePlace: {
        type: String,
        default: ''
    },
    subscriptions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
    }],

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;

