import React from 'react'
import './traineeExams.css'
import { Translation } from 'react-i18next';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class TraineeExams extends React.Component {
    constructor() {
        super()
        this.ref = React.createRef();
        this.state = {
            Trainees: [],
            status: '',
            reasonTab: '',
            isValidReason: false,
            isValidDate: false, 
            traineeID: null,
            examDate: Date.now()
        }
    }
    //Handle Declination
    handleDecline = e => {
        this.state.status === '' ? this.setState({ status: 'decline' }) : this.setState({ status: '' })
        this.setState({ traineeID: e })
    }


    //Check the number of characters of the reason tab
    checkReasonTab = e => {
        var reason = this.state.reasonTab.toString()
        if (reason.length < 10) {
            this.setState({
                isValidReason: false
            })
        } else {
            this.setState({
                isValidReason: true
            })
        }
    }

    //Handle reason tab

    handleReasonTab = async e => {
        var reason = e.target.value;
        await this.setState({
            reasonTab: reason
        })
    }

    //Reject the trainee's request
    declineRequest = e => {
        fetch('http://localhost:3000/reject_trainee_exam', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
            body: 'id=' + this.state.traineeID + '&admin=' + localStorage.getItem("email")+ '&reasonTab=' + this.state.reasonTab
        }) 
        .then(response => response.json())
        .then(data => {
            this.setState({
                reasonTab: '', 
                status: ''
            })
        })
    }

    componentDidMount() {
        fetch('http://localhost:3000/trainees_exam_request')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    Trainees: data
                })
            })
    }

    componentDidUpdate() {
        fetch('http://localhost:3000/trainees_exam_request')
        .then(response => response.json())
        .then(data => {
            this.setState({
                Trainees: data
            })
        })
    }

    /** Approvement */

    handleApproveTab = id => {
        this.setState({
            status: 'approve',
            traineeID: id
        })
    }

    setExamDate = d => {
        this.setState({
            examDate: d,
            isValidDate: true
        })
    }

    handleApprove = async id => {
        var id = this.state.traineeID
        var date = await this.state.examDate
        fetch(`http://localhost:3000/approve_trainee_exam/${id}`, 
        {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
            body: 'examDate=' + date
        })
        .then(this.setState({
            status: ''
        }))
    }

    render() {
        return (
            <Translation>
                {(t) =>

                    <main id="trainers">
                        <table class="table table-bordered grocery-crud-table table-hover">
                            <thead style={{ width: '100%' }}>
                                <tr>
                                    <th>{t("TraineeName")}</th>
                                    <th>{t("phoneNumber")}</th>
                                    <th>{t("email")}</th>
                                    <th>{t("city")}</th>
                                    <th>{t("approveAndDecline")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.Trainees.map(trainee => {
                                    return (
                                        <tr>

                                            <td>
                                                {trainee.fullName}
                                            </td>
                             
                                            <td>
                                                {trainee.phoneNumber} </td>
                                            <td>
                                                {trainee.email} </td>

                                            <td>
                                                {trainee.city} </td>

                                            <td>

                                                <button onClick={() => { this.handleDecline(trainee._id) }} class="button danger" href="">{t('decline')}</button>
                                                <button onClick={() => { this.handleApproveTab(trainee._id) }} class="button success" href="">{t('approve')}</button>
                                                 </td>
                                                

                                        </tr>
                                    )
                                })}



                            </tbody>

                        </table>
                        {this.state.status === 'decline' ? <div className='statusContainer'>
                            <div className='statusTab'>
                                <h3>{t("areUSureToDeclineUser")} {this.state.Trainees.map(x => x.id === this.state.traineeID ? x.name : false)}</h3>
                                <textarea onKeyUp={this.checkReasonTab} placeholder={t("traineeDetails")} value={this.state.reasonTab} onChange={(e) => {
                                    this.handleReasonTab(e)
                                }} rows='6' className="reasonContainer" align='left'>

                                </textarea>
                                <div className='btnsContainer'>
                                    <button onClick={() => { this.handleDecline() }} className="button normal">{t('ignore')}</button>
                                    <button onClick={() => { this.declineRequest() }} disabled={this.state.isValidReason ? false : true} className="button danger" href="">{t('decline')}</button>
                                </div>

                            </div>
                        </div> : this.state.status === 'approve' ? <div className='statusContainer'>
                            <div className='statusTab'>
                                <h3>{t("pickDateAndTime")} </h3>
                                <DatePicker
                                className = 'dateComponent'
                                    selected={this.state.examDate}
                                    onChange={date => {this.setExamDate(date)}}
                                    showTimeSelect
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                />
                                <div className='btnsContainer'>
                                <button onClick={() => { this.handleDecline() }} className="button normal">{t('ignore')}</button>
                                    <button onClick={()=> {this.handleApprove()}} disabled={this.state.isValidDate ? false : true} className="button success">{t('confirm')}</button>
                                </div>

                            </div>
                        </div> : false}


                    </main>
                }

            </ Translation >
        )
    }
}