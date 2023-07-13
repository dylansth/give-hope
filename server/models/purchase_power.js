const { Schema, model } = require('mongoose');


const User = require('./user');

const purPowerSchema = new Schema({

    // we will get this value from user
    // annualSalary: {
    //     type: Number,
    //     required: true,
    // },
    charity_portion: {
        // type: Number,should be a string because we gonna use % 
           type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});
const Purchase_power = model('Purchase_power', purPowerSchema);


module.exports = Purchase_power; 
