const NotificationModel = require('../../Models/Notifications')

exports.RemoveNotification = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    const id = req.body.id
    await NotificationModel.deleteOne({ _id: id }, function (err) {
        console.log('notification deleted')
    });
}