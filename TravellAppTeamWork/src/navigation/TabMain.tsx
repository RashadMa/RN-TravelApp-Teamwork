import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Saved from '../screens/saved/Saved';
import Search from '../screens/search/Search';
import HomeStack from './stacks/home/HomeStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createBottomTabNavigator();
const TabMain = () => {
      // AsyncStorage.clear();
      return (
            <>
                  <Tab.Navigator screenOptions={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarStyle: {
                              borderTopWidth: 0,
                              backgroundColor: '#1C1C1C',
                        }
                  }}>
                        <Tab.Screen name='homestack' component={HomeStack}
                              options={{
                                    tabBarIcon: ({ focused }) => {
                                          return <Image style={{ tintColor: focused ? '#E0783E' : '#494949' }} source={require('../assets/images/baricons/homeicon.png')} />
                                    }
                              }} />
                        <Tab.Screen name='SearchScreen' component={Search}
                              options={{
                                    tabBarIcon: ({ focused }) => {
                                          return <Image style={{ tintColor: focused ? '#E0783E' : '#494949' }} source={require('../assets/images/baricons/searchicon.png')} />
                                    }
                              }} />
                        <Tab.Screen name='SavedScreen' component={Saved}
                              options={{
                                    tabBarIcon: ({ focused }) => {
                                          return <Image style={{ tintColor: focused ? '#E0783E' : '#494949' }} source={require('../assets/images/baricons/savedicon.png')} />
                                    }
                              }} />
                  </Tab.Navigator>
            </>
      )
}

export default TabMain

const styles = StyleSheet.create({})