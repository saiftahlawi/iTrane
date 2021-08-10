const AdminModel = require('../../Models/Admin.js')
const History=require("../../Models/History")


const saveHistory = async (str,admin) => {
 
    const history = await new History({
        admin:admin,
        action: str
    }).save()
}

exports.UpdateAdmin =async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    try {
        const id = await req.body.id
        const query = {
            fullName: req.body.fullName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            admin:req.body.admin,
            adminType: req.body.adminType
        };
        await AdminModel.findOneAndUpdate({ _id: id }, { $set: query })
        res.json({
            updated: true
        })
        saveHistory(`Updated ${req.body.fullName} Succefully`,query.admin)
    } catch (e) {
        console.error(e)
    }
}