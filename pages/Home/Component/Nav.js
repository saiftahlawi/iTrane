import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons'
import React, { Component } from 'react';
import EditProfile from './EditProfile'
import StringsOfLanguages from '../../StringsOfLanguages'
import  { StyleSheet, Text, TouchableOpacity, View,StatusBar,Image,ScrollView} from 'react-native'
import PropTypes from 'prop-types'; 
   import Map from './Map'
   import Payment from './Payment'
   import Help from './Help'
   import Inbox from './Inbox'
   import {
    launchImageLibrary
  } from 'react-native-image-picker';
 class Nav extends Component {
    static propTypes = {
      closeDrawer: PropTypes.func.isRequired
    };
    constructor() {
        super()
        this.state = {
            isToggled: true,
            NoH: 30,
            fullName:'',
            phoneNumber:"",
            Endshours:undefined,
             profileimg:'',
             resimg:'',
             gearType:"",
             Localhost:"192.168.1.87",
             isExamRequest:false
        }
     
    }
  
  
  
    
    handlereserveExam = ()=> {
        if(this.state.NoH < 60) {
            alert('Your training hours must be qual 60 hours')
        } else {
           
            fetch("http://"+this.state.Localhost+":3000/traineeRequestsExam",{
                method:'POST',
                headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
                body:'ID='+this.props.x.ID+"&userName="+this.state.fullName
        }).then(response => response.json())            
        .then(data=>{
            alert(data.massege)
             
         })
       .catch(err => { console.log(err) })
    }
    }
 componentDidMount(){

if(this.props.x.userType=="Trainee"){

    fetch("http://"+this.state.Localhost+":3000/NavRetreve",{
        method:'POST',
        headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
        body:'ID='+this.props.x.ID
      }).then(response => response.json())            
       .then(data=>{
   
            this.setState({fullName:data.fullName,phoneNumber:data.phoneNumber,NoH:data.Endshours,gearType:data.TypeOfTranning,isExamRequest:data.isExamRequest ,
                profileimg:{
                uri: 'http://'+this.state.Localhost+':3000/'+data.profilePicture,
                 }
            }
                )
          
        })
      .catch(err => { console.log(err) })

   }else{
    fetch("http://"+this.state.Localhost+":3000/TrainerNavRetreve",{
        method:'POST',
        headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
        body:'ID='+this.props.x.ID
      }).then(response => response.json())            
       .then(data=>{
   
        this.setState({fullName:data.fullName,phoneNumber:data.phoneNumber,gearType:data.TypeOfTranning,profileimg:{
          uri: 'http://'+this.state.Localhost+':3000/'+data.profilePicture,
           }}
            )
        })
      .catch(err => { console.log(err) })
   }
}

componentDidUpdate(){
    if(this.props.x.userType=="Trainee"){

        fetch("http://"+this.state.Localhost+":3000/NavRetreve",{
            method:'POST',
            headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
            body:'ID='+this.props.x.ID
          }).then(response => response.json())            
           .then(data=>{
           
   
            this.setState({fullName:data.fullName,phoneNumber:data.phoneNumber,NoH:data.Endshours,gearType:data.TypeOfTranning,isExamRequest:data.isExamRequest ,
                profileimg:{
                uri: 'http://'+this.state.Localhost+':3000/'+data.profilePicture,
              }}
                )
          
           
            })
          .catch(err => { console.log(err) })
    
       }else{
        fetch("http://"+this.state.Localhost+":3000/TrainerNavRetreve",{
            method:'POST',
            headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
            body:'ID='+this.props.x.ID
          }).then(response => response.json())            
           .then(data=>{
       
            this.setState({fullName:data.fullName,phoneNumber:data.phoneNumber,gearType:data.TypeOfTranning,profileimg:{
              uri: 'http://'+this.state.Localhost+':3000/'+data.profilePicture,
               }}
                )
            })
          .catch(err => { console.log(err) })
       }
}


Logout=()=>{
  fetch("http://"+this.state.Localhost+":3000/Logout", {
    method: "POST",
    headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
    body:'ID='+this.props.x.ID
    
  })
    .then(response => response.json())
    .then (response => {
if(response.Next){

  this.props.x.x.navigation.navigate('MainPage')

    }
  
  })
    .catch(error => {
      console.log("err ");
    });
}
    render() {
     
       const traneeImg=(img)=>{
            fetch("http://"+this.state.Localhost+":3000/ProfileImgTranee", {
                method: "POST",
                headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
                body:'ID='+this.props.x.ID
                     +"&imgP="+img
                
              }) .then(response => response.json())
              .then(res => {
                  console.log(res)
              })
          } 

          const trainerImg=(img)=>{
            fetch("http://"+this.state.Localhost+":3000/ProfileImgTrainer", {
                method: "POST",
                headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
                body:'ID='+this.props.x.ID
                     +"&imgP="+img
                
              }) .then(response => response.json())
              .then(res => {
                  console.log(res)
              })
          } 

        const chooseFile = (type) => {
            let options = {
              mediaType: type,
              maxWidth: 300,
              maxHeight: 550,
              quality: 1,
            };
            launchImageLibrary(options, (response) => {
        
              if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
              } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
              } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
              } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
              }
   

              const createFormData = (photo) => {
                const data = new FormData();
              
                data.append("photo", {
                  name: photo.fileName,
                  type: photo.type,
                  uri:
                    Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
                });
            
                return data;
              };

           
    fetch("http://"+this.state.Localhost+":3000/api/uploadFront", {
    method: "POST",
    body: createFormData(response)
    
  })
    .then(response => response.json())
    .then(async(res) => {
      if(this.props.x.userType=="Trainee"){
        await traneeImg(res.message)
      }else{
        await trainerImg(res.message)
      }
    
        this.setState({
            profileimg:{uri:response.uri}  ,
            imgD:response
        })
     
     
    })
    .catch(error => {
      console.log("upload error", error);
    });
           console.log(response)
         
        
            });
          };

      let {closeDrawer} = this.props
      return (
        <ScrollView style={Styles.toggleOnBar}>
          
             <StatusBar
        animated={true}
        
        backgroundColor="#FFD428"

        hidden={false} />
        <View style = {Styles.slidedataContainer}>
        <View style = {Styles.userProfileContainer}>
        <TouchableOpacity  onPress={() => chooseFile('photo')} ><Image source={this.state.profileimg} style={{width:80,height:80,borderRadius:50}} /></TouchableOpacity>
        <View style = {Styles.traineeinfoContainer}>
        <Text style = {Styles.traineeinfo}><Text style = {{color: '#FFD428'}}>{this.state.fullName}</Text></Text>
        {this.props.x.userType=="Trainee"? <Text style = {Styles.traineeinfo}><Text style ={Styles.hoursText}><Text style = {{fontWeight: 'bold'}}>{this.state.NoH}</Text> hours completed</Text></Text>:<Text style={{display:'none'}}></Text>}
        <Text style = {{...Styles.traineeinfo}, Styles.phone}>Phone: <Text style ={ {fontWeight: 'normal'}}>+962 {this.state.phoneNumber}</Text></Text> 
        </View>
        </View>

        <View style = {Styles.line}>

        </View>
        <View style = {Styles.ul}>
        <View>

        <TouchableOpacity style = {Styles.liContainer} onPress={() =>{this.props.x.x.navigation.navigate('Home',{nav:this.props.x.x,screen:<Map userType={this.props.x.userType} gearType={this.state.gearType} ID={this.props.x.ID}/>,})}}>
        <Text style = {Styles.li}><AntDesign style = {Styles.liIcons} name = 'home' />{StringsOfLanguages.fourty}</Text>
        </TouchableOpacity>

        {this.props.x.userType=="Trainee"? 
            <TouchableOpacity onPress={() =>{this.props.x.x.navigation.navigate('Home',{nav:this.props.x.x,screen:<EditProfile ID={this.props.x.ID}/>})}}  style = {Styles.liContainer} >
        <Text style = {Styles.li}><AntDesign style = {Styles.liIcons} name = 'account-edit' /> {StringsOfLanguages.Editprofile}</Text>
        </TouchableOpacity>:
        <Text style={{display:'none'}}></Text>
    }
         {this.props.x.userType=="Trainee"&&this.state.isExamRequest==false? 
        <TouchableOpacity onPress = {this.handlereserveExam} style = {Styles.liContainer} >
        <Text style = {Styles.li}><AntDesign style = {Styles.liIcons} name = 'car-key' /> {StringsOfLanguages.fourty1}</Text>
        </TouchableOpacity>:
        <Text style={{display:'none'}}></Text>
    }

     

        <TouchableOpacity style = {Styles.liContainer}  onPress={() =>{this.props.x.x.navigation.navigate('Home',{nav:this.props.x.x,screen:<Inbox ID={this.props.x.ID}/>})}}>
        <Text style = {Styles.li}><AntDesign style = {Styles.liIcons} name = 'bell-outline' />  {StringsOfLanguages.bell}</Text>
        </TouchableOpacity>


        <TouchableOpacity style = {Styles.liContainer}  onPress={() =>{this.props.x.x.navigation.navigate('Home',{nav:this.props.x.x,screen:<Payment/>})}}>
        <Text style = {Styles.li}><AntDesign style = {Styles.liIcons} name = 'credit-card' />  {StringsOfLanguages.payment}</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {Styles.liContainer}  onPress={() =>{this.props.x.x.navigation.navigate('Home',{nav:this.props.x.x,screen:<Help ID={this.props.x.ID}/>})}}> 
        <Text style = {Styles.li}><AntDesign style = {Styles.liIcons} name = 'help' />  {StringsOfLanguages.fourty4}</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {Styles.liContainer} onPress={this.Logout} >
        <Text style = {Styles.li}><AntDesign style = {Styles.liIcons} name = 'logout' />  {StringsOfLanguages.fourty5}</Text>
        </TouchableOpacity>

        </View>
        </View>
        </View>
        </ScrollView>
      )
    }
  }
  const Styles = StyleSheet.create({


    toggleOnBar: {
        zIndex:140,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        position: 'absolute',
  
        shadowColor: "#000", 
        shadowOffset:{ 
        width: 0, 
        height: 7, 
        }, 
        shadowOpacity: 0.50, 
        shadowRadius: 9.51, 
        elevation: 15,
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
 
  
    slidedataContainer: {
        width: '100%',
        height: '100%',
    },
    userProfileContainer: {
        paddingTop: 28,
        paddingLeft: 25,
    },
    avatar: {
        fontSize: 60,
    },
    traineeinfoContainer: {
        width: '90%',
    },
    traineeinfo: {
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: 10,    
    },
    phone: {
        color: '#5e5e5e',
        marginTop: 10,
    },
    hoursText: {
        fontSize: 12,
        fontWeight: 'normal',
        textTransform: 'uppercase'
    },
    line: { 
        width: '100%',
        height: 2,
        backgroundColor: '#e3e3e3',
        marginTop: 30
    },
    ul: {
        paddingLeft: 25,
    },
    liContainer: {
        marginTop: 20,
        alignSelf: 'flex-start' 
    },
    li: {
        fontSize: 24,
        fontWeight: '400'
    },
    liIcons: {
        fontSize: 24,
    },


});


export default Nav