import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from '../../../screens/home/Homescreen';
import PlaceDetails from '../../../screens/home/PlaceDetails';
const Home = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Home.Navigator screenOptions={{ headerShown: false }}>
      <Home.Screen name="homescreen" component={Homescreen} />
      <Home.Screen name="placesdetails" component={PlaceDetails} />
    </Home.Navigator>
  )
}

export default HomeStack
