import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { FirstLoginProvider } from './src/context/FirstLoginContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SplashScreen from 'react-native-splash-screen'
import Opening from './src/screens/splash/Opening'
import Geolocation from '@react-native-community/geolocation';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  // AsyncStorage.clear();
  return (
    <>
      <NavigationContainer>
        <FirstLoginProvider>
          <Opening />
        </FirstLoginProvider>
      </NavigationContainer>
    </>
  )
}

export default App

const styles = StyleSheet.create({})