import React, { useState, useEffect } from "react";
import { Text, TextInput, View } from 'react-native';

import ModalSelector from 'react-native-modal-selector'

import { STORAGE_KEY_NETWORK_NAME, NETWORKS } from "./constants";

const { setItem } = require('./Storage');

//export default function NetworkSelector({ network, setNetwork }) {
export default function NetworkSelector({ accountHelper, setNetwork }) {
	const [data, setData] = useState(null);

	useEffect(() => {
		let networkData = [];
		for (const [key, value] of Object.entries(NETWORKS)) {
			networkData.push({ key:key, label: value.name });
		}
		setData(networkData);
	}, []);

	if (!data) {
		return (<></>);
	}

	return (
		<ModalSelector
	        data={data}
	        initValue={accountHelper.getNetwork().name}
	        initValueTextStyle={{fontWeight: "bold", color:"black"}}
	        onModalClose={(option)=> {
	        	if (option && option.key) {
	        		setItem(STORAGE_KEY_NETWORK_NAME, option.key)
	        		accountHelper.setNetwork(NETWORKS[option.key]);
	        	}
	        }
	        }
	        backdropPressToClose={true}
	        cancelText={"Cancel"}
	    />
	);
}

