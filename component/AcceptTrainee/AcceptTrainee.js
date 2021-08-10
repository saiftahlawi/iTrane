
const TraineeModel = require('../../Models/Trainee.js')
const HistoryModel=require("../../Models/History")

const saveHistory = async (str) => {
    const history = await new HistoryModel({
        admin: 'Admin',
        action: str
    }).save()
}

exports.AcceptTrainee=async (req, res)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
    const { id } = req.body
    var query = {isActive: true}
    var user = await TraineeModel.findOne({ '_id': id })
    await TraineeModel.findOneAndUpdate({ _id: id }, { $set: query }, ()=> {
        console.log('updated')
    })
    saveHistory(`Trainee ${user.fullName} has been accepted.`)
}