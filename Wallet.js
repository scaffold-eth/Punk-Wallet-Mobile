// This has to be the first import, otherwise a "WARNING: Missing strong random number source" is thrown
import useWallet from "./useWallet";

import React, { useState, useEffect } from "react";

import { Button, Text, View, Image } from 'react-native';

import Anchor from "./Anchor";
import CopyableText from "./CopyableText";
import SColumn from "./SColumn";
import WalletConnectWallet from "./WalletConnectWallet";

const { getItem } = require('./Storage');

export default function Wallet({ network, scannedWalletConnectUrl, activeAccountIndex }) {
    log("Wallet");
    const [walletConnectError, setWalletConnectError] = useState();
    const [walletConnectErrorURL, setWalletConnectErrorURL] = useState();

    const resetError = () => {
        setWalletConnectError();
        setWalletConnectErrorURL();
    }

    const wallet = useWallet(network ? network.rpcUrl : null, activeAccountIndex);

    return (
        <SColumn>
            <CopyableText text={wallet?.address} title={"Public Address:"}/>

            <WalletConnectWallet
                chainId={network.chainId}
                scannedWalletConnectUrl={scannedWalletConnectUrl}
                wallet={wallet}
                setWalletConnectError={setWalletConnectError}
                setWalletConnectErrorURL={setWalletConnectErrorURL}
            />

            {walletConnectError && <>
                <Text>
                    Coudn't connect to {walletConnectErrorURL}, something went wrong.
                </Text>
                <Button title={"OK"} onPress={() => resetError()} />
            </>}
            
        </SColumn>
    );
}