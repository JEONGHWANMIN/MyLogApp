import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorage {
  private static instance: LocalStorage | null = null;

  private constructor() {
    // Private constructor to prevent instantiation outside the class
  }

  static getInstance(): LocalStorage {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }
    return LocalStorage.instance;
  }

  async storeData(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('Error storing data:', error);
    }
  }

  async getData(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.log('Error retrieving data:', error);
    }
  }

  async removeData(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log('Error removing data:', error);
    }
  }
}
