import React, { useEffect, useState } from "react";
import { Text } from 'react-native';

import Anchor from "./Anchor";
import axios from "axios";
import { BigNumber } from "ethers";
import Constants from 'expo-constants';

// set up your access-key, if you don't have one or you want to generate new one follow next link
// https://dashboard.tenderly.co/account/authorization

// These are eas secrets
// https://docs.expo.dev/build-reference/variables/

let TENDERLY_USER = process.env.TENDERLY_USER;
let TENDERLY_PROJECT = process.env.TENDERLY_PROJECT;
let TENDERLY_ACCESS_KEY = process.env.TENDERLY_ACCESS_KEY;

// In case you're not using eas, you can redefine these if you start expo with different environment variables
// TENDERLY_USER=tamas TENDERLY_PROJECT=project TENDERLY_ACCESS_KEY=9K01xnqKDv7tG2XO7xvSi7DOLOZ--18o npx expo start

if (!TENDERLY_USER) {
  TENDERLY_USER = Constants.manifest.extra.TENDERLY_USER ? Constants.manifest.extra.TENDERLY_USER : "tamas";
  TENDERLY_PROJECT = Constants.manifest.extra.TENDERLY_PROJECT ? Constants.manifest.extra.TENDERLY_PROJECT : "project";
  TENDERLY_ACCESS_KEY = Constants.manifest.extra.TENDERLY_ACCESS_KEY ? Constants.manifest.extra.TENDERLY_ACCESS_KEY : "9K01xnqKDv7tG2XO7xvSi7DOLOZ--18o";
}

const SIMULATE_URL = `https://api.tenderly.co/api/v1/account/${TENDERLY_USER}/project/${TENDERLY_PROJECT}/simulate`;
const OPTS = {
  headers: {
    'X-Access-Key': TENDERLY_ACCESS_KEY
  }
}

export default function TenderlySimulation({ chainId = 1, payload }) {
  const [simulated, setSimulated] = useState(false);
  const [simulationFailed, setSimulationFailed] = useState(false);
  const [simulationUnexpectedError, setSimulationUnexpectedError] = useState(false);
  const [simulationId, setSimulationId] = useState();

  const shouldSimulate = (payload) => {
    if ((payload.method == "eth_sendTransaction") || (payload.method == "eth_signTransaction")) {
      return true;
    }

    return false;
  }

  useEffect(()=> {
      const simulateTransaction = async () => {
        try {
          if (!shouldSimulate(payload)) {
            return;
          }

          let params = payload.params;
          if (Array.isArray(params)) {
            params = params[0];
          }

          const body = {
            "network_id": params.chainId ? BigNumber.from(params.chainId.toString()).toNumber() : BigNumber.from(chainId.toString()).toNumber(),
            "from": params.from,
            "to": params.to,
            "input": params.data ? params.data : "",
            "gas": BigNumber.from(params.gas).toNumber(),
            "gas_price": "0",
            "value": params.value ? BigNumber.from(params.value).toString() : "0",
            // simulation config (tenderly specific)
            "save_if_fails": true,
            "save": true,
            //"simulation_type": "quick"
          }
        
          const resp = await axios.post(SIMULATE_URL, body, OPTS);

          if (resp.data.simulation.status === false) {
            setSimulationFailed(true);
          }

          setSimulationId(resp.data.simulation.id);
          setSimulated(true);
        }
        catch(error) {
          setSimulationUnexpectedError(true);
          console.error("simulateTransaction", error)
        }
      }

      simulateTransaction();
    },[payload, chainId]);

  return (
    <>
      {shouldSimulate(payload) &&
      <Text style={{ textAlign: "center"}}>
        {!simulated && !simulationUnexpectedError && <>Simulating on Tenderly... </>}
        {simulated && simulationId && <Text> Simulating on <Anchor style={{ color: "#1890ff"}} href={`https://dashboard.tenderly.co/public/${TENDERLY_USER}/${TENDERLY_PROJECT}/simulator/${simulationId}`}>Tenderly</Anchor> {!simulationFailed ? "was successful!" : "has failed!"}</Text>}
        {simulationUnexpectedError && <Text>Couldn't simulate on <Anchor style={{ color: "#1890ff"}} href="https://tenderly.co/">Tenderly</Anchor>  because of an unexpected error.</Text>}
      </Text>
      }
    </>  
  );
}

