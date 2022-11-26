import { ACCOUNT_INDEXES_DELIMETER, ACCOUNT_INDEXES_KEY, ACTIVE_ACCOUNT_INDEX_KEY, STORAGE_KEY_NETWORK_NAME, NETWORKS } from "./constants";

const { getItem, setItem } = require('./Storage');

getAccountIndexesArrayFromStorage = async () => {
    const accountIndexesString = await getItem(ACCOUNT_INDEXES_KEY);

    if (!accountIndexesString) {
        return [0];
    }

    return accountIndexesString.split(ACCOUNT_INDEXES_DELIMETER);
}
setAccountIndexesArrayToStorage = async (accountIndexesArray) => {
    //let currentAccountIndexesArray = await getAccountIndexesArrayFromStorage();

    //currentAccountIndexesArray.push(nextAccountIndex);

    setItem(ACCOUNT_INDEXES_KEY, accountIndexesArray.join(ACCOUNT_INDEXES_DELIMETER));
}

getActiveAccountIndexFromStorage = async () => {
    return (await getItem(ACTIVE_ACCOUNT_INDEX_KEY));
}
setActiveAccountIndexToStorage = (activeAccountIndex) => {
    setItem(ACTIVE_ACCOUNT_INDEX_KEY, activeAccountIndex.toString());
}

getNextAccountIndex = async () => {
    const accountIndexesArray = await getAccountIndexesArrayFromStorage();

    const length = accountIndexesArray.length;

    if (length == 0) {
        return 0;
    }

    return (parseInt(accountIndexesArray[length -1]) + 1);
}

handleActiveAccountIndex = async (setActiveAccountIndex) => {
    const activeAccountIndexFromStorage = await getActiveAccountIndexFromStorage();

    setActiveAccountIndex(activeAccountIndexFromStorage ? activeAccountIndexFromStorage : 0)
}
handleAccountIndexesArray = async (setAccountIndexesArray) => {
    setAccountIndexesArray(await getAccountIndexesArrayFromStorage());
}

handleNetwork = async (setNetwork) => {
    const storedNetworkKey = await getItem(STORAGE_KEY_NETWORK_NAME);

    const networkKey = storedNetworkKey ? storedNetworkKey : Object.keys(NETWORKS)[0];

    setNetwork(NETWORKS[networkKey]);
}

module.exports = {
    getAccountIndexesArrayFromStorage, setAccountIndexesArrayToStorage,
    getActiveAccountIndexFromStorage, setActiveAccountIndexToStorage,
    getNextAccountIndex,
    handleActiveAccountIndex, handleAccountIndexesArray,
    handleNetwork
}