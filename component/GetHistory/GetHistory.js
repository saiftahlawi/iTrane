
const HistoryModel=require("../../Models/History")

exports.GetHistory=async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  

    try {
        let history = HistoryModel.find({}).sort({ '_id': -1 }).exec((err, result) => {
            if (result) {
                return res.json(result)
            } else {
                return res.json({
                    msg: 'err'
                })
            }
        })
    } catch (er) {
        console.error(er)
    }
}

