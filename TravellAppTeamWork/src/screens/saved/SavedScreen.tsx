import { useFocusEffect } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import SavedCard from '../../components/tabComponents/SavedCard'
import { ThemeContext } from '../../context/ThemeContext'
import { getUserPlaces } from '../../utils/storage/userSavedPlacesHelper'
import { useTranslation } from 'react-i18next'

const SavedScreen = ({ navigation }: any) => {
  const [placesdata, setPlacesdata] = useState([])
  const [loading, setLoading] = useState(true)
  const { theme } = useContext(ThemeContext);
  const {t} = useTranslation();
  const containerStyles = {
    backgroundColor: theme === 'dark' ? '#fff' : '#1c1c1c',
  };

  const textStyles = {
    color: theme === 'dark' ? '#1c1c1c' : '#fff',
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
              <Text style={[styles.headertext, textStyles]}>{t('Saved')}</Text>
            </View>
            {
              placesdata ? <Text style={[styles.headertext, textStyles]}>No Saved Places</Text> : <View>
                <FlatList
                  style={{ height: '90%' }}
                  data={placesdata}
                  renderItem={renderItem}
                />
              </View>
            }
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
