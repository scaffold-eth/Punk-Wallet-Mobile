// https://stackoverflow.com/questions/46736268/react-native-asyncstorage-clear-is-failing-on-ios

import {  Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

cleanStorage = async () => {
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (asyncStorageKeys.length > 0) {
        if (Platform.OS === 'android') {
            await AsyncStorage.clear();
        }
        if (Platform.OS === 'ios') {
        await AsyncStorage.multiRemove(asyncStorageKeys);
        }
    }

    SecureStore.deleteItemAsync("MNEMONIC_KEY");

    for (let i = 0; i < 20; i++) {
        SecureStore.deleteItemAsync("MNEMONIC_KEY" + i);    
    }
}

module.exports = {
    cleanStorage
}