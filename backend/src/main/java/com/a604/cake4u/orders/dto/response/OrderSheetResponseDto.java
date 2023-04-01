package com.a604.cake4u.orders.dto.response;

import com.a604.cake4u.enums.*;
import com.a604.cake4u.imagefile.dto.ImageFileDto;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private String buyerNickName;
    private Long sellerId;
    private String businessName;
    private List<ImageFileDto> imageFileDtoList;
    private EStatus status;
    private LocalDate createdAt;
    private int price = 0;
    private LocalDate dueDate;
    private LocalDate pickUpDate;
    private ESheetSize sheetSize;
    private ESheetShape sheetShape;
    private ESheetTaste sheetTaste;
    private ECreamTaste creamTaste;
    private String buyerMessage;
    private String reviewContent;
    private LocalDateTime reviewCreatedAt;
    private int reviewRating;
}
