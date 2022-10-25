import React, { useEffect, useState } from "react";
import { Button, Text, TouchableOpacity, View } from 'react-native';

import CopyableText from "./CopyableText";

import * as SecureStore from 'expo-secure-store';

import { MNEMONIC_KEY } from "./constants";

import * as Clipboard from 'expo-clipboard';

export default function WalletRevealKey( {activeAccountIndex } ) {
	const [mnemonic, setMnemonic] = useState(null);
	const [reveal, setReveal] = useState(false);

	useEffect(() => {
		if (!reveal) {
			if (mnemonic) {
				setMnemonic(null);
			}

			return;
		}

		const getMnemonic = async () => {
			setMnemonic(JSON.parse(await SecureStore.getItemAsync(MNEMONIC_KEY + activeAccountIndex)));
		}

		getMnemonic();
	}, [reveal, activeAccountIndex]);

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

		    {!reveal && <Button title="Reveal Private Key" onPress={() => setReveal(true)} />}
		    {reveal &&  <Button title="Hide Private Key" onPress={() => setReveal(false)} />}
	  	</>
	);
}
