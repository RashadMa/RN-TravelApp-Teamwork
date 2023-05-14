import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import HomeStack from './stacks/home/HomeStack';
import SavedStack from './stacks/saved/SavedStack';
import SearchStack from './stacks/search/SearchStack';
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
                        <Tab.Screen name='SearchStack' component={SearchStack}
                              options={{
                                    tabBarIcon: ({ focused }) => {
                                          return <Image style={{ tintColor: focused ? '#E0783E' : '#494949' }} source={require('../assets/images/baricons/searchicon.png')} />
                                    }
                              }} />
                        <Tab.Screen name='SavedStack' component={SavedStack}
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