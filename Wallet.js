// This has to be the first import, otherwise a "WARNING: Missing strong random number source" is thrown
import useWallet from "./useWallet";

import React, { useState, useEffect } from "react";

import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';

import Anchor from "./Anchor";
import CopyableText from "./CopyableText";
import PunkQR from "./PunkQR";
import SColumn from "./SColumn";
import SendEth from "./SendEth";
import WalletConnectWallet from "./WalletConnectWallet";

import TextInputWithButton from "./TextInputWithButton";

const { getItem } = require('./Storage');

const QR_PERCENTAGE = 0.8;

// <TextInput style={styles.input} value={toAddress ? toAddress : ""} placeholder="amount in USD"/>

export default function Wallet({ wallet, chainId, viewHeight, viewWidth }) {
    log("Wallet");
    const [walletConnectError, setWalletConnectError] = useState();
    const [walletConnectErrorURL, setWalletConnectErrorURL] = useState();
    const [punkIndex, setPunkIndex] = useState();
    
    useEffect(() => {
        setPunkIndex(calculatePunkIndex(wallet.address));
    }, [wallet]);

    const resetError = () => {
        setWalletConnectError();
        setWalletConnectErrorURL();
    }

    const qrCodeArea = 45;
    const walletConnectArea = 10;

    const qrCodeSize = viewHeight * qrCodeArea / 100 * QR_PERCENTAGE;
    console.log("viewHeight", viewHeight);
    console.log("qrCodeSize", qrCodeSize);

    const inputAeraSize = qrCodeSize * 0.9;
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: qrCodeArea, justifyContent:"center", alignItems: "center", borderWidth: 1 }} borderColor={"white"} borderStyle={"solid"} >
                <PunkQR
                    address={wallet?.address}
                    size={qrCodeSize}
                    punkIndex={punkIndex}
                />
                <Text 
                    numberOfLines={1}
                    adjustsFontSizeToFit 
                    style= {{width:qrCodeSize, fontWeight:"bold", paddingTop:10, textAlign:"center"}}>

                    {wallet.address}
                 </Text>
            </View>



            <View style={{ flex: 100 - (qrCodeArea + walletConnectArea), alignItems: "center"}} >
                <View style={{ flex: 0.3 }} >
                    <SendEth inputAeraSize={inputAeraSize}/>
                </View>
                <View style={{ flex: 0.7}} >
                    <View style={{ flex: 1}}>
                    </View>
                </View>
            </View>

            <View style={{ flex: 10, backgroundColor: 'rgb(255,255,255)', borderWidth: 1 }} borderColor={"blue"} borderStyle={"solid"} >
                <WalletConnectWallet
                    chainId={chainId}
                    scannedWalletConnectUrl={null}
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
            </View>
            
            
        </View>
    );
} 