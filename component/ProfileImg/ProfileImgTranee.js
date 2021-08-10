const TraineeModel = require('../../Models/Trainee.js')

exports.ProfileImgTranee= async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
  
    const id = req.body.ID
    const img= req.body.imgP


    
    var query = { profilePicture:img }
    await TraineeModel.findOneAndUpdate({ ID: id }, { $set: query }, () => {
      console.log('updated')
    })
  
  
    return res.json({
      "massege":"Done",
     
  
      
  })
  
  }