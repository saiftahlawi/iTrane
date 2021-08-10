
const TraineeModel = require('../../Models/Trainee.js')
const TrainerModel = require('../../Models/Trainer.js')
const express = require('express')
 app = express()
const mongoose = require('mongoose');
var session = require('express-session');


db = 'mongodb://localhost:27017/iTrain',
    bcrypt = require('bcrypt'),
    BCRYPT_SALT_ROUNDS = 12

//Database Connections 
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true)

//session
app.use(session({ secret: '.',resave:false,saveUninitialized:true}))

//Register
exports.UpdatePassword = async (req, res) => {
    //Getting fields
    const ID = req.body.ID
    session.password = req.body.password

    
   
bcrypt.hash( session.password, BCRYPT_SALT_ROUNDS)
.then (hashedPassword => {
    session.password=hashedPassword
  

}).finally(()=>{
pas()
})
   

async  function pas (){
    if( session.password){
        var User = await TraineeModel.findOne({ 'ID': ID })
       

if(User){
    await TraineeModel.updateOne({ 'ID':ID }, {"password": session.password});
    session.password=null
    return res.json({
        "status": true,
    })
}else{
   await TrainerModel.updateOne({ 'ID':ID }, {"password": session.password});
    session.password=null
    return res.json({
        "status": true,
    })
}
          
   
    }else{



        return res.json({
            "status": false,
            "err":"invalid Code "
        })
    }



}


   
   
   
    
    

}

   
   




  


