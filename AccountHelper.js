import { ACCOUNT_INDEXES_DELIMETER, ACCOUNT_INDEXES_KEY, ACTIVE_ACCOUNT_INDEX_KEY, STORAGE_KEY_NETWORK_NAME, NETWORKS } from "./constants";

const { getItem, setItem } = require('./Storage');

class AccountHelper {
    constructor(activeAccountIndex, setActiveAccountIndex, accountIndexesArray, setAccountIndexesArray, network, setNetwork) {
        this.activeAccountIndex = activeAccountIndex;
        this.setActiveAccountIndex = setActiveAccountIndex;
        this.accountIndexesArray = accountIndexesArray;
        this.setAccountIndexesArray = setAccountIndexesArray;
        this.network = network;
        this.setNetwork = setNetwork;
    }

    getAccountIndexesArrayFromStorage = async () => {
        const accountIndexesString = await getItem(ACCOUNT_INDEXES_KEY);

        if (!accountIndexesString) {
            return null;
        }

        return accountIndexesString.split(ACCOUNT_INDEXES_DELIMETER);
    }
    setAccountIndexesArrayToStorage = async (newAccountIndexesArray) => {
        await setItem(ACCOUNT_INDEXES_KEY, newAccountIndexesArray.join(ACCOUNT_INDEXES_DELIMETER));
    }

    getActiveAccountIndexFromStorage = async () => {
        return (await getItem(ACTIVE_ACCOUNT_INDEX_KEY));
    }
    setActiveAccountIndexToStorage = async (newActiveAccountIndex) => {
        await setItem(ACTIVE_ACCOUNT_INDEX_KEY, newActiveAccountIndex.toString());
    }

    getNextAccountIndex = async () => {
        const accountIndexesArrayFromStorage = await this.getAccountIndexesArrayFromStorage();

        const length = accountIndexesArrayFromStorage ? accountIndexesArrayFromStorage.length : 0;

        if (length == 0) {
            return 0;
        }

        return (parseInt(accountIndexesArrayFromStorage[length -1]) + 1);
    }

    handleActiveAccountIndex = async () => {
        const activeAccountIndexFromStorage = await this.getActiveAccountIndexFromStorage();

        this.setActiveAccountIndex(activeAccountIndexFromStorage ? activeAccountIndexFromStorage : 0)
    }
    handleAccountIndexesArray = async () => {
        const accountIndexesArrayFromStorage = await this.getAccountIndexesArrayFromStorage();

        this.setAccountIndexesArray(accountIndexesArrayFromStorage ? accountIndexesArrayFromStorage : [0]);
    }
    handleNetwork = async () => {
        const storedNetworkKey = await getItem(STORAGE_KEY_NETWORK_NAME);

        const networkKey = storedNetworkKey ? storedNetworkKey : Object.keys(NETWORKS)[0];

        this.setNetwork(NETWORKS[networkKey]);
    }
    handleNewAccount = async (newAccountIndex) => {
        let newAccountIndexesArray = JSON.parse(JSON.stringify(this.accountIndexesArray ? this.accountIndexesArray : [0])); // Deep copy, not sure if this is really needed
        
        if (newAccountIndex != 0) {
            newAccountIndexesArray.push(newAccountIndex);    
        }

        await this.setAccountIndexesArrayToStorage(newAccountIndexesArray);
        await this.setActiveAccountIndexToStorage(newAccountIndex);

        this.setActiveAccountIndex(newAccountIndex);
        this.setAccountIndexesArray(newAccountIndexesArray);
    }

    getActiveAccountIndex = () => {
        return this.activeAccountIndex;
    }
    setActiveAccountIndex = (newActiveAccountIndex) => {
        return this.setActiveAccountIndex(newActiveAccountIndex);
    }

    getAccountIndexesArray = () => {
        return this.accountIndexesArray;
    }
    setAccountIndexesArray = (newAccountIndexesArray) => {
        return this.setAccountIndexesArray(newAccountIndexesArray);
    }

    getNetwork = () => {
        return this.network;
    }
    setNetwork = (newNetwork) => {
        return this.setNetwork(newNetwork);
    }
}

module.exports = {
    AccountHelper
}