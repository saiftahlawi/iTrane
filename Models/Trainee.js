//Consts
const mongoose = require('mongoose');
const { notify } = require('../routes/Routes');
const TraineeSchema = new mongoose.Schema({
    ID: {
        type: String, 
    },
    fullName: {
        type: String, 
        min: 18
    }, 
    password: {
        type: String,
        min: 8,
    }, 
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    nationality: {
        type: String,
    },
    Address: {
        type: String,
    },
    city:{
        type: String,
    },
    profilePicture: {
        type: String,
      
    },
    frontID: {
        type: String,
    },
    RearID: {
        type: String,
    },
    paymentMethod: {
        type: String
    },
    TypeOfTranning: {
        type: String
    },
    DOB: {
        type: String
    },
    Endshours:{
        type: String
    },
    GearType: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isExamRequest: {
        type: Boolean, 
        default: false
    },
    exam: {
        isApproved: {
            type: Boolean,
        },
        date: {
            type: Date, 
            default: null,
        }, 
        isSucceeded: {
            type: Boolean,
        },
        message: {
            type: String,
        }
    },
    notifications:[

{
    notifyDate: {
        type: Date,
    
        },
        message: {
            type: String,
          
            }
}

        
     

            ]
})
module.exports =  mongoose.model('Trainee', TraineeSchema);