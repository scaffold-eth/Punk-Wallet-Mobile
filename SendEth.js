import React, { useState, useEffect } from "react";
import { Button, Pressable, Text, TextInput, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function SendEth({ inputAeraSize }) {
    const [toAddress, setToAddress] = useState();
    const [amount, setAmount] = useState();

    const gap = 0.1;
    
    const styledInput = (value, onChangeText, ioniconName, placeholder, keyboardType) => (<>
         <View style={{ flex: 1, flexDirection:"row", width:inputAeraSize}} >
            <View style={{ flex: 0.8, borderWidth: 1, alignItems:"center", justifyContent:"center" }} borderColor={"lightgray"} >
                
                    <TextInput style={{width: "100%"}} value={value ? value : ""} onChangeText={onChangeText} placeholder={placeholder} keyboardType={keyboardType ? keyboardType : "default"}/>
                
            </View>
            <Pressable 
                style={{ flex: 0.2, borderWidth: 1, backgroundColor:"lightgray", alignItems:"center", justifyContent:"center" }} 
                borderColor={"lightgray"}
                onPress={() => {console.log("Pressed pressable", ioniconName)}}>
                    <Ionicons name={ioniconName} size={inputAeraSize * 0.2 * 0.4} color="black" />
            </Pressable>
        </View>
    </>);

    return (
        <>

            <View style={{ flex: 1}} >
                <View style={{ flex: ((1 - 2 * gap) / 3)}} >
                    {styledInput(toAddress, setToAddress, "scan", "   to Address")}
                </View>

                <View style={{ flex: gap}} >
                    <View style={{ flex: 1}} />
                </View>

                <View style={{ flex: ((1 - 2 * gap) / 3)}} >
                    {styledInput(amount, setAmount, "swap-horizontal-outline", "   amount in USD", "numeric")}
                </View>

                <View style={{ flex: gap}} >
                    <View style={{ flex: 1}} />
                </View>
                        
                <View style={{ flex: ((1 - 2 * gap) / 3)}} >
                    <Pressable style={{flex:1, backgroundColor:"lightgray", alignItems:"center", justifyContent:"center"}} onPress={() => {console.log("Pushed send")}}>
                        <Text>Send</Text>
                    </Pressable>
                </View>

            </View>

            
        </>
    );
}

