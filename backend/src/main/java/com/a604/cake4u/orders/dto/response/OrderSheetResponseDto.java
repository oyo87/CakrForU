package com.a604.cake4u.orders.dto.response;

import com.a604.cake4u.enums.*;
import com.a604.cake4u.files.dto.ImageFileDto;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderSheetResponseDto {
    private Long id;
    private Long buyerId;
    private Long sellerId;
    private List<ImageFileDto> imageFileDtoList;
    private EStatus status;
    private Timestamp createdAt;
    private int price = 0;
    private LocalDate dueDate;
    private LocalDate pickUpDate;
    private ESheetSize sheetSize;
    private ESheetShape sheetShape;
    private ESheetTaste sheetTaste;
    private ECreamTaste creamTaste;
    private String buyerMessage;
    private String reviewContent;
    private Timestamp reviewCreatedAt;
    private int reviewRating;
}
