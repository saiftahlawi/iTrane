const TrainerModel = require('../../Models/Trainer.js')
const History=require("../../Models/History")

const saveHistory = async (str,admin) => {
 
    const history = await new History({
        admin:admin,
        action: str
    }).save()
}

exports.RemoveTrainer= async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

    var id =req.body.id
    var user = await TrainerModel.findOne({ '_id': id })
    TrainerModel.deleteOne({ _id: id }, function (err) {
        saveHistory(`Removed ${user.fullName} Succecfully`,req.body.admin)
    });
}