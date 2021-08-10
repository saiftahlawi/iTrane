
const NotificationModel = require('../../Models/Notifications')

exports.ReadNotifications = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    const query = { isSeen: false }

    await NotificationModel.updateMany(
        query,
        { $set: { isSeen: true } },
        (err, result) => {
            console.log('Seen')
        }
    )

}