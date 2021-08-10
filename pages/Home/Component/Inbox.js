import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'


export default class Inbox extends React.Component {
  constructor() {
    super()
    this.state = {
     
      notification:[], 
      Localhost:"192.168.1.87"

    }

  }
  componentDidMount() {
    fetch("http://"+this.state.Localhost+":3000/trainee_inbox", {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
      body: 'ID=' +this.props.ID
    }).then(response => response.json())
      .then(data => {
          console.log(data)
        this.setState({
            notification:data, 

        })
      })
      .then(data => {
        this.setState({
          isLoaded: true
        })
      })
      .catch(err => { console.log(err) })
  }
  render() {

    return (
<ScrollView style = {{height: '100%',padding:2}}>
{

this.state.notification.map(notification=>

    <View style = {style.rowsContainer}>
    <View style = {style.row}>
    <View style = {style.dateContainer}>
      <Text style = {style.date}>{notification.notifyDate}</Text>
    </View>
    <View style = {style.messageContainer}>
      <Text style = {style.message}>
        {notification.message}
      </Text>
    </View>
    </View>

  </View>

)



}
      

  </ScrollView>
   
      
    )
  }
}
const style = StyleSheet.create({
  h1: {
    alignSelf: 'center',
    fontSize: 30,
    color: '#4a4a4a'
  },
  rowsContainer: {
    marginTop: 30
  },
  row: {
    alignSelf: 'center',
    width: '98%',
    height: 120,
    backgroundColor: '#f0f0f0',
    display: 'flex',
    padding: 10,
    borderRadius: 3
  },
  dateContainer: {
    position: 'relative',
    flex:1

  }, 
  date: {
    fontWeight: 'bold'
  },
  messageContainer: {
    flex: 3
  }
})