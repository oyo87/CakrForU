import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { closePortfolio } from "./store/modalSlice";
import PortfolioModal from "./components/PortfolioModal";

function RecommendPersonal() {
  const modal = useSelector((state) => state.modal);
  const loginUser = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  const handleClickOutModal = () => {
    if (modal.portfolioOpen) {
      dispatch(closePortfolio());
    }
  };

  const genderDict = {
    남성: "M",
    여성: "F",
  };
  const genderDictRev = {
    M: "남성",
    F: "여성",
  };
  const [recommendMatrix, setRecommendMatrix] = useState([]);
  const [option, setOption] = useState({
    gender: genderDictRev[loginUser.gender],
    age: loginUser.age,
  });
  const [page, setPage] = useState(0);
  const cardPerRow = 5;

  function fetchPortfolios() {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/recommendation/personal?age=${
          option.age
        }&gender=${genderDict[option.gender]}&page=${page}`
      )
      .then((res) => {
        console.log(res);
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
  }, [option, page]);

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

  const handleGenderChange = (event) => {
    if (event) {
      setOption({ age: option.age, gender: event.value });
      setPage(0);
    }
  };

  const handleAgeChange = (event) => {
    if (event) {
      setOption({
        age: parseInt(event.value.replace("대", ""), 10),
        gender: option.gender,
      });
      setPage(0);
    }
  };

  return (
    <div>
      <Header handleClickOutModal={handleClickOutModal} />
      {modal.portfolioOpen ? <PortfolioModal /> : null}
      <RecommendHeader />
      <RowContainer justify="start" align="start" onClick={handleClickOutModal}>
        <RecommendSidebar />
        <ColContainer>
          <RowContainer justify="start">
            <Select
              width="183px"
              height="55px"
              options={["10대", "20대", "30대", "40대", "50대", "60대"]}
              placeholder="연령"
              onChange={handleAgeChange}
            />
            <GapW width="15px" />
            <Select
              width="183px"
              height="55px"
              options={["여성", "남성"]}
              placeholder="성별"
              onChange={handleGenderChange}
            />
          </RowContainer>
          <GapH height="57px" />
          <RowContainer justify="start">
            <Medium>
              # {option.age}대 # {option.gender}
            </Medium>
            <GapW />
          </RowContainer>
          <GapH height="58px" />
          <ColContainer gap="50px">
            {recommendMatrix.map((recommendRow) => (
              <RowContainer>
                {recommendRow.map((item) => (
                  <RowContainer>
                    <Card
                      title={item.detail}
                      shape={item.shape}
                      sheetTaste={item.sheetTaste}
                      creamTaste={item.creamTaste}
                      situation={item.situation}
                      businessName={item.businessName}
                      size={item.size}
                      detail={item.detail}
                      imgUrl={item.imageUrl}
                      color={item.color}
                      createdAt={item.createdAt}
                      hit={item.hit}
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
