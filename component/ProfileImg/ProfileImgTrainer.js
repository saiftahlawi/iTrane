const TrainerModel = require('../../Models/Trainer.js')

exports.ProfileImgTrainer= async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
  
    const id = req.body.ID
    const img= req.body.imgP
    console.log(id)
    console.log(img)

    
    var query = { profilePicture:img }
    await TrainerModel.findOneAndUpdate({ ID: id }, { $set: query }, () => {
      console.log('updated')
    })
  
  
    return res.json({
      "massege":"Done",
     
  
      
  })
  
  }