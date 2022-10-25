import { ethers } from "ethers";
import React, { useState, useEffect } from "react";

import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const { storeWallet } = require('./WalletImportHelper');
const { getNextAccountIndex } = require('./AccountHelper');

import CopyableText from "./CopyableText";

export default function WalletImport({setWalletImport, setActiveAccount}) {
	const [importMnemonic, setImportMnemonic] = useState();
	const [importMnemonicIndex, setImportMnemonicIndex] = useState();
	const [password, setPassword] = useState("");
	const [importPrivatekey, setImportPrivatekey] = useState();
	const [importAddress, setImportAddress] = useState();
	const [save, setSave] = useState();

	useEffect(()=>{
	    const calculatePK = async () => {
	      if (importMnemonic) {
	        const ethersSeed = ethers.utils.mnemonicToSeed(importMnemonic, password);
	        const ethersHDNode = ethers.utils.HDNode.fromSeed(ethersSeed);

	        const wallet_hdpath = "m/44'/60'/0'/0/";
	        const fullPath = wallet_hdpath + (importMnemonicIndex ? parseInt(importMnemonicIndex).toString() : "0")
	        
	        const ethersDerivedHDNode = ethersHDNode.derivePath(fullPath);
	        const ethersPrivateKey = ethersDerivedHDNode.privateKey;

	        setImportPrivatekey(ethersPrivateKey);
	      }
	      else{
	        setImportPrivatekey();
	      }
	    }
	    calculatePK()
	  },[importMnemonic, importMnemonicIndex, password])

	  useEffect(()=>{
	    const calculateAddress = async () => {
	      if (importPrivatekey){
	        try{
	          const officialEthersWallet = new ethers.Wallet(importPrivatekey)
	          setImportAddress(officialEthersWallet.address)
	        }catch(e){
	          console.log(e);
	          setImportAddress();
	        }
	      }
	    }
	    calculateAddress()
	  },[ importPrivatekey ])

	  useEffect(()=>{
	  	try {
	  		new ethers.Wallet(importPrivatekey);
	  		setSave(true);
	  	}
	  	catch(e) {
	  		setSave(false);
	  	}
	  },[ importPrivatekey ]);

	return (
    <View>
    	<Text style={styles.center}>Private Key</Text>
    	<TextInput style={styles.input} placeholder="0x..." value={importPrivatekey ? importPrivatekey.toString() : ""}  onChangeText={setImportPrivatekey} />

    	<Text style={styles.center}>Mnemonic Phrase</Text>
	    <TextInput style={styles.input} placeholder="word1 word2 word3" onChangeText={setImportMnemonic}/>

	    <Text style={styles.center}>Index</Text>
	    <TextInput style={styles.input} placeholder="Optional index, 0 by default" value={importMnemonicIndex} keyboardType="numeric" onChangeText={setImportMnemonicIndex}/>

	    <Text style={styles.center}>Password</Text>
	    <TextInput style={styles.input} placeholder="Optional Password" onChangeText={setPassword}/>

	    {importAddress && <CopyableText text={importAddress} title={"Public Address"}/>}

			<Button title={'Cancel'} onPress={() => setWalletImport(false)} />
			<Button title={'Save'} disabled={!save} onPress=
				{async () => {
					const activeAccountIndex = await storeWallet(importPrivatekey, importMnemonic, importMnemonicIndex, password);
					setActiveAccount(activeAccountIndex);
					setWalletImport(false)}
				} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
  center: {
  	textAlign: "center",
  	fontWeight: "bold"
  }
});
