import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BaseNetwork } from '../../network/api';

const Homescreen = () => {
  const [restaurant, setRestaurant] = useState<any[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);

  const [loading, setloading] = useState(true)
  useEffect(() => {
    let baseNetwork = new BaseNetwork();
    baseNetwork.getAll('places')
      .then(data => {
        const rest = data.filter((q: any) => q.categoryId == 1);
        const htls = data.filter((q: any) => q.categoryId == 5);
        setRestaurant(rest);
        setHotels(htls);
        setloading(false);
      })
      .catch(err => {
        console.log('Error ', err);
      })
  }, [])

  const renderItem = ({ item }: any) => {
    return (<>
      <TouchableOpacity style={styles.restaurants}>
        <View style={styles.bookmarkWrapper}>
          <Image style={styles.bookmark}
            source={require('../../assets/icons/bookmark.png')}
          />
        </View>
        <Image source={{ uri: item.imageUrl }} style={{ width: '100%', height: 200, resizeMode: "cover" }} />
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
      </TouchableOpacity>
    </>

    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 15 }}>
        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>Restaurants nearby</Text>
          <View>
            <FlatList
              data={restaurant}
              renderItem={renderItem}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>Hotels nearby</Text>
          <View>
            <FlatList
              data={hotels}
              renderItem={renderItem}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default Homescreen

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
    width: 230,
    height: 300,
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 12,
    marginRight: 15
  },
  rstName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    right: 10,
    top: 10,
    backgroundColor: '#1C1C1C',
    padding: 10,
    borderRadius: 50,
  }
})