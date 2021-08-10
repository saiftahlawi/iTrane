import React from 'react'
import './settings.css'
import { Translation } from 'react-i18next';

export default class Settings extends React.Component {
    constructor() {
        super()
        this.state = {
            fullName: '',
            email: '',
            password: '',
            re_password: '',
            phoneNumber: 962,
            isValidEmail: true,
            isValidPassword: true,
            isValidRePassword: false,
            passwordVisible: false,
            isEmailAv: false,
            success: false
        }
    }


    componentDidMount() {
        fetch('http://localhost:3000/get_current_admin', 
        {
            method:'POST',
            headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
            body: 'email='+localStorage.getItem("email")
           
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                fullName: data.result.fullName,
                email: data.result.email,
                phoneNumber: data.result.phoneNumber,
                password: data.result.password
            })

        })
    }

     handleUpdateAdmin = e => {
         this.setState({
             success: true
         })
         e.preventDefault()
         try {
            fetch('http://localhost:3000/update_current_admin', 
            {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
                body: 'fullName=' + this.state.fullName + '&email=' + this.state.email + '&password='
                 + this.state.password + '&repassword=' + this.state.re_password + '&phoneNumber=' + this.state.phoneNumber 
            })
            .then(response => response.json())
            .then(data => {
                    window.location.reload();

            })
         } catch(e) {
             console.error(e)
         }
    }

    handleChange = e => {
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
                    isValidEmail: true
                })
            } else {
                this.setState({
                    isValidEmail: false
                })

            }
        }
    }

    CheckPassword = e => {
        var paswd =new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/i);

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



    handlePasswordVisible = e => {
        this.setState({
            passwordVisible: !this.state.passwordVisible
        })
    }


    render() {
      
        return (
        
            <Translation>
                {(t) =>
                    <div id = 'settingsMainContainer' className="main-content">
                        <div className="wrapper">
                            <div className="form-container">
                                <form className = 'AddtrainerForm' onSubmit={this.handleUpdateAdmin}>

                                    <div className="flex">
                                        <div className="flex-item">

                                            <div className="field-container">
                                                <label for="full-name">{t("TrainerName")} <span className="required">*</span></label>
                                                <input value={this.state.fullName} onKeyUp={this.checkFullName} type="text" name="fullName" onChange={this.handleChange} pattern="^([a-zA-Z]{2,} ?)+$" id="full-name" placeholder= {t("trainerFullName")} required="required" />
                                            </div>


                                            <div className="field-container">
                                                <label for="email">{t("email")} <span className="required">*</span></label>
                                                <input value={this.state.email} onKeyUp={this.checkEmail} onChange={this.handleChange} type="email" name="email" id="email" placeholder={t('email')} required="required" />
                                                {this.state.email != '' ? <span className="error-messg">{this.state.isValidEmail ? false : t("!email")}</span> : false}
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
                                                    <input value={this.state.password} onChange={this.handleChange} onKeyUp={this.CheckPassword} type={this.state.passwordVisible ? "text" : "password"} onChange={this.handleChange} name="password" id="passkey" className="passkey" placeholder= {t("password")} required="required" />
                                                    <span onMouseDown={this.handlePasswordVisible} className="passkey-icon" data-display-passkey="off"><i className="fas fa-eye"></i>  </span>
                                                </div>
                                                {this.state.password!= '' ? <span className="error-messg"><span className="error-messg">{this.state.isValidPassword ? false : t("!password")}</span></span> : false}
                                            </div>
                                            {this.state.isValidPassword && this.state.password != '' ?
                                                <div className="field-container">
                                                    <label for="confirm-passkey">{t("rePassword")} <span className="required">*</span></label>
                                                    <div className="passkey-box">
                                                        <input value={this.state.re_password} type={this.state.passwordVisible ? "text" : "password"} onChange={this.handleChange} onKeyUp={this.checkRePassword} name="re_password" className="passkey" id="confirm-passkey" placeholder= {t("rePassword")} required="required" />
                                                        <span className="passkey-icon" data-display-passkey="off"><i className="fas fa-eye"></i></span>
                                                    </div>
                                                    {this.state.isValidRePassword === true ? false : <span className="error-messg">{t("passNotMatch")}</span>}
                                                </div>
                                                : false}
                                        </div>
                                    </div>
                                    <div className='submitBtnContainer'>
                                    <button className='submitBtn button primary' type='Submit' disabled={this.state.isValidEmail && this.state.isValidPassword && this.state.isValidRePassword ? false : true} style={{ opacity: this.state.isValidEmail && this.state.isValidPassword && this.state.isValidRePassword ? 1 : 0.6 }}>{t("update")}</button>
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