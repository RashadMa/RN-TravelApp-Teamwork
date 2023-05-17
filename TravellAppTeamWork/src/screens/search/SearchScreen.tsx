import React, { useContext, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import CategoryListCard from '../../components/tabComponents/CategoryListCard'
import SearchCard from '../../components/tabComponents/SearchCard'
import { BaseNetwork } from '../../network/api'
import { ThemeContext } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'

const SearchScreen = ({ navigation }: any) => {
  const [PlacesdataSearch, setPlacesdataSearch] = useState([])
  const [Catdata, setCatdata] = useState([])
  const [data, setdata] = useState([])
  const [loading, setloading] = useState(true)
  const [isPressed, setisPressed] = useState<any>()
  const { theme, toggleTheme } = useContext(ThemeContext);
  const {t} = useTranslation();
  const containerStyles = {
    backgroundColor: theme === 'dark' ? '#fff' : '#1c1c1c',
  };
  const inputBgc = {
    backgroundColor: theme === 'dark' ? 'lightgrey' : '#262626',
  };

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
    let filtereddata = PlacesdataSearch.filter((c): any => c.name.toLowerCase().includes(value.toLowerCase()))
    setdata(filtereddata);
  }
  const SearchByCategory = (id: any) => {
    let filtered = PlacesdataSearch.filter(c => c.categoryId == id)
    setdata(filtered);
    setisPressed(id)
  }

  const renderItemCat = ({ item }: any) => {
    return (
      <View>
        <TouchableOpacity onPress={() => SearchByCategory(item.id)}>
          <CategoryListCard color={item.id == isPressed ? '#E0783E' : '#1C1C1C'} item={item} />
        </TouchableOpacity>
      </View>
    )
  }
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('placesdetails', { id: item.id })}>
        <SearchCard item={item} />
      </TouchableOpacity>
    )
  }
  const placehold = t('Search by items')
  return (
    <SafeAreaView style={[styles.container, containerStyles]}>
      <View style={{ margin: 15 }}>
        <ActivityIndicator style={styles.loading} animating={loading} />
        {
          loading ? <></> : <>
            <View>
              <TextInput onChangeText={Searching} style={[styles.input, inputBgc]} placeholderTextColor={'#B9B9B9'} placeholder={placehold} />
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
                showsVerticalScrollIndicator={false}
                windowSize={5}
              />
            </View></>
        }
      </View>
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    padding: 10,
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  input: {
    color: 'white',
    paddingLeft: 15,
    borderRadius: 10,
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