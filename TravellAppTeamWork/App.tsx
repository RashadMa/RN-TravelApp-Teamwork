import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { LogBox, StyleSheet } from 'react-native'
import { FirstLoginProvider } from './src/context/FirstLoginContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SplashScreen from 'react-native-splash-screen'
import Opening from './src/screens/splash/Opening'
import { SelectedCategoriesProvider } from './src/context/SelectedCategoriesContext'
import { ThemeProvider } from './src/context/ThemeContext'

const App = () => {
  // LogBox.ignoreAllLogs()
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  // AsyncStorage.clear();

  return (
    <>
      <NavigationContainer>
        <FirstLoginProvider>
          <SelectedCategoriesProvider>
            <ThemeProvider>
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