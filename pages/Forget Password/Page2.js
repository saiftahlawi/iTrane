
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput,StatusBar} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup'

export default class Page2 extends React.Component {
  constructor() {
    super()
    this.state={
      err:'',
      values:{},
      Localhost:"192.168.1.87",
    }
  }

  CodeCheack=()=>{
    
    fetch("http://"+this.state.Localhost+":3000/CodeCheack",{
            method:'POST',
            headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
            body:'code='+this.state.values.code
          }).then(response => response.json())            
           .then(data=>{ 
            if(data.status) {
              this.setState({err:''})
         
              this.props.navigation.navigate('Page3',{ID:this.props.navigation.state.params.ID})
            }else{
              console.log(data.err)
              this.setState({err:data.err})
            }
        }
          )
          .catch(err => { console.log(err) })
            
    
                   
            
}



Resendcode=()=>{
    
  fetch("http://"+this.state.Localhost+":3000/ResetPassword",{
          method:'POST',
          headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
          body:'ID='+this.props.navigation.state.params.ID
        }).then(response => response.json())            
         .then(data=>{ 
          if(data.status) {
            alert('done please cheack your email')
          }else{
           alert('error')
          }
      }
        )
        .catch(err => { console.log(err) })
          
  
                 
          
}
  render() {

    const SignupSchema=()=>{
      const schema= Yup.object().shape({
    
    
        code:Yup.string().required('Required'),
    
       
    
    })
     return schema;
    }
    return (
      <View style={Styles.component}>
          <StatusBar
        animated={true}
        backgroundColor="#FFD428"

        hidden={false} />
        <View style={Styles.header}>
          <View style={Styles.backContainer}>
            <TouchableOpacity onPress={() =>{this.props.navigation.navigate({routeName:'Page1'})}}>
              <Text> Back </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.headerTextContainer}>
            <Text style={Styles.h1}>
              Forget Password?
    </Text>
          </View>
        </View>

        <View style={Styles.body}>
        <View style = {Styles.secretEmailContainer}>
        <Text style = {Styles.secretEmail}>
                  Please check your email <Text style = {{color: '#FFD428',fontSize:16}}>{this.props.navigation.state.params.email}</Text> and enter the code below
                  </Text>
        </View>

          <Formik style={Styles.formik} initialValues={{ code: '', }}
            
            validationSchema={SignupSchema}
            onSubmit={this.CodeCheack}
            >

            {({ handleChange, handleBlur, handleSubmit,errors, values }) => (
              <View style={Styles.form}>
                <TouchableOpacity style = {Styles.inputContainer}>
                  <TextInput
                    style={Styles.input}
                    onChangeText={handleChange('code')}
                    onBlur={handleBlur('code')}
                    value={values.code}
                    placeholder='code'
                    placeholderTextColor='#9c9c9c'
                  />
                </TouchableOpacity>
                {errors.code &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.code}</Text>
       }
        <Text style={{color:"red",textAlign:'center',marginTop:20}}>{this.state.err}</Text>
                <View style={Styles.btnContainer} >
                
                  <TouchableOpacity
                    style={Styles.btn}
                    onPressIn={()=>{this.setState({
                      values:values
                    })}}
                    onPressOut={handleSubmit}
                    underlayColor='#fff'>
                    <Text style={Styles.confirmText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this.Resendcode} style = {Styles.toolsContainer}>
                  <Text style = {Styles.receiveCode}>
                  Don't recieve a code? <Text style = {{color: '#FFD428', fontWeight: 'bold'}}>Re-send code</Text>
                  </Text>
                </TouchableOpacity>


              </View>
              
            )}
            
          </Formik>
        </View>

      </View>
    )
  }
}

const Styles = StyleSheet.create({
  component: {
    height: '100%',
    width: '100%',
    backgroundColor:"#ffff"
  },
  header: {
    height: 200,
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
 top:50
  },
  headerTextContainer: {
    marginTop: '10%',
    width: '40%',
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 26
  },
  body: {
    height: '55%',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  secretEmailContainer: {
      width: '60%', 
      marginTop: '5%',
      position: 'absolute'

  },
  secretEmail: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize:16
  },
  formContainer: {
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: '40%'
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
  confirmText: {
    textAlign: 'center',
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'uppercase'
  },
  toolsContainer: {
    marginTop: 30,
    width: '60%'
  }, 
  forgetPassword: {
    textAlign: 'center',
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.73)'
  },
  receiveCode: {
    textAlign: 'left',
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.73)'
  }
});

