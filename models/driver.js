const mongoose = require('mongoose');

const driverSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    stateOfOrigin: {
        type: String,
    },
    lga: {
        type: String,

    },
    country: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    driversLicense: {
        type: String,
    },
    paymentDetails: {
        accountName: {
            type: String,
        },
        accountNumber: {
            type: String,
        },
        bankName: {
            type: String,
        },
    },
    licenseNumber: {
        type: String,
    },
    plateNumber: {
        type: String,

    },
    vehicleDetails: {
        manufacturer: {
            type: String,
        },
        model: {
            type: String,
        },
        year: {
            type: String,
        },
        color: {
            type: String,
        },
        licensePlate: {
            type: String,
        },
        vehicleAC: {
            type: Boolean,
        },
        vehiclePhoto: {
            type: String,
        },
    },
    role: {
        type: String,
        default: 'driver'
    },
    passwordResetOTP: {
        type: String,
        default: null
    },
    rating: {
        rating: {
            type: Number,
            enum: [1, 2, 3, 4, 5]
        },
        comment: {
            type: String,
            default: ''
        },
        passengerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
    }
}, { timestamps: true });

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;