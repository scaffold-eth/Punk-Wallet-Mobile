import React, { useState, useEffect } from "react";
import { Button, Image, Pressable, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import AccountSelector from "./AccountSelector";
import QrModal from "./QrModal";
import WalletModal from "./WalletModal";

const { calculatePunkIndex } = require('./WalletHelper');

const ADDRESS_SLICE = 6;
const ICON_PERCENTAGE = 0.45;
const FONT_PERCENTAGE = 0.8;

export default function TopBar({
        wallet,
        topBarViewHeight,
        viewWidth,
        punkIndex,
        accountHelper
    }) {

    const [walletPushed, setWalletPushed] = useState(false);
    const [qrPushed, setQrPushed] = useState(false);

    const handleWalletPushed = () => {
        console.log("handleWalletPushed", walletPushed);
        setWalletPushed(!walletPushed);
    }

    console.log("punkIndex", punkIndex);

    const handleQrPushed = () => {
        console.log("qrPushed", qrPushed);
        setQrPushed(!qrPushed);
    }

    const iconSize = topBarViewHeight * ICON_PERCENTAGE;
    const fontSize = iconSize * FONT_PERCENTAGE;

    const styledIonicon = (name, onPressFunction) => (<>
         <Ionicons
             name={name}
             size={iconSize}
             color={"rgb(24,144,255)"}
             onPress={
                 () => {
                     if (onPressFunction) {
                         onPressFunction(true);    
                     }

                     console.log("Pressed", name, walletPushed)
                 }
             }/>
    </>);

                 //<View style={{ borderWidth: 1 }} borderColor={"blue"} borderStyle={"solid"} >

    if (true) {
        return (
            <>
                 <View style={{ flex: 1,  borderWidth: 1}} borderColor={"red"} borderStyle={"solid"} >
                 </View>
            </>
        );
    }

    return (
       <>
           {walletPushed && <WalletModal handleWalletPushed={handleWalletPushed} fontSize={fontSize} iconSize={iconSize} topBarViewHeight={topBarViewHeight} accountHelper={accountHelper}/>}
           {qrPushed && <QrModal topBarViewHeight={topBarViewHeight} wallet={wallet}/>}

           <View style={{ flex: 1, flexDirection: "row", alignItems:"center", justifyContent:"center",  borderWidth: 1 }} borderColor={"red"} borderStyle={"solid"} >
                
                   <View>
                       <Text style={{fontSize: fontSize}}>
                           {false && wallet.address.slice(0, ADDRESS_SLICE)}
                           monyo.eth
                       </Text>
                   </View>

                    <View style={{ paddingBottom: iconSize * 0.18 }}>
                        <Image
                            style={{ width: iconSize, height: iconSize }}
                            source={{
                              uri: `https://www.larvalabs.com/public/images/cryptopunks/punk${punkIndex}.png`
                            }}
                        />
                    </View>
               


               {/* 
                <View style={{ flex: 0.5, flexDirection: "row", paddingLeft:iconSize}} >
                    <AccountSelector
                        accountHelper={accountHelper}
                    />

                    <Image
                        style={{ width: iconSize, height: iconSize }}
                        source={{
                          uri: `https://www.larvalabs.com/public/images/cryptopunks/punk${punkIndex}.png`
                        }}
                    />

                   <Text style={{fontSize: fontSize}}>
                       {wallet.address.slice(0, ADDRESS_SLICE)}
                   </Text>

                   {styledIonicon("qr-code-outline", handleQrPushed)}
               </View>
               <View style={{ flex: 0.5, flexDirection: "row", justifyContent:"flex-end"}} >
                   <View style={{ paddingRight: iconSize}}>
                       
                   </View>
                   <View style={{ paddingRight: iconSize}}>
                       {styledIonicon("wallet-outline", handleWalletPushed)}
                   </View>
               </View>
               */}

           </View>
       </>
    );
}

