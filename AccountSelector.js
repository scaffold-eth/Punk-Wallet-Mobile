import ModalSelector from 'react-native-modal-selector'
import React, { useState, useEffect } from "react";

const { setActiveAccountIndexToStorage } = require('./AccountHelper');

export default function AccountSelector({ activeAccountIndex, setActiveAccountIndex, accountIndexesArray }) {
	const [data, setData] = useState(null);

	useEffect(() => {
		let accountIndexesData = [];
		accountIndexesData.push({ key: -1, section: true, label: 'Accounts' })

		accountIndexesArray.forEach(
			(accountIndex) => {
				accountIndexesData.push({ key:accountIndex, label: accountIndex });
			});

		setData(accountIndexesData);
	}, [accountIndexesArray]);

	if (!data) {
		return (<></>);
	}

	return (
		<ModalSelector
	        data={data}
	        initValue={activeAccountIndex.toString()}
	        initValueTextStyle={{fontWeight: "bold", color:"black"}}
	        sectionTextStyle={{fontWeight: "bold", color:"black"}}
	        onModalClose={(option)=> {
	        	if (option && option.key) {
					setActiveAccountIndexToStorage(option.key);
					setActiveAccountIndex(option.key);
	        	}
	        }
	        }
	        backdropPressToClose={true}
	        cancelText={"Cancel"}
	    />
	);
}

