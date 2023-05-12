import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'
import SplashScreen from './src/screens/splash/SplashScreen'
import { FirstLoginProvider } from './src/context/FirstLoginContext'


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