import React, { useState, useEffect } from "react";
import { Text } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

import NetworkSelector from "./NetworkSelector";
import AccountSelector from "./AccountSelector";
import Wallet from "./Wallet";

import { STORAGE_KEY_NETWORK_NAME, NETWORKS } from "./constants";

const { getActiveAccountIndexFromStorage, getAccountIndexesArray, handleActiveAccountIndex, handleAccountIndexesArray } = require('./AccountHelper');

export default function Home({ navigation, route }) {
    const [network, setNetwork] = useState(null);
    const [activeAccountIndex, setActiveAccountIndex] = useState(null);
    const [accountIndexesArray, setAccountIndexesArray] = useState(null);
/*
    useEffect(() => {
        AsyncStorage.clear();

        SecureStore.deleteItemAsync("MNEMONIC_KEY");

        for (let i = 0; i < 20; i++) {
            SecureStore.deleteItemAsync("MNEMONIC_KEY" + i);    
        }

        
        SecureStore.deleteItemAsync("MNEMONIC_KEY1");
        SecureStore.deleteItemAsync("MNEMONIC_KEY01");
        SecureStore.deleteItemAsync("MNEMONIC_KEY011");
        SecureStore.deleteItemAsync("MNEMONIC_KEY0111");
    }, []);
*/

    useEffect(() => {
        handleNetwork = async () => {
          const storedNetworkKey = await getItem(STORAGE_KEY_NETWORK_NAME);

          const networkKey = storedNetworkKey ? storedNetworkKey : Object.keys(NETWORKS)[0];

          setNetwork(NETWORKS[networkKey]);
        }

        handleNetwork();
    }, []);

    useEffect(() => {
        handleActiveAccountIndex(setActiveAccountIndex);
    }, []);

    useEffect(() => {
        handleAccountIndexesArray(setAccountIndexesArray);
    }, []);

    useEffect(() => {
        const navigationListener = navigation.addListener('tabPress', (e) => {
            handleActiveAccountIndex(setActiveAccountIndex);
            handleAccountIndexesArray(setAccountIndexesArray);
        });

        return navigationListener;
    }, [navigation]);

    if ((network == null) || (activeAccountIndex == null) || (accountIndexesArray == null)) {
        return <Text>Loading</Text>;
    }

    return (
        <>
            <NetworkSelector network={network} setNetwork={setNetwork} />
            <AccountSelector activeAccountIndex={activeAccountIndex} setActiveAccountIndex={setActiveAccountIndex} accountIndexesArray={accountIndexesArray} />
            <Wallet activeAccountIndex={activeAccountIndex} network={network} scannedWalletConnectUrl={route.params?.scannedWalletConnectUrl}/>
        </>
    );
}
