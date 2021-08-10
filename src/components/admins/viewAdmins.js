import React from 'react'
import './admins.css'
import { Translation } from 'react-i18next';

export default class Admins extends React.Component {
    constructor() {
        super()
        this.state = {
            admins: [],
            isUpdateTab: false,
            adminID: '',
            fullName: '',
            email: '',
            phoneNumber: '',
            city: '',
            isValidUpdate: false,
            adminType: localStorage.getItem("adminType"),
            adminType2: ''
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/admins')
            .then(data => data.json())
            .then(response => this.setState({
                admins: response,
            }))
    }

    componentDidUpdate() {
        fetch('http://localhost:3000/admins')
            .then(data => data.json())
            .then(response => this.setState({ admins: response }))
    }

    handleDelete = id => {
        fetch(`http://localhost:3000/remove_admin`, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
            body: 'id=' + id + '&admin=' + localStorage.getItem("email")

        })
    }

    handleUpdate = e => {
        e.preventDefault()
        try {
            const id = this.state.adminID
            fetch(`http://localhost:3000/update_admin`,
                {
                    method: 'POST',
                    headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
                    body: 'fullName=' + this.state.fullName + '&email=' + this.state.email + '&phoneNumber=' + this.state.phoneNumber
                        + '&adminType=' + this.state.adminType2
                        + '&id=' + id
                        + '&admin=' + localStorage.getItem("email")
                })
                .then(response => response.json())
                .then(data => {
                    if (data.updated) {
                        this.setState({
                            isUpdateTab: false
                        })

                    }
                })

        } catch (e) {
            console.error(e)
        }
    }


    handleSelection = async admin => {
        const adminID = admin._id
        this.setState({
            fullName: admin.fullName,
            email: admin.email,
            phoneNumber: admin.phoneNumber,
            adminType2: admin.adminType
        })
        await this.setState({ isUpdateTab: true, adminID: adminID })
        const t = await this.state.admins.filter(admin => {
            if (admin._id === this.state.adminID) {
                return admin
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
                        {this.state.adminType === 'Super admin' ? <div className='addTrainerContainer'>
                            <button onClick={this.props.handleComponent} className="button success">{t('addAdmin')}</button>
                        </div> : false}


                        <table class="table table-bordered grocery-crud-table table-hover">
                            <thead style={{ width: '100%' }}>
                                <tr>
                                    <th className='ths'>{t("AdminFullName")}</th>
                                    <th className='ths'>{t("AdminType")}</th>
                                    <th className='ths'>{t("phoneNumber")}</th>
                                    <th className='ths'>{t("email")}</th>
                                    {this.state.adminType === 'Super admin' ? <th className='ths'>{t("updateAndDelete")}</th> : false}

                                </tr>
                            </thead>
                            <tbody>
                                {this.state.admins.map(admin => {
                                    if(localStorage.getItem("email")!==admin.email){

                                   
                                    return (<tr>
                                        <td>
                                            {admin.fullName}
                                        </td>
                                        <td>
                                            {t(admin.adminType)}
                                        </td>
                                        <td>
                                            {admin.phoneNumber} </td>
                                        <td>
                                            {admin.email} </td>
                                        {this.state.adminType === 'Super admin' ? <td>

                                            <button onClick={() => {
                                                this.setState({ isUpdateTab: false })
                                                this.handleDelete(admin._id)
                                            }} class="btn  btn-nueva" className='button danger'>{t('delete')}</button>
                                            <button onClick={() => this.handleSelection(admin)} class="button primary">{t('update')}</button>
                                          
                                        </td> : false}


                                    </tr>)
                                     }
                                })}


                            </tbody>
                        </table>
                        {this.state.isUpdateTab ?
                            <div className='statusContainer'>
                                <div className='statusTab'>
                                    <form onSubmit={this.handleUpdate}>
                                        {this.state.admins.map(admin => {
                                            if (admin._id === this.state.adminID) {
                                                return (
                                                    <div>
                                                        <div className="field-container">
                                                            <label for="contact-no">{t("AdminType")} </label>
                                                            <span className="error-messg"></span>
                                                            <select onChange = {e => {
                                                               
                                                                this.setState({adminType2: [e.target.value]})}}>
                                                                <option name = 'adminType2' value='Super Admin'>{t('SuperAdmin')}</option>
                                                                <option name = 'adminType2'  value='Sub Admin'>{t('SubAdmin')}</option>
                                                            </select>
                                                        </div>

                                                        <div className="field-container">
                                                            <label for="contact-no">{t("trainerFullName")} </label>
                                                            <input onChange={this.handleChange} value={this.state.fullName} type="text" name="fullName" minLength={18} placeholder='full name' required="required" />
                                                            <span className="error-messg"></span>
                                                        </div>

                                                        <div className="field-container">
                                                            <label for="contact-no">{t("contactNo")} </label>
                                                            <input value={this.state.phoneNumber} type="tel" onChange={this.handleChange} name="phoneNumber" id="contact-no" maxLength={9} placeholder="+962" required="required" />
                                                            <span className="error-messg"></span>
                                                        </div>

                                                        <div className="field-container">
                                                            <label for="contact-no">{t("email")} </label>
                                                            <input value={this.state.email} type="text" onChange={this.handleChange} name="email" id="email" maxLength={9} placeholder="email address" required="required" />
                                                            <span className="error-messg"></span>
                                                        </div>

                                                    </div>
                                                )
                                            }
                                        })}



                                        <div className='btnsContainer'>
                                            <button onClick={() => { this.setState({ isUpdateTab: false }) }} class="button danger" >{t('ignore')}</button>
                                            <button type='submit' disabled={this.state.isValidUpdate ? false : true} class="button primary">{t('update')}</button>
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