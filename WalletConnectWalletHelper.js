class WalletConnectWalletHelper {
	constructor(setCallRequestPayload, setConnected, setConnector, setPeerMeta, setWalletConnectUrl) {
		log("WalletConnectWalletHelper constructor");

		this.setCallRequestPayload = setCallRequestPayload;
		this.setConnected = setConnected;
		this.setConnector = setConnector;
		this.setPeerMeta = setPeerMeta;
		this.setWalletConnectUrl = setWalletConnectUrl;
	}

	approveSession = (connector, chainId, address) => {
		console.log("ACTION", "approveSession");

		connector.approveSession({ chainId, accounts: [address] });

		log("WalletConnectWalletHelper approveSession setConnector");

		this.setConnector(connector);
	};

	rejectSession = (connector) => {
		console.log("ACTION", "rejectSession");

		connector.rejectSession();

		log("WalletConnectWalletHelper rejectSession setConnector");

		this.setConnector(connector);
	};

	reset = (connector) => {
		log("WalletConnectWalletHelper Reset", connector ? "killSession" : "simple reset");

		if (connector) {
			log("WalletConnectWalletHelper unsubscribe from disconnect event");

			// We do not want to trigger the disconnect event, which would call reset again
			// We should reach this point when we are already connected and want to connect to another Dapp	
			connector.off("disconnect");

			// Let's signal the Dapp that we're out
			connector.killSession();
	    }

    	this.setCallRequestPayload(null);
	    this.setConnected(false);
		this.setConnector(null);
		this.setPeerMeta(null);
		this.setWalletConnectUrl(null);
	}

	subscribeToEvents = (connector) => {
	    console.log("ACTION", "subscribeToEvents");
		console.log("Handling session");

		connector.on("session_request", (error, payload) => {
			console.log("EVENT", "session_request");
			console.log("error, payload", error, payload);

			if (error) {
			  console.log("error", error);
			  throw error;
			}
			console.log("SESSION_REQUEST", payload.params);

			const { peerMeta } = payload.params[0];

			log("WalletConnectWalletHelper subscribeToEvents setPeerMeta");
			this.setPeerMeta(peerMeta);
		});

		connector.on("session_update", error => {
			console.log("EVENT", "session_update");

			if (error) {
			  throw error;
			}
		});

		connector.on("call_request", async (error, payload) => {
			console.log("EVENT", "call_request", "method", payload.method);
			console.log("EVENT", "call_request", "params", payload.params);

			if (error) {
			  throw error;
			}

			log("WalletConnectWalletHelper subscribeToEvents setCallRequestPayload");
			this.setCallRequestPayload(payload);
		});

		connector.on("connect", (error, payload) => {
			console.log("EVENT", "connect");

			if (error) {
			  throw error;
			}

			log("WalletConnectWalletHelper subscribeToEvents setConnected");
			this.setConnected(true);
		});

		connector.on("disconnect", (error, payload) => {
			console.log("EVENT", "disconnect", payload);

			if (error) {
			  throw error;
			}

			log("WalletConnectWalletHelper disconnect");
			this.reset();
		});

		// ToDo
		/*
		if (this.connector.connected) {
		const { chainId, accounts } = this.connector;
		const index = 0;
		const address = accounts[index];
		getAppControllers().wallet.update(index, chainId);
		this.setState({
		  connected: true,
		  address,
		  chainId,
		});
		}
		*/
	};

	updateWalletConnectSession = (connector, address, chainId) => {
		connector.updateSession({
			accounts: [address],
			chainId: chainId,
		});

		log("WalletConnectWalletHelper updateWalletConnectSession setConnector");

		this.setConnector(connector);
	}
}

module.exports = {
    WalletConnectWalletHelper
}