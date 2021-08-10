
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
exports.checkEmail = async(req, res) => {
    //Getting fields
    const Email = req.body.email.toLowerCase()
    const User =await TraineeModel.findOne({'email':Email })

   if(User){
   

     
        return res.json({
                "next": false,

            })

      
        
    
}else{


    traner(Email)


       
    }





  async function traner (Email){
const Trainer =await TrainerModel.findOne({'email':Email })
console.log(Trainer)

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


