
import React from 'react';
import { View, StyleSheet, ActivityIndicator,TouchableOpacity,Text,Image } from 'react-native'

export default class Next extends React.Component {
  constructor() {
    super()
  this.state={
    start:true,
    End:false,
    isStart:true,
    starthour:0,
    startmunit:0,
    Localhost:"192.168.1.87",
    istotal:false
  }
  }



 
  
  
  startTraining=()=>{
    fetch("http://"+this.state.Localhost+":3000/startTrining",{
      method:'POST',
      headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
      body:'ID='+this.props.ID+'&TraineeID='+this.props.traneeId
    }).then(response => response.json())            
    .then(data=>{
        const hour=new Date().getHours()
      const minutes=new Date().getMinutes()
     this.setState({start:false,End:true,starthour:hour ,startmunit:minutes})
    
       
     })
          
  }


  calculatePrice = (hours, minutes) => {
 
  
    var cHours = 0;
    var cMins = 0;
    var total=0;
    
    for(var i = 1; i <= hours; i++ ) {
        cHours = cHours + 7
    }
    
    for(var i = 1; i <= minutes; i++ ) {
        cMins = cMins + 0.117
    }
    
    
    
    total=(cHours+cMins.toFixed(2))
    
  return total
  }

  EndTraning=()=>{



    fetch("http://"+this.state.Localhost+":3000/EndTraining",{
      method:'POST',
      headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
      body:'ID='+this.props.ID+'&TraineeID='+this.props.traneeId+"&totalhours="+(new Date().getHours()-this.state.starthour)+':'+(new Date().getMinutes()-this.state.startmunit)+"&totalprice="+ this.calculatePrice(new Date().getHours()-this.state.starthour,new Date().getMinutes()-this.state.startmunit)
    }).then(()=>{
       const hours=new Date().getHours()-this.state.starthour
       const munit=new Date().getMinutes()-this.state.startmunit
      this.setState({
        istotal:true,
        isStart:false,
        totalprice: this.calculatePrice(hours,munit)
      })
    })   
    
    }


    Done=()=>{



      fetch("http://"+this.state.Localhost+":3000/DoneTraining",{
        method:'POST',
        headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'}),
        body:'ID='+this.props.ID+'&TraineeID='+this.props.traneeId
      }).then(()=>{
        this.setState({
          istotal:false,
        })
      })   
      

      }


  render() {
    return (
 
<View>
    {this.state.isStart?
        <View style={style.container}>
  <View style={style.card}>
    <View style={style.top_bar}>
      <View style={style.photoContainer}>
        <View style={style.photoWrapper}>
          <Image style={style.photo} source={{uri:'http://'+this.state.Localhost+':3000/'+this.props.tranee.profilePicture}} />
        </View>
      </View>
      <View style={style.nameContainer}>
        <Text style={style.h1}>{this.props.tranee.fullName}</Text>
        <View style={style.pContainer}><Text style = {style.p}><Text style = {{fontWeight: 'bold'}}>phone Number: </Text>{this.props.tranee.phoneNumber}</Text></View>
      </View>
    </View>
    <View style={style.bottom_bar}>
      <View style={style.btnsContainer}>
        <View style={style.btnsContainer}>

          {this.state.start?
          <View style={style.btnsContainer}>
            <TouchableOpacity style={{ ...style.btn, backgroundColor: '#00e673' }} onPress={this.startTraining}>
              <Text style={style.btnText}>Start Training</Text>
            </TouchableOpacity>
          </View>:<View></View>
          }


{this.state.End?
          <View style={style.btnsContainer}>
            <TouchableOpacity style={{ ...style.btn, backgroundColor: '#e60000' }} onPress={this.EndTraning}>
              <Text style={style.btnText}>End Training</Text>
            </TouchableOpacity>
          </View>:<View></View>
       
}
        </View>
      </View>
    </View>
  </View>

</View>:<View></View>

    }




{this.state.istotal?
      <View style={style.container}>
        <View style={style.card}>
          <View style={style.top_bar}>
            <View style={style.photoContainer}>
            </View>
            <View style={style.nameContainer}>
              <Text style={style.h1}>{this.props.tranee.fullName}</Text>
              <View style={style.pContainer}><Text style = {style.p}><Text style = {{fontWeight: 'bold'}}>phone Number: </Text>{this.props.tranee.phoneNumber}</Text></View>
            </View>


            <View style={style.nameContainer}>
              <View style={style.pContainer}><Text style = {style.p}><Text style = {{fontWeight: 'bold'}}>total price: </Text>{this.state.totalprice} JD</Text></View>
            </View>
          </View>
          <View style={style.bottom_bar}>
            <View style={style.btnsContainer}>
              <View style={style.btnsContainer}>
            
                
                <View style={style.btnsContainer}>
                  <TouchableOpacity style={{ ...style.btn, backgroundColor: '#00e673' }} onPress={this.Done}>
                    <Text style={style.btnText}>Done</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </View>
        </View>

      </View>
      :<View></View>
      }

</View>
    )
  }
}


const style = StyleSheet.create({
  container: {
    width: '100%',
    height: 250,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    padding: 5
  },
  card: {
    flexDirection: 'column',
    padding: 0,
    paddingTop:18,
    width: '90%',
    height: 220,
    margin: 'auto',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.46,

    elevation: 9,
  },
  top_bar: {
    alignSelf: 'center',
    margin: 'auto',
    width: '90%',
    height: 100,
    flexDirection: 'row',
  },
  photoContainer: {
    flex: 1,
    height: '90%',
  },
  photoWrapper: {
    width: 100,
    height: 100,
    position: 'relative'
  },
  photo: {
    position: 'relative',
    flex: 1,
    width: null,
    height: null,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 75
  },
  nameContainer: {
    flex: 2,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'


  },
  h1: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  bottom_bar: {
    alignItems: 'center',
    width: '90%',
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  btnsContaine5r: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',

  },
  btnsContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: '90%'
  },
  btn: {
    justifyContent: 'center',
    textAlign: 'center',
    width: 120,
    height: 40,
    zIndex: 4
  },
  btnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff'
  },
  pContainer: {
    width: '100%',
    paddingLeft: 5,
    paddingRight: 5
  },
  p: {
    textAlign: 'left',
    fontSize: 12
  }

})