import { Button, Pressable, Text, View } from 'react-native';
import React, { useState, useEffect } from "react";

import { Ionicons } from '@expo/vector-icons';

import WalletImport from "./WalletImport";
import WalletRevealKey from "./WalletRevealKey";

import AccountSelector from "./AccountSelector";

const { generateAndStoreWallet, storeWallet } = require('./WalletImportHelper');

export default function WalletSecrets({ accountHelper, fontSize, iconSize}) {
    log("WalletSecrets")
    const [walletImport, setWalletImport] = useState();
    const [walletReveal, setWalletReveal] = useState();

    if (walletImport) {
        return (
            <>
                <WalletImport setWalletImport={setWalletImport} accountHelper={accountHelper} />
            </>
        );
    }

    if (walletReveal) {
        return (
            <>
                <AccountSelector accountHelper={accountHelper}/>
                <WalletRevealKey setWalletReveal={setWalletReveal} accountHelper={accountHelper} />
            </>
        );
    }

    const section = (onPressAction, param, text, iconName) => (
        <Pressable
            style={{flex:0.2, backgroundColor:"rgb(250,250,250)", borderRadius: 20}}
            onPress={() => {onPressAction(param)}}>

            <View style={{ flex:1, alignItems:"center", justifyContent:"center"}}>
                <Text style={{fontSize: fontSize}}>
                    {text}
                </Text>

                <Ionicons
                    name={iconName}
                    size={iconSize}
                    color={"rgb(24,144,255)"}
                />
            </View>
        </Pressable>
    );

	return (
        <>
            <View style={{ flex:0.1}} >
                <AccountSelector accountHelper={accountHelper}/>
            </View>

            <View style={{ flex:0.9}}>
                <View style={{ flex:0.1}}/>

                {section(setWalletReveal, true, "Reveal secret", "alert-circle-outline")}

                <View style={{ flex:0.1}}/>

                {section(setWalletImport, true, "Import account", "arrow-up-circle-outline")}

                <View style={{ flex:0.1}}/>

                {section(generateAndStoreWallet, accountHelper, "Generate account", "add-circle-outline")}

            </View>
        </>
    );
}

