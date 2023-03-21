package com.a604.cake4u.portfolio.dto;

import com.a604.cake4u.enums.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PortfolioResponseDto {
    private Long id;
    private Long sellerId;
    private int hit;
    private LocalDateTime createdAt;
    private EGender gender;
    private ESituation situation;
    private int ageGroup;
    private ESheetSize size;
    private EColor color;
    private ESheetShape shape;
    private ESheetTaste sheetTaste;
    private ECreamTaste creamTaste;
    private String detail;
}
