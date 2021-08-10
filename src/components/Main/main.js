
import React from 'react'
import './main.css'
import Header from '../header/header'
import Nav from '../nav/nav'
import Dashboard from '../dashboard/dashboard'
import Login from '../Login/Login'


export default class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            Component: Dashboard
        
        }
    }

    handleComponent = component => {
        this.setState({
            Component: component
        })
    }
    

    render() {

  
            return (
                <body>
                    <div class="grid-container">
                        {/** Burger Menu */}
                        <div class="menu-icon">
                            <i class="fas fa-bars header__menu"></i>
                        </div>
                        <Header />
                        <Nav handleComponent={value => { this.handleComponent(value) }} />
                        {< this.state.Component />}
                    </div>
    
                </body>
    
    
            )

        
   
    }

}
