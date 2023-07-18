const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const donationSchema = new Schema({
    campaignId: {
        type: Schema.Types.ObjectId,
        ref: 'Campaign',
    },
    donorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    amount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    }
});

const Donation = model('Donation', donationSchema);

module.exports = Donation;