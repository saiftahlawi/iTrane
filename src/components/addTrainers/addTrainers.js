import React from 'react'
import './addTrainers.css'
import { Translation } from 'react-i18next';

export default class AddTrainers extends React.Component {
    constructor() {
        super()
        this.state = {
            ID: '',
            fullName: '',
            email: '',
            password: '',
            re_password: '',
            phoneNumber: 962,
            gearType: "Autumatic",
            city: 'Amman',
            viechaleRegistraionPlate: '',
            isValidName: false,
            isValidEmadil: false,
            isValidID: false,
            isValidCardType: false,
            isValidGearType: false,
            isValidPassword: false,
            isValidRePassword: false,
            passwordVisible: false,
            isEmailAv: false,
            success: false
        }
    }

     handleAddTrainer = e => {
         this.setState({
             success: true
         })
         e.preventDefault()
         try {
          
            fetch('http://localhost:3000/add_trainer', 
            {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
                body: 'fullName=' + this.state.fullName + '&email=' + this.state.email + '&password='
                 + this.state.password + '&repassword=' + this.state.re_password + '&phoneNumber=' + this.state.phoneNumber 
                 + '&vrc=' + this.state.viechaleRegistraionPlate + '&city=' + this.state.city
                 + '&admin='+localStorage.getItem("email") + '&gearType=' + this.state.gearType + '&ID=' + this.state.ID
            })
            .then(response => response.json())
            .then(data => {
                if(data.av) {
                    this.setState({
                        isEmailAv: 'Email already exists'
                    }) 
                } else  {
                    window.location.reload();

                }
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

    checkFullName = e => {
        var name = this.state.fullName.toString()
        if (name.length < 18) {
            this.setState({
                isValidName: false
            })
        } else {
            this.setState({
                isValidName: true
            })
        }
    }

    checkID = e => {
        var id = this.state.ID.toString()
        if (id.length < 9) {
            this.setState({
                isValidID: false
            })
        } else {
            this.setState({
                isValidID: true
            })
        }
    }


    handlePasswordVisible = e => {
        this.setState({
            passwordVisible: !this.state.passwordVisible
        })
    }

    v


    render() {
      
        return (
        
            <Translation>
                {(t) =>
                    <div className="main-content">
                        <div className="wrapper">
                            <div className="form-container">
                                <form className = 'AddtrainerForm' onSubmit={this.handleAddTrainer}>

                                    <div className="flex">
                                        <div className="flex-item">

                                        <div className="field-container">
                                                <label for="ID">{t("ID")} <span className="required">*</span></label>
                                                <input maxLength = {9} value={this.state.ID} onKeyUp={this.checkID} type="number" name="ID" onChange={this.handleChange} id="ID" placeholder= {t("ID")} required="required" />
                                                {this.state.ID != '' ? <span className="error-messg">{this.state.isValidID ? false : t("IDError")}</span> : false}
                                            </div>

                                            <div className="field-container">
                                                <label for="full-name">{t("TrainerName")} <span className="required">*</span></label>
                                                <input value={this.state.fullName} onKeyUp={this.checkFullName} type="text" name="fullName" onChange={this.handleChange} pattern="^([a-zA-Z]{2,} ?)+$" id="full-name" placeholder= {t("trainerFullName")} required="required" />
                                                {this.state.fullName != '' ? <span className="error-messg">{this.state.isValidName ? false : t("TrainerName>18")}</span> : false}
                                            </div>


                                            <div className="field-container">
                                                <label for="email">{t("email")} <span className="required">*</span></label>
                                                <input value={this.state.email} onKeyUp={this.checkEmail} onChange={this.handleChange} type="email" name="email" id="email" placeholder={t('email')} required="required" />
                                                {this.state.email != '' ? <span className="error-messg">{this.state.isValidEmadil ? false : t("!email")}</span> : false}
                                                <span className="error-messg"> {this.state.isEmailAv}</span>
                                            </div>

                                            <div className="field-container">
                                                <label for="Viechale registration plate">{t("vrp")} <span className="required">*</span></label>
                                                <input value={this.state.viechaleRegistraionPlate} onChange={this.handleChange} type="text" name="viechaleRegistraionPlate" id="confirm-email" placeholder="Trainer's viechale registration plate" required="required" />
                                                <span className="error-messg"></span>
                                            </div>

                                        </div>
                                        <div className="flex-item">

                                            <div className="field-container">
                                                <label for="contact-no">{t("contactNo")} <span className="required">*</span></label>
                                                <input value={this.state.phoneNumber} onChange={this.handleChange} type="tel" name="phoneNumber" id="contact-no" maxLength={12} placeholder="+962" required="required" />
                                                <span className="error-messg"></span>
                                            </div>

                                            <div className="field-container">
                                                <label for="city">{t("city")} <span className="required">*</span></label>
                                                <select class='select' value={this.state.city} onChange={this.handleChange} name="city" id="contact-no" required="required">
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

                                            <div className="field-container">
                                                <label for="gearType">{t("gearType")} <span className="required">*</span></label>
                                                <select class='select' value={this.state.gearType} onChange={(e)=>{this.setState({gearType:e.target.value})}} name="gearType" id="contact-no" required="required">
                                                    <option value='Autumatic'>{t("Autumatic")}</option>
                                                    <option value='Manual'>{t("Manual")}</option>
                                                </select>
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
                                    <button className='submitBtn button primary' type='Submit' disabled={this.state.isValidName && this.state.isValidEmadil && this.state.isValidPassword &&  this.state.isValidRePassword && this.state.isValidID ? false : true} style={{ opacity: this.state.isValidName && this.state.isValidEmadil && this.state.isValidPassword && this.state.isValidRePassword ? 1 : 0.6 }}>{t("add")}</button>
                                    <button onClick = {this.props.handleComponent} className='submitBtn button danger' type='button'>{t("cancel")}</button>
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