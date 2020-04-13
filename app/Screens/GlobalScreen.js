import React from 'react';
import {View, ActivityIndicator, ImageBackground, Text, Image, TouchableOpacity} from 'react-native';

export default class GlobalScreen extends React.Component {

  async getCovidGlobalData(){
    try {
      let response = await fetch("https://thevirustracker.com/free-api?global=stats")
      let json = await response.json()
      this.setState({
        isLoading: false,
        timeLineArr: json.results,
      })
    } catch (error) {
      console.error(error)
    }
  }

  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      timeLineArr: [],
    }
  }

  componentDidMount(){
    this.getCovidGlobalData()
  }

  render(){
    const x = 'total_cases'
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
      <ImageBackground source={require('../images/covidback.jpeg')} style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
          <View style={{height: 100, width: 120, justifyContent: 'center', backgroundColor: '#FF9999'}}>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>{this.state.timeLineArr[0][x]}</Text>
            <Text style={{textAlign: 'center', color: 'pink', fontSize: 15}}>Confirmed</Text>
          </View>
          <View style={{height: 100, width: 120, justifyContent: 'center', backgroundColor: '#FF9933'}}>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>{this.state.timeLineArr[0].total_recovered}</Text>
            <Text style={{textAlign: 'center', color: 'pink', fontSize: 15}}>Total Recovered</Text>
          </View>
          <View style={{height: 100, width: 120, justifyContent: 'center', backgroundColor: '#990099'}}>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>{this.state.timeLineArr[0].total_unresolved}</Text>
            <Text style={{textAlign: 'center', color: 'pink', fontSize: 15}}>Unresolved</Text>
          </View>
        </View>
        <View style={{marginTop: 20, justifyContent: 'space-around', flexDirection: 'row'}}>
          <View style={{height: 100, width: 120, justifyContent: 'center', backgroundColor: '#4C9900'}}>
            <Text style={{textAlign: 'center', fontSize: 20, color: 'white', fontWeight: 'bold'}}>{this.state.timeLineArr[0].total_deaths}</Text>
            <Text style={{textAlign: 'center', color: 'black', fontSize: 15}}>Total Deaths</Text>
          </View>
          <View style={{height: 100, width: 120, justifyContent: 'center', backgroundColor: '#FF007F'}}>
            <Text style={{textAlign: 'center', fontSize: 20, color: 'white', fontWeight: 'bold'}}>{this.state.timeLineArr[0].total_new_cases_today}</Text>
            <Text style={{textAlign: 'center', color: 'black', fontSize: 15}}>New Cases Today</Text>
          </View>
          <View style={{height: 100, width: 120, justifyContent: 'center', backgroundColor: '#FF6666'}}>
            <Text style={{textAlign: 'center', fontSize: 20, color: 'white', fontWeight: 'bold'}}>{this.state.timeLineArr[0].total_new_deaths_today}</Text>
            <Text style={{textAlign: 'center', color: 'black', fontSize: 15}}>Deaths Today</Text>
          </View>
        </View>
        <View style={{marginTop: 20, justifyContent: 'space-around', flexDirection: 'row'}}>
          <View style={{height: 100, width: 120, justifyContent: 'center', backgroundColor: '#0000CC'}}>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>{this.state.timeLineArr[0].total_active_cases}</Text>
            <Text style={{textAlign: 'center', color: 'pink', fontSize: 15}}>Active Cases</Text>
          </View>
          <View style={{height: 100, width: 120, justifyContent: 'center', backgroundColor: '#4C9900'}}>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>{this.state.timeLineArr[0].total_serious_cases}</Text>
            <Text style={{textAlign: 'center', color: 'pink', fontSize: 15}}>Serious Cases</Text>
          </View>
          <View style={{height: 100, width: 120, justifyContent: 'center', backgroundColor: '#003366'}}>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>{this.state.timeLineArr[0].total_affected_countries}</Text>
            <Text style={{textAlign: 'center', color: 'pink', fontSize: 15}}>Affected Countries</Text>
          </View>
        </View>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Countries")}>
          <View style={{marginTop: 50, height: 40, borderBottomWidth: 1, alignContent: 'center', flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={{fontSize: 18, alignSelf: 'center', color: 'white'}}>Timeline of Covid-19 in countries</Text>
            <Image style={{top: 3, height: 20, width: 20, alignSelf: 'center'}} source={require('../images/forwardImage.png')}/>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}

