// import React from "react";
// import styled from "styled-components";

// const ReviewCardWrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   border: 1px solid #e0e0e0;
//   border-radius: 10px;
//   padding: 20px;
// `;

// const BusinessName = styled.div`
//   font-size: 20px;
// `;

// function ReviewCard({ review }) {
//   const { businessName, reviewRating, reviewContent } = review;
//   const onArr = [...Array(reviewRating).keys()];
//   const offArr = [...Array(5 - reviewRating).keys()];

//   return (
//     <ReviewCardWrapper>
//       <BusinessName>{businessName}</BusinessName>
//       <StarWrapper>
//         {onArr.map((i) => (
//           <StarOn key={i} />
//         ))}
//         {offArr.map((i) => (
//           <StarOff key={i} />
//         ))}
//       </StarWrapper>
//       <ReviewContent>{reviewContent}</ReviewContent>
//     </ReviewCardWrapper>
//   );
// }

// export default ReviewCard;
