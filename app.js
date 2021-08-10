//Consts 
const express = require('express')
 app = express(),
 port = 3000,
 Router = require('./routes/Routes'),
 bodyParsar = require('body-parser')
 const multer = require('multer')
 //var session = require('express-session')
 
//Parse application/x-www-form-urlencoded
app.use(bodyParsar.urlencoded({ extended: false }))


//Parse application/json
app.use(bodyParsar.json())
app.use("/images",express.static("images"))
//session


//Settings
urlpars = bodyParsar.urlencoded({extended:false})


//upload image
const Storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, './images')
    },
    filename(req, file, callback) {
      callback(null, `${file.fieldname}_${'saif'}_${file.originalname}`)
    },
  })
  
  var upload = multer({ storage: Storage })
  
  
  
  app.post('/api/uploadFront', upload.array('photo', 3), (req, res) => {
   // console.log(req.files[0].path)

 res.status(200).json({
      message:req.files[0].path,
    })
 
    
  })
  
  app.post('/api/uploadBack', upload.array('photo', 3), (req, res) => {
   // console.log(req)
    res.status(200).json({
      message:req.files[0].path,
    })
 
    
  })
  
  


//Routes
app.use('/', urlpars, Router)


//Port
app.listen(port,()=>{
    console.log(`connected on ${port}`);
})