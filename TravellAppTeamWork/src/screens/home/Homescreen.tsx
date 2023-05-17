import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, SectionList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { BaseNetwork } from '../../network/api';
import { ActivityIndicator } from 'react-native-paper';
import HomeCard from '../../components/tabComponents/HomeCard';
import WeatherSecond from './WeatherSecond';
import { getUserCategories } from '../../utils/storage/userSavedCategoriesHelper';
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Homescreen = ({ item, navigation }: any) => {
  const [restaurant, setRestaurant] = useState<any[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);

  useEffect(() => {
    // Fetch the selected categories from AsyncStorage when the component mounts
    const fetchSelectedCategories = async () => {
      const storedCategories = await AsyncStorage.getItem('userCategories');
      if (storedCategories) {
        const parsedCategories = JSON.parse(storedCategories);
        setSelectedCategories(parsedCategories);
      }
    };

    fetchSelectedCategories();
    // console.log(selectedCategories[0].id, 'userCategories');

  }, []);

  //#region styles

  const containerStyles = {
    backgroundColor: theme === 'dark' ? '#fff' : '#1c1c1c',
  };

  const textStyles = {
    color: theme === 'dark' ? '#1c1c1c' : '#fff',
  };

  //#endregion


  useEffect(() => {
    let baseNetwork = new BaseNetwork();
    baseNetwork.getAll('places')
      .then((data) => {
        const rest = data.filter((q: any) => {
          return selectedCategories.map((category) => category.id === q.categoryId);
        });
        // const htls = data.filter((q: any) => q.categoryId == 5);
        // const selected = selectedCategories.filter((q: any) => q.id == data.categoryId);
        // const filteredPlaces = data.filter(() => {

        //   let a =  selectedCategories.filter((category) => category.id === data.categoryId);
        //   console.log(a, 'a');
        //   return 
        // });
        // console.log(selectedCategories[0].id, 'filteredPlaces');
        setRestaurant(rest);
        // setHotels(htls);
        setLoading(false);
      }).catch(err => {
        console.log('Error ', err);
      })
  }, [])

  // useEffect(() => {
  //   getUserCategories().then((res) => {
  //     setCategoriesData(res);
  //   })
  // }, [])

  const renderItem = ({ item }: any) => {
    return (<>
      <TouchableOpacity onPress={() => navigation.navigate('placesdetails', { id: item.id })} >
        <HomeCard textStyles={textStyles} item={item} />
      </TouchableOpacity>
    </>
    )
  }

  const sections = selectedCategories.map((category) => {
    const filteredPlaces = restaurant.filter((place) => place.categoryId === category.id);
    return { title: category.name, data: filteredPlaces };
  });

  return (
    <SafeAreaView style={[styles.container, containerStyles]}>
      <View>
        <ActivityIndicator style={styles.loading} animating={loading} />
        {
          loading ? <></> : <View style={{ margin: 15 }}>
            <View style={styles.headerWrapper}>
              {
                <WeatherSecond textStyles={textStyles} />
              }
              {/* <Text style={[styles.headerText, textStyles]}>{t('Restaurants nearby')}</Text> */}
              <View>
                <SectionList
                horizontal={true}
                  sections={sections}
                  keyExtractor={(item) => item.id.toString()}
                  renderSectionHeader={({ section: { title } }) => (
                    <Text style={[styles.headerText, textStyles]}>{title}s nearby</Text>
                  )}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('placesdetails', { id: item.id })} >
                      <HomeCard textStyles={textStyles} item={item} />
                    </TouchableOpacity>
                  )}
                />
                {/* <FlatList
                  data={restaurant}
                  renderItem={renderItem}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                /> */}
              </View>
            </View>
            <View style={styles.headerWrapper}>
              <Text style={[styles.headerText, textStyles]}>{t('Hotels nearby')}</Text>
              <View>
                {/* <FlatList
                  data={hotels}
                  renderItem={renderItem}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                /> */}
              </View>
            </View>
          </View>
        }
      </View>
    </SafeAreaView>
  )
}

export default Homescreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    // backgroundColor: theme === 'dark' ? '#1c1c1c' : '#fff',
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