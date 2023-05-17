import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { FirstLoginProvider } from './src/context/FirstLoginContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SplashScreen from 'react-native-splash-screen'
import Opening from './src/screens/splash/Opening'
import { SelectedCategoriesProvider } from './src/context/SelectedCategoriesContext'
import { ThemeProvider } from './src/context/ThemeContext'

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  // AsyncStorage.clear();
  
  return (
    <>
      <NavigationContainer 
      // theme={{
        // colors: {
        //   background:"#1c1c1c",
        // }
      // }}
      >
        <FirstLoginProvider>
          <SelectedCategoriesProvider>
            <ThemeProviderz>
              <Opening />
            </ThemeProvider>
          </SelectedCategoriesProvider>
        </FirstLoginProvider>
      </NavigationContainer>
    </>
  )
}

export default App

const styles = StyleSheet.create({})