import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, TextInput, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import CategoryListCard from '../../components/tabComponents/CategoryListCard'
import SearchCard from '../../components/tabComponents/SearchCard'
import { BaseNetwork } from '../../network/api'


const SearchScreen = () => {
  const [PlacesdataSearch, setPlacesdataSearch] = useState([])
  const [Catdata, setCatdata] = useState([])
  const [data, setdata] = useState([])
  const [loading, setloading] = useState(true)

  useEffect(() => {
    let network = new BaseNetwork();
    network.getAll('categories').then((res: any) => {
      setCatdata(res);
      setloading(false)
    })

  }, [])
  useEffect(() => {
    let network = new BaseNetwork();
    network.getAll('places').then((res: any) => {
      setPlacesdataSearch(res);
      setdata(res);
    })
  }, [])

  const Searching = (value: string) => {
    let filtereddata = PlacesdataSearch.filter((c) => c.name.toLowerCase().includes(value.toLowerCase()))
    setdata(filtereddata);
  }

  const renderItemCat = ({ item }: any) => {
    return (
      <View>
        <CategoryListCard item={item} />
      </View>
    )
  }
  const renderItem = ({ item }: any) => {
    return (
      <View>
        <SearchCard item={item} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator style={styles.loading} animating={loading} />
      {
        loading ? <></> : <>
          <View>
            <TextInput onChangeText={Searching} style={styles.input} placeholderTextColor={'#B9B9B9'} placeholder='🔍  Search by items' />
          </View>
          <View style={styles.categorieslist}>
            <FlatList
              horizontal
              data={Catdata}
              renderItem={renderItemCat}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View>
            <FlatList
              style={{ height: '90%' }}
              data={data}
              renderItem={renderItem}
            />
          </View></>
      }

    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    padding: 20,
    flex: 1,
    backgroundColor: '#1C1C1C'
  },
  input: {
    color: 'white',
    paddingLeft: 15,
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#262626'
  },
  categorieslist: {
    marginVertical: 20
  },
  loading: {
    color: '#E0783E',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: 400 }],
  },
})