import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import Saved from '../screens/saved/Saved';
import Search from '../screens/search/Search';
import HomeStack from './stacks/home/HomeStack';

const Tab = createBottomTabNavigator();

const TabMain = () => {
      return (
            <>
                  <Tab.Navigator screenOptions={{ headerShown: false }}>
                        <Tab.Screen
                              name="homestack"
                              component={HomeStack}
                              options={{

                              }}
                        />
                        <Tab.Screen
                              name="search"
                              component={Search}
                              options={{

                              }}
                        />
                        <Tab.Screen
                              name="saved"
                              component={Saved}
                              options={{
                              }}
                        />
                  </Tab.Navigator>
            </>
      )
}

export default TabMain

const styles = StyleSheet.create({})