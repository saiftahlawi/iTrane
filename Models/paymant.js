
const mongoose = require('mongoose');
const Trainee = require('./Trainee.js') 
const Trainer = require('./Trainee.js')
var isCash;
const PaymentSchema = new mongoose.Schema({​​​​​​​​
    id: {​​​​​​​​
        type: String,
        unique: true
    }​​​​​​​​,
    paymentDetails: {​​​​​​​​
        from: Trainee, 
        to: Trainer, 
        method: String,
        time: {​​​​​​​​
            date: Date,
            default: Date.now()
        }​​​​​​​​,
    }​​​​​​​​
}​​​​​​​​)
module.exports =  db.model('Payment', PaymentSchema);



