
import React from 'react';
import {  StyleSheet, View, Text, TouchableOpacity, TextInput,StatusBar} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup'

export default class Page1 extends React.Component {
  constructor() {
    super()

    this.state={
      values:{},
      err:'',
      Localhost:"192.168.1.87",
    }
  }


  Reset=()=>{
    
    fetch("http://"+this.state.Localhost+":3000/ResetPassword",{
      method:'POST',
      headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
            body:'ID='+this.state.values.IDnumber
          }).then(response => response.json())            
           .then(data=>{ 
            if(data.status) {
              this.setState({err:''})
           this.props.navigation.navigate('Page2',{email:data.email,ID:this.state.values.IDnumber})
           
            }else{
              console.log(data.err)
              this.setState({err:data.err})
            }
        }
          )
          .catch(err => { console.log(err) })
            
    
                   
            
}

  render() {


    const SignupSchema=()=>{
      const schema= Yup.object().shape({
    
    
        IDnumber:Yup.string().required('Required'),
    

    
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
            <TouchableOpacity onPress={() =>{this.props.navigation.navigate({routeName:'Login'})}}>
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
        <View>
  <Text style={{color:"red",textAlign:'center',marginTop:50}}>{this.state.err}</Text>
</View>

          <Formik style={Styles.formik} initialValues={{ IDnumber: '', }}
           
            validationSchema={SignupSchema}
            onSubmit={this.Reset}>
            

            {({ handleChange, handleBlur, handleSubmit,errors, values }) => (
              <View style={Styles.form}>
                <View style={{margin:"10%",marginTop:"4%" ,alignSelf:"flex-start"}}>
  <Text style={{fontWeight: 'bold',fontSize: 18}}>
  enter your ID below
  </Text>
</View>
                <TouchableOpacity style={Styles.inputContainer}>
                  <TextInput
                    style={Styles.input}
                    onChangeText={handleChange('IDnumber')}
                    onBlur={handleBlur('IDnumber')}
                    value={values.IDnumber}
                    placeholder='ID number'
                    placeholderTextColor='#9c9c9c'
                  />
                </TouchableOpacity>
                {errors.IDnumber &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.IDnumber}</Text>
       }
                <View style={Styles.btnContainer} >

                  <TouchableOpacity
                    style={Styles.btn}
                    onPressIn={()=>{this.setState({
                      values:values
                    })}}
                    onPressOut={handleSubmit}
                    underlayColor='#fff'>
                    <Text style={Styles.submitText}>Submit</Text>
                  </TouchableOpacity>
                </View>


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
  formContainer: {
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: '10%'
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center'
  },
  input: {
    backgroundColor: 'blue',
    width: '70%',
    height: 48,
    marginTop: 20,
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
  submitText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'uppercase'
  }
});
