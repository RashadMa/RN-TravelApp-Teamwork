import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BaseNetwork } from '../../network/api'
import { getUserPlaces, saveUserPlaces } from '../../utils/storage/userSavedPlacesHelper'

const SearchCard = ({ item, navigation }: any) => {
  const [data, setdata] = useState<any[]>([])
  const [alldata, setalldata] = useState<any[]>([])
  const [repeated, setrepeated] = useState<any[]>([])
  const [isSaved, setisSaved] = useState(false)

  useEffect(() => {
    let network = new BaseNetwork();
    network.getAll('places').then((res) => {
      setalldata(res);
    })
    if (item.isSaved == false) { setisSaved(false) }
  }, [])

  useFocusEffect(() => {
    getUserPlaces().then((res: any) => {
      setdata(res);
    })
  })

  const Save = () => {
    if (!isSaved) {
      setisSaved(true)
      let obj = alldata.find(c => c.id == item.id)
      obj.isSaved = true;
      if (obj != repeated.find(c => c.id == item.id)) {
        saveUserPlaces([...data, obj])
        setdata([...data, obj])
        setrepeated([...repeated, obj])
      }
      else {
        setdata([...data])
        saveUserPlaces([...data])
      }
    }
    else {
      let filtered = data.filter(c => c.id != item.id)
      setdata(filtered)
      saveUserPlaces(filtered)
      setisSaved(false)
    }
  }

  return (
    <>
      <View style={styles.restaurants}>
        <View style={styles.bookmarkWrapper}>
          <TouchableOpacity onPress={Save}>
            <Image style={styles.bookmark}
              source={isSaved ? require('../../assets/icons/savedbookmark.png') : require('../../assets/icons/bookmark.png')}
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
    </>
  )
}

export default SearchCard

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
    marginBottom: 20,
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