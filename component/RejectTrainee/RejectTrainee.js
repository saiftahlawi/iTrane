const TraineeModel = require('../../Models/Trainee.js')
const HistoryModel=require("../../Models/History")
var nodemailer = require('nodemailer');
//Save history
const saveHistory = async (str) => {
    const history = await new HistoryModel({
        admin: 'Admin',
        action: str
    }).save()
}


exports.RejectTrainee=   async (req, res)=> {

    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

    const { id, reasonTab } = req.body
    var user = await TraineeModel.findOne({ '_id': id })
    const userName = user.fullName
console.log(reasonTab)

    await saveHistory(`Trainee ${userName} has been rejected.`)
await Reject(user.email,reasonTab)
    await TraineeModel.findByIdAndRemove({ _id: id }, ()=> {
        console.log('updated')
    })
}



    
    
    
    async function Reject (Email,reasonTab){
   
    
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user:'tranei648@gmail.com',
              pass:'safe3000'
            }
          });
          
          var mailOptions = {
            from: 'tranei648@gmail.com',
            to:Email,
            subject: 'Rejected Email',
            html: '<h1>iTrain</h1> <p>you are Rejected because '+reasonTab+' </p>'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('email was sent');
            }
          });

    }