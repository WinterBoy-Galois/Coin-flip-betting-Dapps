import React, { useEffect } from "react";
import Web3 from "web3";
import { Loader } from "rimble-ui";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import GlobalStyle from "./component/GlobalStyle";
import Nav from "./component/Nav";
import DisplayModal from "./component/Modal";
import DepositSection from "./section/DepositSection";
import BetSection from "./section/BetSection";
import WithdrawSection from "./section/WithdrawSection";
import { showModal } from "./actions/modalAction";
import { loadBlockchain } from "./actions/blockchainAction";

function App() {
  //dispatch
  const dispatch = useDispatch();
  //data
  const { isModalVisible, functionType } = useSelector((state) => state.modal);
  const {
    contractInstance,
    account,
    contractBalance,
    gameBalance,
    minimumAmount,
    isLoading,
  } = useSelector((state) => state.blockchain);

  useEffect(() => {
    dispatch(loadBlockchain());
  }, [dispatch]);

  const depositHandler = (depositAmount) => {
    if (depositAmount === 0) {
      alert("should be more than zero!");
    } else {
      let config = {
        value: Web3.utils.toWei(depositAmount, "ether"),
        from: account[0],
      };
      contractInstance.methods
        .deposit()
        .send(config)
        .on("transactionHash", (hash) => {
          dispatch(
            showModal("deposit", `You deposit ${depositAmount} ETH`, hash)
          );
        });
    }
  };

  const betHandler = (choice, price) => {
    if (price <= 0) {
      alert("should be more than zero!");
    } else {
      let config = {
        value: Web3.utils.toWei(price, "ether"),
        from: account[0],
      };
      contractInstance.methods
        .bet(choice)
        .send(config)
        .on("transactionHash", (hash) => {
          console.log(hash);
        })
        .on("receipt", (receipt) => {
          console.log(receipt);
          alert("You betted!");
        });
    }
  };

  const withdrawHandler = () => {
    contractInstance.methods
      .withdrawFunds()
      .send()
      .on("transactionHash", (hash) => {
        console.log(hash);
      })
      .on("receipt", (receipt) => {
        console.log(receipt);
        let amt = receipt.events.WithdrawnFundsFromPlayer.returnValues(
          "amount"
        );
        alert(
          `You received ${Web3.utils.fromWei(
            amt,
            "ether"
          )} eth! Check your Metamask wallet`
        );
      });
  };

  const handleOk = () => {
    if (functionType === "withdraw") {
      withdrawHandler();
    }

    dispatch({
      type: "CLOSE_MODAL",
    });
  };

  return (
    <div className="App">
      <GlobalStyle />
      {isLoading ? (
        <LoadingStyled>
          <Loader color="primary" size="80px" />
        </LoadingStyled>
      ) : (
        <>
          <Nav
            account={account}
            contractBalance={contractBalance}
            gameBalance={gameBalance}
          />
          <DepositSection depositHandler={depositHandler} />
          <BetSection minimumAmount={minimumAmount} betHandler={betHandler} />
          <WithdrawSection handleOk={handleOk} />
          <DisplayModal isModalVisible={isModalVisible} handleOk={handleOk} />
        </>
      )}
    </div>
  );
}

const LoadingStyled = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100vh;
  align-items: center;
`;

export default App;
