import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "./components/Header";
import LeftRightContainer from "./components/layout/LeftRightContainer";
import GapW from "./components/layout/GapW";
import BoldLarge from "./components/text/BoldLarge";
import Small from "./components/text/Small";
import GapH from "./components/layout/GapH";
import Button1 from "./components/button/Button1";
import SmallMedium from "./components/text/SmallMedium";
import axios from "./util/axiosInstance";

const InfoBox = styled.div`
  width: 30vh;
  height: 80vh;
  background-color: #8c8279;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;
const WishBox = styled.div`
  width: 60vh;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const NextBox = styled.div`
  width: 10vh;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ThreeCardBox = styled.div`
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Card = styled.div`
  width: 30%;
  height: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Picture = styled.div`
  background-image: url(${(props) => props.imageUrl});
  width: 100%;
  height: 40%;
  background-size: cover;
  background-repeat: no-repeat;
`;
const Text1 = styled.div`
  background-color: white;
  border: #e2e2e2 solid 2px;
  padding: 5px;
  width: 100%;
  height: 35%;
`;
const Text2 = styled.div`
  background-color: white;
  border: #e2e2e2 solid 2px;
  padding: 5px;
  width: 100%;
  height: 30%;
`;
function InformationBox() {
  return (
    <InfoBox>
      <BoldLarge color="white">Wish List</BoldLarge>
      <GapH height="30px" />
      <Small color="white" style={{ textAlign: "center" }}>
        내가 찜한 목록이 <br /> 최신순으로 표시됩니다{" "}
      </Small>
    </InfoBox>
  );
}

function MyWishListCards({
  businessName,
  detail,
  color,
  shape,
  sheetTaste,
  creamTaste,
  situation,
}) {
  let desc = [color, shape, sheetTaste, creamTaste, situation].join(", ");
  desc = desc.slice(0, desc.length - 2);
  return (
    <Card>
      <Picture imageUrl="https://preppykitchen.com/wp-content/uploads/2022/05/Naked-Cake-Recipe-Card.jpg" />
      <Text1>
        <Small color="#9e9e9e">{businessName}</Small>
        <br />
        <SmallMedium fontsize="18px">{detail}</SmallMedium>
      </Text1>
      <Text2>
        <Small> {desc} </Small>
      </Text2>
    </Card>
  );
}

function MyWishList() {
  const loginUser = useSelector((state) => state.login.user);
  const [wishlistMatrix, setWishlistMatrix] = useState([]);
  const [page, setPage] = useState(0);
  const handleNextClick = () => {
    setPage(page + 1);
  };
  const handlePrevClick = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/wish/mylist/${loginUser.id}?page=${page}`
      )
      .then((res) => {
        if (res.data.wishlist.length > 0) {
          setWishlistMatrix(res.data.wishlist);
        }
      });
  }, [page]);
  return (
    <>
      <Header />
      <LeftRightContainer
        style={{ marginLeft: "15%", marginRight: "15%" }}
        align="center"
        justify="center"
        minHeight="calc(100vh - 60px)"
      >
        <InformationBox />
        <GapW width="1%" />
        <WishBox>
          <ThreeCardBox>
            {wishlistMatrix.map((wish) => (
              <MyWishListCards
                businessName={wish.businessName}
                detail={wish.detail}
                color={wish.color}
                shape={wish.shape}
                sheetTaste={wish.sheetTaste}
                creamTaste={wish.creamTaste}
                situation={wish.situation}
              />
            ))}
            <GapH height="1%" />
          </ThreeCardBox>
        </WishBox>
        <NextBox>
          <Button1 onClick={handleNextClick}>NEXT</Button1>
          <GapH height="1%" />
          <Button1 onClick={handlePrevClick}>PREV</Button1>
        </NextBox>
      </LeftRightContainer>
    </>
  );
}

export default MyWishList;
