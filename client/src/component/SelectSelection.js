import React from "react";
// import { Field, Select } from "rimble-ui";
import { Select } from "antd";
import styled from "styled-components";

const SelectSelection = ({setChoice}) => {
  const { Option } = Select;

  const selectHandler = (value) => {
    let choice = 0
    if(value === "heads") {
      choice = 1;
    }
    setChoice(choice);
  }

  return (
    <SelectSelectionStyled>
      <Select
        showSearch
        style={{ width: 300, color: "black"}}
        placeholder="Bet hands or tails"
        optionFilterProp="children"
        onChange={(value) => selectHandler(value)}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="heads">HEADS</Option>
        <Option value="tails">TAILS</Option>
      </Select>
    </SelectSelectionStyled>
  );
};

const SelectSelectionStyled = styled.div`
  // text-align: center;
  padding: 2rem;
`;

export default SelectSelection;
