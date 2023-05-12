import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Category } from "../../models/Category";

export const saveUserCategories = async (categories: any) => {
  try {
    await AsyncStorage.setItem('userCategories', JSON.stringify(categories));
  } catch (error) {
    console.log(error);
  }
};

export const getUserCategories = async () => {
  try {
    const userCategories = await AsyncStorage.getItem('userCategories');
    if (userCategories !== null) {
      return JSON.parse(userCategories);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const removeAllUserCategories = async () => {
  try {
    await AsyncStorage.removeItem('userCategories');
  } catch (error) {
    console.log(error);
  }
};
