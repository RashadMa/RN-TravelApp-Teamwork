import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getUserPlaces } from '../../utils/storage/userSavedPlacesHelper'
import { useFocusEffect } from '@react-navigation/native'
import SavedCard from '../../components/tabComponents/SavedCard'
import { ActivityIndicator } from 'react-native-paper'

const SavedScreen = ({navigation}: any) => {
  const [Placesdata, setPlacesdata] = useState([])
  const [loading, setLoading] = useState(true)


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
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 15 }}>
        <ActivityIndicator style={styles.loading} animating={loading} />
        {
          loading ? <></> : <>
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.headertext}>Saved</Text>
            </View>
            <View>
              <FlatList
                style={{ height: '90%' }}
                data={Placesdata}
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
