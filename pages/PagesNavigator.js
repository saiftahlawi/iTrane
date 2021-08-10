import {

    createAppContainer,
    
  } from'react-navigation';
  
import { createStackNavigator } from 'react-navigation-stack'
import MainPage from './MainPage'
import Login from './Login'
import Page1 from './Forget Password/Page1'
import Page2 from './Forget Password/Page2'
import Page3 from './Forget Password/Page3'
import SignUP1 from './SignUp/SignUP1'
import SignUP2 from './SignUp/SignUP2'
import SignUP3 from './SignUp/SignUP3'
import Home from './Home/Home'
import Nav from './Home/Component/Nav'


  const PagesNavigator = {
    
    MainPage: {
        screen: MainPage,
       
        navigationOptions: {
            headerShown: false,
        },

      },
    
     
      
      Login:{
        screen: Login,

        navigationOptions: {
            headerShown: false,
        },  

      },

   

      SignUP1:{
        screen:SignUP1,

        navigationOptions: {
            headerShown: false,
        }

        }, 
        SignUP2:{
          screen:SignUP2,

          navigationOptions: {
              headerShown: false,
          }
          
          }, 
          SignUP3:{
            screen:SignUP3,
            navigationOptions: {
                headerShown: false,
            }
            }, 
      Page1:{
        screen:Page1,
        navigationOptions: {
            headerShown: false,
        }, 
      },
    
      Page2:{
        screen:Page2,
        navigationOptions: {
            headerShown: false,
        }, 
      },
      Page3:{
        screen:Page3,
        navigationOptions: {
            headerShown: false,
        }, 

        },
    
        Home:{
          screen:Home,
          navigationOptions: {
              headerShown: false,
          }, 
  
          },
          Nav:{
            screen:Nav,
            navigationOptions: {
                headerShown: false,
            }, 
    
          },
          Payment:{
            screen:Nav,
            navigationOptions: {
                headerShown: false,
            }, 
          }


    

      }


      
    

  

  const HomeStack=createStackNavigator(PagesNavigator);
  export default createAppContainer(HomeStack) 