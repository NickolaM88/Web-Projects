const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        required: true
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//ig
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    description: {
        type: String,
        minLength: 10,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: [`crypto-wallet`,`credit-card`, `debit-card`, `paypal`],
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    buyers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;