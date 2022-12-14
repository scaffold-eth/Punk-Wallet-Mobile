global.Buffer = global.Buffer || require('buffer').Buffer

import { Button, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components/native';

import { ethers } from "ethers";

import WalletConnect from "@walletconnect/client";
import { Buffer } from "buffer";

import React, { useState, useEffect } from "react";

import PeerMeta from "./PeerMeta";
import WalletConnectTransactionDisplay from "./WalletConnectTransactionDisplay";

const { approveSession, rejectSession, reset, subscribeToEvents, updateWalletConnectSession } = require('./WalletConnectWalletHelper');
const { WalletConnectWalletHelper } = require('./WalletConnectWalletHelper');
const { getGasPrice } = require('./GasPrice');

import SColumn from "./SColumn";

const SActions = styled.View`
  margin: 0;
  margin-top: 20px;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export default function WalletConnectWallet({ chainId = 1, scannedWalletConnectUrl, wallet, setWalletConnectError, setWalletConnectErrorURL }) {
  log("WalletConnectWallet");

  const [callRequestPayload, setCallRequestPayload] = useState(null);
  const [connected, setConnected] = useState(false);
  const [connector, setConnector] = useState(null);
  const [peerMeta, setPeerMeta] = useState(null);
  const [walletConnectUrl, setWalletConnectUrl] = useState(null);
  const [walletConnectWalletHelper, setWalletConnectWalletHelper] = useState(null);

  useEffect(() => {
    log("WalletConnectWallet useEffect setWalletConnectWalletHelper");

    setWalletConnectWalletHelper(new WalletConnectWalletHelper(setCallRequestPayload, setConnected, setConnector, setPeerMeta, setWalletConnectUrl));
  },[]);

  useEffect(() => {
    if (scannedWalletConnectUrl && !walletConnectUrl) {
      log("WalletConnectWallet setWalletConnectUrl", scannedWalletConnectUrl);

      setWalletConnectUrl(scannedWalletConnectUrl);
    }

    if (scannedWalletConnectUrl && walletConnectUrl && (walletConnectUrl != scannedWalletConnectUrl)) {
      log("WalletConnectWallet Reset and setWalletConnectUrl");

      walletConnectWalletHelper.reset(connector);

      setWalletConnectUrl(scannedWalletConnectUrl);
    }
  },[ scannedWalletConnectUrl ]);

  useEffect(() => {
    log("WalletConnectWallet useEffect setConnector", walletConnectUrl);

    if (walletConnectUrl) {

      try {
        const walletConnectConnector = new WalletConnect({ uri:walletConnectUrl });

        walletConnectWalletHelper.subscribeToEvents(walletConnectConnector);

        setConnector(walletConnectConnector);
      }
      catch(error) {
        console.log("Coudn't connect");
        setWalletConnectError(true);
        setWalletConnectErrorURL(walletConnectUrl);
        walletConnectWalletHelper.reset();
      }
    }
  },[ walletConnectUrl ]);

  useEffect(()=>{
    if (connector && connector.connected) {
      const connectedAccounts = connector?.accounts;
      let connectedAddress;

      if (connectedAccounts) {
        connectedAddress = connectedAccounts[0];
      }

      // Use Checksummed addresses
      if (connectedAddress && (ethers.utils.getAddress(connectedAddress) != ethers.utils.getAddress(wallet.address))) {
        console.log("Updating wallet connect session with the new address");
        console.log("Connected address", ethers.utils.getAddress(connectedAddress));
        console.log("New address ", ethers.utils.getAddress(wallet.address));

        walletConnectWalletHelper.updateWalletConnectSession(connector, wallet.address, chainId);
      }

      const connectedChainId = connector?.chainId;

      if (connectedChainId && (connectedChainId != chainId)) {
        console.log("Updating wallet connect session with the new chainId");
        console.log("Connected chainId", connectedChainId);
        console.log("New chainId ", chainId);

        walletConnectWalletHelper.updateWalletConnectSession(connector, wallet.address, chainId);
      }
    }
  },[ chainId, wallet ]);

  return (
      <View>
        {callRequestPayload && <WalletConnectTransactionDisplay chainId={chainId} connector={connector} payload={callRequestPayload} setCallRequestPayload={setCallRequestPayload}  wallet={wallet}/>}

        {(peerMeta && connected) &&
           <>
             <PeerMeta peerMeta={peerMeta} connected={connected}/>
             <Button title={"Disconnect"} onPress={() => walletConnectWalletHelper.reset(connector)} />
           </>
        }

        {(peerMeta && !connected) &&
          <Modal
            animationType="slide"
            transparent={true}
            
            onRequestClose={() => {
              //Alert.alert("Modal has been closed.");
              //setModalVisible(!modalVisible);
            }}
          >
            <View>
              <View style={styles.modalView}>
                <PeerMeta peerMeta={peerMeta}/>

                <SActions>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={
                      () => {
                        walletConnectWalletHelper.rejectSession(connector);
                      }
                    }
                  >
                    <Text style={styles.textStyle}>Reject</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={
                      () => {
                        walletConnectWalletHelper.approveSession(connector, chainId, wallet.address);
                      }
                    }
                  >
                    <Text style={styles.textStyle}>Approve</Text>
                  </Pressable>
                </SActions>
              </View>
            </View>
           </Modal>
        }
      </View>
    );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
