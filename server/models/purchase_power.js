const { Schema, model } = require('mongoose');


const User = require('./user');

const purPowerSchema = new Schema({
    annualSalary: {
        type: Number,
        required: true,
    },
    calcultion: {
        type: Number,
    },
    charity_portion: {
        type: Number,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});
const Purchase_power = model('Purchase_power', purPowerSchema);


module.exports = Purchase_power; 
