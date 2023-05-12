import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import OnboardScreen from '../../../screens/splash/OnboardScreen';
const Splash = createNativeStackNavigator();


const SplashStack = () => {
      return (
            <Splash.Navigator screenOptions={{ headerShown: false }}>
                  <Splash.Screen name="Onboarding1" component={OnboardScreen} />
                  {/* <Splash.Screen name="CategoryList" options={{
                        gestureEnabled: false
                  }} component={CategoryListScren} /> */}

            </Splash.Navigator>
      )
}

export default SplashStack

const styles = StyleSheet.create({})