import React, { Component } from 'react';
import {TouchableOpacity, StyleSheet, Text, View,ScrollView ,
  TextInput } from 'react-native';

class Help extends Component {
constructor(){
  super()
  this.state={
    massege:"",
  done:"",
  Localhost:"192.168.1.87"
  }
}


send=()=>{
  
  fetch("http://"+this.state.Localhost+":3000/Help",{
    method:'POST',
    headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
    body:'ID=' +this.props.ID+'&massege=' +this.state.massege
  }).then(response => response.json())            
   .then(data=>{
   
    this.setState({done:data.done}
        )
      
    })
  .catch(err => { console.log(err) })

}



  render(){
    

  return (
    <ScrollView style={{backgroundColor: '#fff',}} >
           <View style={styles.header}>
         
          <View style={styles.headerTextContainer}>
            <Text style={styles.h1}>
            Help
    </Text>
          </View>
        </View>
    <View>
    <View style={{margin:15,marginTop:"10%"}}>
    <Text style={{fontSize:20}}>write email message for helping you</Text>
    </View>
    <View style={{margin:15,marginTop:"10%"}}>
    <Text style={{fontSize:18,color:'red'}}>{this.state.done}</Text>
    </View>
    <View style={{alignItems: 'center' ,}}>
   
<View style={styles.container}>

<TextInput
style={{color: 'black' ,}}
     underlineColorAndroid="transparent"
     placeholder="Type something"
     placeholderTextColor="grey"
     numberOfLines={10}
     onChangeText={(e)=>{this.setState({massege:e})}}
     multiline={true}
   />



</View>

<View style={{margin:15,marginTop:"10%"}}>
  
  </View>
<TouchableOpacity
                  style={styles.btn}
                
onPress={this.send}
                  underlayColor='#fff'>
                  <Text style={styles.loginText}>send  </Text>
                </TouchableOpacity>
</View>


    </View>
    
  </ScrollView >
  );
}
};
const styles = StyleSheet.create({
  header: {
    height: 85,
    width: '100%',
    backgroundColor: '#FFD428',
    paddingTop: 10,
    paddingRight: '5%',
    paddingLeft: '5%'
  },

  headerTextContainer: {
    width: '40%',
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 28,
    margin:8,
   paddingBottom:10
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center' ,
    marginTop:20

 },
  TextInput:{ 
    
    width: '100%',
    height: 38,
    marginTop: 5,
    paddingLeft: 10,
    fontWeight: 'bold',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  container:{
    width: '90%',
    backgroundColor: '#fff',
    padding:20,
    
     alignItems: 'center' ,
     paddingTop:15,
     paddingBottom:20,
     shadowColor: "#000",
     shadowOffset: {
       width: 0,
       height: 2,
     },
     shadowOpacity: 0.83,
     shadowRadius: 2.62,
     
     elevation: 4,
  },

  btnContainer: {
    width: '100%',
    height: 48,
    marginTop: 45,
    justifyContent: 'center',
    alignItems: 'center',
  
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 7,
},
shadowOpacity: 0.43,
shadowRadius: 9.51,

elevation: 15,
  },
  btn: {
    textAlign: 'center',
    width: '85%',
    height: 48,
    backgroundColor: '#242A37',
    justifyContent: 'center',

  },
  loginText: {
    textAlign: 'center',
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'uppercase'
  },
txtform:{
  marginTop: 18,
  fontSize:16,
  alignSelf:'flex-start',
  color:'grey'
}, form: {
  width: '100%',
  height: '100%',
  
  alignItems: 'center',
},
});

export default Help;



/*



*/