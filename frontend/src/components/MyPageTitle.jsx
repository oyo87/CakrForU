import React from "react";
import { useSelector } from "react-redux";
import RowContainer from "./layout/RowContainer";
import ColContainer from "./layout/ColContainer";
import Burger from "../assets/img/burger.png";
import GapH from "./layout/GapH";
import GapW from "./layout/GapW";
import BoldMedium from "./text/BoldMedium";
import BoldLarge from "./text/BoldLarge";
import Button4 from "./button/Button4";

function MyPageTitle() {
  const loginUser = useSelector((state) => state.login.user);

  return (
    <div>
      <RowContainer justify="start" height="480px" background="#F6F1EE">
        <ColContainer width="18.3%" justify="start">
          <GapH height="80px" />
          <img
            src={Burger}
            alt="burger"
            style={{
              width: "79px",
            }}
          />
        </ColContainer>
        <ColContainer width="81.7%" height="100%" justify="start" align="start">
          <GapH height="22.3%" />
          <BoldMedium>MY PAGE</BoldMedium>
          <GapH height="15.4%" />
          <RowContainer justify="start">
            <BoldLarge>{loginUser.nickname} 님의 마이페이지입니다</BoldLarge>
            <GapW width="257px" />
            <Button4 width="316px">
              <BoldMedium color="white">회원 정보 수정</BoldMedium>
            </Button4>
          </RowContainer>
        </ColContainer>
      </RowContainer>
    </div>
  );
}

export default MyPageTitle;
