//Consts
const express = require('express');
const register = require('../component/Register/register.js');
const Login = require('../component/Login/Login')
const NavRetreve=require("../component/TraneeDataRetrieve/NavData")
const EditTranee=require("../component/EditTraneeProfile/EditTranee")
const RegisterTrainer =require("../component/RegisterTrainer/RegisterTrainer")
const GetTrainers =require("../component/GetTrainers/GetTrainers")
const GetHistory=require('../component/GetHistory/GetHistory')
const ClearHistory=require('../component/ClearHistory/ClearHistory')
const UpdateTrainer=require('../component/UpdateTrainer/UpdateTrainer')
const RemoveTrainer=require('../component/RemoveTrainer/RemoveTrainer')
const TraineesRequest=require('../component/TraineesRequest/TraineesRequest')
const RejectTrainee=require('../component/RejectTrainee/RejectTrainee')
const AcceptTrainee=require('../component/AcceptTrainee/AcceptTrainee')
const TraineeExamRequest=require('../component/TraineeExamRequest/TraineeExamRequest')
const ApproveTraineeExam=require('../component/ApproveTraineeExam/ApproveTraineeExam')
const RejectTraineeExam=require('../component/RejectTraineeExam/RejectTraineeExam')
const AdminLogin=require('../component/AdminLogin/AdminLogin')
const traineeRequestsExam=require('../component/traineeRequestsExam/traineeRequestsExam')
const ResetPassword=require('../component/ResetPassword/ResetPassword')
const UpdatePassword=require('../component/ResetPassword/UpdatePassword')
const TrainerNavRetreve=require("../component/TraninerDataRetrieve/NavData")   
const GetTraineeInbox = require('../component/GetTraineeInbox/GetTraineeInbox')
const checkEmail=require('../component/checkEmail/checkEmail')
const Logout=require('../component/Logout/Logout')
const checkNumber=require('../component/checkNumber/checkNumber')
const FetchDashboard = require('../component/Dashboard/Dashboard')



//Admin
const AddNewAdmin = require('../component/AddNewAdmin/AddNewAdmin')
const GetAdmins = require('../component/getAdmins/getAdmins')
const RemoveAdmin = require("../component/RemoveAdmin/RemoveAdmin")
const UpdateAdmin = require('../component/UpdateAdmin/UpdateAdmin')


//Cur Admin
const GetCurrentAdmin = require('../component/GetCurrentAdmin/GetCurrentAdmin.js');
const UpdateCurrentAdmin = require('../component/UpdateCurrentAdmin/UpdateCurrentAdmin')

//Notification
const GetNotifications = require('../component/GetNotifications/GetNotifications')
const ReadNotifications = require('../component/ReadNotifications/ReadNotifications');
const RemoveNotification = require('../component/RemoveNotification/RemoveNotification');

//help
const Help=require("../component/Help/Help")


//Training
const Training=require('../component/Training/Training')

//profile img
const ProfileImgTranee=require('../component/ProfileImg/ProfileImgTranee')
const ProfileImgTrainer=require('../component/ProfileImg/ProfileImgTrainer')

const router = express.Router();
//Routes
router.route('/register').post(register.Register);

router.route('/login').post(Login.Login);
router.route('/EditTranee').post(EditTranee.EditTranee);
router.route('/NavRetreve').post(NavRetreve.NavRetreve);
router.route('/TrainerNavRetreve').post(TrainerNavRetreve.NavRetreve);

router.route('/add_trainer').post(RegisterTrainer.RegisterTrainer);
router.route('/update_trainer').post(UpdateTrainer.UpdateTrainer);
router.route('/reject_trainee').post(RejectTrainee.RejectTrainee);
router.route('/accept_trainee').post(AcceptTrainee.AcceptTrainee);
router.route('/approve_trainee_exam/:id').post(ApproveTraineeExam.ApproveTraineeExam);
router.route('/reject_trainee_exam').post(RejectTraineeExam.RejectTraineeExam);
router.route('/admin_login').post(AdminLogin.AdminLogin);
router.route('/remove_trainer').post(RemoveTrainer.RemoveTrainer);
router.route('/traineeRequestsExam').post(traineeRequestsExam.traineeRequestsExam);
router.route('/ResetPassword').post(ResetPassword.ResetPassword);
router.route('/CodeCheack').post(ResetPassword.CodeCheack);
router.route('/UpdatePassword').post(UpdatePassword.UpdatePassword);
router.route('/Help').post(Help.Help);
router.route('/checkEmail').post(checkEmail.checkEmail);
router.route('/checkNumber').post(checkNumber.checkNumber);
router.route('/Logout').post(Logout.Logout);

router.route('/trainees_exam_request').get(TraineeExamRequest.TraineeExamRequest);
router.route('/trainees_requests').get(TraineesRequest.TraineesRequest);
router.route('/trainers').get(GetTrainers.GetTrainers);
router.route('/history').get(GetHistory.GetHistory);
router.route('/clear_history').get(ClearHistory.ClearHistory);





//Admin

router.route('/admins').get(GetAdmins.GetAdmins)
router.route('/add_new_admin').post(AddNewAdmin.AddNewAdmin)
router.route('/remove_admin').post(RemoveAdmin.RemoveAdmin)
router.route('/update_admin').post(UpdateAdmin.UpdateAdmin)
router.route('/update_current_admin').post(UpdateCurrentAdmin.UpdateCurrentAdmin)
router.route(`/get_current_admin`).post(GetCurrentAdmin.GetCurrentAdmin)



router.route('/notifications').get(GetNotifications.GetNotifications)
router.route('/read_notifications').get(ReadNotifications.ReadNotifications)
router.route('/remove_notification').post(RemoveNotification.RemoveNotification)
router.route('/trainee_inbox').post(GetTraineeInbox.GetTraineeInbox)


//traning 
router.route('/findNearest').post(Training.findNearest)
router.route('/ubdateLocation').post(Training.ubdateLocation)
router.route('/findRequst').post(Training.findRequst)
router.route('/TraineeCancelsTrainer').post(Training.TraineeCancelsTrainer)
router.route('/TrainerCancelsTrainee').post(Training.TrainerCancelsTrainee)
router.route('/TrainerAcceptsTrainee').post(Training.TrainerAcceptsTrainee)
router.route('/EndTraining').post(Training.EndTraining)
router.route('/findAcecept').post(Training.findAcecept)
router.route('/startTrining').post(Training.startTrining)
router.route('/DoneTraining').post(Training.DoneTraining)
router.route('/admins_number').get(FetchDashboard.GetNumbers)

//ProfileImg
router.route('/ProfileImgTranee').post(ProfileImgTranee.ProfileImgTranee)

router.route('/ProfileImgTrainer').post(ProfileImgTrainer.ProfileImgTrainer)
//Exporting 
module.exports = router;



