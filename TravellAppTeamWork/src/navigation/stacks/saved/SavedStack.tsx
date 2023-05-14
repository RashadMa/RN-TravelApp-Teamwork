import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import PlaceDetails from '../../../screens/home/PlaceDetails';
import SavedScreen from '../../../screens/saved/SavedScreen';
const Saved = createNativeStackNavigator();

const SavedStack = () => {
  return (
    <Saved.Navigator screenOptions={{ headerShown: false }}>
      <Saved.Screen name="savedscreen" component={SavedScreen} />
      <Saved.Screen name="placesdetails" component={PlaceDetails} />
    </Saved.Navigator>
  )
}

export default SavedStack

const styles = StyleSheet.create({})