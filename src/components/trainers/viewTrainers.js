import React from 'react'
import './trainers.css'
import { Translation } from 'react-i18next';

export default class Trainers extends React.Component {
    constructor() {
        super()
        this.state = {
            trainers: [],
            isUpdateTab: false,
            trainerID: null,
            fullName: '',
            email: '',
            vrp: '',
            phoneNumber: '',
            city: '',
            isValidUpdate: false
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/trainers')
        .then(data => data.json())
        .then(response => this.setState({
            trainers: response,
        }))
    }

    componentDidUpdate() {
        fetch('http://localhost:3000/trainers')
        .then(data => data.json())
        .then(response => this.setState({trainers: response}))
    }

    handleDelete = id => {
     
        fetch(`http://localhost:3000/remove_trainer`,{
            method:'POST',
            headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
            body: 'id=' + id +'&admin='+localStorage.getItem("email")
           
        })
    }

    handleUpdate = e => {
        e.preventDefault()
        try {
            const id = this.state.trainerID
            fetch(`http://localhost:3000/update_trainer`,
            {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
                body: 'fullName=' + this.state.fullName + '&email=' + this.state.email + '&phoneNumber=' + this.state.phoneNumber 
                 + '&vrp=' + this.state.vrp + '&city=' + this.state.city + '&date=' + Date.now()
                 +'&id=' + id 
                 +'&admin='+localStorage.getItem("email")
            })
            .then(response => response.json())
            .then(data=> {
                if(data.updated) {
                    this.setState({
                        isUpdateTab :false
                    })
       
                }
            })

         } catch(e) {
             console.error(e)
         }
    }


    handleSelection =  async trainer => {
        const trainerId = trainer._id
        this.setState({
            fullName: trainer.fullName,
            email: trainer.email,
            phoneNumber: trainer.phoneNumber,
            vrp: trainer.viechaleRegistraionPlate,
            city: trainer.city
        })
        await this.setState({ isUpdateTab: true, trainerID: trainerId})
        const t =  await this.state.trainers.filter(trainer => {
          if(trainer._id === this.state.trainerID) {
                return trainer
            } 
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: [e.target.value],
            isValidUpdate: true
        })
    }

    render() {

        return (
            <Translation>
                {(t) =>
                    <main id="trainers">
                        <div className='addTrainerContainer'>
                            <button onClick={this.props.handleComponent} className="button success">{t('addTrainer')}</button>
                        </div>

                        {this.state.trainers.length === 0 ? <h1>No Trainers Available</h1> : <table class="table table-bordered grocery-crud-table table-hover">
                            <thead style={{ width: '100%' }}>
                                <tr>
                                    <th className = 'ths'>{t("TrainerName")}</th>
                                    <th className = 'ths'>{t("status")}</th>
                                    <th className = 'ths'>{t("phoneNumber")}</th>
                                    <th className = 'ths'>{t("email")}</th>
                                    <th className = 'ths'>{t("city")}</th>
                                    <th className = 'ths'>{t("vrp")}</th>
                                    <th className = 'ths'>{t("updateAndDelete")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.trainers.map(trainer => {
                                    return (<tr>
                                        <td>
                                           {trainer.fullName} 
                                        </td>
                                        <td>
                                        <i style = {{display: 'inline-block', color: trainer.status=='online'? 'green':trainer.status=='busy'? 'red':'grey' }} class="fas fa-circle"></i> {trainer.status=='online'? t('online'):trainer.status=='busy'?'busy': t('offline') } </td>
                                        <td>
                                            {trainer.phoneNumber} </td>
                                        <td>
                                            {trainer.email} </td>

                                        <td>
                                            {trainer.city} </td>

                                            <td>
                                                {trainer.viechaleRegistraionPlate}
                                            </td>

                                        <td>

                                            <button onClick={() => {
                                                this.setState({ isUpdateTab: false })
                                                this.handleDelete(trainer._id)
                                            }} class="btn  btn-nueva" className = 'button danger'>{t('delete')}</button> 
                                                                                        <button onClick={() => this.handleSelection(trainer) }  class="button primary">{t('update')}</button>
                                            </td>

                                    </tr>)
                                })}


                            </tbody>
                        </table>}
                        {this.state.isUpdateTab ?
                            <div className='statusContainer'>
                                <div className='statusTab'>
                                    <form onSubmit = {this.handleUpdate}> 
                                        {this.state.trainers.map(trainers => {
                                            if (trainers._id === this.state.trainerID) {
                                                return (
                                                    <div>
                                                    <div className="field-container">
                                                            <label for="contact-no">{t("trainerFullName")} </label>
                                                            <input onChange = {this.handleChange} value= {this.state.fullName} type="text" name="fullName" minLength={18} placeholder= 'full name' required="required" />
                                                            <span className="error-messg"></span>
                                                        </div>

                                                        <div className="field-container">
                                                            <label for="contact-no">{t("contactNo")} </label>
                                                            <input value={this.state.phoneNumber} type="tel" onChange = {this.handleChange} name="phoneNumber" id="contact-no" maxLength={9} placeholder="+962" required="required" />
                                                            <span className="error-messg"></span>
                                                        </div>

                                                        <div className="field-container">
                                                            <label for="contact-no">{t("email")} </label>
                                                            <input  value={this.state.email} type="text" onChange = {this.handleChange} name="email" id="email" maxLength={9} placeholder="email address" required="required" />
                                                            <span className="error-messg"></span>
                                                        </div>

                                                        <div className="field-container">
                                                            <label for="contact-no">{t("vrp")} </label>
                                                            <input value={this.state.vrp} type="text" onChange = {this.handleChange} name="vrp" id="vrp" maxLength={6} placeholder="VRP" required="required" />
                                                            <span className="error-messg"></span>
                                                        </div>

                                                        <div className="field-container">
                                                            <label for="contact-no">{t("city")} </label>
                                                            <select  class='select' value={this.state.city} onChange={this.handleChange} name="city" id="contact-no" required="required">
                                                    <option value='Amman'>{t("amman")}</option>
                                                    <option value='Irbid'>{t("irbid")}</option>
                                                    <option value='Jerash'>{t("jerash")}</option>
                                                    <option value='Aqaba'>{t("aqaba")}</option>
                                                    <option value='Madaba'>{t("madaba")}</option>
                                                    <option value='Zarqa'>{t("zarqa")}</option>
                                                    <option value='Kerak'>{t("kerak")}</option>
                                                    <option value='As-Salt'>{t("salt")}</option>
                                                    <option value='Ajloun'>{t("ajloun")}</option>
                                                    </select>
        
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}


                          
                                    <div className='btnsContainer'>
                                    <button onClick={() => { this.setState({ isUpdateTab: false }) }} class="button danger" >{t('ignore')}</button>
                                    <button  type = 'submit' disabled={this.state.isValidUpdate ? false : true} class="button primary">{t('update')}</button>
                                    </div>
                                    </form>
                                </div>
                            </div> : false

                        }

                    </main>
                }

            </ Translation >
        )
    }
}