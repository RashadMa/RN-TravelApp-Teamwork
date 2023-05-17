import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { getUserPlaces } from '../../utils/storage/userSavedPlacesHelper'
import { useFocusEffect } from '@react-navigation/native'
import SavedCard from '../../components/tabComponents/SavedCard'
import { ActivityIndicator } from 'react-native-paper'
import MapView from 'react-native-maps'
import { ThemeContext } from '../../context/ThemeContext'

const SavedScreen = ({navigation}: any) => {
  const [placesdata, setPlacesdata] = useState([])
  const [loading, setLoading] = useState(true)
  const { theme } = useContext(ThemeContext);

  const containerStyles = {
    backgroundColor: theme === 'dark' ? '#1c1c1c' : '#fff',
  };

  const textStyles = {
    color: theme === 'dark' ? '#fff' : '#1c1c1c',
  };
  
  useFocusEffect(() => {
    getUserPlaces().then((res) => {
      setPlacesdata(res);
      setLoading(false)
    })
  })

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('placesdetails', { id: item.id })}>
        <SavedCard item={item} />
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={[styles.container, containerStyles]}>
      <View style={{ margin: 10 }}>
        <ActivityIndicator style={styles.loading} animating={loading} />
        {
          loading ? <></> : <>
            <View style={{ marginBottom: 15 }}>
              <Text style={[styles.headertext, textStyles]}>Saved</Text>
            </View>
            <View>
              <FlatList
                style={{ height: '90%' }}
                data={placesdata}
                renderItem={renderItem}
              />
            </View>
          </>
        }
      </View>
    </SafeAreaView>
  )
}

export default SavedScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    padding: 10,
  },
  headertext: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    paddingTop: 30,
    marginBottom: 10
  },
  loading: {
    color: '#E0783E',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: 400 }],
  },
})
