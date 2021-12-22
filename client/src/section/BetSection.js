import React, { useState } from "react";
import SelectSelection from "../component/SelectSelection";
import InputSection from "../component/InputSection";
import styled from "styled-components";

const BetSection = ({ minimumAmount, betHandler }) => {
  const [choice, setChoice] = useState();
  const [price, setPrice] = useState(0);

  const betClickHandler = () => {
    betHandler(choice, price);
    setChoice("");
    setPrice(0);
  };

  return (
    <>
      <h3>Minimum amount: {minimumAmount} ETH</h3>
      <BetSectionStyled>
        <SelectSelection setChoice={setChoice} />
        <InputSection
          betClickHandler={betClickHandler}
          setPrice={setPrice}
          price={price}
        />
      </BetSectionStyled>
    </>
  );
};

const BetSectionStyled = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-around;
`;

export default BetSection;
