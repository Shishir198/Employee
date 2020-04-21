import React from 'react';
import { StyleSheet, Text, View,Image,Dimensions } from 'react-native';
import Home from './screen/home'
import Create from './screen/create'
import Constants from 'expo-constants';
import Profile from './screen/profiles'
import {FAB} from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


function App() {
  const Stack = createStackNavigator();
  return (
        <View style={styles.container}>
            <Stack.Navigator >
                <Stack.Screen name="Home" component={Home} options={{
                  title:"My home",
                  headerStyle:{
                     backgroundColor:"#4c669f"
                  }
                }} />
                <Stack.Screen name="Add Employee" component={Create} />
                <Stack.Screen name="Profile" component={Profile} />
                
            </Stack.Navigator>          
        </View>
        
  );
}
export default () =>{
  return(
  
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  );
}
    
  



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    // marginTop:Constants.statusBarHeight, 
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#fff",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
   

});
