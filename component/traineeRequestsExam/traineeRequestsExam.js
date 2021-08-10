
const TraineeModel = require('../../Models/Trainee.js')
const NotificationModel = require('../../Models/Notifications')


exports.traineeRequestsExam = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

  const id = req.body.ID
  const userName = req.body.userName

  var query = { isExamRequest: true }
  await TraineeModel.findOneAndUpdate({ ID: id }, { $set: query }, () => {
    console.log('updated')
  })


  const newNotification = new NotificationModel({
    title: `${userName} requested a training exam.`
  }).save()

  return res.json({
    "massege":"A letter regarding your examination will be sent as soon as possible ",
   

    
})

}