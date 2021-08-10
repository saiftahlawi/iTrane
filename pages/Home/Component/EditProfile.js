import React, { Component } from 'react';
import {TouchableOpacity, StyleSheet, Text, View,ScrollView ,
  TextInput } from 'react-native';
  import { Formik } from 'formik';
  import * as Yup from 'yup'
class EditProfile extends Component {
constructor(){
  super()
  this.state={
    email:"",
    phoneNumber:"",
    Password:'',
    values:{},
    Localhost:"192.168.1.87"
  }
}


componentDidMount(){


  fetch("http://"+this.state.Localhost+":3000/EditTranee",{
      method:'POST',
      headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
      body:'ID=' +this.props.ID
    }).then(response => response.json())            
     .then(data=>{
     
      this.setState({phoneNumber:data.phoneNumber+'',email:data.email,Password:data.password}
          )
        
      })
    .catch(err => { console.log(err) })

 }





  render(){
    const SignupSchema=()=>{
      const schema= Yup.object().shape({
    
    
        email: Yup.string().email('Invalid email')
        .required(),

        Phone:Yup.string().required('Required')
        .matches( /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Phone number is not valid'),
    
        password:Yup.string()
      .required('No password provided.') 
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    
    })
     return schema;
    }


  return (
    <ScrollView style={{backgroundColor: '#fff',}} >
           <View style={styles.header}>
         
          <View style={styles.headerTextContainer}>
            <Text style={styles.h1}>
            Profile
    </Text>
          </View>
        </View>
    <View>
    <View style={{margin:15,marginTop:"10%"}}>
    <Text style={{fontSize:20}}>update profile</Text>
    </View>
    <View style={{alignItems: 'center' ,}}>
   
<View style={styles.container}>


    <Formik  
              enableReinitialize
          initialValues={{ email:this.state.email, Phone:this.state.phoneNumber,password:this.state.Password }}
          validationSchema={SignupSchema}

          onSubmit={()=>{
           
           fetch("http://"+this.state.Localhost+":3000/EditTranee", {
             method: "POST",
             headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
             body:"update="+true+
             '&ID=' +this.props.ID
             +"&phoneNumber="+this.state.values.Phone
             +"&email="+this.state.values.email
             +"&password="+this.state.values.password
           }).catch(function(error){console.log(error.message)})
          }}
          
          >

            {({ handleChange, handleBlur, handleSubmit,errors, values }) => (
              <View style={styles.form}>
                <TouchableOpacity style = {styles.inputContainer}>
                  <TextInput
                   style={styles.TextInput}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder='email'
                    placeholderTextColor='#9c9c9c'
                  />
                </TouchableOpacity>
                {errors.email &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
       }


<TouchableOpacity style = {styles.inputContainer}>
                  <TextInput
                 style={styles.TextInput}
                    onChangeText={handleChange('Phone')}
                    onBlur={handleBlur('Phone')}
                    value={values.Phone}
                    placeholder='Phone'
                    placeholderTextColor='#9c9c9c'
                  />
                </TouchableOpacity>
                {errors.Phone &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.Phone}</Text>
       }

       




                <TouchableOpacity style = {styles.inputContainer}>
                  <TextInput
              style={styles.TextInput}
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

                <View style={styles.btnContainer} >
                
                <View style={styles.btnContainer} >
                
                <TouchableOpacity
                  style={styles.btn}
                  onPressIn={()=>{this.setState({
                    values:values
                  })}}
                  onPressOut={handleSubmit}

                  underlayColor='#fff'>
                  <Text style={styles.loginText}>Update </Text>
                </TouchableOpacity>
              </View>
                </View>
               
                
              </View>
              
            )}
            
          </Formik>



</View>
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
    fontSize: 28
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
     shadowOpacity: 0.23,
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

export default EditProfile;


/*<TextInput
style={styles.TextInput}
value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}} 
/>

<Text style={styles.txtform}>Phone</Text>
<TextInput
style={styles.TextInput}
keyboardType="numeric"
value={this.state.phoneNumber} onChange={(e)=>{this.setState({phoneNumber:e.target.value})}} 


/>

<Text style={styles.txtform}>Password</Text>
<TextInput
style={styles.TextInput}
secureTextEntry={true}
value={this.state.Password} onChange={(e)=>{this.setState({Password:e.target.value})}} 
/>*/