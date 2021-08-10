
const AdminModel = require('../../Models/Admin')

exports.GetCurrentAdmin = async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    try {
        const email = req.body.email
        let Admins = AdminModel.findOne({email: email}, (err,result)=> {
            return res.json({
                result: result
            })
        })
    } catch (er) {
        console.error(er)
    }
}