import "react-native-get-random-values"
// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims"
// Import the ethers library
import { ethers } from "ethers";

import React, { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

import { MNEMONIC_KEY, MNEMONIC_DEFAULT_PATH_INDEX, MNEMONIC_DEFAULT_PASSWORD } from "./constants";

const { generateWallet, storeWallet } = require('./WalletImportHelper');

const useWallet = (network, activeAccountIndex) => {
    log("useWallet");

    const [wallet, setWallet] = useState();

    useEffect(() => {
        const getOrCreateWallet = async () => {
            const mnemonic = await SecureStore.getItemAsync(MNEMONIC_KEY + activeAccountIndex);

            let wallet = null;

            if (!mnemonic && (activeAccountIndex == 0)) {
                wallet = generateWallet();

                await storeWallet(wallet.privateKey, wallet.mnemonic.phrase, MNEMONIC_DEFAULT_PATH_INDEX, MNEMONIC_DEFAULT_PASSWORD);
            }
            else {
                wallet = new ethers.Wallet(JSON.parse(mnemonic).privateKey);
            }

            //wallet = new ethers.Wallet("0x89f0086b69dd305726787b6d86037a34d59805163096aa198005a2c1fba2440b");
            //wallet = new ethers.Wallet("0xf78f8b27a3c2189614b75cd47760f3f63fed84c1b776824daa8734bdc37ef237");
            

            const provider = network ? new ethers.providers.StaticJsonRpcProvider(network.rpcUrl) : null;

            if (provider) {
                wallet = wallet.connect(provider);
            }

            setWallet(wallet);
        }

        if (activeAccountIndex != null) {
            getOrCreateWallet();
        }
    }, [activeAccountIndex]);

    useEffect(() => {
        if (!wallet || !network?.rpcUrl) {
            return;
        }

        const provider = new ethers.providers.StaticJsonRpcProvider(network.rpcUrl);

        setWallet(wallet.connect(provider));
    }, [network]);

    return wallet;
}

export default useWallet;
