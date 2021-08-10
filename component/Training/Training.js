
const TraineeModel = require('../../Models/Trainee.js')
const TrainerModel = require('../../Models/Trainer.js')
const TrainingModel=require("../../Models/Training")

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


exports.findNearest= async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
  
    try {

        traners=req.body.traners

        let trainers = await TrainerModel.find({})

        latitude= req.body.latitude
        longitude=req.body.longitude


        TraineeID=req.body.ID
     
        traneelatitude=req.body.traneelatitude
        traneelongitude=req.body.traneelongitude

        const x = trainers.filter(trainer =>{
            var m=trainer.coor.latitude+''

            m=m.substring(0, m.length - 1)

      return    m ==latitude&&trainer.coor.longitude==longitude
        })


   
        
        if (x) {
            req.session.tranerId=x[0].ID
         

if(x[0].status=="online"){
   
    await TrainerModel.updateOne({ 'ID':x[0].ID }, {"status": "Pending"})
    req.session.TraineeID=TraineeID
    TrainModel=await new TrainingModel({
        TrainerID:x[0].ID,
        TraineeID:TraineeID,
        start_latitude:latitude,
        start_longitude:longitude,
        end_latitude:traneelatitude,
        end_longitude:traneelongitude

        
    }).save()
 
}
         
            return res.json(x)
        } else {
            return res.json({
                msg: 'err'
            })
        }


        

         
    } catch (er) {
        console.error(er)
    }
}




exports.ubdateLocation= async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
    try {
        latitude= req.body.latitude
        longitude=req.body.longitude
        ID=req.body.ID
     
    
            coor= {
                latitude: latitude,
                longitude: longitude
            }
        
       
     await TrainerModel.updateOne({ 'ID':ID }, {"coor": coor})

    

         
    } catch (er) {
        console.error(er)
    }
}




exports.findRequst= async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
    try {
        ID=req.body.ID
    
        const Training =await TrainingModel.findOne({'TrainerID':ID })
 
        
if(Training){
    const tranee =await TraineeModel.findOne({'ID':Training.TraineeID })
    if(Training.response==false){
        return res.json({
            "isRequst":true,
            "tranee":tranee,
            "Next":false,
            "istotal":Training.istotal
         
        })
    }else if(Training.response==true){
        return res.json({
            "isRequst":false,
            "tranee":tranee,
            "Next":true,
            "istotal":Training.istotal
        })
    }
 
}else{
    return res.json({
        "isRequst":false,
        "Next":false,
      
    })
}
         
    } catch (er) {
        console.error(er)
    }
}




exports.TraineeCancelsTrainer = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    const TraineeID  = req.session.TraineeID
    const TrainerID  = req.session.tranerId


    const query = {
        TrainerID:TrainerID,
        TraineeID:TraineeID
    }

x= await TrainingModel.findOneAndDelete(query)

if(x){
    await TrainerModel.updateOne({ 'ID':TrainerID }, {"status": "online"})
    req.session.destroy();
    return res.json({
        "isRequst":false,
     
    })
}else{
    req.session.destroy();
    return res.json({
        "isRequst":false,
     
    })
}

}



exports.TrainerCancelsTrainee = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    const TraineeID  =req.body.TraineeID
    const TrainerID  = req.body.ID


    const query = {
        TrainerID:TrainerID,
        TraineeID:TraineeID
    }

x= await TrainingModel.findOneAndDelete(query)

if(x){
    await TrainerModel.updateOne({ 'ID':TrainerID }, {"status": "online"})
    req.session.destroy();
    return res.json({
        "isRequst":false,
     
    })
}

}




exports.TrainerAcceptsTrainee = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    const TrainerID  =  req.body.ID

    const query = {
        status: 'busy'
    }
    console.log(TrainerID)
    const Trainer = await TrainerModel.findOneAndUpdate({ ID: TrainerID }, { $set: query })
   
    if(Trainer){
        const Training =await TrainingModel.findOne({'TrainerID':TrainerID })
        await TrainingModel.updateOne({ 'TrainerID':TrainerID }, {"response": true})
        return res.json({
            "Next":true,
            "Training":Training
         
        })
    }else{
        return res.json({
            "Next":false,
         
        })
    }
}








exports.EndTraining = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    const TraineeID  =req.body.TraineeID
    const TrainerID  = req.body.ID
    const totalhours=req.body.totalhours
    const totalprice=req.body.totalprice
console.log(totalprice)
    const query = {
        TrainerID:TrainerID,
        TraineeID:TraineeID
    }
    
    const x =await TrainingModel.findOne(query)

    const hours = totalhours.split(':');
    const hour=parseInt(hours[0])
    const munit=parseInt(hours[1])

    Trainee= await TraineeModel.findOne({ 'ID':TraineeID })
    traineeHour=Trainee.Endshours
    hourTranee=traineeHour.split(':')
    Thour=parseInt(hourTranee[0])
    Tmunit=parseInt(hourTranee[1])
if(hourTranee[1]==undefined){
    total=((hour+Thour)+":"+(munit))
}else{
    total=((hour+Thour)+":"+(munit+Tmunit))
}
  

await TraineeModel.updateOne({ 'ID':TraineeID }, {"Endshours": total})


    

notification={
                
    notifications:{
        notifyDate:x.date,
        message:"your are finsh training the count of hours has been " +total+' and your price '+totalprice

    }    
        
}
await TraineeModel.updateOne({ ID: TraineeID },{$push:notification })
await TrainingModel.updateOne({ 'TrainerID':TrainerID }, {"istotal": true})


    return res.json({
        "done":true
    })


}





exports.DoneTraining = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    const TraineeID  =req.body.TraineeID
    const TrainerID  = req.body.ID


    const query = {
        TrainerID:TrainerID,
        TraineeID:TraineeID
    }




    
x= await TrainingModel.findOneAndDelete(query)


if(x){
    await TrainerModel.updateOne({ 'ID':TrainerID }, {"status": "online"})

    req.session.destroy();
    
    return res.json({
        "done":true
    })
}

}

exports.findAcecept= async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

  
    try {
        ID=req.body.ID
    
        const Training =await TrainingModel.findOne({'TraineeID':ID })
 
        
if(Training){
    const Trainer =await TrainerModel.findOne({'ID':Training.TrainerID })

    if(Training.response==false){
        return res.json({
            "isFind":false,
          "isloding":true,
          "isStart":false
         
        })
    }else if(Training.response==true){

         if(Training.isStart==true){
            return res.json({
                "isFind":false,
                "Trainer":Trainer,
                "isloding":false,
                "isStart":true
            })
    
        }else{
            return res.json({
                "isFind":true,
                "Trainer":Trainer,
                "isloding":false,
                "isStart":false
            })
        }

    }else{
        return res.json({
            "isFind":false,
            "isloding":false,
            "isStart":false,
            "isFinish":true
        })
    }
 
}else{
    return res.json({
        "isFind":false,
        "isloding":false,
        "mssege":"there is no driver nearest"
      
    })
}
         
    } catch (er) {
        console.error(er)
    }
}



exports.startTrining = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    const TraineeID  =req.body.TraineeID
    const TrainerID  = req.body.ID


await TrainingModel.updateOne({ 'TrainerID':TrainerID,'TraineeID':TraineeID }, {"isStart": true})

return res.json({
    "done":true
})

}