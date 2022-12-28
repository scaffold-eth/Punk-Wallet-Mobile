import "react-native-get-random-values"
// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims"
// Import the ethers library
import { ethers } from "ethers";

import React, { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

import { MNEMONIC_KEY, MNEMONIC_DEFAULT_PATH_INDEX, MNEMONIC_DEFAULT_PASSWORD } from "./constants";

const { generateAndStoreWallet, storeWallet } = require('./WalletImportHelper');

const useWallet = (accountHelper) => {
    log("useWallet");

    const [wallet, setWallet] = useState();

    useEffect(() => {
        const getOrCreateWallet = async () => {
            const mnemonic = await SecureStore.getItemAsync(MNEMONIC_KEY + accountHelper.getActiveAccountIndex());

            let wallet = null;

            if (!mnemonic && (accountHelper.getActiveAccountIndex() == 0)) {
                wallet = await generateAndStoreWallet(accountHelper);
            }
            else {
                wallet = new ethers.Wallet(JSON.parse(mnemonic).privateKey);
            }

            const provider = accountHelper.getNetwork() ? new ethers.providers.StaticJsonRpcProvider(accountHelper.getNetwork().rpcUrl) : null;

            if (provider) {
                wallet = wallet.connect(provider);
            }

            setWallet(wallet);
        }

        if (accountHelper.getActiveAccountIndex() != null) {
            getOrCreateWallet();
        }
    }, [accountHelper.getActiveAccountIndex()]);

    useEffect(() => {
        if (!wallet || !accountHelper.getNetwork()?.rpcUrl) {
            return;
        }

        const provider = new ethers.providers.StaticJsonRpcProvider(accountHelper.getNetwork().rpcUrl);

        setWallet(wallet.connect(provider));
    }, [accountHelper.getNetwork()]);

    return wallet;
}

export default useWallet;
