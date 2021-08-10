//Consts
const mongoose = require('mongoose');



const TrainerSchema = new mongoose.Schema({
ID: {
type: Number
},
fullName: {
type: String,
},
email: {
type: String,
},
profilePicture: {
    type: String,
  
},
password: {
type: String,
},
phoneNumber: {
type: Number,
},
viechaleRegistraionPlate: {
type: String,
},
city: {
type: String
},
registerDate: {
type: Date, 
default: Date.now()
},
gearType: {
    type: String, 
    },
    coor: {
        latitude: {
            type:String ,
            default:'0'
        }, 
        longitude: {
            type:String,
            default:'0'
        }
    },
    status:{
        type:String,
        default:"offline"
    }
})

module.exports = mongoose.model('Trainer', TrainerSchema);