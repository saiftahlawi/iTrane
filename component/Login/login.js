
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

//Register
exports.Login = async(req, res) => {
    //Getting fields
    const ID = req.body.ID
const password=req.body.password
    const User =await TraineeModel.findOne({'ID':req.body.ID })
   if(User){
    if(User.isActive==true){
    //Decrypting and saving to DB
    const validPassword = await bcrypt.compare(password, User.password);

        if (validPassword) {
      
            return res.json({
                "status": true,
                "ID":ID,
                "userType":"Trainee",
                "TypeOfTranning":User.TypeOfTranning
            })

        } else {
            return res.json({
                "status": false,
                "err":"user not found please check your id and password "
            })
        }
    
}else if(User.isActive==false){
    return res.json({
        "status": false,
        "err":"The request is pending approvals by admins, please try again later"
    })

}

}else{


    traner(ID,password)


       
    }





    async function traner (ID,password){
const Trainer =await TrainerModel.findOne({'ID':ID })

if(Trainer){
    const validPassword = await bcrypt.compare(password, Trainer.password);
if(validPassword){

    await TrainerModel.updateOne({ 'ID':ID }, {"status": "online"})

    return res.json({
        "status": true,
        "ID":ID,
        "userType":"Trainer",
        "TypeOfTranning":Trainer.gearType
    })
}else{
    return res.json({
        "status": false,
        "err":"user not found please check your id and password "
    })
}

}else{
    return res.json({
        "status": false,
        "err":"user not found please check your id and password "
    })
}
}


}


