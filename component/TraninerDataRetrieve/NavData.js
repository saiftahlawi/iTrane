const TrainerModel = require('../../Models/Trainer.js')
const express = require('express')
 app = express()
const session = require('express-session')
const mongoose = require('mongoose');
const { json } = require('body-parser');



db = 'mongodb://localhost:27017/iTrain',
    bcrypt = require('bcrypt'),
    BCRYPT_SALT_ROUNDS = 12

//Database Connections 
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true)
//session
app.use(session({ secret: '.',resave:false,saveUninitialized:true}))
//Register
exports.NavRetreve = async (req, res) => {
    //Getting fields
    const ID = req.body.ID
   


    var User = await TrainerModel.findOne({ 'ID': ID }).select({'fullName':1,'phoneNumber':1,"email":1,"gearType":1,"profilePicture":1})

    if (User) {

        
            return res.json({
                "fullName":User.fullName,
                "phoneNumber":User.phoneNumber,
                "email":User.email,
                "gearType":User.gearType,
                "TypeOfTranning":User.gearType,
                "profilePicture":User.profilePicture
                
            })
        
    
    }


}