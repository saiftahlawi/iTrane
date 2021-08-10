
const TraineeModel = require('../../Models/Trainee')
const mongoose = require('mongoose');
db = 'mongodb://localhost:27017/iTrain',
  bcrypt = require('bcrypt'),
  BCRYPT_SALT_ROUNDS = 12

const NotificationModel = require('../../Models/Notifications')

//Database Connections 
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true)



//Register
exports.Register = async (req, res) => {
  //Checking Fields 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');



  var x = await TraineeModel.findOne({ 'email': req.body.email.toLowerCase() })


  if (x) {
    res.json({
      'err': 'the email is alrady exsist'
    })

  } else {

    var m = await TraineeModel.findOne({ 'ID': req.body.ID })


    if (m) {
      res.json({
        'err': 'the ID is alrady exsist'
      })
    } else {
      //Bcrypting and saving to DB

      bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
        .then(hashedPassword => {
   


          return newTrainee = new TraineeModel({
            fullName: req.body.fullname,
            ID: req.body.ID,
            password: hashedPassword,
            email: req.body.email.toLowerCase(),
            phoneNumber: req.body.Phone,
            nationality: req.body.nationality,
            Address: req.body.Address,
            city: req.body.city,
            frontID: req.body.frontID,
            RearID: req.body.RearID,
            TypeOfTranning: req.body.TypeOfTranning,
            DOB: req.body.month + '/' + req.body.day + '/' + req.body.Year,
            Endshours: 0,
            profilePicture:"images\\user.png"
          }).save()
        })
    }

  }


}
