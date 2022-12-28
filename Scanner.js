import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


import {ROUTE_NAME_HOME} from "./constants";

export default function Scanner({ setScannedWalletConnectUrl }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [walletConnectUrl, setWalletConnectUrl] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const navigateToWalletScreen = (url) => {
    console.log("connect to url:", url);

    setScannedWalletConnectUrl(url);
    
/*
    navigation.navigate({
        name: ROUTE_NAME_HOME,
        params: { scannedWalletConnectUrl: url },
        merge: true
    });
*/
  }

  const handleBarCodeScanned = ({ type, data }) => {
    navigateToWalletScreen(data);
  };

  const manualWalletConnect = 
    (<>
      <TextInput style={styles.input} placeholder="Wallet Connect URL" value={walletConnectUrl} onChangeText={setWalletConnectUrl}/>
      <Button title={'Connect'} disabled={walletConnectUrl ? false : true} onPress={() => navigateToWalletScreen(walletConnectUrl)}/>
    </>);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return (
      <>
        <Text>No access to camera</Text>
        {manualWalletConnect}
      </>
    );
  }

  return (
    <>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
        {manualWalletConnect}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

