import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import gsap from "gsap";
import Header from "./components/Header";
import LeftRightContainer from "./components/layout/LeftRightContainer";
import GapW from "./components/layout/GapW";
import BoldLarge from "./components/text/BoldLarge";
import Small from "./components/text/Small";
import GapH from "./components/layout/GapH";
import Button1 from "./components/button/Button1";
import axios from "./util/axiosInstance";
import BoldSmall from "./components/text/BoldSmall";

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
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Picture = styled.div`
  background-image: url(${(props) => props.imageUrl});
  width: 100%;
  height: 50%;
  background-size: cover;
  background-repeat: no-repeat;
`;
const Text1 = styled.div`
  background-color: white;
  border: #e2e2e2 solid 2px;
  padding: 5px;
  width: 100%;
  height: 20%;
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
  imageUrl,
}) {
  const desc = [color, shape, sheetTaste, creamTaste, situation].join(", ");
  return (
    <Card>
      <Picture imageUrl={imageUrl} />
      <Text1>
        <Small color="#9e9e9e">{businessName}</Small>
        <BoldSmall>{detail}</BoldSmall>
      </Text1>
      <Text2>
        <Small>{desc}</Small>
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
    if (page < 0) {
      setPage(0);
    } else {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/wish/mylist/${loginUser.id}?page=${page}`
      )
      .then((res) => {
        if (res.data.wishlist.length > 0) {
          setWishlistMatrix(res.data.wishlist);
        } else {
          setPage(0);
        }
      });
  }, [page]);
  useEffect(() => {
    gsap.fromTo(
      ".WishBox",
      { x: "-10%", opacity: 0 },
      { x: "0%", duration: 1, opacity: 1 }
    );
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
        <WishBox className="WishBox">
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
                imageUrl={wish.imageUrl[0]}
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
