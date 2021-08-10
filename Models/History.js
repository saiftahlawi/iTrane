//Consts
const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    Date: {
        type: Date, 
        default: Date.now()
    },
    admin: {
        type: String,
    }, 
    action: {
        type: String
    },
    
})

module.exports = mongoose.model('History', HistorySchema);