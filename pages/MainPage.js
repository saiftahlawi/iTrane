
import React,{useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import StringsOfLanguages from './StringsOfLanguages';

const MainPage= (props)  => {
  const [language, setSelectedlang] = useState("en");


  const  settext =  (value) => {
   StringsOfLanguages.setLanguage(value);



 

  };
 

  async function changelang(e){
    setSelectedlang(e)
  
    await settext (e)
  }
  return (
  
   <SafeAreaView style={styles.con}>
  <StatusBar
        animated={true}
        backgroundColor="#fff"
        
        hidden={false} />


 
              <View style={{width:"100%",height:20}} >

<Picker
    
    selectedValue={language}
    style={{ height: 50, width: 140,borderColor:'black',borderWidth:1,alignSelf:'flex-end' }}
    onValueChange={changelang}

  >
    <Picker.Item label='English' value='en'  />
    <Picker.Item label='Arabic' value='ar'  />

  </Picker>

              </View>
              
     



     <View >
<Image
        style={styles.tinyLogo}
        source={require('../imgs/logo.png')}
      />
      </View>
      <View style={{marginTop:"30%",}}>
<TouchableOpacity onPress={() =>{props.navigation.navigate({routeName:'SignUP1'})}} style={{backgroundColor:"#FFD428",width:250,height:50,justifyContent:'center'}}>
<Text style={{color:"#000000",textAlign:'center',fontWeight:'bold',fontSize:16}}>{StringsOfLanguages.first}</Text>
</TouchableOpacity>
<View style={{height:35}}>

</View>
<TouchableOpacity onPress={() =>{props.navigation.navigate({routeName:'Login'})}} style={{backgroundColor:"#242A37",width:250,height:50,justifyContent:'center'}}>
<Text style={{color:"#FFFFFF",textAlign:'center',fontWeight:'bold',fontSize:16}}>{StringsOfLanguages.second}</Text>
</TouchableOpacity>
      </View>
      <View style={{ width:"100%"}}>
      <Image
        style={styles.footer}
        source={require('../imgs/amman.png')}
      />
        </View>
     
   </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
 
    tinyLogo: {
      width: 210,
      height: 226,
      marginTop:'10%',
      marginLeft:10
    },
    con:{
      backgroundColor:"#FFFFFF",
      width:'100%',
      height:"100%",
      alignItems: 'center',
      
     
    },
    
    footer:{
      marginTop:"7%",
      width:"100%",
      height:148,
   

    }
});

export default MainPage;


