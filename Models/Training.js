const mongoose = require('mongoose');
const TrainingSchema = new mongoose.Schema({
        TrainerID: {
            type: String,
            default: null
        }, 
        TraineeID: {
            type: String
        }, 
        date: {
            type: Date, 
            default: Date.now()
        },
         response: {
            type: Boolean,
            default: false
        },
    start_latitude:{
        type: String
    } ,
    start_longitude:{
        type: String
    },
    end_latitude:{
        type: String
    },
    end_longitude:{
        type: String
    },
    isStart:{
        type: Boolean,
        default: false
    }
    ,
    istotal:{
        type: Boolean,
        default: false
    }

      


})
module.exports =  mongoose.model('TrainingSchema', TrainingSchema);