const AdminModel = require('../../Models/Admin.js')
const HistoryModel = require("../../Models/History")


exports.RemoveAdmin = async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    //Save history
const saveHistory = async (str) => {
    const history = await new HistoryModel({
        admin: req.body.admin,
        action: str
    }).save()
}

console.log('bi')

    const { id, admin } = req.body
    var adminN = await AdminModel.findOne({ '_id': id }).fullName
    await saveHistory(`Admin ${adminN} has been Deleted by. ${admin}`)
    await AdminModel.findByIdAndRemove({ _id: id }, () => {
        console.log('Admin removed')
    })
}