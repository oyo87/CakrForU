package com.a604.cake4u.orders.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrdersSaveRequestDto {
    private Long buyerId;
    private Long sellerId;
    private String status;
    private int price;
    private LocalDate pickUpDate;
    private String sheetSize;
    private String sheetShape;
    private String sheetTaste;
    private String creamTaste;
    private String buyerMessage;
    private String reviewContent;
    private int reviewRating;
}
