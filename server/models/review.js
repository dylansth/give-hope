const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
// const Campaign = require('./campaign');

// const User = require('./user');


const reviewSchema = new Schema({
    description: {
        type: String,
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    campaignId: {
        type: Schema.Types.ObjectId,
        ref: 'Campaign',
    },
    createdAt: {
        type: Date,
        default: Date.now,
         get: (timestamp) => dateFormat(timestamp)
    },
});

const Review = model('Review', reviewSchema);

module.exports = Review;