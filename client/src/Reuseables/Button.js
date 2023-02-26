import React from "react";
import styled from "styled-components";

const Button = ({ name, type, onClick }) => {
  return (
    <>
      <Btn onClick={onClick} type={type}>
        {name}
      </Btn>
    </>
  );
};

const Btn = styled.button`
  color: white;
  background-color: blueviolet;
  border: none;
  padding: 5px 25px 5px 25px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
`;

export default Button;
