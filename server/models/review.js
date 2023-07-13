const { Schema, model } = require('mongoose');
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
        default: Date.now
    }
});

const Review = model('Review', reviewSchema);

module.exports = Review;