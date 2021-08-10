import React from 'react'
import Drawers from './Component/Drawer'


class Home extends React.Component {
    constructor() {
      super()
      this.state={

      }
     
  
    }

    
    render() {

    
      

      return (
  
        <Drawers screen={this.props.navigation.state.params.screen} x={this.props.navigation.state.params.nav} ID={this.props.navigation.state.params.ID} userType={this.props.navigation.state.params.userType}/>
  
    
      )
    }
  }
  // 
  export default Home