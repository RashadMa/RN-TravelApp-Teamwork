import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FirstLoginContext } from '../../context/FirstLoginContext';
import { BaseNetwork } from '../../network/api';
import { userSavedCategoriesHelper } from '../../utils/storage/userSavedCategoriesHelper';
import { Category } from '../../interfaces/Category';
import { ActivityIndicator } from 'react-native-paper';

const CategoryListScren = ({ navigation }: any) => {
      const [categories, setCategories] = useState<Category[]>([]);
      const [categoriesData, setCategoriesData] = useState<Category[]>([]);
      const { firstLogin, setFirstLogin } = useContext(FirstLoginContext);
      const [loading, setloading] = useState(true)
      const categoryOperation = (item: Category) => {
            let categoryControl = categories.find(q => q.id == item.id);
            if (categoryControl) {
                  let filteredCategories = categories.filter(q => q.id != item.id);
                  setCategories(filteredCategories);
            }
            else {
                  setCategories([...categories, item])
            }
      }

      useEffect(() => {
            let baseNetwork = new BaseNetwork();
            baseNetwork.getAll('categories')
                  .then(data => {
                        setCategories(data);
                        setCategoriesData(data);
                        setloading(false);
                  })
                  .catch(err => {
                        console.log('Error ', err);
                  })
      }, [])

      const renderItem = ({ item }: any) => {
            let style = {};

            let categoryControl = categories.find(q => q.id == item.id);

            if (categoryControl)
                  style = {
                        borderColor: '#494949',
                  }

            return (
                  <Pressable style={styles.box} onPress={() => categoryOperation(item)}>
                        <View style={[styles.hello, style]}>
                              <Text style={styles.icon}>{item.icon}</Text>
                              <Text style={styles.text}>{item.name}</Text>
                        </View>
                  </Pressable>)
         
      }


      const next = () => {
            if (categories.length > 0) {
                  userSavedCategoriesHelper(categories)
                        .then(res => {
                              setFirstLogin(false)
                        })
            }
            else {
                  setFirstLogin(false)
            }
      }
      return (
            <SafeAreaView style={styles.container}>
                  <View style={{ margin: 15 }}>
                        <ActivityIndicator style={styles.loading} animating={loading} />
                        {
                              loading ? <></> : <View>
                                    <View style={styles.textWrapper}>
                                          <Text style={styles.title}>Choose your interest</Text>
                                          <Text style={styles.desc}>Select at least 2 options that we can suggest you on the home page.</Text>
                                    </View>
                                    <View
                                    >
                                          <FlatList
                                                data={categoriesData}
                                                renderItem={renderItem}
                                                numColumns={2}
                                                columnWrapperStyle={{justifyContent:"space-around"}}
                                          />
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                          <TouchableOpacity style={styles.btn} onPress={next}>
                                                <Text style={styles.btnText}>
                                                      Next
                                                </Text>
                                          </TouchableOpacity>
                                    </View>
                              </View>
                        }
                  </View>
            </SafeAreaView>
      )
}

export default CategoryListScren

const styles = StyleSheet.create({
      title: {
            fontWeight: '600',
            fontSize: 20,
            lineHeight: 24,
            color: '#fff',
            marginBottom: 10,
      },
      desc: {
            color: '#B9B9B9',
            fontWeight: '400',
            fontSize: 14,
      },
      textWrapper: {
            marginBottom: 28,
      },
      container: {
            backgroundColor: '#1c1c1c',
            flex: 1,
      },
      box: {},
      icon: {
            fontSize: 36,
            fontWeight: '400',
            marginBottom: 8,
      },
      text: {
            fontSize: 15,
            fontWeight: '400',
            color: '#fff',
      },
      btn: {
            backgroundColor: "#018CF1",
            borderRadius: 8,
            height: 48,
            width: "95%",
            justifyContent: 'center',
            alignItems: 'center',
      },
      btnText: {
            color: '#fff',
            fontWeight: '500',
            fontSize: 16,
      },
      hello: {
            borderStyle: 'solid',
            borderColor: '#F6F6F6',
            borderWidth: 1,
            borderRadius: 8,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center', width: 164,
            height: 125,
            // marginRight: 28,
            marginBottom: 16,
      },
      loading: {
            color: '#E0783E',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ translateY: 400 }],
      },
})