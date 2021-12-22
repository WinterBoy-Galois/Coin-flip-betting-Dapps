import React, { useState } from "react";
import styled from "styled-components";

const DepositSection = ({ depositHandler }) => {
  const [depositAmount, setDepositAmount] = useState(0);

  const depositClickHandler = () => {
    depositHandler(depositAmount);
    setDepositAmount(0);
  }

  return (
    <DepositStyled>
      <input
        type="number"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
      />
      <label>ETH</label>
      <button type="button" onClick={depositClickHandler}>
        Deposit
      </button>
    </DepositStyled>
  );
};

const DepositStyled = styled.div`
  color: white;
  text-align: center;
  padding: 2rem;
  margin-top: 2rem;
  input {
    font-size: 2rem;
    padding: 0.5rem;
    border-radius: 1rem;
    color: black;
    text-align: center;
  }
  input:focus {
    outline: none;
  }
  label {
    font-size: 2rem;
    margin-left: 1rem;
  }
  button {
    margin-left: 10rem;
    border-radius: 1rem;
  }
`;

export default DepositSection;
