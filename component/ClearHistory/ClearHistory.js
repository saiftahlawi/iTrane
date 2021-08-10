const HistoryModel=require("../../Models/History")

exports.ClearHistory= async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
    await HistoryModel.deleteMany({})
}