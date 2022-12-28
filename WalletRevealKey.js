import React, { useEffect, useState } from "react";
import { Button, Text, TouchableOpacity, View } from 'react-native';

import CopyableText from "./CopyableText";

import * as SecureStore from 'expo-secure-store';

import { MNEMONIC_KEY } from "./constants";

import * as Clipboard from 'expo-clipboard';

export default function WalletRevealKey( {setWalletReveal, accountHelper } ) {
	const [mnemonic, setMnemonic] = useState(null);

	useEffect(() => {
/*		
		if (!reveal) {
			if (mnemonic) {
				setMnemonic(null);
			}

			return;
		}
*/
		const getMnemonic = async () => {
			setMnemonic(JSON.parse(await SecureStore.getItemAsync(MNEMONIC_KEY + accountHelper.getActiveAccountIndex())));
		}

		getMnemonic();
	}, [accountHelper.getActiveAccountIndex()]);

	const onPressTitle = (string) => {
    Clipboard.setString(string);
  };

	return (
		<>
		    {mnemonic && <>
		    	<CopyableText text={mnemonic.privateKey} title={"Private Key:"}/>
		    	<CopyableText text={mnemonic.mnemonic.phrase} title={"Mnemonic Phrase:"}/>
		    	<CopyableText text={mnemonic.mnemonic.pathIndex} title={"Index:"}/>
		    	<CopyableText text={mnemonic.mnemonic.password} title={"Password:"}/>
		    </>}

		    <Button title={'Ok'} onPress={() => setWalletReveal(false)} />
	  	</>
	);
}
