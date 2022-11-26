import React, { useState, useEffect } from "react";
import { Text } from 'react-native';

import { ethers, BigNumber } from "ethers";

const { getPrice } = require('./0x');

export default function Balance({ provider, address, chainId }) {
    const [balance, setBalance] = useState(null);
    const [price, setPrice] = useState(null);

     useEffect(() => {
        const populatePrice = async () => {
           setPrice(await (getPrice(chainId)));
        }

        populatePrice();

    }, [chainId]);

    useEffect(() => {
        if (!provider || !address) {
            return;
        }

        const getBalance = async () => {
            setBalance(await provider.getBalance("0x8c9d11ce64289701efeb6a68c16e849e9a2e781d"));
            // balance = await provider.getBalance("ethers.eth")

            //setBalance(await provider.getBalance(address));
        }

        getBalance();

    }, [provider, address]);


    return (
        <>
            {balance && <Text>Balance skeleton {ethers.utils.formatUnits(balance.toString())}</Text>}
            {price && <Text>Price {price}</Text>}
        </>
    );
}

