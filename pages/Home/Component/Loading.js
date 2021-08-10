
import React from 'react';
import { View, StyleSheet, ActivityIndicator,TouchableOpacity,Text,Image } from 'react-native'

export default class Loading extends React.Component {
  constructor() {
    super()
    this.state={
      isFind:false,
      Trainer:[],
      isloding:true,isStart:false,
      isFinish:false,
      img:'',
      Localhost:"192.168.1.87"
    }
  }



  componentDidMount(){

    fetch("http://"+this.state.Localhost+":3000/findAcecept",{
    method:'POST',
    headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
    body:'ID='+this.props.ID
  }).then(response => response.json())            
  .then(data=>{
  
     this.setState({isFind:data.isFind,Trainer:data.Trainer,isloding:data.isloding,isStart:data.isStart,isFinish:data.isFinish})
     
   })
  .catch(function(error){console.log(error.message)})
  
  }
  
  
  componentDidUpdate(){
  
    fetch("http://"+this.state.Localhost+":3000/findAcecept",{
    method:'POST',
    headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
    body:'ID='+this.props.ID
  }).then(response => response.json())            
  .then(data=>{
    this.setState({isFind:data.isFind,Trainer:data.Trainer,isloding:data.isloding,isStart:data.isStart,isFinish:data.isFinish})
     
   })
  .catch(function(error){console.log(error.message)})
  
  }

  render() {
    return (
      <View style={style.container}>

        {this.state.isloding?
        <View style={style.card}>

        <ActivityIndicator size="large" color="yellow" />

        <View style={{padding:30,paddingBottom:0 ,marginTop:50}}>
                  <TouchableOpacity style={{backgroundColor: '#e74c3c',height:35,borderRadius:5,justifyContent:'center' }}>
                    <Text style={{  textAlign: 'center',
                      
    fontWeight: 'bold',
    color: '#fff',
    }}

    onPress={this.props.cancel}
    >Cancel</Text>
                  </TouchableOpacity>
                </View>
                
        </View>
     :<View></View>
    }

         {this.state.isFind? 
         <View style={style.container}>
         <View style={style.card}>
           <View style={style.top_bar}>
             <View style={style.photoContainer}>
               <View style={style.photoWrapper}>
                 <Image style={style.photo} source={{uri:'http://'+this.state.Localhost+':3000/'+this.state.Trainer.profilePicture}} />
               </View>
             </View>
             <View style={style.nameContainer}>
               <Text style={style.h1}>{this.state.Trainer.fullName}</Text>
               <View style={style.pContainer}><Text style = {style.p}><Text style = {{fontWeight: 'bold'}}>phone Number: </Text>{this.state.Trainer.phoneNumber}</Text></View>
               <View style={style.pContainer}><Text style = {style.p}><Text style = {{fontWeight: 'bold'}}>Car Number: </Text>{this.state.Trainer.viechaleRegistraionPlate}</Text></View>
             </View>
           </View>
           <View style={style.bottom_bar}>
             <View style={style.btnsContainer}>
               <View style={style.btnsContainer}>
             
                   <TouchableOpacity style={{ ...style.btn, backgroundColor: '#e74c3c' }} onPress={this.props.cancel}>
                     <Text style={style.btnText}>Cancel</Text>
                   </TouchableOpacity>
 
               </View>
             </View>
           </View>
         </View>
 
       </View>
       :<View></View>
        
        }


{this.state.isStart? 
         <View style={style.container}>
         <View style={style.card}>
           <View style={style.top_bar}>
             <View style={style.photoContainer}>
               <View style={style.photoWrapper}>
                 <Image style={style.photo} source={{uri:'http://'+this.state.Localhost+':3000/'+this.state.Trainer.profilePicture}} />
               </View>
             </View>
             <View style={style.nameContainer}>
               <Text style={style.h1}>{this.state.Trainer.fullName}</Text>
               <View style={style.pContainer}><Text style = {style.p}><Text style = {{fontWeight: 'bold'}}>phone Number: </Text>{this.state.Trainer.phoneNumber}</Text></View>
               <View style={style.pContainer}><Text style = {style.p}><Text style = {{fontWeight: 'bold'}}>Car Number: </Text>{this.state.Trainer.viechaleRegistraionPlate}</Text></View>
             </View>
           </View>
           <View style={style.bottom_bar}>
             <View style={style.btnsContainer}>
               <View style={style.btnsContainer}>
 
               </View>
             </View>
           </View>
         </View>
 
       </View>
       :<View></View>
        
        }






{this.state.isFinish? 
         <View style={style.container}>
         <View style={style.card}>
           <View style={style.top_bar}>
             <Text>Thanks</Text>
           </View>
           <View style={style.bottom_bar}>
             <View style={style.btnsContainer}>
               <View style={style.btnsContainer}>
               <TouchableOpacity style={{ ...style.btn, backgroundColor: '#e74c3c' }} onPress={this.props.cancel}>
                     <Text style={style.btnText}>Bay</Text>
                   </TouchableOpacity>
               </View>
             </View>
           </View>
         </View>
 
       </View>
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