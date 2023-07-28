
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdicionarContato from './AdicionarContato';
import ListContatos from './ListContatos';
import { MaterialCommunityIcons , Fontisto, MaterialIcons } from '@expo/vector-icons';


export default function Navigation() {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name="ListContatos" component={ListContatos} options={{ headerShown: false, tabBarActiveTintColor: '#2488FF',
                                                                tabBarIcon: ({focused}) => (
                                                                    <MaterialIcons 
                                                                    name="home-filled"
                                                                    size={focused ? 35 : 30}
                                                                    style={focused ? {color: '#2488FF'} : {color: '#000'}}/>
                                                                    
                                                                )}}/>
            <Tab.Screen name="AdicionarContato" component={AdicionarContato} options={{ headerShown: false, tabBarActiveTintColor: '#2488FF',
                                                                tabBarIcon: ({focused}) => (
                                                                    <MaterialIcons 
                                                                    name="home-filled"
                                                                    size={focused ? 35 : 30}
                                                                    style={focused ? {color: '#2488FF'} : {color: '#000'}}/>
                                                                )}}/>
        </Tab.Navigator>
    );
}
