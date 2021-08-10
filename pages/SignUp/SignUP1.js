
import React from 'react';
import {  StyleSheet, View, Text, TouchableOpacity, TextInput,ScrollView,StatusBar} from 'react-native';
import { Formik } from 'formik';
import RNPickerSelect from 'react-native-picker-select';
import Nationalities from './nationalities'
import * as Yup from 'yup';
import StringsOfLanguages from '../StringsOfLanguages'



 class SignUP1 extends React.Component {
    constructor() {
        super()
        this.state = {
            nationality: 'select nationality',
            err:'',
            Localhost:"192.168.1.13"
        }
    }


    check=(values)=>{
       
    }

    render() {

        const SignupSchema=()=>{
            const schema= Yup.object().shape({
          
                id: Yup.number()
                .min(9)
                .max(9)
                .required(),
                fullname: Yup.string()
                    .min(18, 'Full name must be at-least 18 characters')
                    .required('Required'),
                    password: Yup.string()
                    .min(8, 'Password must be at-least 8 characters')
                ,
                re_passowrd: Yup.string()
                    .min(8, 'Password must be at-least 8 characters')
                    .required('')
                ,
                email: Yup.string().email('Invalid email')
                    .required(),
               
          
          })
           return schema;
          }





        return (
            <ScrollView style={Styles.component}>
                   <StatusBar
        animated={true}
        backgroundColor="#FFD428"

        hidden={false} />
                <View style={Styles.header}>
                    <View style={Styles.backContainer}>
                        <TouchableOpacity  onPress={() =>{this.props.navigation.navigate({routeName:'MainPage'})}} >
                            <Text> {StringsOfLanguages.third} </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.headerTextContainer}>
                        <Text style={Styles.h1}>
                        {StringsOfLanguages.twenty}</Text>
                    </View>
                </View>
<View style={{alignItems:'center'}}>
<Text style={{color:'red',fontSize:16,marginTop:2,textAlign:'center'}}>{this.state.err}</Text>
    </View>
                <View style={Styles.body}>
                    <Formik style={Styles.formik}
                        initialValues={{
                            fullname: '', id: '', email: '',
                            password: '', re_passowrd: '', nationality: 'select nationality'
                        }}
                        validationSchema={SignupSchema}
                        
                        onSubmit={() =>{this.props.navigation.navigate('SignUP2',{first:values})} }
                        >

                        {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
                            <View style={Styles.form}>
                            <View style ={Styles.inputOuterContainer}>
                            <TextInput
                                    style={Styles.input}
                                    onChangeText={handleChange('fullname')}
                                    onBlur={handleBlur('fullname')}
                                    value={values.fullname}
                                    placeholder='full name'
                                    placeholderTextColor='#9c9c9c'

                                />
                                {errors.fullname && touched.fullname ? <Text style={Styles.error}>{errors.fullname}</Text> : false}
                            </View>
                            <View style ={Styles.inputOuterContainer}>
                                <TextInput
                                    style={Styles.input}
                                    onChangeText={handleChange('id')}
                                    onBlur={handleBlur('id')}
                                    value={values.id}
                                    placeholder='ID number'
                                    keyboardType = 'numeric'
                                    placeholderTextColor='#9c9c9c'
                                    maxLength={9}
                                    minLength={9}
                                />
                                {values.id.length != 9 && touched.id ?  <Text style={Styles.error}>ID must be 9 numbers</Text> : false}
</View>
                            <View style ={Styles.inputOuterContainer}>
                                <TextInput
                                    style={Styles.input}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    placeholder='email address'
                                    placeholderTextColor='#9c9c9c'
                                />
                                {errors.email && touched.email ? <Text style={Styles.error}>{errors.email}</Text> : null}
</View>
                            <View style ={Styles.inputOuterContainer}>
                                <TextInput
                                    style={Styles.input}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    placeholder='password'
                                    placeholderTextColor='#9c9c9c'
                                    secureTextEntry = {true}
                                />
                                {touched.password && errors.password? <Text style={Styles.error}>{errors.password}</Text> : null}
                                {values.password === '' || values.password.length < 8? false :                                
                                <View style ={Styles.inputOuterContainer}>
                                <TextInput
                                    style={Styles.input}
                                    onChangeText={handleChange('re_passowrd')}
                                    onBlur={handleBlur('re_passowrd')}
                                    value={values.re_passowrd}
                                    placeholder='confirm password'
                                    placeholderTextColor='#9c9c9c'
                                    secureTextEntry = {true}
                                /> 
                                </View>}
                                {touched.re_passowrd && values.re_passowrd != values.password ? <Text style={Styles.error}>Password not match</Text> : null}
                                </View>
                                
                                <View style ={{  width: '100%',alignItems: 'center',position: 'relative'}}>
                           <View style={{backgroundColor: '#f5f5f5', width: '70%',
        height: 48,
        marginTop: 40,
        paddingRight: 10,
        paddingLeft: 10,}}>
                                <RNPickerSelect
                                    onBlur={handleBlur('nationality')}
                                    value={values.nationality}
                                    onValueChange={ handleChange('nationality')}
                                    placeholder={{ label: values.nationality, value: values.nationality}}
                                    value={values.nationality}
                                    style={customPickerStyles}
                                    items={Nationalities} 
                                />
                                
                                </View>
</View>
                                <View style={Styles.btnContainer} >
                                    
                                    <TouchableOpacity
                                        style={Styles.btn}
                                        onPress={()=>{
                                            fetch("http://"+this.state.Localhost+":3000/checkEmail", {
                                                method: "POST",
                                                headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
                                                body: "email="+values.email
                                                
                                              })
                                                .then(response => response.json())
                                                .then (response => {
                                          if(response.next){
                                    
                                            if(values.fullname !=''&&values.id !=''&&values.email !='' &&values.password !=''&&values.re_passowrd!='' && values.nationality !='select nationality' ){
                                                this.props.navigation.navigate('SignUP2',{first:values}
                                                )
                                                this.setState({err:""})
                                            }else{
                                              this.setState({err:"please enter your all data require"})
                                    
                                            } 
                                    
                                          }else{
                                            this.setState({err:"email already exist"})
                                          }
                                    
                                                })
                                                .catch(error => {
                                                  console.log("err ");
                                                });
                                          
                                        }}
                                        underlayColor='#fff'>
                                        <Text style={Styles.nextText}>{StringsOfLanguages.ninth}</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        )}

                    </Formik>
                    <View style={{width:"100%",height:20}}>

                    </View>
                </View>

            </ScrollView>
        )
    }
}
//() =>{this.props.navigation.navigate('SignUP2',{first:values})}
const Styles = StyleSheet.create({
    component: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
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
        marginTop: '7%',
        width: '95%',
    },
    h1: {
        fontWeight: 'bold',
        fontSize: 26
    },
    body: {
        height: '100%',
        width: '100%',
        alignContent: 'center',
    },
    formContainer: {
        justifyContent: 'center',
        
    },
    form: {
        width: '100%',
       
        alignItems: 'center',
        flex: 1,
        flexDirection: "column",        

    },
    inputOuterContainer: {
        width: '100%',
        alignItems: 'center',
        position: 'relative',
       

    },
    input: {
        width: '70%',
        height: 48,
        marginTop: 40,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: '#f5f5f5',
        fontWeight: 'bold',
        color:'black'
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
        position: 'absolute',
        marginBottom:20

    },
    nextText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        textTransform: 'uppercase'
    },
    error: {
        color: '#eb0a02',
        marginTop: 3.5,
        fontSize: 10,
    }
});

const customPickerStyles = StyleSheet.create({
    inputIOS: {
        width: '100%',
        height:'100%',
        
        fontWeight: 'bold',
        alignSelf: 'center',
        
    },
    placeholder: {
        color: '#9c9c9c',
        
      },
    inputAndroid: {
        width: '100%',
      height:'100%',
      
        fontWeight: 'bold',
        alignSelf: 'center',
       
    },
   

});
export default  SignUP1