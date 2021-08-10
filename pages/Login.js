
import React from 'react';
import {  StyleSheet, View, Text, TouchableOpacity,StatusBar, Image, TextInput,ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup'
import StringsOfLanguages from './StringsOfLanguages'
import Map from './Home/Component/Map'
export default class Login extends React.Component {
  constructor() {
    super()
    this.state={
      values:{},
      err:"",
      Localhost:"192.168.1.13"
    }
  }


  LogIn=()=>{
    
        fetch("http://"+this.state.Localhost+":3000/login",{
                method:'POST',
                headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
                body:'ID='+this.state.values.IDnumber+'&password='+this.state.values.password
              }).then(response => response.json())            
               .then(data=>{ 
             
                if(data.status) {
               
                  this.props.navigation.navigate('Home',{nav:this.props,screen:<Map userType={data.userType} gearType={data.TypeOfTranning} ID={data.ID}/>,ID:data.ID,userType:data.userType})
                }else{
                  console.log(data.err)
                  this.setState({err:data.err})
                }
            }
              )
              .catch(err => { console.log(err.message) })
                
        
                       
                
   }




  render() {
    const SignupSchema=()=>{
      const schema= Yup.object().shape({
    
    
        IDnumber:Yup.string().required('Required'),
    
        password:Yup.string()
      .required('No password provided.') 
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    
    })
     return schema;
    }


    //
    return (
      
      <ScrollView style={Styles.component}>
          <StatusBar
        animated={true}
        backgroundColor="#FFD428"

        hidden={false} />

        <View style={Styles.header}>
          <View style={Styles.backContainer}>

            <TouchableOpacity onPress={() =>{this.props.navigation.navigate({routeName:'MainPage'})}} >
              <Text> {StringsOfLanguages.third} </Text>
            </TouchableOpacity>

          </View>
          <View style={Styles.headerTextContainer}>
            <Text style={Styles.h1}>
            {StringsOfLanguages.twenty}
    </Text>
          </View>
          <View >
            <Image style={Styles.img} source={require('../imgs/amman.png')} />
          </View>
        </View>

        <View style={Styles.body}>
          <View><Text style={{color:"red",textAlign:'center',margin:5}}>{this.state.err}</Text></View>
          <Formik style={Styles.formik} 
          initialValues={{ IDnumber: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={this.LogIn}>

            {({ handleChange, handleBlur, handleSubmit,errors, values }) => (
              <View style={Styles.form}>
                <TouchableOpacity style = {Styles.inputContainer}>
                  <TextInput
                    style={Styles.input}
                    onChangeText={handleChange('IDnumber')}
                    onBlur={handleBlur('IDnumber')}
                    value={values.IDnumber}
                    placeholder='ID number'
                    keyboardType = 'numeric'

                    placeholderTextColor='#9c9c9c'
                  />
                </TouchableOpacity>
                {errors.IDnumber &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.IDnumber}</Text>
       }
                <TouchableOpacity style = {Styles.inputContainer}>
                  <TextInput
                    style={Styles.input}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder='password'
                    placeholderTextColor='#9c9c9c'
                    secureTextEntry={true}
                  />
                </TouchableOpacity>
                {errors.password &&
         <Text style={{ fontSize: 10, color: 'red',margin:10 }}>{errors.password}</Text>
       }
                <View style={Styles.btnContainer} >
                
                  <TouchableOpacity
                    style={Styles.btn}
                    underlayColor='#fff'
                    onPressIn={()=>{this.setState({
                      values:values
                    })}}
                    onPressOut={handleSubmit}>
                    <Text style={Styles.loginText}>{StringsOfLanguages.second}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style = {Styles.toolsContainer} onPress={() =>{this.props.navigation.navigate({routeName:'Page1'})}}>
                <View>
                <Text style = {Styles.forgetPassword}>
                {StringsOfLanguages.twenty1}  
                  </Text>
                </View>

                </TouchableOpacity>
     
             
                <TouchableOpacity style = {Styles.toolsContainer}  onPress={ () =>{this.props.navigation.navigate({routeName:'SignUP1'})}} >
                  <Text style = {Styles.signUp}>
                  {StringsOfLanguages.twenty2} <Text style = {{color: '#FFD428', fontWeight: 'bold'}}>{StringsOfLanguages.first}</Text>
                  </Text>
                </TouchableOpacity>
                
              </View>
              
            )}
            
          </Formik>
        </View>

      </ScrollView>
    )
  }
}

const Styles = StyleSheet.create({
  component: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
  header: {
    height: 330,
    width: '100%',
    backgroundColor: '#FFD428',
    paddingTop: '15%',
    paddingRight: '5%',
    paddingLeft: '5%'
  },
  backContainer: {
    width: '100%',
  position:'absolute',
  left:'5%',
  top:35

  },
  headerTextContainer: {
    marginTop: '10%',
    width: '90%',
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 26
  },

  img: {
    width: '100%',
height:170
  },
  body: {
    height: '55%',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    height: '100%',
    
    alignItems: 'center',
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
  btnContainer: {
    width: '100%',
    height: 48,
    marginTop: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    textAlign: 'center',
    width: '35%',
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
  toolsContainer: {
    marginTop: 30,
    width: '70%'
  }, 
  forgetPassword: {
    textAlign: 'left',
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.73)'
  },
  signUp: {
    textAlign: 'center',
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.73)'
  }
});

