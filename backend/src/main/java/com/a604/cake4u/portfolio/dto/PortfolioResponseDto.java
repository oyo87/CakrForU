package com.a604.cake4u.portfolio.dto;

import com.a604.cake4u.enums.*;
import com.a604.cake4u.portfolio.entity.Portfolio;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PortfolioResponseDto {
    private Long id;
    private Long sellerId;
    private String businessName;
    private int hit;
    private LocalDate createdAt;
    private EGender gender;
    private ESituation situation;
    private int ageGroup;
    private ESheetSize size;
    private EColor color;
    private ESheetShape shape;
    private ESheetTaste sheetTaste;
    private ECreamTaste creamTaste;
    private String detail;
    private List<String> imageUrl;

    PortfolioResponseDto toDto(Portfolio portfolio) {
        return PortfolioResponseDto.builder()
                .id(portfolio.getId())
                .sellerId(portfolio.getSeller().getId())
                .hit(portfolio.getHit())
                .createdAt(portfolio.getCreatedAt())
                .gender(portfolio.getGender())
                .situation(portfolio.getSituation())
                .ageGroup(portfolio.getAgeGroup())
                .size(portfolio.getSize())
                .color(portfolio.getColor())
                .shape(portfolio.getShape())
                .sheetTaste(portfolio.getSheetTaste())
                .creamTaste(portfolio.getCreamTaste())
                .detail(portfolio.getDetail())
                .build();
    }
}
