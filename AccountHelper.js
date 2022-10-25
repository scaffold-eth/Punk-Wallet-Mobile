import { ACCOUNT_INDEXES_DELIMETER, ACCOUNT_INDEXES_KEY, ACTIVE_ACCOUNT_INDEX_KEY } from "./constants";

const { getItem, setItem } = require('./Storage');

getAccountIndexesArray = async () => {
    const accountIndexesString = await getItem(ACCOUNT_INDEXES_KEY);

    if (!accountIndexesString) {
        return [];
    }

    return accountIndexesString.split(ACCOUNT_INDEXES_DELIMETER);
}
setAccountIndexesArray = async (nextAccountIndex) => {
    let currentAccountIndexesArray = await getAccountIndexesArray();

    currentAccountIndexesArray.push(nextAccountIndex);

    setItem(ACCOUNT_INDEXES_KEY, currentAccountIndexesArray.join(ACCOUNT_INDEXES_DELIMETER));
}

getActiveAccountIndexFromStorage = async () => {
    return (await getItem(ACTIVE_ACCOUNT_INDEX_KEY));
}
setActiveAccountIndexToStorage = (activeAccountIndex) => {
    setItem(ACTIVE_ACCOUNT_INDEX_KEY, activeAccountIndex.toString());
}

getNextAccountIndex = async () => {
    const accountIndexesArray = await getAccountIndexesArray();

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
    setAccountIndexesArray(await getAccountIndexesArray());
}

module.exports = {
    getAccountIndexesArray, setAccountIndexesArray,
    getActiveAccountIndexFromStorage, setActiveAccountIndexToStorage,
    getNextAccountIndex,
    handleActiveAccountIndex, handleAccountIndexesArray
}