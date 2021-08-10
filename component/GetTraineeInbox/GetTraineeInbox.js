const TraineeModel = require('../../Models/Trainee.js')




exports.GetTraineeInbox = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
  
 const ID=req.body.ID
   const tranee= await TraineeModel.findOne({ ID: ID })
   if(tranee){
       
    return res.json(tranee.notifications)
   }
  
  }




