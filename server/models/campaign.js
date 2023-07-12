const { Schema, model } = require('mongoose');
const Review = require('./review');

const campaignSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetAmount: {
        type: Number,
    },
    currentAmount: {
        type: Number,
    },
    endDate: {
        type: Date,
    },
    donations: [{
        type: Schema.Types.ObjectId,
        ref: 'Campaign'
    }],
    createdAt: {
        type: Date,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

const Campaign = model('Campaign', campaignSchema);

module.exports = Campaign;