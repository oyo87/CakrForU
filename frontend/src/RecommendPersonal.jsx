import React from "react";

import Header from "./components/Header";
import ColContainer from "./components/layout/ColContainer";
import Select from "./components/Select";
import GapW from "./components/layout/GapW";
import Small from "./components/text/Small";
import RecommendHeader from "./components/RecommendHeader";
import RecommendSidebar from "./components/RecommendSidebar";
import RowContainer from "./components/layout/RowContainer";

function RecommendPersonal() {
  // const [recommendList, setRecommendList] = useState([]);
  // recommendList, setRecommendList;
  // useEffect(() => {
  //   axios.get(`${process.env.REACT_APP_BACKEND_URL}/portfolio/list/` + 20);
  // });
  return (
    <div>
      <Header />
      <RecommendHeader />
      <RowContainer justify="start" align="start">
        <RecommendSidebar />
        <ColContainer>
          <RowContainer>
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
          <ColContainer gap="150px">
            <Small>일asdf</Small>
            <Small>이</Small>
            <Small>삼</Small>
          </ColContainer>
        </ColContainer>
      </RowContainer>
    </div>
  );
}

export default RecommendPersonal;
