import "react-native-get-random-values"
// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims"
// Import the ethers library
import { ethers } from "ethers";

import * as SecureStore from 'expo-secure-store';
import { MNEMONIC_KEY, MNEMONIC_DEFAULT_PATH_INDEX, MNEMONIC_DEFAULT_PASSWORD } from "./constants";

const { getItem, setItem } = require('./Storage');

storeWallet = async (privateKey, mnemonicPhrase, mnemonicPathIndex, mnemonicPassword, accountHelper) => {
    const nextAccountIndex = await accountHelper.getNextAccountIndex();

    const key = MNEMONIC_KEY + nextAccountIndex;

    const currentWallet = await SecureStore.getItemAsync(key);

    if (currentWallet) {
        throw new Error("Do not override existing wallet, this should not happen btw.");
    }

    let mnemonic = {};
    if (mnemonicPhrase) {
        mnemonic.phrase = mnemonicPhrase;

        mnemonic.pathIndex = mnemonicPathIndex ? mnemonicPathIndex : 0;
        mnemonic.password = mnemonicPassword ? mnemonicPassword : "";
    }

    const secrets = {
        "privateKey": privateKey,
        "mnemonic": mnemonic
    };

    await SecureStore.setItemAsync(key, JSON.stringify(secrets));    

    accountHelper.handleNewAccount(nextAccountIndex);
}

const generateAndStoreWallet = async (accountHelper) => {
    const wallet = new ethers.Wallet.createRandom();

    await storeWallet(wallet.privateKey, wallet.mnemonic.phrase, MNEMONIC_DEFAULT_PATH_INDEX, MNEMONIC_DEFAULT_PASSWORD, accountHelper);

    return wallet;
}

module.exports = {
    generateAndStoreWallet, storeWallet
}