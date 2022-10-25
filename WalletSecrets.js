import { Button, Text } from 'react-native';
import React, { useState, useEffect } from "react";

import WalletImport from "./WalletImport";
import WalletRevealKey from "./WalletRevealKey";

import AccountSelector from "./AccountSelector";

const { handleActiveAccountIndex, handleAccountIndexesArray, setActiveAccountIndexToStorage } = require('./AccountHelper');
const { generateWallet, storeWallet } = require('./WalletImportHelper');

export default function WalletSecrets( { navigation } ) {
    log("WalletSecrets")
    const [walletImport, setWalletImport] = useState();
    const [activeAccountIndex, setActiveAccountIndex] = useState(0);
    const [accountIndexesArray, setAccountIndexesArray] = useState(null);

    useEffect(() => {
        if (walletImport) {
            return;
        }
        handleActiveAccountIndex(setActiveAccountIndex);
        handleAccountIndexesArray(setAccountIndexesArray);
    }, [walletImport]);

    useEffect(() => {
        const navigationListener = navigation.addListener('tabPress', (e) => {
            handleActiveAccountIndex(setActiveAccountIndex);
        });

        return navigationListener;
    }, [navigation]);

    const generateAccount = async () => {
        const wallet = generateWallet();
        
        const activeAccountIndex = await storeWallet(wallet.privateKey, wallet.mnemonic.phrase, 0, "");
        setActiveAccount(activeAccountIndex);
    }

    const setActiveAccount = (activeAccountIndex) => {
        setActiveAccountIndexToStorage(activeAccountIndex);
        setActiveAccountIndex(activeAccountIndex);
    }

    if (walletImport) {
        return (
            <>
                <WalletImport setWalletImport={setWalletImport} setActiveAccount={setActiveAccount} />
            </>
        );
    }

	return (
        <>
            {accountIndexesArray && 
                <AccountSelector
                    activeAccountIndex={activeAccountIndex}
                    setActiveAccountIndex={setActiveAccountIndex}
                    accountIndexesArray={accountIndexesArray}
                    storage={false}
                />
            }
        	<WalletRevealKey activeAccountIndex={activeAccountIndex}/>
            <Button title={'Import'} onPress={() => setWalletImport(true)} />
            <Button title={'Generate'} onPress={() => generateAccount()} />
        </>
    );
}

