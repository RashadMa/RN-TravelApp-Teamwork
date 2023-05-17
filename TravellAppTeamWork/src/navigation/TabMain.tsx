import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import { Image, StyleSheet } from 'react-native';
import HomeStack from './stacks/home/HomeStack';
import SavedStack from './stacks/saved/SavedStack';
import SearchStack from './stacks/search/SearchStack';
import SettingScreen from '../screens/settings/SettingScreen';
import { ThemeContext } from '../context/ThemeContext';
const Tab = createBottomTabNavigator();
const TabMain = () => {
      const { theme } = useContext(ThemeContext);
      return (
            <>
                  <Tab.Navigator screenOptions={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarStyle: {
                              borderTopWidth: 0,
                              backgroundColor: theme === 'dark' ? '#1c1c1c' : '#ffff'
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
                        <Tab.Screen name='SettingsScreen' component={SettingScreen}
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