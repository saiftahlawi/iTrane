import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image,ScrollView,StatusBar,TouchableWithoutFeedback,Platform,PermissionsAndroid} from 'react-native';
import { launchCamera} from 'react-native-image-picker';
import StringsOfLanguages from '../StringsOfLanguages'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class SignUP3 extends React.Component {
    constructor() {
        super()
        this.state = {
            front:require('./img/front.png'),
            back:require('./img/back.png'),
           frontD:undefined,
           backD:undefined,
            resFront:'',
            resback:'',
            err:'',
            Localhost:"192.168.1.13"
        }
    }

    
back =() => {
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

   fetch("http://"+this.state.Localhost+":3000/api/uploadBack", {
      method: "POST",
      body: createFormData(this.state.backD)
      
    })
      .then(response => response.json())
      .then (async(response) => {
        console.log(response)
        try {
        
           AsyncStorage.setItem('@resback', response.message)
        } catch (e) {
          // saving error
          console.log(e)
        }

         this.setState({ backD: null,resback:response.message  });

      })
      .catch(error => {
        console.log("upload error", error);
      });


  };
async Front(){
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
    body: createFormData(this.state.frontD)
    
  })
    .then(response => response.json())
    .then(async(response) => {
      console.log(response)
     this.setState({ frontD: null,resFront:response.message });
     
     try {
    
       AsyncStorage.setItem('@resFront', response.message)
    } catch (e) {
      // saving error
      console.log(e)
    }
    })
    .catch(error => {
      console.log("upload error", error);
    });

    await this.back();

}

async handleUploadPhoto (){
  this.Front();

const frontId=await AsyncStorage.getItem('@resFront')
const RearID=await AsyncStorage.getItem('@resback') 

  await fetch("http://"+this.state.Localhost+":3000/register", {
    method: "POST",
    headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
    body:"password="+this.props.navigation.state.params.first.password
    +"&fullname="+this.props.navigation.state.params.first.fullname
    +"&ID="+this.props.navigation.state.params.first.id
    +"&email="+this.props.navigation.state.params.first.email
    +"&nationality="+this.props.navigation.state.params.first.nationality
    +"&Address="+this.props.navigation.state.params.secound.Address
    +"&Phone="+this.props.navigation.state.params.secound.Phone
    +"&city="+this.props.navigation.state.params.secound.city
    +"&day="+this.props.navigation.state.params.secound.day
    +"&month="+this.props.navigation.state.params.secound.month
    +"&Year="+this.props.navigation.state.params.secound.Year
    +"&TypeOfTranning="+this.props.navigation.state.params.secound.TypeOfTranning
    +"&frontID="+frontId
    +"&RearID="+RearID

  }).then(response => response.json())
  .then(response=> {
    console.log(response.err)

    this.setState({
      err:response.err
    })
  })
  .catch(function(error){console.log(error.message)})




 

}




    render() {
    
  
const regester= ()=>{
 this.handleUploadPhoto().then(alert("We will send the result of your request to an e-mail, thanks "))


 
}




        const requestCameraPermission = async () => {
            if (Platform.OS === 'android') {
              try {
                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.CAMERA,
                  {
                    title: 'Camera Permission',
                    message: 'App needs camera permission',
                  },
                );
        
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
              } catch (err) {
                console.warn(err);
                return false;
              }
            } else return true;
          };
        
          const requestExternalWritePermission = async () => {
            if (Platform.OS === 'android') {
              try {
                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                  {
                    title: 'External Storage Write Permission',
                    message: 'App needs write permission',
                  },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
              } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
              }
              return false;
            } else return true;
          };


        //Front ID
          const captureImage = async (type) => {
            let options = {
              mediaType: type,
              maxWidth: 300,
              maxHeight: 550,
              quality: 1,
              videoQuality: 'low',
              durationLimit: 30, //Video max duration in seconds
              saveToPhotos: true,
            };
            let isCameraPermitted = await requestCameraPermission();
            let isStoragePermitted = await requestExternalWritePermission();
            if (isCameraPermitted && isStoragePermitted) {
              launchCamera(options, (response) => {
              
               if (response.errorCode == 'camera_unavailable') {
                  alert('Camera not available on device');
                  return;
                } else if (response.errorCode == 'permission') {
                  alert('Permission not satisfied');
                  return;
                } else if (response.errorCode == 'others') {
                  alert(response.errorMessage);
                  return;
                }
             
                this.setState({
                    front:{
                        uri:response.uri,
                       
                      },  
                      frontD:response,        
                })
              
             
              });
            }
          };
        
         
        
          //Back ID
          const captureImage2 = async (type) => {
            let options = {
              mediaType: type,
              maxWidth: 300,
              maxHeight: 550,
              quality: 1,
              videoQuality: 'low',
              durationLimit: 30, //Video max duration in seconds
              saveToPhotos: true,
            };
            let isCameraPermitted = await requestCameraPermission();
            let isStoragePermitted = await requestExternalWritePermission();

            if (isCameraPermitted && isStoragePermitted) {
              launchCamera(options, (response) => {
                
        
               if (response.errorCode == 'camera_unavailable') {
                  alert('Camera not available on device');
                  return;
                } else if (response.errorCode == 'permission') {
                  alert('Permission not satisfied');
                  return;
                } else if (response.errorCode == 'others') {
                  alert(response.errorMessage);
                  return;
                }
             
                this.setState({
                    back:{uri:response.uri}  ,
                    backD:response
                })
             
              });
            }

          };
        return (
            <ScrollView style={Styles.component}>
               <StatusBar
        animated={true}
        backgroundColor="#FFD428"

        hidden={false} />
                <View style={Styles.header}>
                    <View style={Styles.backContainer}>
                        <TouchableOpacity onPress={() =>{this.props.navigation.navigate({routeName:'SignUP2'})}}>
                            <Text>  {StringsOfLanguages.third}  </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.headerTextContainer}>
                        <Text style={Styles.h1}>
                        {StringsOfLanguages.sixteen}</Text>
                    </View>
                </View>
