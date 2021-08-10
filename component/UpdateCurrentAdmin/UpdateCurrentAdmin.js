const AdminModel = require('../../Models/Admin.js')

exports.UpdateCurrentAdmin =async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    try {
        const id = await req.body.email
        const query = {
            fullName: req.body.fullName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password
        };
        await AdminModel.findOneAndUpdate({ email: id }, { $set: query })
        res.json({
            updated: true
        })
    } catch (e) {
        console.error(e)
    }
}