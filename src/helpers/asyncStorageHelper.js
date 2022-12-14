import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async ({key, value}) => {
  try {
    await AsyncStorage.setItem(`@${key}`, value);
  } catch (e) {
    console.log(e);
  }
};

const storeDataObject = async ({key, value}) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@${key}`, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getData = async ({key}) => {
  try {
    const value = await AsyncStorage.getItem(`@${key}`);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

const getDataObject = async ({key}) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${key}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export {storeData, storeDataObject, getData, getDataObject};
