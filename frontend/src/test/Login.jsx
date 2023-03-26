// import React from "react";
// import styled from "styled-components";
// import BoldLarge from "../components/text/BoldLarge";
// import Button4 from "../components/button/Button4";
// import Input from "../components/Input";
// import NaverIcon from "./assets/img/naver_icon.png";
// import GapW from "../components/GapW";
// import GapH from "../components/GapH";
// import { RadioButton } from "../components/Radio";
// import SmallMedium from "../components/text/SmallMedium";
// import MediumSmall from "../components/text/MediumSmall";
// import Small from "../components/text/Small";

// function Login() {
//   const LoginContainer = styled.div`
//     display: flex;
//     position: relative;
//     justify-content: center;
//     width: 100%;
//     height: calc(100vh - 104px);
//     background-color: #f2f1f6;
//   `;
//   const LoginForm = styled.div`
//     display: flex;
//     position: absolute;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     width: 35.6%;
//     height: 72.5%;
//     min-width: 200px;
//     min-height: 300px;
//     // background-color: #aaaaaa;
//     margin-top: 7%;
//   `;
//   const HorizonBox = styled.div`
//     display: flex;
//     justify-content: start;
//     align-items: center;
//     width: 100%;
//     height: 120px;
//     gap: ${(props) => props.gap || "0px"};
//   `;
//   const FlexBox = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 100%;
//     height: 100%;
//   `;

//   return (
//     <LoginContainer>
//       <LoginForm>
//         <BoldLarge>LOGIN</BoldLarge>
//         <GapH height="50px" />
//         <HorizonBox gap="10px">
//           <SmallMedium fontsize="30px">Email</SmallMedium>
//           <div style={{ flexGrow: 1 }} />
//           <RadioButton name="userType" />
//           <Small>구매자</Small>
//           <GapW width="5px" />
//           <RadioButton name="userType" />
//           <Small>판매자</Small>
//         </HorizonBox>
//         <GapH height="11px" />
//         <Input width="100%" height="120px" />
//         <GapH height="21px" />
//         <HorizonBox>
//           <SmallMedium fontsize="30px">Password</SmallMedium>
//         </HorizonBox>
//         <GapH height="11px" />
//         <Input width="100%" height="120px" />
//         <GapH height="50px" />
//         <Button4 width="100%" height="120px" background="#FF9494">
//           <SmallMedium color="white">로그인</SmallMedium>
//         </Button4>
//         <GapH height="21px" />
//         <Button4 width="100%" height="120px" background="#06BE34">
//           <a
//             href="http://j8a604.p.ssafy.io:8080/oauth2/authorization/naver?redirect_uri=http://j8a604.p.ssafy.io/oauth/redirect"
//             style={{
//               color: "white",
//               textDecoration: "none",
//             }}
//           >
//             <FlexBox>
//               <img src={NaverIcon} alt="naver" />
//               <SmallMedium color="white">네이버로 로그인하기</SmallMedium>
//             </FlexBox>
//           </a>
//         </Button4>
//         <GapH height="41px" />
//         <HorizonBox
//           style={{
//             justifyContent: "center",
//             gap: "13px",
//           }}
//         >
//           <MediumSmall fontsize="18px" color="#9e9e9e">
//             계정이 없으신가요?
//           </MediumSmall>
//           <MediumSmall fontsize="18px">구매자 회원가입</MediumSmall>
//         </HorizonBox>
//       </LoginForm>
//     </LoginContainer>
//   );
// }

// export default Login;
