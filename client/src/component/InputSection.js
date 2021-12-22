import React from "react";
import styled from "styled-components";

const InputSection = ({ betClickHandler, price, setPrice }) => {

  return (
    <div>
      <InputSectionStyled>
        <div>
          <input
            type="number"
            placeholder="Type the price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label>ETH</label>
        </div>
        <ButtonStyled onClick={betClickHandler}>Bet</ButtonStyled>
      </InputSectionStyled>
    </div>
  );
};

const InputSectionStyled = styled.div`
  padding: 1rem;
  text-align: center;
  input {
    padding: 1rem 2rem;
    font-size: 2rem;
    border-radius: 1rem;
    text-align: center;
  }
  input:focus {
    outline: none;
  }
  label {
    color: white;
    font-size: 2rem;
    margin-left: 1rem;
  }
`;

const ButtonStyled = styled.button`
  color: white;
  border: 3px solid #23d997;
  border-radius: 1rem;
  transition: 0.5s;
  cursor: pointer;
  margin-top: 3rem;
  font-size: 1.1rem;
  text-align: center;
  padding: 1rem 15rem;
  :hover {
    background-color: #23d997;
    color: white;
  }
`;

export default InputSection;
