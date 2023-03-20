package com.a604.cake4u.orders.dto.response;

import com.a604.cake4u.buyer.entity.Buyer;
import com.a604.cake4u.enums.*;
import com.a604.cake4u.files.dto.FilesDto;
import com.a604.cake4u.files.entity.Files;
import com.a604.cake4u.seller.entity.Seller;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.EAGER;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrdersResponseDto {
    private Long id;
    private Long buyerId;
    private Long sellerId;
    private List<FilesDto> files;
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
