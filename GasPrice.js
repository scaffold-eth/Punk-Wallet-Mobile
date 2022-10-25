import axios from "axios";

import { ethers, BigNumber } from "ethers";

import { ETHER_SCAN_API_KEY, NETWORKS, POLYGON_SCAN_API_KEY } from "./constants";

const ETHER_API_URL = "https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=" + ETHER_SCAN_API_KEY;
const POLYGON_API_URL = "https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=" + POLYGON_SCAN_API_KEY;

getGasPrice = async (chainId) => {
    let apiURL;

    if (chainId == NETWORKS.ethereum.chainId) {
        apiURL = ETHER_API_URL;
    }
    else if (chainId == NETWORKS.polygon.chainId) {
       apiURL = POLYGON_API_URL;
    }
    else {
       throw new Error("Unsupported chainId");
    }

    const resp = await axios.get(apiURL);
    const result = resp.data.result;

    const proposeGasPriceString = result.ProposeGasPrice.toString();
    const suggestBaseFeeString = result.suggestBaseFee.toString();

    const proposeGasPriceBigNumber = ethers.utils.parseUnits(proposeGasPriceString, "gwei");
    const suggestBaseFeeBigNumber = ethers.utils.parseUnits(suggestBaseFeeString, "gwei");

    const maxFeePerGasBigNumber = proposeGasPriceBigNumber.mul(2);
    const maxPriorityFeePerGasBigNumber = proposeGasPriceBigNumber.sub(suggestBaseFeeBigNumber);

    const gasPrice = {
       "maxFeePerGas":maxFeePerGasBigNumber.toHexString(),
       "maxPriorityFeePerGas":maxPriorityFeePerGasBigNumber.toHexString()
    }

    return gasPrice;
}

module.exports = {
    getGasPrice
}