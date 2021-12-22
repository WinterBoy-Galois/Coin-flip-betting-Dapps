import Web3 from "web3";
import { ABI, ADDRESS } from "../config";

export const loadBlockchain = () => async (dispatch) => {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const accounts = await web3.eth.getAccounts();
  const selectedAccount = window.ethereum.selectedAddress;
  const contractInstance = new web3.eth.Contract(ABI, ADDRESS, {
    from: accounts[0],
  });
  dispatch({
    type: "GET_CONTRACTDATA",
    contractInstance: contractInstance,
    account: accounts,
  });
  contractInstance.methods
    .balance()
    .call()
    .then((result) => {
      dispatch({
        type: "GET_CONTRACTBALANCE",
        contractBalance: Web3.utils.fromWei(result, "ether"),
      });
    });
  contractInstance.methods
    .getPlayerBalance(selectedAccount)
    .call()
    .then((res) => {
      dispatch({
        type: "GET_GAMEBALANCE",
        gameBalance: Web3.utils.fromWei(res, "ether"),
      });
    });
  contractInstance.methods
    .minimumBetNumber()
    .call()
    .then((res) => {
      dispatch({
        type: "GET_MINIAMOUNT", 
        minimumAmount: Web3.utils.fromWei(res, "ether")
      })
      // setIsLoading(false);
    });

  
};
