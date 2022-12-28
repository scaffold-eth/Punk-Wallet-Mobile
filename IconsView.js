import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Draggable from 'react-native-draggable';

import React, { useState, useEffect } from "react";
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 

import QrModal from "./QrModal";
import WalletModal from "./WalletModal";

//import Constants from 'expo-constants';
//import { getStatusBarHeight } from 'react-native-status-bar-height';

const ADDRESS_SLICE = 6;
const ICON_PERCENTAGE = 0.45;
const FONT_PERCENTAGE = 0.2;

//import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function IconsView({ width, height, accountHelper, wallet, insets, iconSize, rows }) {
    //const statusBarHeight = Constants.statusBarHeight;
    //console.log("statusBarHeight", statusBarHeight);

    //const insets = useSafeAreaInsets();
    //console.log("insets", insets);

    //console.log("getStatusBarHeight", getStatusBarHeight());




    const [qrPushed, setQrPushed] = useState(false);
    const [walletPushed, setWalletPushed] = useState(false);


/*
    const barPercentage = 0.10;
    const mainPercentage = 1 - (2 * barPercentage);
    const topBarViewHeight = height * barPercentage;

    //const iconSize = topBarViewHeight * ICON_PERCENTAGE;
    const iconNumber = 4;

    const iconSize = width / iconNumber;
*/
    console.log("iconSize", iconSize);

    const fontSize = iconSize * FONT_PERCENTAGE;
    const percentage = 0.5;



    const styledIonicon = (config) => (
        <>
         <View  style={{
            height: iconSize,
            width: iconSize,
            backgroundColor: config.backgroundColor ? config.backgroundColor : "pink",
            //backgroundColor: "white",
            alignItems: 'center',
            justifyContent: 'center'
          }}>

            {config.materialicons &&
                <MaterialIcons
                 name={config.name}
                 size={iconSize * percentage}
                 //config.backgroundColor={"rgb(24,144,255)"}
                 //config.backgroundColor={"black"}
                 color={config.iconColor ? config.iconColor : "black"}
                 onPress={
                     () => {
                         if (config.onPressFunction) {
                             onPressFunction(true);    
                         }

                         console.log("Pressed", config.name, config.onPressFunction)
                     }
                 }/>
            }

            {config.iconicons &&
                <Ionicons
                 name={config.name}
                 size={iconSize * percentage}
                 //config.backgroundColor={"rgb(24,144,255)"}
                 //config.backgroundColor={"black"}
                 color={config.iconColor ? config.iconColor : "black"}
                 onPress={
                     () => {
                         if (config.onPressFunction) {
                             config.onPressFunction(true);
                         }

                         console.log("Pressed", config.name, config.onPressFunction)
                     }
                 }/>
            }

             

          </View>
    </>);

    /*
        <Draggable x={2 * iconSize} y={5 * iconSize}>
            {styledIonicon({name:"refresh-outline", onPressFunction:null, backgroundColor:"blue", iconicons:true})}
        </Draggable>

        <Draggable x={1 * iconSize} y={6 * iconSize}>
            {styledIonicon({name:"swap-vertical-outline", onPressFunction:null, backgroundColor:"pink", iconicons:true})}
        </Draggable>
    */

    if (false) {
        return (
            <>
                 <View style={{ flex: 1,  borderWidth: 1}} borderColor={"blue"} borderStyle={"solid"} >
                 </View>
            </>
        );
    }

    return (
        //<SafeAreaProvider>
        //    <SafeAreaView style={{ flex: 1, backgroundColor: "grey" }}>
                <View style={{ flex: 1,  borderWidth: 1}} borderColor={"blue"} borderStyle={"solid"} >
                    {qrPushed && <QrModal topBarViewHeight={topBarViewHeight} wallet={wallet}/>}
                    {walletPushed && <WalletModal fontSize={fontSize} iconSize={iconSize} topBarViewHeight={topBarViewHeight} accountHelper={accountHelper}/>}
                    <View>
                        <Draggable x={0} y={0}>
                            {styledIonicon({name:"qr-code-outline", onPressFunction:setQrPushed, backgroundColor:"pink", iconicons:true})}
                        </Draggable>
                        <Draggable x={3 * iconSize} y={0}>
                            {styledIonicon({name:"qr-code-outline", onPressFunction:setQrPushed, backgroundColor:"pink", iconicons:true})}
                        </Draggable>
                        <Draggable x={3 * iconSize} y={2 * iconSize}>
                            {styledIonicon({name:"qr-code-outline", onPressFunction:setQrPushed, backgroundColor:"pink", iconicons:true})}
                        </Draggable>
                        <Draggable x={3 * iconSize} y={3 * iconSize}>
                            {styledIonicon({name:"qr-code-outline", onPressFunction:setQrPushed, backgroundColor:"pink", iconicons:true})}
                        </Draggable>
                        <Draggable x={3 * iconSize} y={4 * iconSize}>
                            {styledIonicon({name:"qr-code-outline", onPressFunction:setQrPushed, backgroundColor:"pink", iconicons:true})}
                        </Draggable>

                        <Draggable x={2 * iconSize} y={iconSize}>
                            {styledIonicon({name:"wallet-outline", onPressFunction:setWalletPushed, backgroundColor:"blue", iconColor:"pink", iconicons:true})}
                        </Draggable>

                        <Draggable x={1 * iconSize} y={2 * iconSize}>
                            {styledIonicon({name:"history", onPressFunction:null, backgroundColor:"whipinkte", iconColor:"pink", materialicons:true})}
                            
                        </Draggable>

                        
                        

                        {console.log("3 * iconSize", 3 * iconSize)}
                        {console.log("(height - iconSize - insets.bottom) * 0.9 - iconSize - insets.bottom)", (height - iconSize - insets.bottom) * 0.9 - iconSize - insets.bottom)}

                        <Draggable
                            x={3 * iconSize}
                            //y={(height) * 0.9 - iconSize - insets.bottom}
                            //y={(height - insets.top - insets.bottom) * 0.9 - iconSize}
                            //y={height * 0.9 - iconSize - insets.bottom}
                            y={3 * iconSize}
                            onDragRelease={
                                (event, gestureState, bounds)=>{
                                    console.log('gestureState', gestureState);
                                    console.log('bounds', bounds);
                                }
                            }
                         >
                            {styledIonicon({name:"ios-scan-outline", onPressFunction:null, backgroundColor:"pink", iconicons:true})}
                        </Draggable>

                        <Draggable x={2 * iconSize} y={rows * iconSize - iconSize}>
                            {styledIonicon({name:"ios-send-outline", onPressFunction:null, backgroundColor:"blue", iconicons:true})}
                        </Draggable>
                        
                    </View>
                </View>
        //    </SafeAreaView>
        //</SafeAreaProvider>
    );
}

