import React from 'react'
import './acceptTrainees.css'
import { Translation } from 'react-i18next';
import Trainees from './trainees.js'
import "react-datepicker/dist/react-datepicker.css";

export default class AcceptTrainees extends React.Component {
    constructor() {
        super()
        this.ref = React.createRef();
        this.state = {
            Trainees: [],
            status: '',
            reasonTab: '',
            isValidReason: false,
            DoB: null,
            city: null,
            ToT: null,
            address: null,
            nationality: null,
            fullName: null,
            email: null,
            phoneNumber: null,
            frontID: null,
            RearID: null,


            isMore: true,
            isValidDate: false,
            traineeID: null,
            isMore: false,
            examDate: Date.now()
        }
    }
    //Handle Declination
    handleDeclineTab = async id => {
        this.state.status === '' ? this.setState({ status: 'decline' }) : this.setState({ status: '' })
        await this.setState({ traineeID: id })
    }

    //Server

    componentDidMount() {
        fetch('http://localhost:3000/trainees_requests')
            .then(response => response.json())
            .then(data => {

                this.setState({
                    Trainees: data
                })
            })
    }

    componentDidUpdate() {
        fetch('http://localhost:3000/trainees_requests')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    Trainees: data
                })
            })
    }


    handleApprove = id => {
        fetch('http://localhost:3000/accept_trainee',
            {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
                body: 'id=' + id 
            })
    }

    handleDecline = id => {
        this.setState({
            status: '',
            reasonTab: ''
        })
        var id = this.state.traineeID
        fetch('http://localhost:3000/reject_trainee',
            {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
                body: 'id=' + id + '&reasonTab=' + this.state.reasonTab

            })
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


    /** Approvement */

    setExamDate = d => {
        this.setState({
            examDate: d,
            isValidDate: true
        })
    }

    handleGetMore = e => {
        this.setState({
            traineeID: e._id,
            fullName: e.fullName,
            email: e.email,
            phoneNumber: e.phoneNumber,
            frontID: e.frontID,
            RearID: e.RearID,
            DoB: e.DOB,
            city: e.city,
            ToT: e.TypeOfTraining,
            address: e.Address,
            nationality: e.nationality,
            isMore: true
        })
    }

    render() {
        return (
            <Translation>
                {(t) =>

                    <main id="trainers">
                        <table class="table table-bordered grocery-crud-table table-hover">
                            <thead style={{ width: '100%' }}>
                                <tr>
                                    <th>{t("ID")}</th>
                                    <th>{t("phoneNumber")}</th>
                                
                                    <th>{t("approveAndDecline")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.Trainees.map(trainee => {
                                    return (
     
                                            <tr>

                                                <td>
                                                    {trainee.ID}
                                                </td>
                                                <td>
                                                    {trainee.phoneNumber} 
                                                    
                                                    </td>

                                          
                                                <td>
                                                    <button onClick={() => { this.handleDeclineTab(trainee._id) }} className="button danger" href="">{t('decline')}</button>
                                                    <button onClick={() => { this.handleApprove(trainee._id) }} className="button success" href="">{t('approve')}</button>
                                                    <button onClick={() => { this.handleGetMore(trainee) }} className="button primary" href="">{t('more')}</button>
                                                </td>



                                            </tr>

                                  



                                    )
                                })}

                            </tbody>

                        </table>


                        {this.state.isMore ?
                            <div className='statusContainer'>
                                <div className='statusTab'>
                                    <div> 
                                        {this.state.Trainees.map(trainers => {
                                            if (trainers._id === this.state.traineeID) {
                                                return (
                                                    <div class = 'scroll'>
                                                    <div className="field-container">
                                                            <label for="contact-no">{t("trainerFullName")} </label>
                                                            <p class  ='info' >{this.state.fullName}</p>
                                                            <span className="error-messg"></span>
                                                        </div>

                                                        <div className="field-container">
                                                            <label for="contact-no">{t("contactNo")} </label>
                                                           <p class = 'info'>{this.state.phoneNumber}</p>
                                                            <span className="error-messg"></span>
                                                        </div>

                                                        <div className="field-container">
                                                            <label for="contact-no">{t("email")} </label>
                                                            <p class = 'info'>{this.state.email}</p>
                                                            <span className="error-messg"></span>
                                                        </div>

                                                        <div className="field-container">
                                                            <label for="contact-no">{t("nationality")} </label>
                                                            <p class = 'info'>{this.state.nationality}</p>                                                            <span className="error-messg"></span>
                                                        </div>

                                                        <div className="field-container">
                                                            <label for="contact-no">{t("dob")} </label>
                                                            <p class = 'info'>{this.state.DoB}</p>                                                            <span className="error-messg"></span>
                                                        </div>

                                                        <div className="field-container">
                                                            <label for="contact-no">{t("city")} </label>
                                                            <p class = 'info'>{this.state.city     }</p>
        
                                                        </div>

                                                        <div>
                                                        <p className = 'info'>Front ID</p>
                                                            <img src = {'http://localhost:3000/images/'+this.state.frontID.slice(6)}  style={{width:250,height:250}}/>

                                                            <p className = 'info'>Back ID</p>
                                                            <img src = {'http://localhost:3000/images/'+this.state.RearID.slice(6)} style={{width:250,height:250}}/>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}


                          
                                    <div className='btnsContainer'>
                                    <button onClick={() => { this.setState({ isMore: false }) }} class="button primary" >{t('done')}</button>
                                    </div>
                                    </div>
                                </div>
                            </div> : false

                        }

                        {this.state.status === 'decline' ? <div className='statusContainer'>
                            <div className='statusTab'>
                                <h3>{t("areUSureToDeclineUser")} {this.state.Trainees.map(x => x.id === this.state.traineeID ? x.name : false)}</h3>
                                <textarea onKeyUp={this.checkReasonTab} placeholder={t("traineeDetails")} value={this.state.reasonTab} onChange={(e) => {
                                    this.handleReasonTab(e)
                                }} rows='6' className="reasonContainer" align='left'>

                                </textarea>
                                <div className='btnsContainer'>
                                    <button onClick={() => { this.handleDeclineTab() }} className="button normal">{t('ignore')}</button>
                                    <button onClick={() => { this.handleDecline() }} disabled={this.state.isValidReason ? false : true} className="button danger" >{t('decline')}</button>
                                </div>

                            </div>
                        </div> : false}


                    </main>
                }

            </ Translation >
        )
    }
}