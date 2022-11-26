import React, { useState, useEffect } from "react";
import { Text, View , useWindowDimensions} from 'react-native';



import AccountSelector from "./AccountSelector";
import TopBar from "./TopBar";
import NetworkSelector from "./NetworkSelector";

import Wallet from "./Wallet";

import { STORAGE_KEY_NETWORK_NAME, NETWORKS } from "./constants";

const { getActiveAccountIndexFromStorage, getAccountIndexesArrayFromStorage, handleActiveAccountIndex, handleAccountIndexesArray } = require('./AccountHelper');

export default function Home({ }) {
    const { height, width } = useWindowDimensions();
    const [network, setNetwork] = useState(null);
    const [activeAccountIndex, setActiveAccountIndex] = useState(null);
    const [accountIndexesArray, setAccountIndexesArray] = useState(null);

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

    if ((network == null) || (activeAccountIndex == null) || (accountIndexesArray == null)) {
        return <Text>Loading</Text>;
    }

    const flexBar = 8;

    return (
        <>
            <View style={{ flex: flexBar, backgroundColor: 'rgb(255,255,255)', borderWidth: 1 }} borderColor={"blue"} borderStyle={"solid"} >
                <TopBar viewHeight={height / 100 * flexBar} viewWidth={width}/>
            </View>
            <View style={{ flex: flexBar, backgroundColor: 'rgb(255,255,255)' }} >
                <NetworkSelector network={network} setNetwork={setNetwork} />
                <AccountSelector activeAccountIndex={activeAccountIndex} setActiveAccountIndex={setActiveAccountIndex} accountIndexesArray={accountIndexesArray} />
            </View>
            <View style={{ flex: (100 - (flexBar * 2)), backgroundColor: 'rgb(255,255,255)' }} borderColor={"red"} borderStyle={"solid"}>
                <Wallet activeAccountIndex={activeAccountIndex} network={network} />
            </View>
        </>
    );
}
