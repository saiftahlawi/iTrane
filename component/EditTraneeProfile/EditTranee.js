
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
exports.EditTranee = async (req, res) => {
    //Getting fields
    const ID = req.body.ID
   


req.session.ID=req.body.ID

var User = await TraineeModel.findOne({ 'ID': req.session.ID }).select({'phoneNumber':1,'email':1,"password":1})
req.session.user=User

if(req.body.update){
    const password = req.body.password
    
    if(password==User.password){
     
        await TraineeModel.updateOne({ 'ID': req.session.ID }, {'phoneNumber':req.body.phoneNumber,'email':req.body.email}, { returnOriginal: false });
   
    }else{

        req.session.password=req.body.password
         bcrypt.hash(req.session.password, BCRYPT_SALT_ROUNDS)
        .then (hashedPassword => {
            req.session.password=hashedPassword
          
    
    }).finally(()=>{
        pas()
    })



    async  function pas (){
        if(req.session.password){
         
            await TraineeModel.updateOne({ 'ID': req.session.ID }, {'phoneNumber':req.body.phoneNumber,'email':req.body.email,"password":req.session.password});
        }
    }
   
   
    }
    

}

   
   




    if (User) {

        
            return res.json({
                "phoneNumber": req.session.user.phoneNumber,
                "email": req.session.user.email,
                "password": req.session.user.password,
            })
        
    
    }


}