import React from 'react'
import './header.css'
import { Translation } from 'react-i18next';


export default class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            isOpened: false,
            date: [],
            isNotification: false,
            Notifications: [],
            isBell: false,
            name: "",
            toggleNotification: false
        }
    }

    handleOutSideClick = e => {
        this.state.isOpened === true? this.setState({isOpened: false}) : this.setState({isOpened: false}) 
    }

    toggleBurger = e => {
        this.setState({
            isOpened: !this.state.isOpened
        })
    }

    handleChangeDot = async e => {
        await fetch('http://localhost:3000/read_notifications')
    }

    removeNotification = async id => {
        const NotificationID = id
        await fetch('http://localhost:3000/remove_notification',
            {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
                body: 'id=' + NotificationID
            }
        )
    }

    componentDidMount() {
        fetch('http://localhost:3000/notifications')
            .then(response => response.json())
            .then(data => {
                const arr = []
                data.map(n => {
                    arr.push(n.isSeen)
                    if (arr.includes(false)) {
                        this.setState({ isBell: true })
                    } else {
                        this.setState({ isBell: false })
                    }
                })
                this.setState({
                    Notifications: data
                })
            })
        var date = new Date().toLocaleString().split(',')[0]
        this.setState({ date: date, name: localStorage.getItem("name"), adminType: localStorage.getItem("adminType")})
    }

    componentDidUpdate() {
        fetch('http://localhost:3000/notifications')
            .then(response => response.json())
            .then(data => {
                const arr = []
                data.map(n => {
                    arr.push(n.isSeen)
                    if (arr.includes(false)) {
                        this.setState({ isBell: true })
                    } else {
                        this.setState({ isBell: false })
                    }
                })
                var date = new Date().toLocaleString().split(',')[0]
                this.setState({
                    Notifications: data,
                    date: date, name: localStorage.getItem("name"), adminType: localStorage.getItem("adminType")
                })
            })
       
  
    }

    toggleNotification = e => {
        this.setState({ isNotification: !this.state.isNotification })
        this.handleChangeDot()
    }

    render() {
        return (
            <Translation>
                {(t) =>
                    <header class="header">
                        <div class="header__avatar">{this.state.name}  <sup style={{ textTransform: 'uppercase', color: '#878787' }}><span style = {{textTransform: 'uppercase'}}>  {t(this.state.adminType)} </span></sup></div>
                        <div id='demo' class="header__avatar">{this.state.date}</div>
                        <div className="bellContainer">
                            <i onClick={() => { this.toggleNotification()  }} style={{ fontSize: 30 }} className="fas fa-bell"></i>
                            {this.state.isBell ? <div className='bellBallContainer'>
                                <div className="bellBall">
                                </div>
                            </div> : false}

                            {this.state.isNotification ?
                                <div className="extendBell"><div className='extendBellContent'>

                                    {this.state.Notifications.map(n =>
                                        <div className='notify' style={n.isSeen === false ? { backgroundColor: '#f5f6fa' } : { background: '#fcfcfc' }}>
                                            <p>{n.title}</p>  <span class='cross' onClick={() => { this.removeNotification(n._id) }}><i class="fas fa-times"></i></span>
                                        </div>
                                    )}
                                </div>  </div> : false}


                        </div>
                    </header>
                }
            </Translation>



        )
    }
}

