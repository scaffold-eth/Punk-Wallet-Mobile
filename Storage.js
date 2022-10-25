import AsyncStorage from '@react-native-async-storage/async-storage';

getItem = async (key) => {
    try {
        return (await AsyncStorage.getItem(key));
    }
    catch (e) {
        console.error("Coudn't get item", key, e);
    }
}

setItem = (key, value) => {
    try {
        AsyncStorage.setItem(key, value);
    }
    catch (e) {
        console.error("Coudn't set item", key, value, e);
    }
}

module.exports = {
    getItem, setItem
}