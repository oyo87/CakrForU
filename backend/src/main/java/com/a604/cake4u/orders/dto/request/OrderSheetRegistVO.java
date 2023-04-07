package com.a604.cake4u.orders.dto.request;

import com.a604.cake4u.enums.*;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDate;

/**
 *  주문 등록을 위한 VO
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class OrderSheetRegistVO {
    private Long buyerId;   //  구매자 아이디(Buyer PK)
    private Long sellerId;  //  판매자 아이디(Seller PK)
//    private Timestamp createdAt;    //  주문 생성 시각
//    private int price = 0;  //  케이크 가격(주문 생성시에는 0으로 설정)
//    private LocalDate dueDate;  //  입금 마감 기한
    private LocalDate pickUpDate;   //  픽업 기한
    private ESheetSize sheetSize;   //  케이크 시트 크기
    private ESheetShape sheetShape; //  케이크 시트 모양
    private ESheetTaste sheetTaste; //  케이크 시트 맛
    private ECreamTaste creamTaste; //  케이크 크림 맛
    private String buyerMessage;    //  구매자 요청 사항
}
