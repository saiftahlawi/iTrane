
const AdminModel = require('../../Models/Admin')
const express = require('express')
app = express()
const session = require('express-session')
const mongoose = require('mongoose');
const { json } = require('body-parser');

db = 'mongodb://localhost:27017/iTrain',
    bcrypt = require('bcrypt'),
    BCRYPT_SALT_ROUNDS = 12

//Database Connections 
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true)
//session
app.use(session({ secret: '.', resave: false, saveUninitialized: true }))

exports.AdminLogin = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    //Getting fields
    const email = req.body.email
    const password = req.body.password
    const User = await AdminModel.findOne({ 'email': email, "password": password })

    if (User) {
        console.log('User av')
        return res.json({
            "status": "true",
            "fullName": User.fullName,
            "adminType": User.adminType
        })

    } else {
        console.log('not found')
        return res.json({
            "status": "false",
            "err": "user not found please check your email and password "
        })
    }


}