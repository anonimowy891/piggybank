const { apiClient } = require('@liskhq/lisk-client');
const RPC_ENDPOINT = 'ws://127.0.0.1:8080/ws';

let clientCache;

export const getClient = async () => {
    if (!clientCache) {
        clientCache = await apiClient.createWSClient(RPC_ENDPOINT);
    }
    return clientCache;
};

export const fetchNodeInfo = async () => {
    return fetch("http://localhost:4000/api/node/info")
      .then((res) => res.json())
      .then((res) => res.data);
  };
  
  export const fetchAccountInfo = async (address) => {
    return fetch(`http://localhost:4000/api/accounts/${address}`)
      .then((res) => res.json())
      .then((res) => res.data);
  };
  
  export const sendTransactions = async (tx) => {
    return fetch("http://localhost:4000/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tx),
    })
      .then((res) => res.json())
      .then((res) => res.data);
  };
  
  export const getAllTransactions = async () => {
    return fetch(`http://localhost:8080/api/transactions`)
      .then((res) => res.json())
      .then((res) => {
        return res.data;
      });
  };