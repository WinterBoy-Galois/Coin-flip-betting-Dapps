import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "rimble-ui";
import styled from "styled-components";
import { showModal } from "../actions/modalAction";

const WithdrawSection = () => {
  const dispatch = useDispatch();

  const withdrawClickHandler = () => {
    let functionType = "withdraw";
    let title = "Are you sure that you want to withdraw?";
    let hash = "";
    dispatch(showModal(functionType, title, hash));
  };

  return (
    <WithdrawStyled>
      <Button size="large" onClick={withdrawClickHandler}>
        Withdraw your funds
      </Button>
    </WithdrawStyled>
  );
};

const WithdrawStyled = styled.div`
  text-align: center;
  margin-top: 8rem;
`;

export default WithdrawSection;
