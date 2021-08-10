const TrainerModel = require('../../Models/Trainer.js')

exports.Logout = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    const TrainerID  =  req.body.ID
console.log(TrainerID)
    const query = {
        status: 'offline'
    }

    console.log(TrainerID)

    const Trainer = await TrainerModel.findOneAndUpdate({ ID: TrainerID }, { $set: query })
   
    if(Trainer){

        return res.json({
            "Next":true,
            
        })

    }else{
        return res.json({
            "Next":true,
         
        })
    }
}
