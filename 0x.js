// https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-price

import axios from "axios";

const MAINNET_API_URL = "https://api.0x.org/";
const POLYGON_API_URL = "https://polygon.api.0x.org/";

const MAINNET_NATIVE_TOKEN = "ETH";
const POLYGON_NATIVE_TOKEN = "MATIC";

const QUOTE_ENDPOINT = "swap/v1/quote/";

import { NETWORKS } from "./constants";

getPrice = async (chainId) => {
    let apiURL;
    let nativeToken;

    if ((chainId == NETWORKS.ethereum.chainId) || (chainId == NETWORKS.optimism.chainId)) {
        apiURL = MAINNET_API_URL;
        nativeToken = MAINNET_NATIVE_TOKEN;
    }
    else if (chainId == NETWORKS.polygon.chainId) {
       apiURL = POLYGON_API_URL;
       nativeToken = POLYGON_NATIVE_TOKEN;
    }
    else {
       throw new Error("Unsupported chainId");
    }

    apiURL += QUOTE_ENDPOINT + "?sellToken=" + nativeToken + "&buyToken=DAI&sellAmount=1000000000000000000";

    const resp = await axios.get(apiURL);

    return resp?.data?.price;
}

module.exports = {
    getPrice
}