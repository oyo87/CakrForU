import React from "react";
import styled from "styled-components";

function Wtest() {
  const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: ${window.innerWidth}px;
    height: ${window.innerHeight}px;
    background-color: blue;
  `;
  const LeftSide = styled.div`
    width: 40%;
    height: 100%;
    background-color: red;
  `;
  const RightSide = styled.div`
    width: 60%;
    height: 100%;
    background-color: green;
  `;

  return (
    <Container>
      <LeftSide>
        <div>Left</div>
      </LeftSide>
      <RightSide>
        <div>Right</div>
      </RightSide>
    </Container>
  );
}

export default Wtest;
