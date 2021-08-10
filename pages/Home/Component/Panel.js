
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import OpenMap from "react-native-open-map";
import Next from './Next'
export default class Panel extends React.Component {
  constructor() {
    super()
    this.state={
      isRequst:false,
      tranee:[],
      Next:false,
      Training:[],
      start:true,
      End:false,
      Localhost:"192.168.1.87",
      istotal:false
    }
  }

componentDidMount(){

  fetch("http://"+this.state.Localhost+":3000/findRequst",{
  method:'POST',
  headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
  body:'ID='+this.props.ID
}).then(response => response.json())            
.then(data=>{

   this.setState({isRequst:data.isRequst,tranee:data.tranee,Next:data.Next,})
   
 })
.catch(function(error){console.log(error.message)})

}


componentDidUpdate(){

  fetch("http://"+this.state.Localhost+":3000/findRequst",{
  method:'POST',
  headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
  body:'ID='+this.props.ID
}).then(response => response.json())            
.then(data=>{

   this.setState({isRequst:data.isRequst,tranee:data.tranee,Next:data.Next,istotal:data.istotal})
   
 })
.catch(function(error){console.log(error.message)})

}

cancelreq=()=>{
  fetch("http://"+this.state.Localhost+":3000/TrainerCancelsTrainee",{
    method:'POST',
    headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
    body:'ID='+this.props.ID+'&TraineeID='+this.state.tranee.ID
  }).then(()=>{
    this.setState({
      isRequst:false
    })
  
  })            
    



  
 
}


Confirmreq=()=>{

  fetch("http://"+this.state.Localhost+":3000/TrainerAcceptsTrainee",{
  method:'POST',
  headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
  body:'ID='+this.props.ID
})
.then(response => response.json())            
.then(data=>{

 
 this.setState({isRequst:false,Next:data.Next,Training:data.Training})

   
 }).then(()=>{
  OpenMap.show({
    latitude:parseFloat(this.state.Training.end_latitude),
    longitude:parseFloat(this.state.Training.end_longitude),
  });
 },3000)

 
}











  render() {


    
    return (
     
<View>
  {this.state.isRequst?
      <View style={style.container}>
        <View style={style.card}>
          <View style={style.top_bar}>
            <View style={style.photoContainer}>
              <View style={style.photoWrapper}>
                <Image style={style.photo} source={{uri:'http://'+this.state.Localhost+':3000/'+this.state.tranee.profilePicture}} />
              </View>
            </View>
            <View style={style.nameContainer}>
              <Text style={style.h1}>{this.state.tranee.fullName}</Text>
              <View style={style.pContainer}><Text style = {style.p}><Text style = {{fontWeight: 'bold'}}>phone Number: </Text>{this.state.tranee.phoneNumber}</Text></View>
            </View>
          </View>
          <View style={style.bottom_bar}>
            <View style={style.btnsContainer}>
              <View style={style.btnsContainer}>
            
                  <TouchableOpacity style={{ ...style.btn, backgroundColor: '#e74c3c' }} onPress={this.cancelreq}>
                    <Text style={style.btnText}>Cancel</Text>
                  </TouchableOpacity>
                
                <View style={style.btnsContainer}>
                  <TouchableOpacity style={{ ...style.btn, backgroundColor: '#3c75dd' }} onPress={this.Confirmreq} >
                    <Text style={style.btnText}>Confirm</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </View>
        </View>

      </View>
      :<View></View>}




  {this.state.Next||this.state.istotal? <Next start={this.state.start} End={this.state.End} startTraining={this.startTraining} EndTraning={this.EndTraning} tranee={this.state.tranee} traneeId={this.state.tranee.ID} ID={this.props.ID}/>
:<View></View>
  }









      </View>
      
    )
  
  }
}


const style = StyleSheet.create({
  container: {
    width: '100%',
    height: 250,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    padding: 5
  },
  card: {
    flexDirection: 'column',
    padding: 0,
    paddingTop:18,
    width: '90%',
    height: 220,
    margin: 'auto',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.46,

    elevation: 9,
  },
  top_bar: {
    alignSelf: 'center',
    margin: 'auto',
    width: '90%',
    height: 100,
    flexDirection: 'row',
  },
  photoContainer: {
    flex: 1,
    height: '90%',
  },
  photoWrapper: {
    width: 100,
    height: 100,
    position: 'relative'
  },
  photo: {
    position: 'relative',
    flex: 1,
    width: null,
    height: null,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 75
  },
  nameContainer: {
    flex: 2,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'


  },
  h1: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  bottom_bar: {
    alignItems: 'center',
    width: '90%',
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  btnsContaine5r: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',

  },
  btnsContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: '90%'
  },
  btn: {
    justifyContent: 'center',
    textAlign: 'center',
    width: 120,
    height: 40,
    zIndex: 4
  },
  btnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff'
  },
  pContainer: {
    width: '100%',
    paddingLeft: 5,
    paddingRight: 5
  },
  p: {
    textAlign: 'left',
    fontSize: 12
  }

})