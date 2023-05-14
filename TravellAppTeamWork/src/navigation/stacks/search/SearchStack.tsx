import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import PlaceDetails from '../../../screens/home/PlaceDetails';
import SearchScreen from '../../../screens/search/SearchScreen';
const Search = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Search.Navigator screenOptions={{ headerShown: false }}>
      <Search.Screen name="searchscreen" component={SearchScreen} />
      <Search.Screen name="placesdetails" component={PlaceDetails} />
    </Search.Navigator>
  )
}

export default SearchStack

const styles = StyleSheet.create({})