import React from "react";
import styled from "styled-components";
import { EthAddress, MetaMaskButton } from "rimble-ui";

const Nav = ({ account, contractBalance, gameBalance }) => {
  const memaskHandler = async () => {
    try {
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NavSstyled>
      <h1>Dapps - Coin Flip</h1>
      <EthStyled>
        <div className="address">
          <EthAddress address={account[0]} textLabels />
        </div>
        <MetaMaskButton onClick={memaskHandler}>
          Connect with MetaMask
        </MetaMaskButton>
      </EthStyled>
      <ul>
        <li>Contract Balance: {contractBalance} ETH</li>
        <li>Your balance in game: {gameBalance} ETH</li>
      </ul>
    </NavSstyled>
  );
};

const NavSstyled = styled.nav`
  min-height: 10vh;
  margin: auto;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 10rem 0rem 10rem;
  background: #282828;
  position: sticky;
  top: 0;
  z-index: 10;
  h1 {
    color: white;
    font-size: 1.5rem;
    font-family: "Lobster", cursive;
    font-weight: lighter;
    margin-bottom: 2rem;
  }
  ul {
    display: flex;
    list-style: none;
    padding: 2rem;
    justify-content: space-around;
  }
  li {
    // padding-left: 7rem;
    position: relative;
    color: white;
    text-decoration: none;
    font-size: 1.5rem;
  }
  @media (max-width: 1300px) {
    flex-direction: column;
    padding: 1rem;
    #Logo {
      display: inline-block;
      margin: 2rem;
    }
    ul {
      padding: 2rem;
      justify-content: space-around;
      width: 100%;
      li {
        padding: 0;
      }
    }
  }
`;

const EthStyled = styled.div`
  display: flex;
  .address {
    width: 70%;
    margin-right: 4rem;
  }
`;

export default Nav;
