// This has to be the first import, otherwise a "WARNING: Missing strong random number source" is thrown
import useWallet from "./useWallet";

import React, { useState, useEffect } from "react";
import { Text, View , useWindowDimensions} from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Scanner from "./Scanner";


import AccountSelector from "./AccountSelector";
import Balance from "./Balance";
import TopBar from "./TopBar";
import NetworkSelector from "./NetworkSelector";
import Wallet from "./Wallet";

const { log } = require('./LogHelper');

import { NETWORKS, ROUTE_NAME_HOME, ROUTE_NAME_WALLET_CONNECT, ROUTE_NAME_WALLET_SECRETS, STORAGE_KEY_NETWORK_NAME } from "./constants";

const {
    getActiveAccountIndexFromStorage,
    getAccountIndexesArrayFromStorage,
    handleActiveAccountIndex,
    handleAccountIndexesArray,
    handleNetwork } = require('./AccountHelper');

// <NetworkSelector network={network} setNetwork={setNetwork} />
// <AccountSelector activeAccountIndex={activeAccountIndex} setActiveAccountIndex={setActiveAccountIndex} accountIndexesArray={accountIndexesArray} />

export default function App() {
    const { height, width } = useWindowDimensions();

    const [activeAccountIndex, setActiveAccountIndex] = useState(null);
    const [accountIndexesArray, setAccountIndexesArray] = useState(null);
    const [network, setNetwork] = useState(null);

    useEffect(() => {
        handleNetwork(setNetwork);
    }, []);
    useEffect(() => {
        handleActiveAccountIndex(setActiveAccountIndex);
    }, []);
    useEffect(() => {
        handleAccountIndexesArray(setAccountIndexesArray);
    }, []);

    const wallet = useWallet(network, activeAccountIndex);

    const [punkIndex, setPunkIndex] = useState();
    useEffect(() => {
        if (wallet?.address) {
            setPunkIndex(calculatePunkIndex(wallet.address));
        }
    }, [wallet]);

    if (!punkIndex) {
        return (
          <SafeAreaProvider>
              <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                  <Text>Loading</Text>
              </SafeAreaView>
          </SafeAreaProvider>
        );
    }

    const barPercentage = 0.08;
    const mainPercentage = 1 - (2 * barPercentage);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ flex: barPercentage, borderWidth: 1 }} borderColor={"white"} borderStyle={"solid"} >
                    <TopBar
                        address={wallet.address}
                        viewHeight={height * barPercentage}
                        viewWidth={width}
                        punkIndex={punkIndex}
                        activeAccountIndex={activeAccountIndex}
                        setActiveAccountIndex={setActiveAccountIndex}
                        accountIndexesArray={accountIndexesArray}
                        setAccountIndexesArray={setAccountIndexesArray}
                    />
                </View>
                <View style={{ flex: barPercentage, borderWidth: 1 }} borderColor={"white"} borderStyle={"solid"} >
                    <View style={{ flex:1, flexDirection:"row"}} >
                        <View style={{ flex:0.5}} >
                            <Balance provider={wallet.provider} address={wallet.address} chainId={network.chainId} />
                        </View>
                        <View style={{ flex:0.5, justifyContent:"center"}} >
                            <NetworkSelector network={network} setNetwork={setNetwork} />
                        </View>
                    </View>
                </View>
                <View style={{ flex: mainPercentage, borderWidth: 3 }} borderColor={"white"} borderStyle={"solid"}>
                    <Wallet wallet={wallet} chainId={network.chainId} viewHeight={height * mainPercentage} viewWidth={width} />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

