import React from 'react'
import './admins.css'
import { Translation } from 'react-i18next';

export default class Admin extends React.Component {
    constructor() {
        super()
        this.state = {
            fullName: '',
            email: '',
            password: '',
            re_password: '',
            phoneNumber: 962,
            adminType: null,
            isAdminType: false,
            isValidName: false,
            isValidEmadil: false,
            isValidPassword: false,
            isValidRePassword: false,
            passwordVisible: false,
            isEmailAv: false,
            success: false
        }
    }

    handleAddAdmin = e => {
        e.preventDefault()
        this.setState({
            success: true
        })
        try {

            fetch('http://localhost:3000/add_new_admin',
                {
                    method: 'POST',
                    headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
                    body: 'fullName=' + this.state.fullName + '&email=' + this.state.email + '&password='
                        + this.state.password + '&phoneNumber=' + this.state.phoneNumber +
                        '&adminType=' + this.state.adminType
                        + '&admin=' + localStorage.getItem("email")
                })
                .then(response => response.json())
                .then(data => {
                    if (data.av) {
                        this.setState({
                            isEmailAv: 'Email already exists'
                        })
                    } else {
                        window.location.reload();

                    }
                })
        } catch (e) {
            console.error(e)
        }
    }

    handleChange = e => {
        if (e.target.name === 'adminType') {
            this.setState({
                isAdminType: true
            })
        }
        if (e.target.name == 'phoneNumber') {
            this.setState({
                phoneNumber: e.target.value
            })
            if (this.state.phoneNumber.toString().length === 12) {
                return false
            }

        }
        else {
            this.setState({
                [e.target.name]: [e.target.value]
            })
        }
    }

    checkEmail = e => {
        if (this.state.email !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (pattern.test(this.state.email)) {
                this.setState({
                    isValidEmadil: true
                })
            } else {
                this.setState({
                    isValidEmadil: false
                })

            }
        }
    }

    CheckPassword = e => {
        var paswd = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/i);

        if (paswd.test(this.state.password)) {
            this.setState({
                isValidPassword: true
            })
        } else {
            this.setState({
                isValidPassword: false
            })
        }
    }

    checkRePassword = e => {
        if (this.state.re_password.toString() === this.state.password.toString()) {
            this.setState({
                isValidRePassword: true
            })
        } else {
            this.setState({
                isValidRePassword: false
            })
        }
    }

    checkFullName = e => {
        var name = this.state.fullName.toString()
        if (name.length < 10) {
            this.setState({
                isValidName: false
            })
        } else {
            this.setState({
                isValidName: true
            })
        }
    }


    handlePasswordVisible = e => {
        this.setState({
            passwordVisible: !this.state.passwordVisible
        })
    }

    render() {

        return (

            <Translation>
                {(t) =>
                    <div className="main-content" style={{ margin: '100px auto' }}>
                        <div className="wrapper">
                            <div className="form-container">
                                <form className='AddtrainerForm' onSubmit={this.handleAddAdmin}>

                                    <div className="flex">
                                        <div className="flex-item">

                                            <div className="field-container">
                                                <label for="full-name">{t("AdminFullName")} <span className="required">*</span></label>
                                                <input value={this.state.fullName} onKeyUp={this.checkFullName} type="text" name="fullName" onChange={this.handleChange} pattern="^([a-zA-Z]{2,} ?)+$" id="full-name" placeholder={t("AdminFullName")} required="required" />
                                                {this.state.fullName != '' ? <span className="error-messg">{this.state.isValidName ? false : t("AdminName>10")}</span> : false}
                                            </div>


                                            <div className="field-container">
                                                <label for="email">{t("email")} <span className="required">*</span></label>
                                                <input value={this.state.email} onKeyUp={this.checkEmail} onChange={this.handleChange} type="email" name="email" id="email" placeholder={t('email')} required="required" />
                                                {this.state.email != '' ? <span className="error-messg">{this.state.isValidEmadil ? false : t("!email")}</span> : false}
                                                <span className="error-messg"> {this.state.isEmailAv}</span>
                                            </div>


                                        </div>
                                        <div className="flex-item">

                                            <div className="field-container">
                                                <label for="contact-no">{t("contactNo")} <span className="required">*</span></label>
                                                <input value={this.state.phoneNumber} onChange={this.handleChange} type="tel" name="phoneNumber" id="contact-no" maxLength={12} placeholder="+962" required="required" />
                                                <span className="error-messg"></span>
                                            </div>


                                            <div className="field-container">
                                                <label for="passkey">{t("password")} <span className="required">*</span></label>
                                                <div className="passkey-box">
                                                    <input value={this.state.password} onChange={this.handleChange} onKeyUp={this.CheckPassword} type={this.state.passwordVisible ? "text" : "password"} onChange={this.handleChange} name="password" id="passkey" className="passkey" placeholder={t("password")} required="required" />
                                                    <span onMouseDown={this.handlePasswordVisible} className="passkey-icon" data-display-passkey="off"><i className="fas fa-eye"></i>  </span>
                                                </div>
                                                {this.state.password != '' ? <span className="error-messg"><span className="error-messg">{this.state.isValidPassword ? false : t("!password")}</span></span> : false}
                                            </div>
                                            {this.state.isValidPassword && this.state.password != '' ?
                                                <div className="field-container">
                                                    <label for="confirm-passkey">{t("rePassword")} <span className="required">*</span></label>
                                                    <div className="passkey-box">
                                                        <input value={this.state.re_password} type={this.state.passwordVisible ? "text" : "password"} onChange={this.handleChange} onKeyUp={this.checkRePassword} name="re_password" className="passkey" id="confirm-passkey" placeholder={t("rePassword")} required="required" />
                                                        <span className="passkey-icon" data-display-passkey="off"><i className="fas fa-eye"></i></span>
                                                    </div>
                                                    {this.state.isValidRePassword === true ? false : <span className="error-messg">{t("passNotMatch")}</span>}
                                                </div>
                                                : false}
                                        </div>

                                        <div className="flex-item">

                                            <div className="field-container">
                                                <label for="contact-no">{t("AdminType")} <span className="required">*</span></label>
                                                <form onChange={this.handleChange}>
                                                    <label style={{ display: 'inline-block' }} >{t('SuperAdmin')}</label>
                                                    <input type="radio" name="adminType" id="superAdmin" value="Super admin" /><br />
                                                    <label for="other">{t('SubAdmin')}</label>
                                                    <input type="radio" name="adminType" id="subAdmin" value="Sub admin" /><br /><br />
                                                </form>

                                                <span className="error-messg"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='submitBtnContainer'>
                                        <button className='submitBtn button primary' type='Submit' disabled={this.state.isValidName && this.state.isValidEmadil && this.state.isValidPassword && this.state.isValidRePassword && this.state.isAdminType ? false : true} style={{ opacity: this.state.isValidName && this.state.isValidEmadil && this.state.isValidPassword && this.state.isValidRePassword && this.state.isAdminType ? 1 : 0.6 }}>{t("add")}</button>
                                        <button onClick={this.props.handleComponent} className='submitBtn button danger' type='button'>{t("cancel")}</button>
                                    </div>
                                </form>
                            </div>

                        </div>

                    </div>

                }
            </Translation>
        )
    }
}