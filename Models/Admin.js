const mongoose = require('mongoose')
const { Schema } = mongoose

const AdminSchema = new Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }, 
    adminType: {
        type: String, 
        default: 'Sub Admin'
    },
    phoneNumber: {
        type: String
    },
    date: {
        type: Date, 
        default: Date.now()
    }
})

module.exports = mongoose.model('Admin', AdminSchema)