import React from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';

export default function TextInputWithButton({ placeholder, ionicon, value, height = 40 }) {

     const styles = StyleSheet.create({
      input: {
        height: height,
        borderWidth: 1,
        borderColor:"black",
        flex:1
      },
    });
  
    return (
        <View style={styles.input}>
            <View style={{ flex: 0.8 }}>
                <TextInput value={value ? value : ""} placeholder="to address"/>
            </View>
            <View style={{ backgroundColor: 'red', flex: 0.2 }}>
            </View>
        </View>
    );
}

