import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import GlobalScreen from './app/Screens/GlobalScreen';
import Countries from './app/Screens/Countries';
import Timeline from './app/Screens/Timeline';

const Stack = createStackNavigator();


export default class App extends React.Component {

  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Global" >
          <Stack.Screen name = "Global" component={GlobalScreen} options={{title: "Global Statistics of Covid-19", headerTintColor: 'pink', headerStyle: {backgroundColor: '#343235'}}} />
          <Stack.Screen name = "Countries" component={Countries} />
          <Stack.Screen name = "Timeline" component = {Timeline} options={({route})=>({title: "Timeline of Covid-19 in "+route.params.country, headerTintColor: 'pink', headerBackTitleVisible: false, headerStyle: {backgroundColor: '#343235'}})}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

