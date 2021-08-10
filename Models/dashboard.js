//Consts
const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
    numberOfRequests: {
        type: Number, 
        default: 0,
    },
    numberOfRegisterdTrainees: {
        type: Number, 
        default: 0
    },
    numberOfTransactions: {
        type: Number, 
        default: 0
    },
    numberOfReiectedTrainees: {
        type: Number, 
        default: 0
    }
    
})

module.exports = mongoose.model('Dashboard', DashboardSchema);