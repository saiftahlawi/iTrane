
//Consts
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    isSeen: {
        type: Boolean,
        default: false
    },

})

module.exports = mongoose.model('Notifications', NotificationSchema);