<View>
  <View>
  <Text style={{color:'red',margin:5,textAlign:'center'}}>{this.state.err}</Text>
  </View>
                <View style={Styles.con}>
                 
       
        <View style={Styles.imgcon}>
        <View >
            <Text style={{textAlign:"center",marginBottom:'3%',color:'#a3a375'}}>{StringsOfLanguages.seventeen}</Text> 
           
            <Image source={this.state.front} style={Styles.img}  />
     <TouchableWithoutFeedback onPress={() => captureImage('photo')}>
            <Image source={require('./img/camera.png')}  style={{position:'absolute',width:'17%',height:'20%',left:'41%',top:'33%'}} />
</TouchableWithoutFeedback>
        </View>

        <View >
            <Text style={{textAlign:"center",marginBottom:'3%',color:'#a3a375'}}>{StringsOfLanguages.eighteen}</Text> 

            <Image source={this.state.back}  style={Styles.img} />
            <TouchableWithoutFeedback onPress={() => captureImage2('photo')}>
        <Image source={require('./img/camera.png')}  style={{position:'absolute',width:'17%',height:'20%',left:'42%',top:'29%'}} />
        </TouchableWithoutFeedback>
        </View>
        
        </View>
    </View>
    </View>
    <View style={Styles.btnContainer} >
                                    <TouchableOpacity
                                        style={Styles.btn}
                                        onPressIn={regester}
                                        onPressOut={() =>{
                                          if(this.state.err==''){
                                            this.props.navigation.navigate({routeName:'MainPage'})
                                        
                                          }
                                        
                                        }
                                        }
                                        underlayColor='#fff'>
                                        <Text style={Styles.nextText}>{StringsOfLanguages.ninteen}</Text>
                                    </TouchableOpacity>
                                </View>
            </ScrollView>
        )
    }
}

const Styles = StyleSheet.create({
    component: {
        height: '100%',
        width: '100%',
    },
    header: {
      height: 180,
      width: '100%',
      backgroundColor: '#FFD428',
      paddingTop: '15%',
      paddingRight: '5%',
      paddingLeft: '5%'
    },
    backContainer: {
      height: 20,
      position:'absolute',
    left:'5%',
    top:35
    },
    headerTextContainer: {
        marginTop: '9%',
        width: '90%',
    },
    h1: {
        fontWeight: 'bold',
        fontSize: 26,
      },
      img:{
        width:'100%',
        height:'47%',
     
        
    },
    imgcon:{
backgroundColor:'#e0e0d1',
padding:'3%',
borderRadius:7,
width:'85%',


    },
    con:{
        marginTop:"10%",
       alignItems:'center',height:530
    
    },
    btnContainer: {
        width: '100%',
        height: 48,
        marginTop:75,
        marginBottom:20,
     alignItems: 'center',
     

    },
    btn: {
        
      width:'84%',
        height: 48,
        backgroundColor: '#242A37',
        justifyContent: 'center',
       

    },
    nextText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        textTransform: 'uppercase'
    },
});

