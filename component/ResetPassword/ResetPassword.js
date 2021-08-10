const TraineeModel = require('../../Models/Trainee.js')
const TrainerModel = require('../../Models/Trainer.js')

const express = require('express')
 var app = express()
 var session = require('express-session');
const mongoose = require('mongoose');
var nodemailer = require('nodemailer');


//Database Connections 
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true)

//session
app.use(session({ secret: '.',resave:false,saveUninitialized:true}))







//ResetPassword
exports.ResetPassword= async(req, res) => {

  //Getting fields
  const ID = req.body.ID;

  session.code= Math.floor((Math.random() * 1000000) + 1)+''

  var User = await TraineeModel.findOne({ 'ID': ID })

 
  if(User){
    

      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user:'tranei648@gmail.com',
            pass:'safe3000'
          }
        });
        
        var mailOptions = {
          from: 'tranei648@gmail.com',
          to:User.email,
          subject: 'Reset Password',
          html: '<h1>طلب إعادة تعيين كلمة المرور</h1>   <p>إذا كنت قد طلبت إعادة تعيين كلمة مرور لـ'+User.fullName+'، فاستخدم رمز التأكيد أدناه لإكمال العملية. أما إذا لم تكن قد طلبت هذا الطلب، فيمكنك تجاهل رسالة البريد الإلكتروني هذه.</p> <br/> <p><b>'+(session.code)+'<b/></p>'
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('email was sent');
          }
        });

      return res.json({
          "status": true,
           "email":User.email
      })

  }else{


    traner(ID)

    
  }



  async function traner (ID){
    const Trainer =await TrainerModel.findOne({'ID':ID })
    if(Trainer){
   
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:'tranei648@gmail.com',
          pass:'safe3000'
        }
      });
      
      var mailOptions = {
        from: 'tranei648@gmail.com',
        to:Trainer.email,
        subject: 'Reset Password',
        html: '<h1>طلب إعادة تعيين كلمة المرور</h1>   <p>إذا كنت قد طلبت إعادة تعيين كلمة مرور لـ'+Trainer.fullName+'، فاستخدم رمز التأكيد أدناه لإكمال العملية. أما إذا لم تكن قد طلبت هذا الطلب، فيمكنك تجاهل رسالة البريد الإلكتروني هذه.</p> <br/> <p><b>'+(session.code)+'<b/></p>'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('email was sent');
        }
      });

    return res.json({
        "status": true,
         "email":Trainer.email
    })

    
    }else{
      return res.json({
        "status": false,
        "err":"user not found please check your id  "
    })
    }
    }


}





//ceack code 

exports.CodeCheack = async (req, res) =>{
  //Getting fields
  const code = req.body.code
 

if(session.code==code){
  

  return res.json({
      "status": true,
  })

}else{
  return res.json({
      "status": false,
      "err":"invalid Code "
  })
}
  
  

}