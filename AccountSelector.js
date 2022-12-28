import ModalSelector from 'react-native-modal-selector'
import React, { useState, useEffect } from "react";

const { setActiveAccountIndexToStorage } = require('./AccountHelper');

export default function AccountSelector({ accountHelper }) {
	const [data, setData] = useState(null);

	useEffect(() => {
		let accountIndexesData = [];
		accountIndexesData.push({ key: -1, section: true, label: 'Accounts' })

		accountHelper.getAccountIndexesArray().forEach(
			(accountIndex) => {
				accountIndexesData.push({ key:accountIndex, label: accountIndex });
			});

		setData(accountIndexesData);
	}, [accountHelper.getAccountIndexesArray()]);

	if (!data) {
		return (<></>);
	}

	return (
		<ModalSelector
	        data={data}
	        initValue={accountHelper.getActiveAccountIndex().toString()}
	        initValueTextStyle={{fontWeight: "bold", color:"black"}}
	        sectionTextStyle={{fontWeight: "bold", color:"black"}}
	        onModalClose={(option)=> {
	        	if (option && option.key) {
					accountHelper.setActiveAccountIndexToStorage(option.key);
					accountHelper.setActiveAccountIndex(option.key);
	        	}
	        }
	        }
	        backdropPressToClose={true}
	        cancelText={"Cancel"}
	    />
	);
}

