import React, { Component } from 'react';
import { 
  StyleSheet, View,
} from 'react-native'
import Drawer from 'react-native-drawer'

import Header from './Header'
import Nav from './Nav'


export default class Drawers extends Component {
  constructor(){
    super()
    this.  state={
      drawerOpen: false,
      drawerDisabled: false,
   
    };
    console.disableYellowBox = true;

  }

  closeDrawer = () => {
    this._drawer.close()
  };
  openDrawer = () => {
    this._drawer.open()
  };
  
  render() {
   
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="static"
        content={
          <Nav closeDrawer={this.closeDrawer}  x={this.props} />
        }
        acceptDoubleTap
        styles={{main: {shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13}}}
        onOpen={() => {
          this.setState({drawerOpen: true})
        }}
        onClose={() => {
          this.setState({drawerOpen: false})
        }}
        tweenDuration={100}
        panThreshold={0.08}
        disabled={this.state.drawerDisabled}
        openDrawerOffset={0.2}
        panOpenMask={0.2}
        negotiatePan
        >
          <View style={{height:"100%"}}>
          <Header screen={this.props.screen}  x={this.props} />
          </View>
      
      </Drawer>
    )
  }
}

