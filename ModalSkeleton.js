import React, { useState } from "react";

import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function ModalSkeleton({ content, contentParams, topBarViewHeight}) {
    const [modalVisible, setModalVisible] = useState(true);

    const styles = StyleSheet.create({
        modalView: {
            flex:1,
            margin: 20,
            marginTop: topBarViewHeight,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            // alignItems: "center", really?
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
 
  return (
      <>
        {modalVisible && <Modal
            animationType="slide"
            transparent={true}

            onRequestClose={() => {
                 // "The onRequestClose callback is called when the user taps the hardware back button on Android or the menu button on Apple TV."
                 // https://reactnative.dev/docs/modal#onrequestclose

                 setModalVisible(false);
            }}
        >
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{...styles.modalView}}>
                        <View style={{ flex:1 }} >
                            <View style={{ flex:0.9}} >
                                {content()} 
                            </View>
                            
                            <Pressable
                                style={{flex:0.1, backgroundColor:"lightgray", alignItems:"center", justifyContent:"center"}}
                                onPress={() => {
                                    setModalVisible(false);
                                }}>

                                <Text>X</Text>
                            </Pressable>
                        </View>                        
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </Modal>}
      </>
    );
}

