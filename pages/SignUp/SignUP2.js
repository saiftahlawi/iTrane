

import React, { Component } from 'react';
import {StyleSheet,ScrollView, View,Text,TouchableOpacity,TextInput,StatusBar} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup'
import StringsOfLanguages from '../StringsOfLanguages'
class SignUP2 extends Component {
  constructor(){
    super()
    this.state={
      day:'0',
      month:'0',
      Year:'0',
      city:"city",
      TypeOfTranning:"TypeOfTranning",
      values:{},err:"",
      Localhost:"192.168.1.13"

    }
    
}
  dayOB=(start, end)=> {
    const options = [];

    for(let i = start; i <= end; i++) {
        options.push(<Picker.Item label={i+''} value={i+''} key={i}  />)
    }

    return options;
}

YearOB=(start, end)=> {
  const options = [];

  for(let i=start; i >=end; i--) {
      options.push(<Picker.Item label={i+''} value={i+''} key={i}  />)
  }

  return options;
}


  render(){
    const SignupSchema=()=>{
      const schema= Yup.object().shape({
    
    
        Address:Yup.string().required('Required'),
        Phone:Yup.string().required('Required')
        .matches( /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Phone number is not valid'),
       
    
    })
     return schema;
    }



  return (
   <ScrollView style={{backgroundColor:'#ffffff'}}>
      <StatusBar
        animated={true}
        backgroundColor="#FFD428"

        hidden={false} />
     <View style={styles.header}>
          <View style={styles.backContainer}>
            <TouchableOpacity onPress={() =>{this.props.navigation.navigate({routeName:'SignUP1'})}}>
              <Text>  {StringsOfLanguages.third} </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.h1}>
            {StringsOfLanguages.first}
    </Text>
          </View>
        </View>
       
        <View style={{alignItems:'center'}}>
<Text style={{color:'red',fontSize:16,marginTop:2,textAlign:'center'}}>{this.state.err}</Text>
    </View>

<View >
      
          <Formik style={styles.formik} 
          initialValues={{ Address: '',Phone:'',city:'city',day:'0',month:'0',Year:'0',TypeOfTranning:'TypeOfTranning' }}
            
            validationSchema={SignupSchema} 
            onSubmit={
              
              () =>{
                fetch("http://"+this.state.Localhost+":3000/checkNumber", {
                  method: "POST",
                  headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
                  body: "phoneNumber="+this.state.values.Phone
                  
                })
                  .then(response => response.json())
                  .then (response => {
            if(response.next){
      
              this.props.navigation.navigate('SignUP3',{secound:this.state.values,first:this.props.navigation.state.params.first})
                  this.setState({err:""})
              
      
            }else{
              this.setState({err:"Phone Number already exist"})
            }
      
                  })
                  .catch(error => {
                    console.log("err ");
                  });
            }}
           
            >

            {({ handleChange, handleBlur, handleSubmit,errors, values }) => (
              <View style={styles.form}>

<TouchableOpacity style = {{width: '70%',
     height: 48,
     marginTop: 30,
     backgroundColor: '#f5f5f5',
    }}>
<Picker
    
    selectedValue={values.city}
   

    onValueChange={handleChange('city')}
  >
    <Picker.Item label="city" value="city"  />
    <Picker.Item label="Amman" value="Amman"  />
    <Picker.Item label="Zarqa" value="Zarqa"  />
    <Picker.Item label="Irbid" value="Irbid"  />
    <Picker.Item label="Russeifa" value="Russeifa"  />
    <Picker.Item label="Al-Quwaysimah" value="Al-Quwaysimah"  />
    <Picker.Item label="Tila al-Ali" value="Tila al-Ali"  />
    <Picker.Item label="Wadi as-Ser" value="Wadi as-Ser"  />
    <Picker.Item label="al-Jubayhah" value="al-Jubayhah"  />
    <Picker.Item label="Khuraybat as-Suq" value="Khuraybat as-Suq"  />
    <Picker.Item label="Sahab" value="Sahab"  />
    <Picker.Item label="Ar Ramtha" value="Ar Ramtha"  />


    <Picker.Item label="Suwaylih" value="Suwaylih"  />
    <Picker.Item label="Aqaba" value="Aqaba"  />
    <Picker.Item label="Zaatari refugee camp" value="Zaatari refugee camp"  />
    <Picker.Item label="Mafraq" value="Mafraq"  />
    <Picker.Item label="Madaba" value="Madaba"  />
  </Picker>


  </TouchableOpacity>



                <TouchableOpacity style = {styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('Address')}
                    onBlur={handleBlur('Address')}
                    value={values.Address}
                    placeholder='Address'
                    placeholderTextColor='#9c9c9c'
                  />
                </TouchableOpacity>
                {errors.Address &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.Address}</Text>
       }
       
  <View style={{ width: '100%',
     alignItems: 'center',marginTop:15}}>
  <Text style={{textAlign: "center",marginBottom:'5%',fontSize:20}}>Date Of Birthday</Text> 
<View style={{  width: '80%',
    height: 48,flexDirection: 'row',
    marginTop:5,
    paddingRight: 10,
    paddingLeft: 10,backgroundColor: '#f5f5f5', }}>
      
<Picker
     
        selectedValue={values.day}
        style={{ height: 50, width: 100 ,borderColor:'black',borderWidth:1}}
        onValueChange={handleChange('day')}
      >
        <Picker.Item label="day" value="0"  />
        {this.dayOB(1, 31)}
      </Picker>

      <Picker
    
        selectedValue={values.month}
        style={{ height: 50, width: 100,borderColor:'black',borderWidth:1 }}
        onValueChange={handleChange('month')}
      >
        <Picker.Item label="Month" value="0"  />
        <Picker.Item label="January" value="1"  />
        <Picker.Item label="February" value="2"  />
        <Picker.Item label="March" value="3"  />
        <Picker.Item label="April" value="4"  />
        <Picker.Item label="May" value="5"  />
        <Picker.Item label="June" value="6"  />
        <Picker.Item label="July" value="7"  />
        <Picker.Item label="August" value="8"  />
        <Picker.Item label="September" value="9"  />
        <Picker.Item label="October" value="10"  />
        <Picker.Item label="November" value="11"  />
        <Picker.Item label="December" value="12"  />
      </Picker>

      <Picker
     
        selectedValue={values.Year}
        style={{ height: 50, width: 100 ,borderColor:'black',borderWidth:1}}
        onValueChange={handleChange('Year')}
      >
        <Picker.Item label="Year" value="0"  />
        {this.YearOB(2002,1930)}
      </Picker>
      </View>
</View>

              
   
<TouchableOpacity style = {{     width: '70%',
     height: 48,
     marginTop: 30,
     backgroundColor: '#f5f5f5',
    }}>
<Picker
    selectedValue={values.TypeOfTranning}
    onValueChange={handleChange('TypeOfTranning')}
  >
    <Picker.Item label="Type Of Tranning" value="Type Of Tranning"  />
    <Picker.Item label="Automatic car" value="Autumatic"  />
    <Picker.Item label="Manual car" value="Manual"  />
  </Picker>


  </TouchableOpacity>


  <TouchableOpacity style = {styles.inputContainer}>

                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('Phone')}
                    onBlur={handleBlur('Phone')}
                    value={values.Phone}
                    placeholder='07**'
                    placeholderTextColor='#9c9c9c'
                  />
                </TouchableOpacity>
                {errors.Phone &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.Phone}</Text>
       }
           

<View style={styles.btnContainer} >
                                    <TouchableOpacity
                                        style={styles.btn}
                                        onPressIn={()=>{this.setState({
                                          values:values
                                        })}}
                                        onPressOut={handleSubmit}
                                      
                                        underlayColor='#fff'>
                                        <Text style={styles.nextText}>{StringsOfLanguages.ninth}</Text>
                                    </TouchableOpacity>

                                </View>
              </View>
              
            )}
            
          </Formik>
        </View>


                                
   </ScrollView>
  );
}
};
//() =>{this.props.navigation.navigate({routeName:'SignUP3'})}
const styles = StyleSheet.create({
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
    marginTop: '10%',
    width: '40%',
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 26
  },
  form: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  btnContainer: {
    width: '90%',
    height: 48,
    marginTop: 45,
    justifyContent: 'center',
    alignItems: 'center',
},
btn: {
    textAlign: 'center',
    width: 150,
    height: 48,
    backgroundColor: '#242A37',
    justifyContent: 'center',
    right: 0,
    position: 'absolute'

},
nextText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'uppercase'
},
inputContainer: {
  width: '100%',
  alignItems: 'center' 
},
input: {
 backgroundColor: 'blue',
 width: '70%',
 height: 48,
 marginTop: 30,
 paddingRight: 10,
 paddingLeft: 10,
 backgroundColor: '#f5f5f5',
 fontWeight: 'bold',
 color:'black'
},
});

export default SignUP2;
