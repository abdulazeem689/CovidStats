import React from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';

export default class Countries extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: Data,
        }
    }

    render(){
        return(
            <View >
                <FlatList
                data = {this.state.data.sort((a,b)=>a.country > b.country)}
                keyExtractor={(item, index)=>index.toString()}
                renderItem = {({item})=>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Timeline", {country: item.country, code: item.code})}>
                    <View style={{marginTop: 20, marginLeft: 20, marginBottom: 20}}>
                        <Text>{item.country+"("+item.code+")"}</Text>
                    </View>
                </TouchableOpacity>
                }
                />
            </View>
        )
    }
}

const Data = [
    {
        country: "India",
        code: "IN",
    },
    {
        country: "USA",
        code: "US",
    },
    {
        country: "China",
        code: "CN",
    },
    {
        country: "Italy",
        code: "IT",
    },
    {
        country: "France",
        code: "FR",
    },
    {
        country: "Iran",
        code: "IR",
    },
    {
        country: "Spain",
        code: "ES",
    },
    {
        country: "United Kingdom",
        code: "GB",
    },
    {
        country: "Belgium",
        code: "BE",
    },
    {
        country: "Brazil",
        code: "BR",
    },
    {
        country: "Germany",
        code: "DE",
    },
    {
        country: "Netherlands",
        code: "NL",
    },
    {
        country: "Turkey",
        code: "TR",
    },
    {
        country: "Switzerland",
        code: "CH",
    },
    {
        country: "Sweden",
        code: "SE",
    },
    {
        country: "Canada",
        code: "CA",
    },
    {
        country: "Portugal",
        code: "PT",
    },
    {
        country: "Austria",
        code: "AT"
    },
    {
        country: "Indonesia",
        code: "ID",
    },
    {
        country: "Ecuador",
        code: "EC",
    },
    {
        country: "Ireland",
        code: "IE",
    },
    {
        country: "Romania",
        code: "RO",
    },
    {
        country: "Algeria",
        code: "DZ",
    },
    {
        country: "Denmark",
        code: "DK",
    },
]
