// This has to be the first import, otherwise a "WARNING: Missing strong random number source" is thrown
import useWallet from "./useWallet";

import React, { useState, useEffect } from "react";
import { Text, View , useWindowDimensions, StyleSheet} from 'react-native';
//import {Dimensions} from 'react-native';

import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Draggable from 'react-native-draggable';

import Scanner from "./Scanner";


import AccountSelector from "./AccountSelector";
import SafeApp from "./SafeApp";
import Balance from "./Balance";
import IconsView from "./IconsView";
import TopBar from "./TopBar";
import NetworkSelector from "./NetworkSelector";
import Wallet from "./Wallet";

import * as ScreenOrientation from 'expo-screen-orientation';

const { log } = require('./LogHelper');

const { cleanStorage } = require('./DevHelper');

import { NETWORKS, ROUTE_NAME_HOME, ROUTE_NAME_WALLET_CONNECT, ROUTE_NAME_WALLET_SECRETS, STORAGE_KEY_NETWORK_NAME } from "./constants";

const { AccountHelper } = require('./AccountHelper');

const ICON_PERCENTAGE = 0.45;

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

export default function App() {

    

/* Clean AsyncStorage and SecureStore
    useEffect(() => {
        const clean = async () => {
            await cleanStorage();
        }

        clean();
    }, []);

    return (
      <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
              <Text>Cleaning...</Text>
          </SafeAreaView>
      </SafeAreaProvider>
    );
*/

    const { height, width } = useWindowDimensions();



/*
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    console.log("windowWidth", windowWidth);
    console.log("windowHeight", windowHeight);
*/

    const [activeAccountIndex, setActiveAccountIndex] = useState(null);
    const [accountIndexesArray, setAccountIndexesArray] = useState(null);
    const [network, setNetwork] = useState(null);

    let accountHelper = new AccountHelper(activeAccountIndex, setActiveAccountIndex, accountIndexesArray, setAccountIndexesArray, network, setNetwork);

    useEffect(() => {
        accountHelper.handleNetwork();
    }, []);
    useEffect(() => {
        accountHelper.handleActiveAccountIndex();
    }, []);
    useEffect(() => {
        accountHelper.handleAccountIndexesArray();
    }, []);

    const wallet = useWallet(accountHelper);

    const [punkIndex, setPunkIndex] = useState();
    useEffect(() => {
        if (wallet?.address) {
            setPunkIndex(calculatePunkIndex(wallet.address));
        }
    }, [wallet]);

    if (!punkIndex) {
        return (
          
              <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                  <Text>Loading</Text>
              </SafeAreaView>
          
        );
    }

    const barPercentage = 0.10;
    const mainPercentage = 1 - (2 * barPercentage);
    const topBarViewHeight = height * barPercentage;

    //const iconSize = topBarViewHeight * ICON_PERCENTAGE;
    const iconNumber = 4;

    console.log("width", width);
    console.log("height", height);

    const iconSize = width / iconNumber;
    console.log("iconSize", iconSize);
    const percentage = 0.5;

    

    

    const styledIonicon = (name, onPressFunction, color) => (<>
         <View  style={{
        
        height: iconSize,
        width: iconSize,
        backgroundColor: color ? color : "pink",
        alignItems: 'center',
        justifyContent: 'center'
      }}>
         <Ionicons
             name={name}
             size={iconSize * percentage}
             color={"rgb(24,144,255)"}
             onPress={
                 () => {
                     if (onPressFunction) {
                         onPressFunction(true);    
                     }

                     console.log("Pressed", name, onPressFunction)
                 }
             }/>
          </View>
    </>);

    if (false) {
        return (
            <IconsView
                width={width}
                height={height}
                accountHelper={accountHelper}
                wallet={wallet}
            />
        );
    }

    if (true) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                    <SafeApp
                        width={width}
                        height={height}
                        punkIndex={punkIndex}
                        accountHelper={accountHelper}
                        wallet={wallet}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }

    if (true) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ flex: barPercentage }}>
                    <TopBar
                        wallet={wallet}
                        topBarViewHeight={topBarViewHeight}
                        viewWidth={width}
                        punkIndex={punkIndex}
                        accountHelper={accountHelper}
                    />
                </View>
                <View style={{ flex: 1 - barPercentage }}>
                         <IconsView
                            width={width}
                            height={height}
                            accountHelper={accountHelper}
                            wallet={wallet}
                        />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ flex: barPercentage, borderWidth: 1 }} borderColor={"black"} borderStyle={"solid"} >
                    <TopBar
                        wallet={wallet}
                        topBarViewHeight={topBarViewHeight}
                        viewWidth={width}
                        punkIndex={punkIndex}
                        accountHelper={accountHelper}
                    />
                </View>
                <View style={{ flex: barPercentage, borderWidth: 1 }} borderColor={"white"} borderStyle={"solid"} >
                    <View style={{ flex:1, flexDirection:"row"}} >
                        <View style={{ flex:0.5}} >
                            <Balance provider={wallet.provider} address={wallet.address} chainId={accountHelper.getNetwork().chainId} />
                        </View>
                        <View style={{ flex:0.5, justifyContent:"center"}} >
                            <NetworkSelector accountHelper={accountHelper} />
                        </View>
                    </View>
                </View>
                <View style={{ flex: mainPercentage, borderWidth: 3 }} borderColor={"white"} borderStyle={"solid"}>
                    {styledIonicon("qr-code-outline")}
                    <Wallet wallet={wallet} chainId={accountHelper.getNetwork().chainId} topBarViewHeight={topBarViewHeight} viewHeight={height * mainPercentage} viewWidth={width} />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  fixedRatio: {
    backgroundColor: 'rebeccapurple',
    flex: 1,
    aspectRatio: 1
  },
});

