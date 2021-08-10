
const TraineeModel = require('../../Models/Trainee.js')
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
   


    var User = await TraineeModel.findOne({ 'ID': ID }).select({'fullName':1,'phoneNumber':1,'Endshours':1,"email":1,"TypeOfTranning":1,"isExamRequest":1,"profilePicture":1})

    if (User) {
        const hours = User.Endshours.split(':');
        const hour=parseInt(hours[0])
        
            return res.json({
                "fullName":User.fullName,
                "phoneNumber":User.phoneNumber,
                "Endshours":hour,
                "email":User.email,
                "TypeOfTranning":User.TypeOfTranning,
                "isExamRequest":User.isExamRequest,
                "profilePicture":User.profilePicture

                
            })
        
    
    }


}