import React from 'react';
import {View, ActivityIndicator, ImageBackground, FlatList, Text, Dimensions, TouchableOpacity} from 'react-native';
import {
    LineChart,
  } from 'react-native-chart-kit'

const screenWidth = Dimensions.get("window").width

export default class Timeline extends React.Component {

    dateFunction(str){
        let dateArr = str.split("/")
        let day = dateArr[1]
        let month = ""
        switch (dateArr[0]) {
            case "1":
                month = "January"
                break;
            case "2":
                month = "February"
                break;
            case "3":
                month = "March"
                break;
            case "4":
                month = "April"
                break
            case "5":
                month = "May"
                break; 
            case "6":
                month = "June"
                break;  
            case "7":
                month = "July"
                break;
            case "8":
                month = "August"
                    break;
            case "9":
                month = "September"
                break;
            case "10":
                month = "October"
                break;
            case "11":
                month = "November"
                break
                case "5":
            default:
                month = "December"
                break;
        }
        let date = month+"' "+day+", "+"20"+dateArr[2]
        return date
    }

    async callApi(code){
        let response = await fetch('https://thevirustracker.com/free-api?countryTimeline='+code)
        let json = await response.json()
        let arr = json.timelineitems
        let first = arr[0]
        let keysArr = []
        let casesArr = []
        Object.keys(first).forEach((key)=>keysArr.push(key))
        keysArr.pop()
        keysArr.forEach((item)=> casesArr.push(arr[0][item].total_cases))
        this.setState({
            data: arr,
            keys: keysArr.reverse(),
            xLabel: keysArr,
            isLoading: false,
            cases: casesArr,
        })
    }

    constructor(props){
        super(props);
        this.state = {
            data: [],
            keys: [],
            cases: [],
            xLabel : [],
            isLoading: true,
            graphStatus: false,
        }
    }

    componentDidMount(){
        const {code} = this.props.route.params
        this.callApi(code)
    }

    render(){
        const height = this.state.graphStatus ? 250 : 0
        const line = {
            labels: this.state.xLabel,
            datasets: [
              {
                data: this.state.cases,
                strokeWidth: 1,
              },
            ],
          };
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return(
            <ImageBackground source={require('../images/covidback.jpeg')} style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                <View style={{margin: 10, flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity onPress={()=>this.setState({graphStatus: false})}>
                        <View style={{width: 150, height: 30, justifyContent: 'center', alignContent: 'center', backgroundColor: this.state.graphStatus? 'black' : 'pink'}}>
                            <Text style={{color: this.state.graphStatus ? 'white' : 'black', alignSelf: 'center', fontSize: 15}}>Timeline Data</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.setState({graphStatus: true})}>
                        <View style={{width: 150, height: 30, justifyContent: 'center', alignContent: 'center', backgroundColor: this.state.graphStatus? 'pink' : 'black'}}>
                            <Text style={{color: this.state.graphStatus ? 'black' : 'white', alignSelf: 'center', fontSize: 15}}>Timeline Chart</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {
                    this.state.graphStatus ?
                    <View style={{marginTop: 10, flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                        <LineChart
                        data={line}
                        width={screenWidth}
                        height={250}
                        chartConfig={{
    
                            backgroundGradientTo: '#ffa726',
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                        />
                    </View> : null
                }
                <FlatList style={{marginTop: height}}
                data = {this.state.keys}
                keyExtractor = {(item, index) => index.toString()}
                renderItem = {({item})=>
                <View style={{paddingTop: 20, borderBottomWidth: 1}}>
                    <Text style={{marginBottom: 10, color: 'white', fontSize: 15}}>{this.dateFunction(item)}</Text>
                    <View style={{justifyContent: 'space-around', flexDirection: 'row', marginBottom: 10}}>
                        <View style={{height: 100, width: 120, justifyContent: 'center', backgroundColor: '#FF9999'}}>
                            <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>{this.state.data[0][item].total_cases}</Text>
                            <Text style={{textAlign: 'center', color: 'pink', fontSize: 15}}>Confirmed</Text>
                        </View>
                        <View style={{height: 100, width: 120, justifyContent: 'center', backgroundColor: '#FF9933'}}>
                            <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>{this.state.data[0][item].total_recoveries}</Text>
                            <Text style={{textAlign: 'center', color: 'pink', fontSize: 15}}>Total Recovered</Text>
                        </View>
                        <View style={{height: 100, width: 120, justifyContent: 'center', backgroundColor: '#990099'}}>
                            <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>{this.state.data[0][item].total_deaths}</Text>
                            <Text style={{textAlign: 'center', color: 'pink', fontSize: 15}}>Total Deaths</Text>
                        </View>
                     </View>
                     <View style={{justifyContent: 'space-around', flexDirection: 'row', marginBottom: 10}}>
                        <View style={{height: 100, width: 120, justifyContent: 'center', backgroundColor: '#990099'}}>
                            <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'white'}}>{this.state.data[0][item].new_daily_cases}</Text>
                            <Text style={{textAlign: 'center', color: 'black', fontSize: 15}}>New Cases Today</Text>
                        </View>
                        <View style={{height: 100, width: 120, justifyContent: 'center', backgroundColor: '#FF9999'}}>
                            <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'white'}}>{this.state.data[0][item].new_daily_deaths}</Text>
                            <Text style={{textAlign: 'center', color: 'black', fontSize: 15}}>Deaths Today</Text>
                        </View>
                     </View>
                </View>
                }
                />
            </ImageBackground>
        )
    }
}