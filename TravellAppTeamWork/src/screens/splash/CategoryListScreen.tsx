import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FirstLoginContext } from '../../context/FirstLoginContext';
import { BaseNetwork } from '../../network/api';
import { userSavedCategoriesHelper } from '../../utils/storage/userSavedCategoriesHelper';
import { Category } from '../../interfaces/Category';

const CategoryListScren = ({ navigation }: any) => {
      const [categories, setCategories] = useState<Category[]>([]);
      const [categoriesData, setCategoriesData] = useState<Category[]>([]);
      const { firstLogin, setFirstLogin } = useContext(FirstLoginContext);
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

            return <>
                  <Pressable style={styles.box} onPress={() => categoryOperation(item)}>
                        <View style={[styles.hello, style]}>
                              <Text style={styles.icon}>{item.icon}</Text>
                              <Text style={styles.text}>{item.name}</Text>
                        </View>
                  </Pressable>
            </>
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
                        <View style={styles.textWrapper}>
                              <Text style={styles.title}>Choose your interest</Text>
                              <Text style={styles.desc}>Select at least 2 options that we can suggest you on the home page.</Text>
                        </View>
                        <FlatList
                              data={categoriesData}
                              renderItem={renderItem}
                              // keyExtractor={item => item.id}
                              numColumns={2}
                        />
                        <TouchableOpacity style={styles.btn} onPress={next}>
                              <Text style={styles.btnText}>
                                    Next
                              </Text>
                        </TouchableOpacity>
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
            width: 343,
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
            height: 136,
            marginRight: 16,
            marginBottom: 16,
      }
})