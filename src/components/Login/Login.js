import React, { Component } from 'react'
import './index.css'
import Main from '../Main/main'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      err: '',
      loggedIn: "false"
    }
  }

  handeleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleLogin = (e) => {
    e.preventDefault()

    fetch("http://localhost:3000/admin_login", {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
      body: 'email=' + this.state.email + '&password=' + this.state.password
    }).then(response => response.json())
      .then(data => {
        localStorage.setItem("loggedIn", data.status)
        localStorage.setItem("email", this.state.email)
        localStorage.setItem("name", data.fullName)
        localStorage.setItem("adminType", data.adminType)
        localStorage.setItem("lang", "en")
        this.setState({ loggedIn: data.status, err: data.err })
      })
      .catch(err => { console.log(err) })

    // this.setState({loggedIn:data.loggedIn,err:data.err })

  }

  render() {

    if (localStorage.getItem("loggedIn") == "false") {
      return (
        <div className="Mycontainer">
          <div className="forms-container">
            <div className="signin-signup">
              <form onSubmit={this.handleLogin} className="sign-in-form">
                <h2 className="title">Sign in</h2>
                <p style={{ color: 'red' }}>{this.state.err}</p>
                <div className="input-field">

                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="Email" value={this.state.email} onChange={e => { this.setState({ email: e.target.value }) }} />
                </div>
                <div className="input-field">

                  <i className="fas fa-lock"></i>
                  <input type="password" placeholder="Password" value={this.state.password} onChange={e => { this.setState({ password: e.target.value }) }} />
                </div>
                <input value="Login" type="submit" className="btn solid" />

              </form>

            </div>
          </div>

          <div className="panels-container">
            <div className="panel left-panel">

              <img src="img/DVLD.png" className="image" alt="" />
            </div>

          </div>
        </div>
      )

    } else {

      return (

        <Main />

      )

    }

  }
}
export default Login