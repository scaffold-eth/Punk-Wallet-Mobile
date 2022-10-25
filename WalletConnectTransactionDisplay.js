import React, { useState, useEffect } from "react";
import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { ethers } from "ethers";

import styled from 'styled-components/native';

import TenderlySimulation from "./TenderlySimulation";

const { WalletConnectTransactionDisplayHelper } = require('./WalletConnectTransactionDisplayHelper');

//Todo: This is copy-paste
const SActions = styled.View`
  margin: 0;
  margin: 20px;
  padding: 10px;

  display: flex;
  flexDirection: row;
`;

export default function WalletConnectTransactionDisplay({ chainId, connector, payload, setCallRequestPayload, wallet }) {
  log("WalletConnectTransactionDisplay");
  const [details, setDetails] = useState();

  let value;
  let to;
  try {
    value = ethers.utils.formatEther(payload?.params[0]?.value?.toString()).toString();
    to = payload?.params[0]?.to;
  }
  catch(error) {
    console.error("Coudn't get value/to", error)
  }

  const [walletConnectTransactionDisplayHelper, setWalletConnectTransactionDisplayHelper] = useState(null);

  useEffect(() => {
    log("WalletConnectTransactionDisplay useEffect setWalletConnectTransactionDisplayHelper");

    setWalletConnectTransactionDisplayHelper(new WalletConnectTransactionDisplayHelper(chainId, connector, payload, wallet));
  },[chainId, connector, payload, wallet]);

  if (!walletConnectTransactionDisplayHelper) {
    return (<></>);
  }

  return (
  	<View>
   		<Modal
        animationType="slide"
        transparent={true}
      >
        <View>
          <View style={styles.modalView}>
          	<TenderlySimulation chainId={chainId} payload={payload}/>

            {value && to && <Text style={{textAlign: "center", marginTop: 20}}>
              Wanna send 
              <Text style={{fontWeight: "bold"}}> {value} Ξ </Text>
               to {to}
             </Text>}

            <SActions>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>{
                  walletConnectTransactionDisplayHelper.rejectRequest();
                  setCallRequestPayload(null);
                } }
              >
                <Text style={styles.textStyle}>Reject</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  walletConnectTransactionDisplayHelper.approveRequest();
                  setCallRequestPayload(null);
                }}
              >
                <Text style={styles.textStyle}>Approve</Text>
              </Pressable>
            </SActions>

            <Button title="Details" onPress={() => setDetails(!details)} />

            {details && <Text>
              {JSON.stringify(payload.params, null, 2)}
            </Text>}

          </View>
        </View>
      </Modal>
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
    margin:20,
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

