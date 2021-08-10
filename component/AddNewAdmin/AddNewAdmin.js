
const AdminModel = require('../../Models/Admin')
const History = require("../../Models/History")

const saveHistory = async (str, admin) => {

    const history = await new History({
        admin: admin,
        action: str
    }).save()
}

exports.AddNewAdmin = async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
            console.log(req.body.x)
    const NewAdmin = await new AdminModel({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        adminType: req.body.adminType
    }).save(() => {

        saveHistory(`Added ${req.body.fullName} As an Admin Succecfully.`, req.body.admin)
    })
    return res.json({
        success: true
    })
}