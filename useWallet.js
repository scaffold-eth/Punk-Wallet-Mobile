import "react-native-get-random-values"
// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims"
// Import the ethers library
import { ethers } from "ethers";

import React, { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

import { MNEMONIC_KEY } from "./constants";

const { generateWallet, storeWallet } = require('./WalletImportHelper');

const useWallet = (rpcURL, activeAccountIndex) => {
  log("useWallet");
  const [wallet, setWallet] = useState();

  useEffect(() => {
    const getOrCreateWallet = async () => {

      const mnemonic = await SecureStore.getItemAsync(MNEMONIC_KEY + activeAccountIndex);

      let wallet = null;

      if (!mnemonic && (activeAccountIndex == 0)) {
        wallet = generateWallet();
        
        await storeWallet(wallet.privateKey, wallet.mnemonic.phrase, 0, "");
      }
      else {
        wallet = new ethers.Wallet(JSON.parse(mnemonic).privateKey);
      }

      const provider = rpcURL ? new ethers.providers.StaticJsonRpcProvider(rpcURL) : null;

      if (provider) {
        wallet = wallet.connect(provider);
      }
      
      setWallet(wallet);
    }

    getOrCreateWallet();
  }, [activeAccountIndex]);

  useEffect(() => {
    if (!wallet) {
      return;
    }

    const provider = rpcURL ? new ethers.providers.StaticJsonRpcProvider(rpcURL) : null;

    if (provider) {
      setWallet(wallet.connect(provider));
    }
  }, [rpcURL]);

  return wallet;
}

export default useWallet;
