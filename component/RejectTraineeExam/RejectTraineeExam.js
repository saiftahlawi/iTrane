const TraineeModel = require('../../Models/Trainee.js')
const HistoryModel = require("../../Models/History")


const saveHistory = async (str, admin) => {
    const history = await new HistoryModel({
        admin: 'Admin',
        action: admin
    }).save()
}
exports.RejectTraineeExam = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    const id = req.body.id
    const reasonTab = req.body.reasonTab
    const admin = req.body.admin
    var user = await  TraineeModel.findOne({ '_id': id })
    query = {
        isExamRequest: false,
        exam: {
            message: reasonTab,
            isApproved: false
        }
    }

    notification={
                
        notifications:{
            notifyDate:new Date(),
            message:"your are not  Approved in Tranee exam becouse " +reasonTab
    
        }    
            
    }
    const userName = user.fullName

    await TraineeModel.updateOne({  _id: id },{$push:notification })

    await TraineeModel.findOneAndUpdate({ _id: id }, { $set: query }, async () => {
        await saveHistory(`Trainee ${userName} has been rejected by ${examDate}.`, admin)
    })

    return res.json({
        x: 'hi'
    })
}