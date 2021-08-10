



const TrainerModel = require('../../Models/Trainer.js')
const History=require("../../Models/History")


const mongoose = require('mongoose');
db = 'mongodb://localhost:27017/iTrain',
  bcrypt = require('bcrypt'),
  BCRYPT_SALT_ROUNDS = 12


  const saveHistory = async (str,admin) => {
 
    const history = await new History({
        admin:admin ,
        action: str
    }).save()
}

//Database Connections 
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true)



//RegisterTrainer
exports.RegisterTrainer = async (req, res) => {
  //Checking Fields 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');



  var x = await TrainerModel.findOne({ 'email': req.body.email.toLowerCase() })


  if (x) {
    res.json({
      'err': 'the email is alrady exsist'
    })

  } else {

    var m = await TrainerModel.findOne({ 'ID': req.body.ID })


    if (m) {
      res.json({
        'err': 'the ID is alrady exsist'
      })
    } else {
      //Bcrypting and saving to DB

      bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
        .then(hashedPassword => {
         


          return newTrainee = new TrainerModel({
            fullName: req.body.fullName,
            email: req.body.email,
            password:hashedPassword,
            phoneNumber: req.body.phoneNumber,
            city: req.body.city,
            viechaleRegistraionPlate: req.body.vrc,
            gearType:req.body.gearType,
            ID:req.body.ID,
            profilePicture:"images\\user.png"
          }).save(() => {
            saveHistory(`Added ${req.body.fullName} As a Trainer Succecfully.`,req.body.admin)
     
        })
        })
        return res.json({
            success: true
        })
    }

  }


}




