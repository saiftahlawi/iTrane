
const TraineeModel = require('../../Models/Trainee.js')
const TrainerModel = require('../../Models/Trainer.js')
const express = require('express')
 app = express()
const mongoose = require('mongoose');




db = 'mongodb://localhost:27017/iTrain',
    bcrypt = require('bcrypt'),
    BCRYPT_SALT_ROUNDS = 12

//Database Connections 
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true)

//cheack email
exports.checkNumber = async(req, res) => {
    //Getting fields
    const phoneNumber = req.body.phoneNumber
    const User =await TraineeModel.findOne({'phoneNumber':phoneNumber })

   if(User){
   

     
        return res.json({
                "next": false,

            })

      
        
    
}else{


    traner(phoneNumber)


       
    }





  async function traner (phoneNumber){
const Trainer =await TrainerModel.findOne({'phoneNumber':phoneNumber })

if(Trainer){
    
 
    return res.json({
        "next": false,
    })


}else{

    return res.json({
        "next": true,
    })

}

}


}


