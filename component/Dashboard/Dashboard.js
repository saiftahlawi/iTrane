const AdminModel = require('../../Models/Admin')
const TrainerModel = require('../../Models/Trainer') 
const TraineeModel = require('../../Models/Trainee') 
const DashboardModel = require('../../Models/dashboard.js')

exports.GetNumbers = async (req, res)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    //Roles
    const admins = await (await AdminModel.find({})) //Admin
    const trainers = await (await TrainerModel.find({})) //Trainers
    const trainees = await (await TraineeModel.find({})) //Trainees   

    //Numbers
    const fetchRequests = await DashboardModel.find({}, {numberOfRequests: 1, _id: 0})
    const requests = fetchRequests[0].numberOfRequests
//
    const fetchTrainee = await DashboardModel.find({}, {numberOfRegisterdTrainees: 1, _id: 0})
    const trainee = fetchTrainee[0].numberOfRegisterdTrainees


    //Sending response
    return res.json({
        roles: {
            admins: admins,
            trainers: trainers,
            trainees: trainees, 
        },
        numbers: {
            requests: requests, 
            trainee: trainee
        }
    })

}


exports.GetNumberOfTrainees = (req, res)=> {
    
}