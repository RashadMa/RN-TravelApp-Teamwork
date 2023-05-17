import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Category } from "../../models/Category";

export const saveUserPlaces = async (categories: any) => {
  try {
    await AsyncStorage.setItem('userPlaces', JSON.stringify(categories));
  } catch (error) {
    console.log(error);
  }
};

export const getUserPlaces = async () => {
  try {
    const userCategories = await AsyncStorage.getItem('userPlaces');
    if (userCategories !== null) {
      return JSON.parse(userCategories??'');
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return '';
  }
};

export const removeAllUserPlaces = async () => {
  try {
    await AsyncStorage.removeItem('userPlaces');
  } catch (error) {
    console.log(error);
  }
};
