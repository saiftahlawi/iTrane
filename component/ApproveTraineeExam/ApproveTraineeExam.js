
const TraineeModel = require('../../Models/Trainee.js')
const HistoryModel=require("../../Models/History")
const { notify } = require('../../routes/Routes.js')



const saveHistory = async (str) => {
    const history = await new HistoryModel({
        admin: 'Admin',
        action: str
    }).save()
}

exports.ApproveTraineeExam= async (req, res)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

    try {
        const { examDate } = req.body,
        id = req.params.id,
        query = {
            isExamRequest: false, 
            exam: {
            date: examDate
            }, 
            
            }

            notification={
                
                notifications:{
                    notifyDate: Date.now(),
                    message:"You have been accepted to apply for the driving test, and the appointment will be sent soon to your phone"

                }    
                    
            }
        var user = await TraineeModel.findOne({ '_id': id })
        const userName = user.fullName
        await TraineeModel.findOneAndUpdate({ _id: id }, { $set: query}, async ()=> {
            await saveHistory(`Trainee ${userName} has been scheduled for training exam on ${examDate}.`)
        })    

        await TraineeModel.updateOne({ _id: id },{$push:notification })

    } catch(error) {
        console.log(error)
    }

}