
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';

export default function SplashScreen() {

 const navigation = useNavigation();
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('Navigation');
      console.log("Navegar")
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2488FF" />
      <Image source={require('../../assets/icons/logo_256.png')} style={styles.img}/>
      <ActivityIndicator size="large" color="#2488FF" style={styles.activityIndicator} />
    </View>
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