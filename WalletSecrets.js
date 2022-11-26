import { Button, Text } from 'react-native';
import React, { useState, useEffect } from "react";

import WalletImport from "./WalletImport";
import WalletRevealKey from "./WalletRevealKey";

import AccountSelector from "./AccountSelector";

const { handleActiveAccountIndex, handleAccountIndexesArray, setActiveAccountIndexToStorage } = require('./AccountHelper');
const { generateWallet, storeWallet } = require('./WalletImportHelper');

export default function WalletSecrets({ activeAccountIndex, setActiveAccountIndex, accountIndexesArray, setAccountIndexesArray }) {
    log("WalletSecrets")
    const [walletImport, setWalletImport] = useState();

    const generateAccount = async () => {
        const wallet = generateWallet();
        
        const newAccountIndex = await storeWallet(wallet.privateKey, wallet.mnemonic.phrase, 0, "");
        handleNewAccount(newAccountIndex);
    }

    const handleNewAccount = (newAccountIndex) => {
        setActiveAccountIndexToStorage(newAccountIndex);

        let newAccountIndexesArray = JSON.parse(JSON.stringify(accountIndexesArray)); // Deep copy, not sure if this is really needed
        newAccountIndexesArray.push(newAccountIndex);
        setAccountIndexesArrayToStorage(newAccountIndexesArray);

        setActiveAccountIndex(newAccountIndex);
        setAccountIndexesArray(newAccountIndexesArray);
    }

    if (walletImport) {
        return (
            <>
                <WalletImport setWalletImport={setWalletImport} handleNewAccount={handleNewAccount} />
            </>
        );
    }

	return (
        <>
            <AccountSelector
                activeAccountIndex={activeAccountIndex}
                setActiveAccountIndex={setActiveAccountIndex}
                accountIndexesArray={accountIndexesArray}
            />
        	<WalletRevealKey activeAccountIndex={activeAccountIndex}/>
            <Button title={'Import'} onPress={() => setWalletImport(true)} />
            <Button title={'Generate'} onPress={() => generateAccount()} />
        </>
    );
}

