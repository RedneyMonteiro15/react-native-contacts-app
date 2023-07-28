
import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import SplashScreen from './scr/Splash';
import Navigation from './scr/Navigation';
import { initDatabase } from './baseDados/createBD';

export default function App() {

  useEffect(() => {
    initDatabase();
  }, []);


  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
          <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown: false}}/>
          <Stack.Screen name='Navigation' component={Navigation} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img:{
    marginBottom: 50
  },
  activityIndicator:{
    marginTop: 50,
    
},
});
