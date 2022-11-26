import React, { useState, useEffect } from "react";
import { Button, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import AccountSelector from "./AccountSelector";
import WalletSecrets from "./WalletSecrets";


const { calculatePunkIndex } = require('./WalletHelper');

const ADDRESS_SLICE = 6;
const ICON_PERCENTAGE = 0.45;
const FONT_PERCENTAGE = 0.8;

export default function TopBar({
        address,
        viewHeight,
        viewWidth,
        punkIndex,
        activeAccountIndex,
        setActiveAccountIndex,
        accountIndexesArray,
        setAccountIndexesArray }) {

    const styles = StyleSheet.create({
      modalView: {
        margin: 20,
        marginTop: viewHeight,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      }
    });

    const [walletPushed, setWalletPushed] = useState(false);

    const handleWalletPushed = () => {
        console.log("handleWalletPushed", walletPushed);
        setWalletPushed(!walletPushed);
    }

    const iconSize = viewHeight * ICON_PERCENTAGE;
    const fontSize = iconSize * FONT_PERCENTAGE;

    const myText = () => (<>
         <Modal
            animationType="slide"
            transparent={true}
            
            onRequestClose={() => {
              //Alert.alert("Modal has been closed.");
              //setModalVisible(!modalVisible);
            }}
          >
                  <Modal
            animationType="slide"
            transparent={true}
            
            onRequestClose={() => {
              //Alert.alert("Modal has been closed.");
              //setModalVisible(!modalVisible);
            }}
          >
            <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <View style={styles.modalView}>
                <WalletSecrets
                    activeAccountIndex={activeAccountIndex}
                    setActiveAccountIndex={setActiveAccountIndex}
                    accountIndexesArray={accountIndexesArray}
                    setAccountIndexesArray={setAccountIndexesArray}>
                </WalletSecrets>

                <Pressable style={{backgroundColor:"lightgray", alignItems:"center", justifyContent:"center"}} onPress={() => {handleWalletPushed()}}>
                    <Text>Close</Text>
                </Pressable>
                

              </View>
            </SafeAreaView>
            </SafeAreaProvider>
           </Modal>

           </Modal>
    </>);

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

    return (
       <>
           {walletPushed && myText()}
           <View style={{ flex: 1, flexDirection: "row", alignItems:"center" }} >
               <View style={{ flex: 0.5, flexDirection: "row", paddingLeft:iconSize}} >
                    <AccountSelector
                        activeAccountIndex={activeAccountIndex}
                        setActiveAccountIndex={setActiveAccountIndex}
                        accountIndexesArray={accountIndexesArray}
                    />

                    <Image
                        style={{ width: iconSize, height: iconSize }}
                        source={{
                          uri: `https://www.larvalabs.com/public/images/cryptopunks/punk${punkIndex}.png`
                        }}
                    />

                   <Text style={{fontSize: fontSize}}>
                       {address.slice(0, ADDRESS_SLICE)}
                   </Text>

                   {styledIonicon("copy-outline")}
               </View>
               <View style={{ flex: 0.5, flexDirection: "row", justifyContent:"flex-end"}} >
                   <View style={{ paddingRight: iconSize}}>
                       {styledIonicon("refresh-outline")}
                   </View>
                   <View style={{ paddingRight: iconSize}}>
                       {styledIonicon("wallet-outline", handleWalletPushed)}
                   </View>
               </View>
           </View>
       </>
    );
}

