import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { FirstLoginProvider } from './src/context/FirstLoginContext'
import SplashScreen from './src/screens/splash/SplashScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'

const App = () => {
  return (
    <>
      <NavigationContainer>
        <FirstLoginProvider>
          <SplashScreen />
        </FirstLoginProvider>
      </NavigationContainer>
    </>
  )
}

export default App

const styles = StyleSheet.create({})