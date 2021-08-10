
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput,StatusBar} from 'react-native';


export default class Page3 extends React.Component {
  constructor() {
    super()
    this.state={
      err:'',
     password:'',
     cofpassword:'',
     Localhost:"192.168.1.87"
    }
  }



  Resetpassword=()=>{
    
    if(this.state.password==this.state.cofpassword){
      fetch("http://"+this.state.Localhost+":3000/UpdatePassword",{
        method:'POST',
        headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
        body:'ID='+this.props.navigation.state.params.ID+"&password="+this.state.password
      }).then(response => response.json())            
       .then(data=>{ 
        if(data.status) {
          this.props.navigation.navigate({routeName:'MainPage'})
        }else{
         alert('error')
        }
    }
      )
      .catch(err => { console.log(err) })
        
    }else{
      this.setState({err:"passwords dose not mach "})
    }

    
                   
            
  }


  render() {
   
  
    return (
      <View style={Styles.component}>
         <StatusBar
        animated={true}
        backgroundColor="#FFD428"

        hidden={false} />
        <View style={Styles.header}>
          <View style={Styles.backContainer}>
            <TouchableOpacity onPress={() =>{this.props.navigation.navigate({routeName:'Page2'})}}>
              <Text> Back </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.headerTextContainer}>
            <Text style={Styles.h1}>
              Reset Password
    </Text>
          </View>
        </View>
        
        <View style={Styles.body}>
        <View style = {Styles.secretEmailContainer}>
        <Text style = {Styles.secretEmail}>
                 Enter the New Password
                  </Text>
        </View>

       
       
              

          
              <View style={Styles.form}>
                <TouchableOpacity style = {Styles.inputContainer}>
                  <TextInput
                    style={Styles.input}
                    onChangeText={(v)=>{this.setState({password:v})}}
                    value={this.state.password}
               
                    placeholder='new password'
                    placeholderTextColor='#9c9c9c'
                    secureTextEntry={true}

                  />
                </TouchableOpacity>
            
                <TouchableOpacity style = {Styles.inputContainer}>
                  <TextInput
                    style={Styles.input}
                    onChangeText={(v)=>{this.setState({cofpassword:v})}}
                    value={this.state.cofpassword}
                    placeholder='confirm password'
                    placeholderTextColor='#9c9c9c'
                    secureTextEntry={true}
                  />
                </TouchableOpacity>
           
                <View><Text style={{color:"red",textAlign:'center',margin:5}}>{this.state.err}</Text></View>
                <View style={Styles.btnContainer} >
                
                  <TouchableOpacity
                    style={Styles.btn}
                   
                    onPress={this.Resetpassword}
                    underlayColor='#fff'>
                    <Text style={Styles.loginText}>Sign in</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
            
            
       
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
  loginText: {
    textAlign: 'center',
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'uppercase'
  },
});

