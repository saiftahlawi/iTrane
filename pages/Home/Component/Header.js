import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons'
import React, { Component } from 'react';
import  {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native'
import PropTypes from 'prop-types';
import Payment from './Payment'
export default class Main extends Component {

  static contextTypes = {
    drawer: PropTypes.object.isRequired,
  };

  render() {
    x=Dimensions.get('window').height
    return (
      <View style={styles.container}>
     <View style={Styles.header}>
                    <View style={Styles.upperBar}>
                        <TouchableOpacity  onPress={this.context.drawer.open} style={Styles.Burgers}>
                            <View style={Styles.burger}></View>
                            <View style={Styles.burger}></View>
                            <View style={Styles.burger}></View>
                        </TouchableOpacity>

                        <TouchableOpacity style={Styles.walletContainer}  onPress={() =>{this.props.x.x.navigation.navigate('Home',{nav:this.props.x.x,screen:<Payment/>})}}>
                        <AntDesign style = {{fontSize:35,paddingTop:1}} name = 'credit-card' />
                        </TouchableOpacity>

                    </View>
                  
                </View>
                <View style={{height:x}}>
                {this.props.screen}
                </View>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  
 height:'100%'
  },

})


const Styles = StyleSheet.create({

  header: {
      height: 80,
      width: '100%',
      backgroundColor: '#FFD428',
      paddingTop: '4%',
   borderRadius:5
  },
  upperBar: {
      width: '100%',
      justifyContent: 'center',
      height: 50
  },
  Burgers: {
      width: 30,
      marginLeft: 20
  },
  burger: {
      width: 30,
      height: 3,
      backgroundColor: '#000',
      marginTop: 4
  },
  walletContainer: {
      width: 50,
      marginRight: 6,
      position:'absolute',
      right:0
      
  },
 



});