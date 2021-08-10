
import React, { Component } from 'react';
import {
 
  StyleSheet,
   View,
   Image,
   TouchableOpacity,
   Text,
   Platform

} from 'react-native';
import {request,PERMISSIONS} from 'react-native-permissions';
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import StringsOfLanguages from '../../StringsOfLanguages'
import Panel from './Panel'
import Loading from './Loading'
const geolib = require('geolib');
class Map extends Component {
  
  constructor(){
    super()
    this.state={
      latitude:31.963158,
      longitude:35.930359,
     initialPosition:undefined,
     lastPosition:'unknown',
     Data:[],
     loading:false,
     isfound:false,
     Localhost:"192.168.1.87",
     tranee:[]
    }
  }

 



   componentDidMount () {


   
     
    fetch("http://"+this.state.Localhost+":3000/trainers")
    .then(response => response.json())            
    .then(data=>{
    
     this.setState({Data:data})
    
       
     }).then(()=>{this.requestLocationPermission();})
    
    .catch(function(error){console.log(error.message)})

  
  }





  componentDidUpdate(){
  
     fetch("http://"+this.state.Localhost+":3000/trainers").then(response => response.json())            
     .then(data=>{
      this.setState({Data:data})
      //this.state.Data=data
        
      })
     
     .catch(function(error){console.log(error.message)})
 
    }
  





findTraner=  ()=>{

x=[]

this.state.Data.map(trainer => {
  if(trainer.gearType==this.props.gearType&&trainer.status=="online"){
   x.push({latitude:parseFloat(trainer.coor.latitude),longitude:parseFloat(trainer.coor.longitude)})
  }

  })

 var x= geolib.findNearest({ latitude:this.state.latitude, longitude:this.state.longitude }, x);
 var m=x.latitude+''

 m=m.substring(0, m.length - 1)

//alert(JSON.stringify(m ))



fetch("http://"+this.state.Localhost+":3000/findNearest",{
        method:'POST',
        headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
        body:'latitude='+m+'&longitude='+x.longitude+'&ID='+this.props.ID+'&traneelatitude='+this.state.latitude+'&traneelongitude='+this.state.longitude
      }).then(response => response.json())            
       .then(data=>{
       this.setState({loading:true})
     // alert(JSON.stringify(data))
        })
      .catch(err => { console.log(err) })


}


cancelreq=()=>{

  fetch("http://"+this.state.Localhost+":3000/TraineeCancelsTrainer",{
    method:'POST',
    headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
    body:'ID='+this.props.ID
  })
    .then(()=>{this.setState({
      loading:false
    })})            
    



  
 
}




updatloc=()=>{
  this.requestLocationPermission();
}


requestLocationPermission=async () =>{
if(Platform.OS==='android'){
  var response= await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  console.log('android: '+response)
  if(response==='granted'){
    this.locateCurrentPosition();
  }
}else{
  if(Platform.OS==='ios'){
    var response= await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    console.log('ios: '+response)
    if(response==='granted'){
      this.locateCurrentPosition();
    }
}
}
}

locateCurrentPosition=()=>{

  Geolocation.getCurrentPosition(
    position => {
      try{
    this.map.animateToRegion({
      ...this.state.initialPosition,
      latitude: position.coords.latitude, 
      longitude:position.coords.longitude, 
    })
  }catch(err) {
    console.log(err)
   }
     let region={
      latitude: position.coords.latitude, 
      longitude:position.coords.longitude, 

      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
    if(this.props.userType=="Trainer"){
    fetch("http://"+this.state.Localhost+":3000/ubdateLocation",{
      method:'POST',
      headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
      body:'ID='+this.props.ID+'&latitude='+region.latitude+'&longitude='+region.longitude
     })
     .catch(function(error){console.log(error.message)})
    }

    this.setState({initialPosition:region,latitude:region.latitude,
      longitude:region.longitude})

    },
    error => Alert.alert('Error', JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  );

}


  



  render(){
  

  return (
  <View>
 <MapView
 style={{width:'100%',height:"100%"}}
 provider={PROVIDER_GOOGLE}
 showsUserLocation={true}
 showsMyLocationButton={false}
    region={this.state.initialPosition}
    ref={ref=> this.map=ref}
    
    
  >
   
<MapView.Marker
 coordinate={{ latitude :this.state.latitude , longitude :this.state.longitude }}
 pinColor="yellow"

/>



{ this.state.Data.map((trainer,i) => {
  if(trainer.gearType==this.props.gearType&&trainer.status=="online"){

  return <Marker
    coordinate={{ latitude :parseFloat(trainer.coor.latitude) , longitude :parseFloat(trainer.coor.longitude)}}
    key={i}
    >
      <Image source={require('./img/car.png')} style={{width:55,height:55}}/>
    
      </Marker>
    
 

}
}
)}
   
</MapView>
{this.state.loading?
<View style={{justifyContent: 'center' ,bottom:"50%"}}>
<Loading  cancel={this.cancelreq} ID={this.props.ID}/>
</View>
:<View>

</View>
}

{this.props.userType=="Trainer"?
<View style={{justifyContent: 'center' ,bottom:"50%"}}>
<Panel  ID={this.props.ID}/>
</View>:<View></View>

  }

< TouchableOpacity onPress={this.updatloc}  style={{backgroundColor:'#fff',borderRadius:50,bottom:"45%",alignSelf:'flex-end',marginRight:'7%',alignContent:'center',padding:12,shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.34,
shadowRadius: 6.27,

elevation: 10,}}>

<Image source={require('./img/GPS.png')} style={{width:35,height:35}}/>

</TouchableOpacity>

{this.props.userType=="Trainee"?
< TouchableOpacity style={{backgroundColor:'#FFD428',width:'80%',height:50,borderRadius:5,justifyContent: 'center',position:'absolute' ,bottom:"24%",alignSelf:'center',shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.34,
shadowRadius: 6.27,

elevation: 10,zIndex:50}}
onPress={this.findTraner}
>
<Text style={{ textAlign: 'center',fontSize:18,fontWeight:'bold'}} >{StringsOfLanguages.thirty8}</Text>

</TouchableOpacity>
:<View></View>
}

  </View>
  );
}
};



export default Map;

