import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import HomeCard from '../../components/tabComponents/HomeCard';
import { ThemeContext } from '../../context/ThemeContext';
import { BaseNetwork } from '../../network/api';
import WeatherSecond from './WeatherSecond';

const Homescreen = ({ item, navigation }: any) => {
  const [restaurant, setRestaurant] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchSelectedCategories = async () => {
      const storedCategories = await AsyncStorage.getItem('userCategories');
      if (storedCategories) {
        const parsedCategories = JSON.parse(storedCategories);
        setSelectedCategories(parsedCategories);
      }
    };

    fetchSelectedCategories();
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
        setRestaurant(rest);
        setLoading(false);
      }).catch(err => {
        console.log('Error ', err);
      })
  }, [])

  const sections: any = selectedCategories.map((category) => {
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
              <View>
                <SectionList
                  renderItem={() => {
                    return null
                  }}
                  showsHorizontalScrollIndicator={false}
                  sections={sections}
                  contentContainerStyle={{ paddingBottom: 150 }}
                  keyExtractor={(item) => item.id.toString()}
                  renderSectionHeader={({ section }: any) => (
                    <>
                      <Text style={[styles.headerText, textStyles]}>{section.title}s nearby</Text>
                      <FlatList
                        horizontal={true}
                        data={section.data}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }: any) => (
                          <TouchableOpacity onPress={() => navigation.navigate('placesdetails', { id: item.id })} >
                            <HomeCard textStyles={textStyles} item={item} />
                          </TouchableOpacity>
                        )}
                      />
                    </>
                  )}
                />
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