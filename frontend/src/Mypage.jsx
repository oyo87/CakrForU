import React from "react";
import UpDownContainer from "./components/layout/UpDownContainer";
import RowContainer from "./components/layout/RowContainer";
import Burger from "./assets/img/burger.png";

function Mypage() {
  return (
    <UpDownContainer>
      <RowContainer width="353px">
        <img
          src={Burger}
          alt="burger"
          style={{
            width: "79px",
          }}
        />
      </RowContainer>
    </UpDownContainer>
  );
}

export default Mypage;
