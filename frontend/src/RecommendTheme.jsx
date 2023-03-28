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

function RecommendSituation() {
  const loginUser = useSelector((state) => state.login.user);
  const [recommendList, setRecommendList] = useState([]);
  const [recommendMatrix, setRecommendMatrix] = useState([]);
  const [page, setPage] = useState(0);
  const cardPerRow = 5;
  function fetchPortfolios(situation) {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/recommendation/situation?situation=${situation}&page=${page}`
      )
      .then((res) => {
        setRecommendList(res.data);
        const answer = [];
        const row = Math.floor(recommendList.length / cardPerRow);
        const r = recommendList.length % cardPerRow;
        for (let i = 0; i < row; i += 1) {
          answer.push(
            recommendList.slice(i * cardPerRow, (i + 1) * cardPerRow)
          );
        }
        if (r > 0) {
          answer.push(
            recommendList.slice(row * cardPerRow, row * cardPerRow + r)
          );
        }
        setRecommendMatrix(answer);
      });
  }

  useEffect(() => {
    fetchPortfolios("birthday");
  });

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
              options={[
                "아이돌",
                "입/퇴사",
                "환갑",
                "생일",
                "기념일",
                "결혼 케이크",
                "전역",
                "크리스마스",
                "기타",
              ]}
              value="생일"
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

export default RecommendSituation;
