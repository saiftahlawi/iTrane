const TraineeModel = require('../../Models/Trainee.js')
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
exports.Help= async(req, res) => {

  //Getting fields
  const ID = req.body.ID;
  const massege=req.body.massege

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
          from:User.email,
          to:'tranei648@gmail.com',
          subject: 'Help',
          html: '<h1>'+User.fullName+'</h1>'+'<h2>'+User.ID+'</h2>'+'<p>'+massege+'</p>'
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
           "done": "the message was sent successfully"
      })

  }else{

      return res.json({
          "status": false,
          "err":"user not found please check your id  "
      })
  }


}