import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BaseNetwork } from '../../network/api'
import { getUserPlaces, saveUserPlaces } from '../../utils/storage/userSavedPlacesHelper'

const SavedCard = ({ item }: any) => {
  const [data, setdata] = useState<any[]>([])
  const [alldata, setalldata] = useState<any[]>([])
  useEffect(() => {
    let network = new BaseNetwork();
    network.getAll('places').then((res) => {
      setalldata(res);
    })
  }, [])

  useFocusEffect(() => {
    getUserPlaces().then((res: any) => {
      setdata(res);
    })
  })

  const [isSaved, setisSaved] = useState(false)
  const Delete = () => {
    item.isSaved = false
    setalldata(alldata)
    let filtered = data.filter(c => c.id != item.id)
    setisSaved(false)
    saveUserPlaces(filtered)
    setdata(filtered)
  }
  return (
    <>
      <View style ={{marginBottom: 20,}}>
      <View style={styles.restaurants}>
        <View style={styles.bookmarkWrapper}>
          <TouchableOpacity onPress={Delete}>
            <Image style={styles.bookmark}
              source={require('../../assets/icons/savedbookmark.png')}
            />
          </TouchableOpacity>
        </View>
        <Image source={{ uri: item.imageUrl }} style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, width: '100%', height: 200, resizeMode: "cover" }} />
        <View style={{ padding: 10 }}>
          <Text style={styles.rstName}>{item.name}</Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.footerTexts}>
            📍 4 km
          </Text>
          <Text style={styles.footerTexts}>
            🕘 {item.openCloseTime}
          </Text>
          <Text style={styles.footerTexts}>
            ⭐️ {item.rate}
          </Text>
        </View>
      </View>
      </View>
    </>
  )
}

export default SavedCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  headerWrapper: {
    marginVertical: 10
  },
  headerText: {
    fontWeight: '400',
    fontSize: 15,
    color: '#fff',
    marginBottom: 15
  },
  restaurants: {
    width: 350,
    height: 280,
    borderWidth: 1,
    borderColor: '#262626',
    marginRight: 15,
    borderRadius: 12,
  },
  rstName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 30,
    padding: 10
  },
  footerTexts: {
    color: '#E8E8E8',
    fontSize: 10,
    fontWeight: '500',
  },
  bookmark: {
    width: 15,
    height: 17,
  },
  bookmarkWrapper: {
    position: 'absolute',
    zIndex: 10,
    right: 13,
    top: 13,
    backgroundColor: '#1C1C1C',
    padding: 10,
    borderRadius: 50,
  }
})