import React from "react";
import { ColorRing } from "react-loader-spinner";
import ColContainer from "./layout/ColContainer";

function Loading() {
  return (
    <div className="loadingContainer">
      <ColContainer align="center">
        <ColorRing
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
        <p style={{ color: "#716F6F" }}>위시리스트 데이터를 분석중입니다...</p>
      </ColContainer>
    </div>
  );
}

export default Loading;
