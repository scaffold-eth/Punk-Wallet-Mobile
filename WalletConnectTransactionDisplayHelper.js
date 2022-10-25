// This class is based on https://github.com/WalletConnect/walletconnect-test-wallet/blob/7b209c10f02014ed5644fc9991de94f9d96dcf9d/src/controllers/wallet.ts

import "react-native-get-random-values"
// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims"
// Import the ethers library
import { ethers, BigNumber } from "ethers";

import { NETWORKS } from "./constants";

const { getGasPrice } = require('./GasPrice');

class WalletConnectTransactionDisplayHelper {
	constructor(chainId, connector, payload, wallet) {
		log("WalletConnectTransactionDisplayHelper constructor", chainId)
		this.chainId = chainId;
		this.connector = connector;
		this.payload = payload;
		this.wallet = wallet;
	}

	sendTransaction = async (transaction) => {
	    if (this.wallet) {
	      if (transaction.from &&
	      	 (transaction.from.toLowerCase() !== this.wallet.address.toLowerCase())) {

	        console.error("Transaction request From doesn't match active account");
	      }

	      console.log("transaction.from", transaction.from);
	      if (!transaction.from) {
	      	transaction.from = wallet.address;
	      }

	      if (transaction.from) {
	        delete transaction.from;
	      }

	      // ethers.js expects gasLimit instead
	      if ("gas" in transaction) {
	        transaction.gasLimit = transaction.gas;
	        delete transaction.gas;
	      }

	      // 50gwei for polygon testing
	      //transaction.gasPrice = "0xBA43B7400";
	      // ToDo get gas price
	      // ToDo validate chanids

	      transaction.chainId = transaction.chainId ? BigNumber.from(transaction.chainId).toNumber() : this.chainId;

	      //if (transaction.type) {
	      //	transaction.type = BigNumber.from(transaction.type).toNumber()
	      //}

	      // Todo: proper gas handling for all chains
	      if (transaction.chainId != NETWORKS.optimism.chainId) {
	      	const gasPrice = await getGasPrice(transaction.chainId);

		      transaction.type = 2;
		      delete transaction.gasPrice;
		      transaction.maxFeePerGas = gasPrice.maxFeePerGas;
		      transaction.maxPriorityFeePerGas = gasPrice.maxPriorityFeePerGas;
	      }

	      console.log("transaction", transaction);

	      const result = await this.wallet.sendTransaction(transaction);
	      return result.hash;
	    }
	    else {
	      console.error("No Active Account");
	    }

	    return null;
	  }

	signTransaction = async (data) => {
	    if (this.wallet) {
	      if (data && data.from) {
	        delete data.from;
	      }

	      // Ethers uses gasLimit instead of gas
	      data.gasLimit = data.gas;
	      delete data.gas;

	      const result = await this.wallet.signTransaction(data);
	      return result;
	    }
	    else {
	      console.error("No Active Account");
	    }

	    return null;
	}

 	signMessage = async (data) => {
	    if (this.wallet) {
	      const signingKey = new ethers.utils.SigningKey(this.wallet.privateKey);
	      const sigParams = await signingKey.signDigest(ethers.utils.arrayify(data));
	      const result = await ethers.utils.joinSignature(sigParams);
	      return result;
	    }
	    else {
	      console.error("No Active Account");
	    }

	    return null;
	  }

	signPersonalMessage = async (message) => {
	    if (this.wallet) {
	      const result = await this.wallet.signMessage(
	        ethers.utils.isHexString(message) ? ethers.utils.arrayify(message) : message,
	      );
	      return result;
	    }
	    else {
	      console.error("No Active Account");
	    }

	    return null;
	}

	signTypedData = async (data) => {
	    if (this.wallet) {
	    	const jsonParsedData = JSON.parse(data);  

			// "You should not pass the EIP712Domain into ethers." if ricmoo says so...
			// https://github.com/ethers-io/ethers.js/issues/687#issuecomment-714069471

			let types = jsonParsedData.types;
			delete types.EIP712Domain;

			const result = await this.wallet._signTypedData(jsonParsedData.domain, types, jsonParsedData.message);

			return result;
	    }
	    else {
	      console.error("No Active Account");
	    }

	    return null;
	}

	approveRequest = async () => {
		let errorMsg = "";
		let result = null;

		let transaction = null;
	    let dataToSign = null;
	    let addressRequested = null;

		switch (this.payload.method) {
	      case "eth_sendTransaction":
	        transaction = this.payload.params[0];
	        addressRequested = transaction.from;

	        if (this.wallet.address.toLowerCase() === addressRequested.toLowerCase()) {
	          result = await this.sendTransaction(transaction);
	        }
	        else {
	          errorMsg = "Address requested does not match active account";
	        }
	        break;
	      case "eth_signTransaction":
	        transaction = this.payload.params[0];
	        addressRequested = transaction.from;

	        if (this.wallet.address.toLowerCase() === addressRequested.toLowerCase()) {
	          result = await this.signTransaction(transaction);
	        }
	        else {
	          errorMsg = "Address requested does not match active account";
	        }
	        break;
	      case "eth_sign":
	        dataToSign = this.payload.params[1];
	        addressRequested = this.payload.params[0];

	        if (this.wallet.address.toLowerCase() === addressRequested.toLowerCase()) {
	          result = await this.signMessage(dataToSign);
	        }
	        else {
	          errorMsg = "Address requested does not match active account";
	        }
	        break;
	      case "personal_sign":
	        dataToSign = this.payload.params[0];
	        addressRequested = this.payload.params[1];

	        if (this.wallet.address.toLowerCase() === addressRequested.toLowerCase()) {
	          result = await this.signPersonalMessage(dataToSign);
	        }
	        else {
	          errorMsg = "Address requested does not match active account";
	        }
	        break;
	      case "eth_signTypedData":
	        dataToSign = this.payload.params[1];
	        addressRequested = this.payload.params[0];

	        if (this.wallet.address.toLowerCase() === addressRequested.toLowerCase()) {
	          result = await this.signTypedData(dataToSign);
	        }
	        else {
	          errorMsg = "Address requested does not match active account";
	        }
	        break;
	      default:
	        break;
	    }

		console.log("result", result);

    	this.connector.approveRequest({
          id: this.payload.id,
          result: result
        });
	};

	rejectRequest = () => {
	    if (this.connector) {
	      this.connector.rejectRequest({
	        id: this.payload.id,
	        error: { message: "Failed or Rejected Request" },
	      });
	    }

	    console.log("rejectTransaction");
	};
}

module.exports = {
	WalletConnectTransactionDisplayHelper
}