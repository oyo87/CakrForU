package com.a604.cake4u.orders.dto.request;

import lombok.*;

import java.sql.Timestamp;

/**
 * 리뷰 등록을 위한 VO
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class OrderSheetReviewVO {
    private String reviewContent;
//    private Timestamp reviewCreatedAt;
    private int reviewRating;
}
