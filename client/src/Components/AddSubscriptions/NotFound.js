import React from "react";
import styled from "styled-components";

const NotFound = () => {
  return (
    <>
      <Container>
        <h2>Unauthorized Route....Only Admin can Access this..</h2>
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 91.5vh;
  background-color: blueviolet;
`;

export default NotFound;
