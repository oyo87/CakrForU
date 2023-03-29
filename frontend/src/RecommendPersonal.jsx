import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "./util/axiosInstance";
import Header from "./components/Header";
import ColContainer from "./components/layout/ColContainer";
import Select from "./components/Select";
import GapW from "./components/layout/GapW";
import GapH from "./components/layout/GapH";
import RecommendHeader from "./components/RecommendHeader";
import RecommendSidebar from "./components/RecommendSidebar";
import RowContainer from "./components/layout/RowContainer";
import Card from "./components/Card";
import Medium from "./components/text/Medium";
import Button1 from "./components/button/Button1";

function RecommendPersonal() {
  const loginUser = useSelector((state) => state.login.user);
  const [recommendMatrix, setRecommendMatrix] = useState([]);
  const [page, setPage] = useState(0);
  const cardPerRow = 5;
  const user = useSelector((state) => state.login.user);
  function fetchPortfolios() {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/recommendation/personal?email=${user.email}&page=${page}`
      )
      .then((res) => {
        const answer = [];
        const row = Math.floor(res.data.length / cardPerRow);
        const r = res.data.length % cardPerRow;
        for (let i = 0; i < row; i += 1) {
          answer.push(res.data.slice(i * cardPerRow, (i + 1) * cardPerRow));
        }
        if (r > 0) {
          answer.push(res.data.slice(row * cardPerRow, row * cardPerRow + r));
        }
        setRecommendMatrix(answer);
      });
  }

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const load = () => {
    fetchPortfolios();
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  };

  const loadMore = () => {
    setPage(page + 1);
    load();
  };

  const loadPrev = () => {
    setPage(page - 1);
    load();
  };

  return (
    <div>
      <Header />
      <RecommendHeader />
      <RowContainer justify="start" align="start">
        <RecommendSidebar />
        <ColContainer>
          <RowContainer justify="start">
            <Select
              width="183px"
              height="55px"
              options={["여성", "남성"]}
              placeholder="성별"
            />
            <GapW width="15px" />
            <Select
              width="183px"
              height="55px"
              options={["여성", "남성"]}
              placeholder="연령"
            />
          </RowContainer>
          <GapH height="57px" />
          <RowContainer justify="start">
            <Medium># {loginUser.age}대</Medium>
            <GapW />
          </RowContainer>
          <GapH height="58px" />
          <ColContainer gap="50px">
            {recommendMatrix.map((recommendRow) => (
              <RowContainer>
                {recommendRow.map((recommend) => (
                  <RowContainer>
                    <Card
                      title={recommend.detail}
                      shape={recommend.shape}
                      sheetTaste={recommend.sheetTaste}
                      creamTaste={recommend.creamTaste}
                      situation={recommend.situation}
                      sellerId={recommend.sellerId}
                    />
                    <GapW width="20px" />
                  </RowContainer>
                ))}
              </RowContainer>
            ))}
          </ColContainer>
          <GapH height="50px" />
          <RowContainer>
            {page !== 0 && (
              <Button1
                background="black"
                color="white"
                style={{ width: "100%" }}
                onClick={loadPrev}
              >
                이전 페이지
              </Button1>
            )}
            {page !== 0 && <GapW />}
            <Button1
              background="black"
              color="white"
              style={{ width: "100%" }}
              onClick={loadMore}
            >
              다음 페이지
            </Button1>
          </RowContainer>
          <GapH height="50px" />
        </ColContainer>
      </RowContainer>
    </div>
  );
}

export default RecommendPersonal;
