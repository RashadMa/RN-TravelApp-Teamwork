import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BaseNetwork } from '../../network/api';
import { ActivityIndicator } from 'react-native-paper';
import HomeCard from '../../components/tabComponents/HomeCard';
import WeatherSecond from './WeatherSecond';

const Homescreen = ({ item, navigation }: any) => {
  const [restaurant, setRestaurant] = useState<any[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    let baseNetwork = new BaseNetwork();
    baseNetwork.getAll('places')
      .then((data) => {
        const rest = data.filter((q: any) => q.categoryId == 1);
        const htls = data.filter((q: any) => q.categoryId == 5);
        setRestaurant(rest);
        setHotels(htls);
        setloading(false);
      }).catch(err => {
        console.log('Error ', err);
      })
  }, [])

  const renderItem = ({ item }: any) => {
    return (<>
      <TouchableOpacity onPress={() => navigation.navigate('placesdetails', { id: item.id })} >
        <HomeCard item={item}/>
      </TouchableOpacity>
    </>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ActivityIndicator style={styles.loading} animating={loading} />
        {
          loading ? <></> : <View style={{ margin: 15 }}>
            <View style={styles.headerWrapper}>
              {
                <WeatherSecond/>
              }
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
        }
      </ScrollView>
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
    marginBottom: 15,
    marginTop: 30,
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
  },
  loading: {
    color: '#E0783E',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: 400 }],
  },
})