const ACCOUNT_INDEXES_DELIMETER = ",";
const ACCOUNT_INDEXES_KEY = "ACCOUNT_INDEXES_KEY";

const ACTIVE_ACCOUNT_INDEX_KEY = "ACTIVE_ACCOUNT_INDEX_KEY";

const MNEMONIC_KEY = "MNEMONIC_KEY";

const ROUTE_NAME_WALLET_CONNECT = "WalletConnect";
const ROUTE_NAME_HOME = "Wallet";
const ROUTE_NAME_WALLET_SECRETS = "Private keys";

const STORAGE_KEY_NETWORK_NAME = "STORAGE_KEY_NETWORK_NAME";

// ToDo: Yeah, I should hide these, please don't steal my free credentials.
const ETHER_SCAN_API_KEY = "Z1YDJ4KVUCBWVESJYWU5HUXHXRZBEQ5CB6";
const POLYGON_SCAN_API_KEY = "Y9M2YFP84HMYPY8EEWBPMEM442Z6I9414B";

const NETWORKS = {
  ethereum: {
    name: "Ethereum",
    color: "#ceb0fa",
    chainId: 1,
    price: "uniswap",
    rpcUrl: `https://mainnet.infura.io/v3/a5646d443c0d4bbda87f0acdb32f7d89`,
    blockExplorer: "https://etherscan.io/",
  },
  polygon: {
    name: "Polygon",
    color: "#2bbdf7",
    price: "uniswap:0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    chainId: 137,
    rpcUrl: "https://polygon-mainnet.infura.io/v3/a5646d443c0d4bbda87f0acdb32f7d89",
    faucet: "https://faucet.matic.network/",
    blockExplorer: "https://polygonscan.com/",
  },
  optimism: {
    name: "Optimism",
    color: "#f01a37",
    price: "uniswap",
    chainId: 10,
    blockExplorer: "https://optimistic.etherscan.io/",
    rpcUrl: `https://opt-mainnet.g.alchemy.com/v2/gzr_xuzv2SPwbPchC9Z41qmfodlDglKp`,
    //rpcUrl: `https://mainnet.optimism.io`,
    //gasPrice: 1000000,
  }
};

module.exports = {
  ACTIVE_ACCOUNT_INDEX_KEY,
  ACCOUNT_INDEXES_DELIMETER,
  ACCOUNT_INDEXES_KEY,
  MNEMONIC_KEY,
  ROUTE_NAME_WALLET_CONNECT,
  ROUTE_NAME_HOME,
  ROUTE_NAME_WALLET_SECRETS,
  STORAGE_KEY_NETWORK_NAME,
  NETWORKS,
  ETHER_SCAN_API_KEY,
  POLYGON_SCAN_API_KEY
}